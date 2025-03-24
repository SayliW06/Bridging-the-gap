const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { workerModel, clientModel } = require("../../db/db");
const { workerAuth } = require("../../middleware/workerAuth");
const JWT_SECRET = "workersJWTSecret";
const workerRouter = Router();

workerRouter.post("/signup", async (req, res) => {
  const obj = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
    username: z.string().min(3).max(40),
    description: z.string().max(200),
    occupation: z.string().max(100),
  });

  const verifiedData = obj.safeParse(req.body);

  if (!verifiedData.success) {
    return res.json({
      msg: "incorrect structure of data ",
      err: verifiedData.error,
    });
  }

  const { email, password, username, description, occupation } = req.body;

  const hashedPassword = await bcrypt.hash(password, 13);

  try {
    workerModel.create({
      email,
      password: hashedPassword,
      username,
      description,
      occupation,
    });

    res.json({
      msg: "you are signed up",
    });
  } catch (e) {
    msg: "some error occured";
    error: e;
  }
});

workerRouter.post("/signin", async (req, res) => {
  const obj = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(3).max(30),
  });

  const verifiedData = obj.safeParse(req.body);

  if (!verifiedData.success) {
    return res.json({
      msg: "incorrect structure of data",
      err: verifiedData.error,
    });
  }

  const { email, password } = req.body;

  const foundedworker = await workerModel.findOne({
    email,
  });

  if (foundedworker) {
    const passwordStatus = bcrypt.compare(password, foundedworker.password);

    if (passwordStatus) {
      const token = jwt.sign(
        {
          id: foundedworker._id,
        },
        process.env.JWT_SECRET
      );

      res.json({
        token,
      });
    } else {
      return res.json({
        msg: "your password are incorrect",
      });
    }
  } else {
    return res.json({
      msg: "the email is incorrect",
    });
  }
});

workerRouter.post("/details", workerAuth, async (req, res) => {
  const {experience, skill} = req.body
  const id = req.workerId;
  try {
    await workerModel.findOneAndUpdate({
      _id: id
    }, {
    $set: {
      experience,
      skill
    }})
  } catch (error) {
    res.json({
      msg: "something went wrong"
    })
  }

  res.json({
    msg: "done!"
  })
});

workerRouter.get("/", async (req, res) => {
  const clients = await clientModel.find({})

  let client = clients.map(client => ({
    name: client.username,
    email: client.email
  }))

  console.log(client)

  res.json(client)
});


module.exports = {
    workerRouter
}