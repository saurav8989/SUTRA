import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NmUxZTMzZDY0YWFlMWM0YmYxMDg4NSIsImlhdCI6MTc2ODgyNDM3MSwiZXhwIjoxNzcxNDE2MzcxfQ.jZhqlAv19iUqOYOxTUQxMESFIXpsLxf3kytJC62Wm5I";
const secret = "sutra_secret_key_123";

console.log("Checking User Token...");
try {
    const decoded = jwt.verify(userToken, secret);
    console.log("✅ Token is VALID.");
    console.log("Decoded:", decoded);
} catch (error) {
    console.log("❌ Token is INVALID.");
    console.log("Error:", error.message);
}
