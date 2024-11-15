import { sendMessageService, getChatsService, getMessagesChatService} from '../services/chatService.js';

export const sendMessage = (req, res) => {
    const user_id = req.user.id;
    const data = req.body

    sendMessageService(user_id, data)
        .then((response) => { return res.status(200).json({ response }) })
        .catch((err) => { throw new Error(err.message) })
}

export const getChats = (req, res) => {
    const user_id = req.user.id;

    getChatsService(data)
        .then((response) => { return res.status(200).json({ response }) })
        .catch((err) => { throw new Error(err.message) })
}

export const getMessagesChat = (req, res) => {
    const user_id = req.user.id;
    const data = req.body

    getMessagesChatService(user_id, data)
        .then((response) => { return res.status(200).json({ response }) })
        .catch((err) => { throw new Error(err.message) })
}