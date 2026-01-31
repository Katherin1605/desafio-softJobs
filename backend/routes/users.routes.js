import { Router } from "express";
import { registerUser, getProfile } from "../src/controllers/usersControllers.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = Router();

router.post('/usuarios', registerUser)
router.post('/registrarse', registerUser)
router.get('/usuarios', verifyToken, getProfile)

export default router;
