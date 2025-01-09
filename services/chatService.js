import { ObjectId } from 'mongodb';
import { getDb } from '../configs/db.js';

const db = getDb();

export const saveMessageService = async (user_id, data) => {
    const { idReceptor, message } = data;
    console.log("idReceptor: " + idReceptor)
    console.log("message: " + message)
    try {
        // Procurando os usuários
        const user = await db.collection('user').findOne({ _id: new ObjectId(user_id) });
        const receptor = await db.collection('user').findOne({ _id: new ObjectId(idReceptor) });

        if (!user || !receptor) {
            throw new Error('usuário ou receptor não encontrado.');
        }

        // Criação de índice para otimizar buscas
        await db.collection('chats').createIndex({ user_1: 1, user_2: 1 });

        // Encontrar chat mutuo entre os dois usuários
        const chatMutual = await db.collection('chats').find({
            $or: [
                { user_1: user, user_2: receptor },
                { user_1: receptor, user_2: user }
            ]
        }).toArray();

        if (chatMutual.length == 0) {
            // Caso não exista chat, criar um novo
            const chat = await db.collection('chats').insertOne({
                user_1: user,
                user_2: receptor,
                messages: [{ text: message, emissor: user._id }]
            });

            return { success: true };
        }

        // Caso exista o chat, adicionar a nova mensagem
        const updatedMessages = [...chatMutual[0].messages, { text: message, emissor: user._id }];
        await db.collection('chats').updateOne(
            { _id: chatMutual[0]._id },
            { $set: { messages: updatedMessages } }
        );

        return { success: true };
    } catch (err) {
        throw new Error(err);
    }
};

export const getChatsService = async (user_id) => {
    return db.collection('user').findOne({ _id: new ObjectId(user_id) })
        .then((user) => {
            return db.collection('chats').find({
                $or: [
                    { user_1: user },
                    { user_2: user }
                ]
            }).toArray()
        })
        .then((chats) => {
            console.log(chats)
            return chats;
        })
        .catch(error => {
            console.error("Erro ao buscar os chats:", error);
            throw error;
        });
}