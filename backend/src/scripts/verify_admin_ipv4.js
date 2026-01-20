import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const verifyAdmin = async () => {
    let output = "";
    try {
        const uri = process.env.MONGO_URI;
        const secret = process.env.JWT_SECRET;

        output += `Connecting to Atlas... (URI length: ${uri.length})\n`;
        output += `Using Secret: ${secret}\n`;

        await mongoose.connect(uri);
        output += "DB Connected to Atlas\n";

        const email = "superadmin@test.com";
        const user = await User.findOne({ email });

        if (!user) {
            output += `ERROR: User ${email} NOT FOUND in Atlas DB.\n`;
            // List all users to see what we have
            const allUsers = await User.find({}, 'email role');
            output += "Existing Users:\n" + JSON.stringify(allUsers, null, 2) + "\n";
        } else {
            output += `User Found: ${user.name}\n`;
            output += `Role: ${user.role}\n`;
            output += `ID: ${user._id}\n`;

            if (user.role !== 'admin') {
                output += `ERROR: Role is '${user.role}', expected 'admin'.\n`;
            } else {
                output += "SUCCESS: User is admin.\n";
            }

            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30d' });
            output += "\n--- VALID TOKEN (Signed with Correct Secret) ---\n";
            output += token + "\n";
            output += "------------------------------------------------\n";
        }

    } catch (error) {
        output += `Exception: ${error.message}\n`;
    } finally {
        fs.writeFileSync('verify_atlas_output.txt', output);
        console.log("Done writing verify_atlas_output.txt");
        process.exit();
    }
};

verifyAdmin();
