import { supabase } from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registerService(nome, email, senha) {

    // verificar se email ja existe;
    const { data: existingUser, error: selectError } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .maybeSingle();

    if(selectError) {
        throw new Error(selectError.message)
    }

    if(existingUser) {
        const err = new Error ('Email already registred');
        err.status = 409;
        throw err;
    }

    // hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // insert no supabase;
    const {data: newUser, error } = await supabase
        .from('usuarios')
        .insert([
            {
                nome, 
                email,
                senha_hash,

            }
        ])
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }    

    // gerar token
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    
    // retornar dados seguros
    return {
        user: {
            id: newUser.id,
            nome: newUser.nome,
            email: newUser.email
        },
        token
    }

}
