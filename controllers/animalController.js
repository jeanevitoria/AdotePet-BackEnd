import { getAnimaisDisponiveisService, getAnimalService, cadastrarAnimalService, publicacoesService, confirmarAdocaoService, getAnimalFilterService } from '../services/animalService.js';

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

export const getAnimalFilterService = (filtro, valor) => {
    // Verifica se o campo 'filtro' é válido
    const camposPermitidos = ['nome', 'tipo', 'raca', 'peso', 'localizacao', 'vacinado', 'idade', 'descricao', 'sexo'];

    if (!camposPermitidos.includes(filtro)) {
        throw new Error(`Campo de filtro inválido: ${filtro}`);
    }

    if (typeof valor !== 'string') {
        throw new Error(`Valor do filtro deve ser uma string`);
    }

    return db.collection('animal').find({ [filtro]: valor }).toArray()
        .then((results) => {
            return results;
        })
        .catch((err) => {
            throw new Error(`Erro ao filtrar animais: ${err.message}`);
        });
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

