const jwt = require("jsonwebtoken")

async function clientAuth(req, res, next) {
    const token = req.headers.authorization

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedData)

    if(!jwt.decodedData) {
        res.json({
            msg: "invalid User"
        })
        return;
    }

    req.clientId = decodedData.id   

    next()
}


module.exports = {
    clientAuth
}