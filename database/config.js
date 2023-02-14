const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const dbConnection = async() =>{
console.log('f1');
    try { 
        await mongoose.connect(process.env.DB_CNN); 

         console.log('init db config ONLINE');
        
        
    } catch (error) {
        console.log(error);
        throw new Error('Error in Database - Contact Admin')
    }

}

module.exports = {
    dbConnection
};