import { atualizarPerfilService, getAnimaisPublicadosService, deletarPublicacaoService} from '../services/userService.js'

export const getAnimaisPublicados = async (req, res) => {
    const data = req.body;

    getAnimaisPublicadosService(data)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const deletarPublicacao = async (req, res) => {
    const data = req.body;

    deletarPublicacaoService(data)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const atualizarPerfil = async (req, res) => {
    const data = req.body;

    atualizarPerfilService(data)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}