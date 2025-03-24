const jwt = require("jsonwebtoken")

async function workerAuth(req, res, next) {
    try {
        const token = req.headers.authorization;
        // console.log(token)
        if (!token) {
            return res.status(401).json({ msg: "Authorization token is required" });
        }

        // Verify token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedData);

        req.workerId = decodedData.id;
        next(); // Proceed to next middleware
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401).json({ msg: "Invalid or expired token" });
    }
}

module.exports = {
    workerAuth
}