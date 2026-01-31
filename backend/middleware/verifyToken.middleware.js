import jwt from 'jsonwebtoken'
import 'dotenv/config';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if(!token){
            return res.status(400).json({message: ' 🚫 El token debe estar presente'})
        }
        const extractToken = token.split(' ')[1]
        const decoded = jwt.verify(extractToken, process.env.JWT_PRIVATE)
        req.user = decoded.email
        next()
    } catch (error) {
        res.status(400).json({message: ' ❌ El token es invalido'})
    }
}