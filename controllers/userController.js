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
  const  { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message)

  // get user
  const foundUser = await User.findOne({ email: req.body.email})
  if (!foundUser) return res.status(400).send({ message: "Invalid login credentials"})

  try {
    const isMatch = await bcrypt.compareSync(req.body.password, foundUser.password)
    if (!isMatch) return res.status(400).send({ message: "Invalid password"})

    // create and assign jwt
    const token = await jwt.sign({_id: foundUser._id}, TOKEN_KEY)

    return res.status(200).header("auth-token", token).send({"auth-token": token, userId: foundUser._id})
  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}

// update user
exports.updateUser = async (req, res) => {
  try{
    req.body.password = bcrypt.hashSync(req.body.password, 10); //encrypt password before updating
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {$set: req.body}, { new: true })
    
    if (!updatedUser) {
      return res.status(400).send({ message: "Could not update user"})
    }
    return res.status(200).send({ message: "User updated successfully", updatedUser})
  } catch (error) {
    res.status(400).send({ error: "An error has occured, unable to update user!"})
  }
}

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId) //the await is very important here
    if (!deletedUser) {
      return res.status(400).send({ message: " Could not delete user"})
    }
    return res.status(200).send({ message: "User deleted successfully"})
  } catch (error) {
    return res.status(400).send({ error: "An error has occurd, unable to delete user"})
  }
}