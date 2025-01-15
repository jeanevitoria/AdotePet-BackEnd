import { loginService, cadastroService, recuperarSenhaService, redefinirSenhaService } from '../services/authService.js'

export const login = async (req, res) => {
    const data = req.body;
    loginService(data)
        .then((result) => {
            console.log(result);
            return res.status(result.success ? 200 : 400).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const cadastro = async (req, res) => {
    const data = req.body;

    cadastroService(data)
        .then((result) => {
            return res.status(result.success ? 200 : 400).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const recuperarSenha = async (req, res) => {
    const { email } = req.body;
    console.log(email)

    recuperarSenhaService(email)
        .then((result) => { return res.status(200).json(result) })
        .catch((err) => { return res.status(500).json(err.message) })
}

export const redefinirSenha = async (req, res) => {
    const { token, senha } = req.body;
    console.log(token)
    
    redefinirSenhaService(token, senha)
        .then((result) => { return res.status(200).json(result) })
        .catch((err) => { return res.status(500).json(err.message) })
}