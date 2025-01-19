require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const { clientRouter } = require("./Routes/client")
const { workerRouter } = require("./Routes/worker")

app.use(express.json())

app.use("/client", clientRouter)
app.use("/worker", workerRouter)


async function Main() {
    await mongoose.connect(process.env.mongoDB_URL);
    app.listen(3000)
}

Main()