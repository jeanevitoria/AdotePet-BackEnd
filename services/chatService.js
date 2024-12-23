import { ObjectId } from 'mongodb';
import { getDb } from '../configs/db.js';
import { io } from '../app.js';

const db = getDb();

export const sendMessageService = async (user_id, data) => {
    const { idReceptor, message } = data;
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
                { user_1: new ObjectId(user_id), user_2: new ObjectId(idReceptor) },
                { user_1: new ObjectId(idReceptor), user_2: new ObjectId(user_id) }
            ]
        }).toArray();

        if (chatMutual.length == 0) {
            // Caso não exista chat, criar um novo
            const chat = await db.collection('chats').insertOne({
                user_1: new ObjectId(user_id),
                user_2: new ObjectId(idReceptor),
                messages: [{ text: message, viewed: false }]
            });

            io.emit("send_message", { chat_id: chat.insertedId, message: message })

            return { success: true };
        }

        // Caso exista o chat, adicionar a nova mensagem
        const updatedMessages = [...chatMutual.messages, { text: message, viewed: false }];
        await db.collection('chats').updateOne(
            { _id: chatMutual._id },
            { $set: { messages: updatedMessages } }
        );

        io.emit("send_message", { chat_id: chatMutual._id, from: user_id, to: idReceptor, message: message })

        return { success: true };
    } catch (err) {
        throw new Error(err);
    }
};

export const getMessagesChatService = async (user_id, data) => {
    const { idReceptor } = data;

    try {
        const user = await db.collection('user').findOne({ _id: new ObjectId(user_id) })
        const receptor = await db.collection('user').findOne({ _id: new ObjectId(idReceptor) })

        if (!user || !receptor) {
            throw new Error('usuário ou receptor não encontrado.')
        }

        // Encontrar chat mutuo entre os dois usuários
        const chatMutual = await db.collection('chats').find({
            $or: [
                { user_1: new ObjectId(user_id), user_2: new ObjectId(idReceptor) },
                { user_1: new ObjectId(idReceptor), user_2: new ObjectId(user_id) }
            ]
        }).toArray();

        if (chatMutual.length == 0) {
            return { messages: [] }
        }

        const chat = chatMutual[0]
        return { success: true, chat }

    } catch (err) {
        throw new Error(err)
    }
}

export const getChatsService = async (user_id) => {
    const chats = db.collection('chats').find({
        $or: [
            { user_1: new ObjectId(user_id) }, { user_2: new ObjectId(user_id) }
        ]
    }).toArray()

    return chats
}