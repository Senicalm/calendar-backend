const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicalizar base de datos');
    }
}

module.exports = {
    dbConnection
}

// db user: Senicalm
// db pass: pzhKzxguCt2tLVNZ