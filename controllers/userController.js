import { atualizarPerfilService, getAnimaisPublicadosService, deletarPublicacaoService } from '../services/userService.js'

export const getAnimaisPublicados = async (req, res) => {
    const user = req.user;

    getAnimaisPublicadosService(user)
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
    const user = req.user;
    const data = req.body;

    atualizarPerfilService(data, user)
        .then((result) => {
            return res.status(result.success ? 200 : 404).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}