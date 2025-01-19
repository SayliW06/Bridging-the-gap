const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "workersJWTSecret";
const { workerModel } = require("../db/db");
const workerRouter = Router();

workerRouter.post("/signup", async (req, res) => {
  const obj = z.object({
    email: z.string().min(3).max(100).unique(),
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
          _id,
        },
        JWT_SECRET
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

workerRouter.post("/", (req, res) => {});

workerRouter.post("/", (req, res) => {});


module.exports = {
    workerRouter
}