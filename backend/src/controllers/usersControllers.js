import { createUserModel, findUserModel } from "../models/usersModel.js"

export const registerUser = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body
        const user = await createUserModel({ email, password, rol, lenguage })
        return res.status(201).json({mesage: ' ✅ Usuario creado correctamente', user})
    } catch (error) {
        res.status(500).json({ error: ' ❌ Error al crear el usuario' })
        console.error('error', error)
    }
}

export const getProfile = async (req, res) => {
    try {
        const email = req.user
        const user = await findUserModel(email)
        if(!user) {
            return res.status(404).json({ message: ' ❌ Usuario no encontrado' })
        }
        const { password, ...userWithoutPassword } = user
        return res.status(200).json([userWithoutPassword])
    } catch (error) {
        res.status(500).json({ error: ' ❌ Error al obtener el perfil' })
        console.error('error', error)
    }
}
