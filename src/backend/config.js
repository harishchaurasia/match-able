// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://Chirag14:Madridista%404ever@match-able-db.4mqm7.mongodb.net/?retryWrites=true&w=majority&appName=match-able-db")
//     .then(() => {
//         console.log("Database Connected Successfully");
//     })
//     .catch((error) => {
//         console.log("Database cannot be connected", error);
//     });

// // Define schema and model
// const LoginSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true,
//         enum: ["job seeker", "employer"]
//     },
//     name: {
//         type: String,
//         default: ''
//     },
//     resume_key: { // Field to store the S3 file key
//         type: String,
//         default: ''
//     },
//     resume_text: {
//         type: String,
//         default: ''
//     },
//     accessibility_needs: {
//         type: String,
//         default: ''
//     }
// });

// // Define schema for companies collection
// const CompanySchema = new mongoose.Schema({
//     name: {
//         type: String
//     },
//     jobTitle: {
//         type: String
//     },
//     jobDescription: {
//         type: String
//     },
//     accessibilityServices: {
//         type: String
//     },
//     targetDisability: {
//         type: String
//     }
// });

// const collection = mongoose.model("users", LoginSchema);
// module.exports = collection;

// const Company = mongoose.model("companies", CompanySchema);
// module.exports = Company;

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://Chirag14:Madridista%404ever@match-able-db.4mqm7.mongodb.net/?retryWrites=true&w=majority&appName=match-able-db")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((error) => {
        console.log("Database cannot be connected", error);
    });

// Define schema and model for users collection
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["job seeker", "employer"]
    },
    name: {
        type: String,
        default: ''
    },
    resume_key: { // Field to store the S3 file key
        type: String,
        default: ''
    },
    resume_text: {
        type: String,
        default: ''
    },
    accessibility_needs: {
        type: String,
        default: ''
    }
});

// Define schema for companies collection with pre-save hook to prevent new entries
const CompanySchema = new mongoose.Schema({
    name: {
        type: String
    },
    jobTitle: {
        type: String
    },
    jobDescription: {
        type: String
    },
    accessibilityServices: {
        type: String
    },
    targetDisability: {
        type: String
    }
});

// Pre-save hook to block any insertion attempts to the companies collection
CompanySchema.pre('save', function (next) {
    const error = new Error("Inserting new companies is restricted.");
    next(error);
});

// Define models
const collection = mongoose.model("users", LoginSchema);
const Company = mongoose.model("companies", CompanySchema);

// Export only the User model for sign-up functionality
module.exports = collection;

// Optionally, export Company if you need read access
module.exports.Company = Company;