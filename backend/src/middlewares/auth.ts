import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

async function auth(req : Request, res : Response, next : NextFunction){
    try {
        const token = req.headers["token"] as string

        if(!token)
            return res.status(400).json({msg: "Sem token de autorização!", auth: true})
        const verified = await jwt.verify(token, process.env.SECRET ?? "")
        req.user = verified
        next()
    } catch (error) {
        return res.status(500).json({msg: "Erro interno!", auth: true})
    }
}

export default auth