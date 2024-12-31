import { getAnimaisDisponiveisService, getAnimalService, cadastrarAnimalService, publicacoesService, definirAdocaoService, getAnimalFilterService } from '../services/animalService.js';

export const cadastrarAnimal = async (req, res) => {
    const data = req.body;
    const user_id = req.user.id;
    console.log(req.file)
    const foto = req.file;

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

export const getAnimalFilter = async (req, res) => {
    const { filtro, valor } = req.query;
    console.log(filtro, valor)
    getAnimalFilterService(filtro, valor)
        .then((response) => { return res.status(200).json(response) })
        .catch((err) => { return res.status(500).json(err.message) });
}

export const definirAdocao = async (req, res) => {
    const user_id = req.user.id;
    const { idAnimal, status } = req.body;

    definirAdocaoService(user_id, idAnimal, status)
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

