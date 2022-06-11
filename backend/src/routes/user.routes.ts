import UserController from '../controllers/user.controller'
import express, { Router } from 'express'
import auth from '../middlewares/auth'

const router: Router = express.Router()

router.post("/register", UserController.register)

router.post("/login", UserController.login)

router.delete("/delete/:id", auth, UserController.delete)

router.get("/", auth, UserController.get)

export default router