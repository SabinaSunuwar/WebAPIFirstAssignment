const dbConfig = require('../dbConfig/dbConfig.js');

// Define sequelize model
var users = dbConfig.sequelize.define('user', {
    //Attributes
    id: {
        type: dbConfig.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type:dbConfig.Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type:dbConfig.Sequelize.TEXT,
        allowNull: false
    }},{
    freezeTableName:true,
    tableName: 'user_table'});
    
    users.sync({force:false})
    .then(function(result){
        //console.log("table made successfully")
    })
    .catch(function(err){
        console.log(err)
    })

module.exports = users