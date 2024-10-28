import { getAnimaisDisponiveisService, getAnimalService, cadastrarAnimalService } from '../services/animalService.js';

export const cadastrarAnimal = async (req, res) => {
    const data = req.body;

    cadastrarAnimalService(data)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message);
        });
}

export const getAnimaisDisponiveis = async (req, res) => {
    const data = req.body;

    getAnimaisDisponiveisService(data)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

export const getAnimal = async (req, res) => {
const data = req.body;

    getAnimalService(data)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

