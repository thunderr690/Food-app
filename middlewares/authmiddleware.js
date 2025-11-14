const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // FULL SAFE CHECK
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Please provide Auth Token",
            });
        }

        // Example header: "Bearer eyJhbGciOi..."
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized User",
                });
            }

            // STORE IN req.user — NOT req.body
            req.user = decoded;

            next();
        });
    } catch (error) {
        console.log("Auth error:", error);
        res.status(500).json({
            success: false,
            message: "Auth Middleware Error",
            error,
        });
    }
};