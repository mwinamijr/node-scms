const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken")


const User = require("../model/user")
const { registerValidation, loginValidation } = require("../middleware/validation")
const TOKEN_KEY = process.env.TOKEN_KEY


//Register
exports.register = async (req, res) => {
  //our register logic goes here
  try {
    
    // validate user input
    const { error, value } = registerValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    // check if user already exists
    // validate if user exist in our database

    const oldUser = await User.findOne({ email: req.body.email });

    if ( oldUser ) {
      return res.status(409).send(" User already exist. Please login!")
    }

    const createUserObj = async (req) => {
      return {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
      };
    }

    const newUser = await createUserObj(req)
    const savedUser = await User.create(newUser)
    return res.status(200).send({message: "User created successfully!", user: savedUser})
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: "User not created!", error: err})
  }
    
}

//Login
exports.login = async (req, res) => {
  //our login logic goes here
  try {
    // get user input
    const { email, password } = req.body;

    // validate user input 
    if (!(email && password)) {
      res.status(400).send("All input is required!")
    }
    // validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && ( await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      //user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid credentials!")
  } catch (err) {
    console.log(err)
  }
}