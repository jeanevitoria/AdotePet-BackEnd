import { getAnimaisDisponiveisService, getAnimalService, cadastrarAnimalService, publicacoesService, confirmarAdocaoService } from '../services/animalService.js';

export const cadastrarAnimal = async (req, res) => {
    const data = req.body;
    const user_id = req.user.id;
    console.log(req.file)
    const foto = req.file;
    console.log(foto)

    cadastrarAnimalService(data, foto, user_id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message);
        });
}

export const getAnimaisDisponiveis = async (req, res) => {
    getAnimaisDisponiveisService()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const getPublicacoes = async (req, res) => {
    const user_id = req.user.id;
    
    publicacoesService(user_id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const confirmarAdocao = async (req, res) => {
    const user_id = req.user.id;
    const { idAnimal } = req.body;

    confirmarAdocaoService(user_id, idAnimal)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const getAnimal = async (req, res) => {
const { id } = req.params;

getAnimalService(id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

