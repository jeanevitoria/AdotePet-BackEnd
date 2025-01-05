import { saveMessageService, getChatsService } from '../services/chatService.js';

export const saveMessage = (req, res) => {
    const user_id = req.user.id;
    const data = req.body

    saveMessageService(user_id, data)
        .then((response) => { return res.status(200).json({ response }) })
        .catch((err) => { throw new Error(err.message) })
}

export const getChats = (req, res) => {
    const user_id = req.user.id;

    getChatsService(user_id)
        .then((response) => { return res.status(200).json({ response }) })
        .catch((err) => { throw new Error(err.message) })
}
