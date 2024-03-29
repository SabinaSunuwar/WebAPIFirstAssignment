const bcrypt = require('bcryptjs');
const users = require('../Models/UserModel.js');

// Text field validation
function Validator (req, res, next){
    console.log(req.body);
    // res.send ('req recieved');
    if(req.body.username === ''){
        res.json({status:404,message:'username is required'});
    }
    else if (req.body.password === ''){
        res.json({status:404,message: 'password is required'});
    }
    else{
        next();
    }
}

// Generate Password Hash
function genHash(req, res, next){
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds,function (err, hash)
    {
        if(hash){
            req.hashKey = hash;
            next();
        }
        if(err){
            res.json(err);
        }
    });  
}

// Check Duplicate User
function UserExist(req, res, next){
    users.findOne({
        where:{username:req.body.username}
    })
    .then(function(result){
        if (result === null){
            next();
        }
        else{
        res.json ({status:400, message:'user already exist'})
        }
    }).catch(function(err){
        res.json(err);
    })
}

// User Registration
function Register(req, res, next){
    users.create({
        username:req.body.username,
        password:req.hashKey
    })
    .then(function(result){
        console.log(result);
        res.status(200);
        res.json({status:200,message:'registered successfully'});
        next();
    }).catch(function(err){
        res.json(err);
    })
}

// For User Deletion
function deleteuser(req, res, next){
    if(req.params.id === null || req.params.id === undefined){
        res.status(400);
        res.json({status:400,message:"Id not provided"})
    }
    users.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(function(result){
        if (result === 0){
            res.status(500);
            res.json({status:500,message:"User not found"});
        }
        else{
            res.status(200);
            res.json({status:200,message:"user deleted successful"});
        }
    })
    .catch(function(err){
            res.json(err);
    })
}

module.exports = {
    Validator, genHash, Register, UserExist, deleteuser
}