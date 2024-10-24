import { loginService, cadastroService } from '../services/authService'

export const login = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}

export const cadastro = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}