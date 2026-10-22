const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied. No valid token provided.",
        });
    }

    const token = authHeader.split(" ")[1];

    // jwt.verify(token, process.env.JWT_SECRET);

    try {
        // jwt.verify(token, process.env.JWT_SECRET); 
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token.",
        });
    }

    next();
};

module.exports = authMiddleware;