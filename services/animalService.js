import { getDb } from '../configs/db.js';

const db = getDb();

export const getAnimaisDisponiveisService = () => {
    return db.collection('animal').find({}).toArray()
        .then((results) => {
            return results;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const getAnimalService = (id) => {
    return db.collection('animal').findOne({ _id: new ObjectId(id) })
        .then((result) => {
            if (result) {
                return result;
            } else {
                throw new Error("Animal não encontrado com o ID fornecido.");
            }
        })
        .catch((error) => { throw new Error(error.message); });
};

export const cadastrarAnimalService = (data, foto, user_id) => {
    const { nome, tipo, raca, genero, peso, localizacao, vacinado, idade, descricao } = data;
    const { mimetype } = foto

    if (!mimetype.startsWith('image/')){
        throw new Error('A foto fornecida não possui um formato suportado.')
    }

    if (!nome || !tipo || !raca || !genero || !peso || !localizacao || !vacinado || !idade || !descricao) {
        throw new Error('Todos os campos precisam estar preenchidos.')
    }

    return db.collection('animal').insertOne({
        nome,
        tipo,
        raca,
        genero,
        peso,
        localizacao,
        vacinado,
        idade,
        descricao,
        foto: foto ? foto.buffer : null,
        user_id
    })
        .then((result) => {
            if (result.acknowledged) {
                return { success: true, result };
            } else {
                return { success: false, message: "Cadastro não realizado." };
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};
