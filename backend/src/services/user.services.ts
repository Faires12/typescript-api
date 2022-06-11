import User, {user} from '../models/User'

class UserServices{
    async createUser(email : string, name: string, password : string) : Promise<user>{
        try {
            const user : user = new User({
                name,
                email,
                password
            })

            user.password = await user.encryptPassword(password)

            await user.save()

            return user
        } catch (error) {
            throw Error("Erro ao salvar usuário!")
        }
    }

    async findByEmail(email : string) : Promise<user | null>{
        try {
            const user : user | null = await User.findOne({email})
            return user
        } catch (error) {
            throw Error("Erro ao encontrar usuário!")
        }
    }

    async deleteUser(id : string){
        try {
            await User.findByIdAndDelete(id)
        } catch (error) {
            throw Error("Erro ao encontrar usuário!")
        }
    }
}

export default new UserServices()