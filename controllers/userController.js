import { atualizarPerfilService, getAnimaisPublicadosService } from '../services/userService'

export const getAnimaisPublicados = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}

export const deletarPublicacao = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}

export const atualizarPerfil = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}