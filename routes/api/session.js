const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");

require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/signup", async (request, response) => {
  try {
    const { fullName, email, phoneNumber, password } = request.body;

    const foundClient = await db.Client.findOne({ email: email });

    if (foundClient) {
      return response
        .status(400)
        .json({ message: "This email already exists" });
    }

    const hashedString = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newClient = await db.Client.create({
      email,
      fullName,
      phoneNumber,
      password: hashedString,
    });
   
    const token = createToken(newClient);
    delete newClient.password;
   
    response.cookie(
      "token",
      { ...newClient._doc, token },
      { maxAge: 900000, httpOnly: true }
    );
    response.status(201).json({ ...newClient, token });
    
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const foundClient = await db.Client.findOne({ email: email });
    if (!foundClient) {
      return response.status(404).json({ message: "Client did not exsist" });
    }
    if (await bcrypt.compare(password, foundClient.password)) {
      // const token = jwt.sign(
      //   { user_id: foundClient.id, email },
      //   process.env.SECRET_KEY,
      //   {
      //     expiresIn: "1h",
      //   }
      // );
      const token = createToken(foundClient._doc);
      delete foundClient._doc.password;
      response.cookie(
        "token",
        { ...foundClient._doc, token },
        { maxAge: 900000, httpOnly: true }
      );
     
      return response.status(200).json({ ...foundClient._doc, token });
    }
    response.status(400).json({ message: "invalid credentials" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});
function createToken(client) {
  const token = jwt.sign(
    { user_id: client.id, email: client.email },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  return token;
}
module.exports = router;
