import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/User.js';

const verifyAdmin = async () => {
    let output = "";
    try {
        await mongoose.connect('mongodb://localhost:27017/sutra');
        output += "DB Connected\n";

        const email = "superadmin@test.com";
        const user = await User.findOne({ email });

        if (!user) {
            output += `ERROR: User ${email} NOT FOUND in DB.\n`;
        } else {
            output += `User Found: ${user.name}\n`;
            output += `Role: ${user.role}\n`;
            output += `ID: ${user._id}\n`;

            if (user.role !== 'admin') {
                output += `ERROR: Role is '${user.role}', expected 'admin'.\n`;
            } else {
                output += "SUCCESS: User is admin.\n";
            }

            const token = jwt.sign({ id: user._id }, 'abc1234', { expiresIn: '30d' });
            output += "\n--- VALID TOKEN ---\n";
            output += token + "\n";
            output += "-------------------\n";
        }

    } catch (error) {
        output += `Exception: ${error.message}\n`;
    } finally {
        fs.writeFileSync('verify_output.txt', output);
        console.log("Done writing verify_output.txt");
        process.exit();
    }
};

verifyAdmin();
