const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../Models/UserModel.js');
var secret = 'MySecretKey';

function validation(req, res, next){
    if(req.body.username === "" || req.body.password === ""){
        res.status(400);
        res.json({status: 400, message: 'Please fill the given fields'});
    }else{
        users.findOne({
            username: req.body.username
        })
        .then(function(result){
            if(result === null){
                res.status(400);
                res.json({status: 400, message: 'Username doesnot exist'});
            }else{
                req.passwordfromdb = result.dataValues.password;
                req.usernamefromdb = result.dataValues.username;
                next();
            }
        })
        .catch(function(err){
            res.json(err);
        })
    }
}

function passwordChecker(req, res, next){
    bcrypt.compare(req.body.password, req.passwordfromdb)
    .then(function(result){
        if(result === true){
            // console.log(result.dataValues);
            next();
        }else{
            res.status(400);
            res.json({status: 400, message: "Incorrect Password"});
        }
    })
    .catch(function(err){
        res.json(err);
    })
}

function jwtTokenGen(req, res, next){
    var myPayload = {
        username: req.usernamefromdb,
        userLevel: 'superadmin'
    }
    jwt.sign(myPayload, 'SecretKeyHere', {expiresIn: "24h"},
    function(err,resultToken){
        console.log(err);
        console.log(resultToken);
        res.json({"userToken: ":resultToken})
    })
}

function verifyToken(req, res, next){
    //auth bearer token
    // header : authorization : Bearer 
    // URL/URI
    if(req.headers.authorization === undefined){
        res.status(400);
        res.json({status:400, message:"Unauthorized access"});
    }
    var token = req.headers.authorization;
    token = token.slice(7, token.length).trimLeft();
    jwt.verify(token,secret,
        function(err,result){
            console.log(err,result);
        if(result){
            console.log("correct token");
            next();
        }
        if(err){
            res.json({err});
        }
    })
}

module.exports = {
    validation, passwordChecker,jwtTokenGen, verifyToken
}