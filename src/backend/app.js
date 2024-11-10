// // const express = require('express');
// // const app = express();
// // const bcrypt = require('bcrypt');
// // const collection = require('./config'); // Import collection from config.js
// // require('dotenv').config();
// // const jwt = require('jsonwebtoken');

// // const aws = require('aws-sdk');
// // const s3 = new aws.S3({
// //     accessKeyId: 'AKIAT4GVRLAMNU5UAFUZ',       // Replace with your actual access key
// //     secretAccessKey: 'ajjaPvN2FXfZWmf2VgFwdb8rTnfNJrm8s4hg+D17',   // Replace with your actual secret key
// //     region: 'us-east-2'                 // Replace with your actual AWS region
// // });
// // //const s3 = new aws.S3();

// // const fs = require('fs');
// // const multer = require('multer');

// // // Middleware to parse JSON and URL-encoded data
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));

// // const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

// // // Route for signup
// // app.post("/signup", async (req, res) => {
// //     try {
// //         const data = {
// //             email: req.body.email,
// //             password: req.body.password,
// //             role: req.body.role
// //         };

// //         const existingUser = await collection.findOne({ email: data.email });

// //         if (existingUser) {
// //             return res.status(400).send("User already exists. Please choose a different email.");
// //         }

// //         const saltRounds = 10;
// //         const hashedPassword = await bcrypt.hash(data.password, saltRounds);
// //         data.password = hashedPassword;

// //         const userdata = await collection.create(data);

// //         console.log("User data saved:", userdata);

// //         return res.status(201).send("Signup Successful");
// //     } catch (error) {
// //         console.error("Signup error:", error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // app.post("/login", async (req, res) => {
// // //     try{
// // //         const check = await collection.findOne({email: req.body.email});
// // //         if (!check) {
// // //             return res.send("email not found");
// // //         }
 
// // //         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
// // //         if (isPasswordMatch) {
// // //             if (check.role === 'job seeker') {
// // //                 res.send("job seeker successfully logged in");
// // //             }
// // //             else if (check.role === 'employer') {
// // //                 res.send("employer successfully logged in");
// // //             }
// // //         }else{
// // //             req.send("wrong password");
// // //         }
// // //     }catch {
// // //         res.send("wrong details");
// // //     }
// // //  });

// // app.post("/login", async (req, res) => {
// //     try {
// //         const check = await collection.findOne({ email: req.body.email });
// //         if (!check) {
// //             return res.send("Email not found");
// //         }

// //         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
// //         if (isPasswordMatch) {
// //             const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //             const roleMessage = check.role === 'job seeker' ? "Job seeker successfully logged in" : "Employer successfully logged in";

// //             return res.status(200).json({ message: roleMessage, token });
// //         } else {
// //             return res.status(400).send("Wrong password");
// //         }
// //     } catch (error) {
// //         console.error("Login error:", error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // Route for uploading resume
// // /*app.post("/upload-resume", upload.single('resume'), async (req, res) => {
// //     try {
// //         const fileStream = fs.createReadStream(req.file.path); // Read the uploaded file

// //         // Upload the file to the S3 bucket
// //         const result = await s3.upload({
// //             Bucket: "match-able-resumes",
// //             Key: `resumes/${req.file.originalname}`, // Use the uploaded file's original name
// //             Body: fileStream,
// //             ContentType: "application/pdf"
// //         }).promise();

// //         console.log("File uploaded successfully:", result);
// //         res.status(200).send("Resume uploaded successfully");

// //         // Remove the file from the local `uploads` folder after uploading
// //         fs.unlink(req.file.path, (err) => {
// //             if (err) console.error("Error deleting temp file:", err);
// //         });
// //     } catch (error) {
// //         console.error("Error uploading file:", error);
// //         res.status(500).send("Error uploading resume");
// //     }
// // });*/

// // app.post("/upload-resume", upload.single('resume'), async (req, res) => {
// //     try {
// //         // Ensure the request includes an email or ID to identify the user
// //         const { email } = req.body;
// //         const user = await collection.findOne({ email });
        
// //         if (!user) {
// //             return res.status(404).send("User not found");
// //         }

// //         const fileStream = fs.createReadStream(req.file.path); // Read the uploaded file

// //         // Upload the file to the S3 bucket
// //         const result = await s3.upload({
// //             Bucket: "match-able-resumes",
// //             Key: `resumes/${req.file.originalname}`, // Use the uploaded file's original name
// //             Body: fileStream,
// //             ContentType: "application/pdf"
// //         }).promise();

// //         // Update the user's document in the database with the S3 file key
// //         await collection.updateOne(
// //             { email },
// //             { $set: { resume_key: result.Key } }
// //         );

// //         console.log("File uploaded and database updated successfully:", result);
// //         res.status(200).send("Resume uploaded and saved successfully");

// //         // Remove the file from the local `uploads` folder after uploading
// //         fs.unlink(req.file.path, (err) => {
// //             if (err) console.error("Error deleting temp file:", err);
// //         });
// //     } catch (error) {
// //         console.error("Error uploading file:", error);
// //         res.status(500).send("Error uploading resume");
// //     }
// // });

// // // Start the server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// // require('dotenv').config();
// // const express = require('express');
// // const app = express();
// // const bcrypt = require('bcrypt');
// // const collection = require('./config'); // Import collection from config.js
// // const aws = require('aws-sdk');
// // const fs = require('fs');
// // const multer = require('multer');
// // const jwt = require('jsonwebtoken');

// // // Configure AWS S3
// // const s3 = new aws.S3({
// //     accessKeyId: 'AKIAT4GVRLAMNU5UAFUZ',       // Replace with your actual access key in .env
// //     secretAccessKey: 'ajjaPvN2FXfZWmf2VgFwdb8rTnfNJrm8s4hg+D17',   // Replace with your actual secret key in .env
// //     region: 'us-east-2'                 // Replace with your actual AWS region
// // });

// // // Configure multer for file uploads
// // const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

// // // Middleware to parse JSON and URL-encoded data
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));

// // // Middleware for JWT authentication
// // function authenticateToken(req, res, next) {
// //     const authHeader = req.headers['authorization'];
// //     const token = authHeader && authHeader.split(' ')[1];
// //     if (!token) return res.sendStatus(401); // Unauthorized if no token is present

// //     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
// //         if (err) return res.sendStatus(403); // Forbidden if token is invalid
// //         req.user = user; // Attach user info (email) to request
// //         next();
// //     });
// // }

// // // Route for signup
// // app.post("/signup", async (req, res) => {
// //     try {
// //         const data = {
// //             email: req.body.email,
// //             password: req.body.password,
// //             role: req.body.role
// //         };

// //         const existingUser = await collection.findOne({ email: data.email });
// //         if (existingUser) {
// //             return res.status(400).send("User already exists. Please choose a different email.");
// //         }

// //         const saltRounds = 10;
// //         const hashedPassword = await bcrypt.hash(data.password, saltRounds);
// //         data.password = hashedPassword;

// //         const userdata = await collection.create(data);
// //         console.log("User data saved:", userdata);

// //         return res.status(201).send("Signup Successful");
// //     } catch (error) {
// //         console.error("Signup error:", error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // Route for login
// // app.post("/login", async (req, res) => {
// //     try {
// //         const check = await collection.findOne({ email: req.body.email });
// //         if (!check) {
// //             return res.status(404).send("Email not found");
// //         }

// //         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
// //         if (isPasswordMatch) {
// //             const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //             const roleMessage = check.role === 'job seeker' ? "Job seeker successfully logged in" : "Employer successfully logged in";

// //             return res.status(200).json({ message: roleMessage, token });
// //         } else {
// //             return res.status(400).send("Wrong password");
// //         }
// //     } catch (error) {
// //         console.error("Login error:", error);
// //         res.status(500).send("Internal Server Error");
// //     }
// // });

// // // Route for uploading resume
// // app.post("/upload-resume", authenticateToken, upload.single('resume'), async (req, res) => {
// //     try {
// //         const email = req.user.email; // Retrieved from JWT payload

// //         const user = await collection.findOne({ email });
// //         if (!user) {
// //             return res.status(404).send("User not found");
// //         }

// //         const fileStream = fs.createReadStream(req.file.path);

// //         // Upload the file to the S3 bucket
// //         const result = await s3.upload({
// //             Bucket: "match-able-resumes",
// //             Key: `resumes/${req.file.originalname}`, // Use the uploaded file's original name
// //             Body: fileStream,
// //             ContentType: "application/pdf"
// //         }).promise();

// //         // Update the user's document in the database with the S3 file key
// //         await collection.updateOne(
// //             { email },
// //             { $set: { resume_key: result.Key } }
// //         );

// //         console.log("File uploaded and database updated successfully:", result);
// //         res.status(200).send("Resume uploaded and saved successfully");

// //         // Remove the file from the local `uploads` folder after uploading
// //         fs.unlink(req.file.path, (err) => {
// //             if (err) console.error("Error deleting temp file:", err);
// //         });
// //     } catch (error) {
// //         console.error("Error uploading file:", error);
// //         res.status(500).send("Error uploading resume");
// //     }
// // });

// // // Start the server
// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// require('dotenv').config();
// const express = require('express');
// const app = express();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const collection = require('./config'); // Import collection from config.js
// const aws = require('aws-sdk');
// const fs = require('fs');
// const multer = require('multer');
// const cors = require('cors');

// // Log JWT_SECRET to confirm it's being loaded correctly
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

// // Configure AWS S3
// const s3 = new aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// // Configure multer for file uploads
// const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

// // Middleware to parse JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cors());

// // Middleware for JWT authentication
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.sendStatus(401); // Unauthorized if no token is present

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Forbidden if token is invalid
//         req.user = user; // Attach user info (email) to request
//         next();
//     });
// }

// // Route for signup
// app.post("/signup", async (req, res) => {
//     try {
//         const data = {
//             email: req.body.email,
//             password: req.body.password,
//             role: req.body.role
//         };

//         const existingUser = await collection.findOne({ email: data.email });
//         if (existingUser) {
//             return res.status(400).send("User already exists. Please choose a different email.");
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);
//         data.password = hashedPassword;

//         const userdata = await collection.create(data);
//         console.log("User data saved:", userdata);

//         return res.status(201).send("Signup Successful");
//     } catch (error) {
//         console.error("Signup error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Route for login
// app.post("/login", async (req, res) => {
//     try {
//         const check = await collection.findOne({ email: req.body.email });
//         if (!check) {
//             return res.status(404).send("Email not found");
//         }

//         const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
//         if (isPasswordMatch) {
//             const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             const roleMessage = check.role === 'job seeker' ? "Job seeker successfully logged in" : "Employer successfully logged in";

//             return res.status(200).json({ message: roleMessage, token });
//         } else {
//             return res.status(400).send("Wrong password");
//         }
//     } catch (error) {
//         console.error("Login error:", error); // Log error details
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Route for uploading resume
// app.post("/upload-resume", authenticateToken, upload.single('resume'), async (req, res) => {
//     try {
//         const email = req.user.email; // Retrieved from JWT payload

//         const user = await collection.findOne({ email });
//         if (!user) {
//             return res.status(404).send("User not found");
//         }

//         const fileStream = fs.createReadStream(req.file.path);

//         // Upload the file to the S3 bucket
//         const result = await s3.upload({
//             Bucket: "match-able-resumes",
//             Key: `resumes/${req.file.originalname}`, // Use the uploaded file's original name
//             Body: fileStream,
//             ContentType: "application/pdf"
//         }).promise();

//         // Update the user's document in the database with the S3 file key
//         await collection.updateOne(
//             { email },
//             { $set: { resume_key: result.Key } }
//         );

//         console.log("File uploaded and database updated successfully:", result);
//         res.status(200).send("Resume uploaded and saved successfully");

//         // Remove the file from the local `uploads` folder after uploading
//         fs.unlink(req.file.path, (err) => {
//             if (err) console.error("Error deleting temp file:", err);
//         });
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).send("Error uploading resume");
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const collection = require('./config'); // Import collection from config.js
const aws = require('aws-sdk');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

// Log JWT_SECRET to confirm it's being loaded correctly
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Configure AWS S3
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary folder to store uploaded files

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Middleware for JWT authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401); // Unauthorized if no token is present

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user; // Attach user info (email) to request
        next();
    });
}

// Route for signup
app.post("/signup", async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        };

        const existingUser = await collection.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).send("User already exists. Please choose a different email.");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.create(data);
        console.log("User data saved:", userdata);

        return res.status(201).send("Signup Successful");
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route for login
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            return res.status(404).send("Email not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const roleMessage = check.role === 'job seeker' ? "Job seeker successfully logged in" : "Employer successfully logged in";

            return res.status(200).json({ message: roleMessage, token });
        } else {
            return res.status(400).send("Wrong password");
        }
    } catch (error) {
        console.error("Login error:", error); // Log error details
        res.status(500).send("Internal Server Error");
    }
});

// Route for uploading resume
app.post("/upload-resume", authenticateToken, upload.single('resume'), async (req, res) => {
    try {
        const email = req.user.email; // Retrieved from JWT payload

        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const fileStream = fs.createReadStream(req.file.path);

        // Upload the file to the S3 bucket
        const result = await s3.upload({
            Bucket: "match-able-resumes",
            Key: `resumes/${req.file.originalname}`, // Use the uploaded file's original name
            Body: fileStream,
            ContentType: "application/pdf"
        }).promise();

        // Update the user's document in the database with the S3 file key
        await collection.updateOne(
            { email },
            { $set: { resume_key: result.Key } }
        );

        console.log("File uploaded and database updated successfully:", result);
        res.status(200).send("Resume uploaded and saved successfully");

        // Remove the file from the local `uploads` folder after uploading
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting temp file:", err);
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading resume");
    }
});

// Route to retrieve all companies
app.get("/api/companies", async (req, res) => {
    try {
        const companies = await collection.Company.find({});
        res.json(companies);
    } catch (error) {
        console.error("Error retrieving company data:", error);
        res.status(500).json({ message: "Error retrieving company data" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
