import { loginService, cadastroService } from '../services/authService.js'

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