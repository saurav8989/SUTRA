import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log("PROTECT: Token received:", token ? token.substring(0, 10) + "..." : "NONE");

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'abc1234');
            console.log("PROTECT: Decoded ID:", decoded.id);

            req.user = await User.findById(decoded.id).select('-password');
            console.log("PROTECT: User found:", req.user ? req.user.email : "NO USER FOUND");

            next();
        } catch (error) {
            console.error("PROTECT ERROR:", error.message);
            res.status(401);
            throw new Error('Not authorized, token failed: ' + error.message);
        }
    }

    if (!token) {
        console.log("PROTECT: No token provided");
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    console.log("ADMIN CHECK: User:", req.user ? req.user.email : "None", "Role:", req.user ? req.user.role : "None");
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
