import { getAnimaisDisponiveisService, getAnimalService, cadastrarAnimalService } from '../services/animalService';

export const getAnimaisDisponiveis = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}

export const getAnimal = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}

export const cadastrarAnimal = async (req, res) => {
    try {

        return res.status(200).json(data)
    } catch (error){
        return res.status(500).json(error.message)
    }
}