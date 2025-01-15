import { getDb } from '../configs/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

export const loginService = (data) => {
    const db = getDb();
    const { email, senha } = data;

    // Procura no banco de dados um usuário com o email fornecido
    return db.collection('user').findOne({ email })
        .then((user) => {
            // Caso encontre, compara a senha
            if (user) {
                return bcrypt.compare(senha, user.senha) // Comparando a senha hashada
                    .then((isMatch) => {
                        if (isMatch) {
                            // Cria o payload do token com o ID do usuário
                            const payload = { id: user._id }; // Supondo que _id é o campo correto
                            // Cria o token
                            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
                            return { success: true, token }; // Retorna sucesso e o token
                        } else {
                            return { success: false, message: "Senha inválida." };
                        }
                    });
            } else {
                return { success: false, message: "E-mail não cadastrado." };
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        });
};

export const cadastroService = (data) => {
    const { email, senha, nome, celular, nascimento } = data;
    const db = getDb();

    if (!email || !senha || !nome || !celular || !nascimento) {
        throw new Error('Há campos vazios ou inválidos.')
    }

    if (new Date() - new Date(nascimento) < 18) {
        throw new Error('Os usuários precisam ter pelo menos 18 anos.')
    }

    if (celular.length < 11) {
        throw new Error('Número de celular incompleto.')
    }

    // Procura no banco de dados algum usuário com o email ou celular já registrado
    return db.collection('user').findOne({ $or: [{ email }, { celular }] })
        .then((user) => {
            if (user) {
                throw new Error("Usuário com este email ou celular já existe.");
            }
            // Se não existir, cria um hash da senha antes de armazená-la
            return bcrypt.hash(senha, SALT_ROUNDS);
        })
        .then((hashedPassword) => {
            // Insere o novo usuário no banco de dados
            return db.collection('user').insertOne({ nome, senha: hashedPassword, email, celular, nascimento: new Date(nascimento) });
        })
        .then((result) => {
            if (result.acknowledged) {
                return { success: true, result };
            } else {
                return { success: false, message: "Cadastro não realizado." };
            }
        })
        .catch((error) => {
            console.error("Erro no cadastro:", error.message);
            throw new Error(error.message);
        });
};

export const recuperarSenhaService = async (email) => {
    await db.collection('user').findOne({ email })
        .then((user) => {
            console.log(user)
            if (!user) {
                throw new Error("E-mail informado não corresponde a nenhum usuário cadastrado.")
            }
            sendMail(email)
        })
        .catch((err) => { throw new Error(err.message) })
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "promonitorufrpe@gmail.com",
        pass: "icwzxvtviaeuqema",
    },
});


const sendMail = async (email) => {
    // Cria o payload do token com o ID do usuário
    const payload = { email }; // Supondo que _id é o campo correto
    // Cria o token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    const emailBody = `
    <p>Recuperação de Senha</p>
    <p>Olá, seu link para redefinir a sua senha: 'https://adotepet-six.vercel.app/redefinir-senha/${token}'. Esse link expirará em 1 hora.</p>
    `;

    transporter.sendMail({
        from: 'promonitorufrpe@gmail.com',
        to: email,
        subject: 'Recuperação de senha ADOTEPET',
        text: `Olá, seu link para redefinir a sua senha: 'https://adotepet-six.vercel.app/redefinir-senha/${token}'. Esse link expirará em 1 hora.`,
        html: emailBody
    })
        .then((res) => { return res })
        .catch((err) => { throw new Error("Erro ao enviar e-mail para redefinição de senha: " + err.message) })
}
