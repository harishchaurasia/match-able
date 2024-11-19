require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const collection = require('./config');
const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require("child_process");
const path = require('path');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Authentication middleware (kept for other endpoints that might need it)
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log("Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Invalid auth header format");
        return res.status(401).json({ message: "Invalid authentication header" });
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted token:", token);

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
}

app.get("/api/companies", async (req, res) => {
    try {
        console.log("Fetching companies...");
        const companies = await collection.Company.find({});
        console.log("Companies found:", companies);
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: "Error retrieving company data" });
    }
});


app.post("/signup", async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };

        const existingUser = await collection.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.create(data);
        console.log("User created:", userdata);

        const token = jwt.sign({ email: data.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ message: "Signup Successful", token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log("Login successful, token generated:", token);

        res.status(200).json({
            message: "Login successful",
            token,
            role: user.role
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/update-profile", authenticateToken, async (req, res) => {
    try {
        const { name, accessibility_needs } = req.body;
        const email = req.user.email;
        console.log("Updating profile for user:", email);

        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await collection.updateOne(
            { email },
            { $set: { name, accessibility_needs } }
        );

        console.log("Profile updated successfully");
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});

app.get("/calculate-similarity", authenticateToken, async (req, res) => {
    try {
        const email = req.user.email; // Email of the authenticated user
        console.log("Calculating similarity for user:", email);
        
        const user = await collection.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(404).json({ message: "User not found" });
        }

        const accessibilityNeeds = user.accessibility_needs;
        const companies = await collection.Company.find({}, 'accessibilityServices');

        console.log("User needs:", accessibilityNeeds);
        console.log("Companies found:", companies);

        const pythonPath = '/Users/chiragseth/Desktop/HackPrinceton/match-able/src/ai-ml/venv/bin/python3';
        const pythonScriptPath = '/Users/chiragseth/Desktop/HackPrinceton/match-able/src/ai-ml/accessibilitySimilarity.py';
        
        const python = spawn(pythonPath, [
            pythonScriptPath,
            JSON.stringify({ accessibilityNeeds, companies })
        ]);

        let pythonData = '';
        let pythonError = '';

        python.stdout.on('data', (data) => {
            pythonData += data.toString();
            console.log("Python output:", data.toString());
        });

        python.stderr.on('data', (data) => {
            pythonError += data.toString();
            console.error("Python error:", data.toString());
        });

        python.on('close', (code) => {
            if (code !== 0) {
                console.error("Python process exited with code:", code);
                return res.status(500).json({ 
                    message: "Error calculating similarity",
                    error: pythonError,
                    code: code
                });
            }
            try {
                const scores = JSON.parse(pythonData);
                console.log("Calculated scores:", scores);
                res.json(scores);
            } catch (error) {
                console.error("Error parsing Python output:", error);
                res.status(500).json({ 
                    message: "Error parsing similarity scores",
                    error: error.message,
                    pythonOutput: pythonData
                });
            }
        });

    } catch (error) {
        console.error("Error in similarity calculation:", error);
        res.status(500).json({ 
            message: "Error in similarity calculation",
            error: error.message 
        });
    }
});


app.post("/upload-resume", authenticateToken, upload.single('resume'), async (req, res) => {
    try {
        const email = req.user.email;
        console.log("Uploading resume for user:", email);

        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const fileStream = fs.createReadStream(req.file.path);

        const result = await s3.upload({
            Bucket: "match-able-resumes",
            Key: `resumes/${req.file.originalname}`,
            Body: fileStream,
            ContentType: "application/pdf"
        }).promise();

        const resumeKey = result.Key;

        await collection.updateOne(
            { email },
            { $set: { resume_key: resumeKey } }
        );

        console.log("Resume uploaded successfully:", result);

        const downloadParams = {
            Bucket: "match-able-resumes",
            Key: resumeKey
        };
        const downloadStream = s3.getObject(downloadParams).createReadStream();

        const localFilePath = path.join(__dirname, 'temp_resume.pdf');
        const writeStream = fs.createWriteStream(localFilePath);
        downloadStream.pipe(writeStream);

        writeStream.on('error', (err) => {
            console.error("Error writing file locally:", err);
            res.status(500).json({ message: "Error writing temp file" });
        });

        writeStream.on('finish', async () => {
            console.log("Temp file saved successfully. Running pdfScrape.py...");
            const python = spawn("python3", ["/Users/chiragseth/Desktop/HackPrinceton/match-able/src/ai-ml/pdfScrape.py", localFilePath]);

            let extractedText = '';
            python.stdout.on("data", (data) => {
                extractedText += data.toString();
            });

            python.stderr.on("data", (data) => {
                console.error("Python error:", data.toString());
            });

            python.on("close", async (code) => {
                if (code !== 0) {
                    console.error("Error: pdfScrape.py exited with code", code);
                    return res.status(500).json({ message: "Error processing PDF" });
                }

                if (!extractedText) {
                    console.error("Error: No text extracted from PDF");
                    return res.status(500).json({ message: "No text extracted from PDF" });
                }

                await collection.updateOne(
                    { email },
                    { $set: { resume_text: extractedText } }
                );

                fs.unlink(localFilePath, (err) => {
                    if (err) console.error("Error deleting temp file:", err);
                });

                res.status(200).json({ message: "Resume processed and text saved" });
            });
        });

        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting uploaded temp file:", err);
        });
    } catch (error) {
        console.error("Error uploading resume:", error);
        res.status(500).json({ message: "Error uploading resume" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;