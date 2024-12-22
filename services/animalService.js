import { ObjectId } from 'mongodb';
import { getDb } from '../configs/db.js';

const db = getDb();

export const getAnimaisDisponiveisService = () => {
    return db.collection('animal').find({ adotado: false }).toArray()
        .then((results) => {
            return results;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const publicacoesService = (user_id) => {
    return db.collection('animal').find({ user_id: new ObjectId(user_id) }).toArray()
        .then((results) => {
            return results;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const confirmarAdocaoService = (user_id, idAnimal) => {
    return db.collection('user').findOne({ _id: new ObjectId(user_id) })
        .then((user) => {
            if (!user) {
                throw new Error('Usuário não encontrado.');
            }
            return db.collection('animal').updateOne(
                { _id: new ObjectId(idAnimal) },
                { $set: { adotado: true } }
            );
        })
        .then((updateResult) => {
            if (updateResult.matchedCount === 0) {
                throw new Error('Animal não encontrado.');
            }
            return { success: true, modifiedCount: updateResult.modifiedCount };
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

export const getAnimalFilterService = (filtro, valor) => {
    console.log("filtro: " + filtro)
    console.log("valor: " + valor)
    return db.collection('animal').find({[filtro]: valor}).toArray()
    .then((results) => {
        console.log("resultados: " + results)
        return results;
    })
    .catch((err) => {
        throw new Error(err.message)
    })
}

export const cadastrarAnimalService = (data, foto, user_id) => {
    const { nome, tipo, raca, sexo, peso, localizacao, vacinado, idade, descricao } = data;
    const { mimetype } = foto

    // Parseando a string JSON de volta para um objeto
    const localizacaoObject = JSON.parse(localizacao);

    if (!mimetype.startsWith('image/')){
        throw new Error('A foto fornecida não possui um formato suportado.')
    }

    if (!nome || !tipo || !raca || !sexo || !peso || !localizacao || !vacinado || !idade || !descricao) {
        throw new Error('Todos os campos precisam estar preenchidos.')
    }

    return db.collection('animal').insertOne({
        nome,
        tipo,
        raca,
        sexo,
        peso,
        localizacaoObject,
        vacinado,
        idade,
        descricao,
        foto: foto ? foto.buffer : null,
        user_id,
        adotado: false
    })
        .then((result) => {
            if (result.acknowledged) {
                return { id: result.insertedId };;
            } else {
                return { message: "Cadastro não realizado." };
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};
