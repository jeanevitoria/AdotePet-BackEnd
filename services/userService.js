import { ObjectId } from 'mongodb';
import { getDb } from '../configs/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

const db = await getDb();

export const atualizarPerfilService = (data, user_id) => {
    return db.collection('user').findOne({ _id: new ObjectId(user_id) })
        .then((user) => {            
            if (!user) {
                throw new Error("Perfil não encontrado.");
            }
            const password = data.senha ? data.senha : null;
            
            if (password != null) {
                return bcrypt.hash(password, SALT_ROUNDS)
                    .then((hashedPassword) => {
                        data.senha = hashedPassword
                        return data
                    })

            }
            return data;
        })
        .then((data) => { return db.collection('user').updateOne({ _id: new ObjectId(user_id) }, { $set: data }) })
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

export const getAnimaisPublicadosService = (user_id) => {
    return db.collection('animal').find({ user_id: user_id }).toArray()
        .then((result) => {
            return result;
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const deletarPublicacaoService = (idAnimal) => {
    return db.collection('animal').deleteOne({ _id: new ObjectId(idAnimal) })
        .then((result) => {
            if (result.deletedCount > 0) {
                return { success: true, result }
            } else {
                return { success: false, message: "Publicação não encontrada." }
            }
        })
        .catch((error) => { throw new Error(error.message) })
}

export const getUserService = (user_id) => {
    return db.collection('user').find({ _id: new ObjectId(user_id) }).toArray()
        .then((result) => {
            return result
        })
        .catch((err) => { throw new Error(err.message) })
}