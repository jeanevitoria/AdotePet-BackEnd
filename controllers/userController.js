import { atualizarPerfilService, getAnimaisPublicadosService, deletarPublicacaoService, getUserService } from '../services/userService.js'

export const getAnimaisPublicados = async (req, res) => {
    const user_id = req.user.id;

    getAnimaisPublicadosService(user_id)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const deletarPublicacao = async (req, res) => {
    const idPublicacao = req.body;

    deletarPublicacaoService(idPublicacao)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const atualizarPerfil = async (req, res) => {
    const user_id = req.user.id;
    const data = req.body;

    atualizarPerfilService(data, user_id)
        .then((result) => {
            return res.status(result ? 200 : 404).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const getUser = async (req, res) => {
    const id = req.body.id;
    const user_id = id ? id : req.user.id;
    console.log('id: ' + user_id)
    getUserService(user_id)
        .then((result) => { return res.status(result ? 200 : 404).json(result) })
        .catch((err) => { return res.status(500).json(err.message) })
}