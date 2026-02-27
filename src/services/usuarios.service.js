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
        { 
            id: newUser.id,
            email: newUser.email,
            role: newUser.role 
        },
            
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
    
    // retornar dados seguros
    return {
        user: {
            id: newUser.id,
            nome: newUser.nome,
            email: newUser.email,
        },
        token
    }

}

export async function loginService(email, senha) {

    // Search user by email
    const { data: user, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .maybeSingle();

    if(error) {
        throw new Error(error.message); 
    }    

    if(!user) {
        const err = new Error('Invalid Email or Password');
        err.status = 401;
        throw err;
    }

    // Comparar senha
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if(!senhaValida) {
        const err = new Error("Invalid Email or Password");
        err.status = 401;
        throw err;
    }

    if (!user.role) {
    console.log("ROLE ESTÁ VAZIA:", user);
    }
    
    console.log("ROLE ANTES DO TOKEN:", user.role);
    
    // Gerar token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role
        },
        token
    }

}