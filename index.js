const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');

var authController = require("./Controllers/AuthController.js");
var userController = require("./Controllers/UserController.js");

var swaggerJSDoc=require("swagger-jsdoc");
var swaggerUI=require("swagger-ui-express");

var swaggerDefinition={
    info:{
        title:'MyApplication',
        description:"This is My documentation",
        version:"1.0.0"
    },
    securityDefinitions: {
        bearerAuth:{
            type: 'apiKey',
            name: 'authorization',
            in:'header',
            scheme: 'bearer'
        }
    },
    host:"localhost:3020",
    basePath:"/"
}

var swaggerOptions={
    swaggerDefinition,
    apis:['./index.js']
}

var swaggerSpecs= swaggerJSDoc(swaggerOptions);

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpecs));


app.use(bodyParser.urlencoded({extended:true}));

app.post('/registration', userController.Validator,userController.UserExist, userController.genHash,userController.Register);

/**
 * @swagger
 * /registration:
 *  post:
 *   tags:
 *    - Users
 *   description: Users registration testing
 *   produces:
 *    - application/json
 *   comsumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide password
 *    - name: address
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide address
 *   responses:
 *    200:
 *     description: registered sucessfully
 *    400:
 *     description: user already exists
 *    500:
 *     description: internal server error
 */

app.post('/login', authController.validation,authController.passwordChecker,
authController.jwtTokenGen);
/**
 * @swagger
 * /login:
 *  post:
 *   tags:
 *    - Users
 *   description: Users login testing
 *   produces:
 *    - application/json
 *   comsumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide password
 *   responses:
 *    200:
 *     description: login sucessfully
 *    400:
 *     description: username or password incorrect
 *    500:
 *     description: internal server error
 */

app.delete('/users/:id', userController.deleteuser);

// app.delete('/users/:id', authController.verifyToken, userController.deleteuser);
/**
* @swagger
* /users/{id}:
*  delete:
*   tags:
*    - Delete user
*   description: Delete user from token testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   security:
*    - bearerAuth: []
*   parameters:
*    - name: id
*      in: path
*      required: true
*      description: please enter id
 *   responses:
 *    200:
 *     description: Deleted Successfully
 *    400:
 *     description: Invalid Token
 *    500:
 *     description: Internal server error
*/

app.listen(3000);

