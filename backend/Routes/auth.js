const express = require('express');
const User = require('../Models/User')
const router = express.Router();
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchuser')
const JWT_SECRET = 'Amitisagoodboy';

// Route 1: Creating user using: POST "api/auth/createuser"
router.post('/createuser', [
    body('name', 'Name should have atleast 3 characters').isLength({min: 3}),
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password contains atleast 5 characters').isLength({min: 5})
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error: 'Sorry user with this email already exists'})
    }

    const salt = await bycrypt.genSalt(10);
    const secPass = await bycrypt.hash(req.body.password, salt);

    // Creating new User
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })

    const data = {
        user: {
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json(authtoken)
})


// Route:2  Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async(req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bycrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Route 3: Get logged in User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async(req, res) =>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router
