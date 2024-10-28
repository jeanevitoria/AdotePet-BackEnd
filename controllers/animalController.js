import { getAnimaisDisponiveisService, getAnimalService, cadastrarAnimalService } from '../services/animalService.js';

export const cadastrarAnimal = async (req, res) => {
    const { data, foto} = req.body;
    const user_id = req.user.id;

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

export const getAnimal = async (req, res) => {
const { id } = req.body;

    getAnimalService(id)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error) => {
            return res.status(500).json(error.message)
        })
}

