var dbConfig = require('../dbConfig/dbConfig.js');

//Create database table with attributes
var user = dbConfig.sequelize.define('user',
{
    id:{
        type:dbConfig.Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        alloNull:false
    },
    username:{
        type:dbConfig.Sequelize.TEXT,
        alloNull:false
    },
    password:{
        type:dbConfig.Sequelize.TEXT,
        alloNull:false
    },
    address:{
        type:dbConfig.Sequelize.TEXT,
        alloNull:false
    }
},
{
    paranoid:true,
    freezetableName:true,
    tableName:'user_table'
}
)

user.sync({force:false})
.then(function(result){
    console.log(result)
})
.catch(function(err){
    console.log(err)
})

module.exports = {user}
