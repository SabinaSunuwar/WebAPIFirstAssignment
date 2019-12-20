var chai = require('chai')
var chaiHTTP = require('chai-http')
var should = chai.should()
var server = require('../index.js')

describe('users', function(){

    describe('POST user registration', function(){

        it('should registered a user with provided unique username',
    chai.request(server)
        .post('/registration')
        .set('content-type','application/x-www-form-urlencoded')
        .send({
            username:'',
            password:''
        })


    

        .end(function(err,res){

            //res.expect.status(2000);
            res.should.have.status(2010);
            done()

        }))


    })

})