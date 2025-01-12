import { ObjectId } from 'mongodb';
import { getDb } from '../configs/db.js';
import { getUserService } from './userService.js';

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
                { "user_1._id": user._id, "user_2._id": receptor._id },
                { "user_1._id": receptor._id, "user_2._id": user._id }
            ]
        }).toArray();

        console.log("chats: " + chatMutual)

        if (chatMutual.length == 0) {
            // Caso não exista chat, criar um novo
            const chat = await db.collection('chats').insertOne({
                user_1: user._id,
                user_2: receptor._id,
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
    try {
        const user = await db.collection('user').findOne({ _id: new ObjectId(user_id) });
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const chats = await db.collection('chats').find({
            $or: [
                { "user_1": new ObjectId(user._id) },
                { "user_2": new ObjectId(user._id) }
            ]
        }).toArray();

        const chatWithUserInfo = await Promise.all(
            chats.map(async (chat) => {
                const idEmissor = 
                    chat.user_1.equals(user._id) ? chat.user_2 : chat.user_1;
                
                const emissor = await getUserService(idEmissor.toString());
                return { ...chat, emissor };
            })
        );

        return chatWithUserInfo;
    } catch (error) {
        console.error("Erro ao buscar os chats:", error);
        throw error;
    }
};
