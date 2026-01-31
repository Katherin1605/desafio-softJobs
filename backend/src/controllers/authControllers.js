import { findUserModel } from "../models/usersModel.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const loginUser =  async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await findUserModel(email)
        if(!user){
            res.status(404).json({message: '❌ El usuario o password son incorrectas'})
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)
        if(!isValidPassword) {
            res.status(404).json({message: '❌ El usuario o password son incorrectas'})
        }
        const token = jwt.sign({email}, process.env.JWT_PRIVATE, {
            expiresIn : '120s'
        })
        return res.status(200).json({token})
    
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error('error', error)
    }
}