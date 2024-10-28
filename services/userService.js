import { getDb } from '../configs/db.js';
import express from 'express';
const db = getDb();

export const atualizarPerfilService = (data, user) => {
    return db.collection('user').updateOne({ _id: user.id }, { $set: data })
        .then((result) => {
            if (result.modifiedCount > 0) {
                return { success: true, result };
            } else {
                return { success: false, message: "Perfil não encontrado." };
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const getAnimaisPublicadosService = (user) => {
    return db.collection('animal').find({ user_id: user.id }).toArray()
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const deletarPublicacaoService = (idPublicacao) => {
    return db.collection('animal').deleteOne({ _id: idPublicacao })
        .then((result) => {
            if (result.deletedCount > 0) {
                return { success: true, result }
            } else {
                return { success: false, message: "Publicação não encontrada." }
            }
        })
        .catch ((error) => { throw new Error(error.message) })
}