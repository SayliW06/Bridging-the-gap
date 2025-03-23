const jwt = require("jsonwebtoken")

async function workerAuth(req, res, next) {
    const token = req.headers.authorization
    
    // console.log(token + " " + process.env.JWT_SECRET)
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedData)
    
    if(!decodedData) {
        res.json({
            msg: "invalid user",
        })
    }

    req.workerId = decodedData.id

    next()
}

module.exports = {
    workerAuth
}