import {Request, Response} from 'express'
import User, {user} from '../models/User'
import userServices from '../services/user.services'
import jwt from 'jsonwebtoken'

class UserControllers{
    async register(req : Request, res : Response){
        try {
            const {email, name, password} = req.body

            if(!email || !name || !password)
                return res.status(400).json("Preencha todos os campos!")
            
            const user = await userServices.findByEmail(email)
            
            if(user)
                return res.status(400).json("Usuário já cadastrado!")
            
            const newUser = await userServices.createUser(email, name, password)
            const token = await jwt.sign({id: newUser._id}, process.env.SECRET ?? "")
            res.json(token)
        } catch (error) {
            return res.status(500).json("Erro ao salvar usuário!")
        }
    }

    async login(req : Request, res : Response){
        try {
            const {email, password} = req.body

            if(!email || !password)
                return res.status(400).json("Preencha todos os campos!")
            
            const user = await userServices.findByEmail(email)
            
            if(!user)
                return res.status(400).json("Usuário não encontrado!")
            if(!await user.comparePassword(password))
                return res.status(400).json("Senhas não coincidem!")
            
            const token = await jwt.sign({id: user._id}, process.env.SECRET ?? "")
            res.json(token)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Erro ao salvar usuário!")
        }
    }

    async delete(req : Request, res : Response){
        try {
            const {id} = req.params

            const user = await User.findById(req.user.id)

            if(!user)
                return res.status(500).json("Erro interno!")
            if(user._id != id)
                return res.status(400).json("Apenas o usuário pode se deletar!")

            await userServices.deleteUser(id)
            return res.status(200).json("Usuário deletado com sucesso!")
        } catch (error) {
            return res.status(500).json("Erro ao salvar usuário!")
        }
    }

    async get(req : Request, res : Response){
        try {
            const user = await User.findById(req.user.id)

            if(!user)
                return res.status(500).json("Erro interno!")
            
            return res.status(200).json({
                email: user.email, name: user.name
            })
        } catch (error) {
            return res.status(500).json("Erro ao salvar usuário!")
        }
    }
}

export default new UserControllers()