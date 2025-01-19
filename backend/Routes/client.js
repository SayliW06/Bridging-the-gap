const { Router } = require("express");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { clientModel } = require("../db/db");
const clientRouter = Router();

clientRouter.post("/signup", async (req, res) => {
  const obj = z.object({
    email: z.string().min(3).max(100).unique(),
    password: z.string().min(3).max(30),
    username: z.string().min(3).max(40),
  });

  const verifiedData = obj.safeParse(req.body);

  if (!verifiedData.success) {
    return res.json({
      msg: "the structure of data is incorrect",
    });
  }

  const { email, password, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 13);

  try {
    await clientModel.create({
      email,
      password: hashedPassword,
      username,
    });

    res.json({
      msg: "you are signed up",
    });
  } catch (e) {
    res.json({
      msg: "some error occured",
      err: e,
    });
  }
});

clientRouter.post("/signin", async (req, res) => {
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

  const foundedUser = await clientModel.findOne({
    email,
  });

  if (foundedUser) {
    const passwordStatus = bcrypt.compare(password, foundedUser.password);

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

clientRouter.post("/", (req, res) => {});

clientRouter.post("/", (req, res) => {});


module.exports = {
    clientRouter
}