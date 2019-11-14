import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ userId },'thisisasecretkey',{ expiresIn : '7 days'})
}

export { generateToken as default}