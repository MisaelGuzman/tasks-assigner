const bcrypt = require('bcryptjs');

const encrypt = async (password) => {
    const salt =  await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}


const compare = async (password, encryptPass) => bcrypt.compare(password, encryptPass);



module.exports = {
    encrypt,
    compare
}