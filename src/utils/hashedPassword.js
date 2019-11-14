import bcrypt from 'bcryptjs'
const hashPassword = (password) => {
    if(password.length < 8){
        throw new Error('Please enter a password of at least 8 characters')
    }

    return bcrypt.hash(password, 8)
}

export { hashPassword as default }