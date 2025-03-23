require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { clientRouter } = require("./Routes/client/client")
const { workerRouter } = require("./Routes/worker/worker")

app.use(express.json())

app.use("/api/v1/client", clientRouter)
app.use("/api/v1/worker", workerRouter)

console.log(process.env.mongoDB_URL)

async function Main() {
    await mongoose.connect(process.env.mongoDB_URL);
    app.listen(3000)
}

Main()