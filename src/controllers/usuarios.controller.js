import { registerService, loginService } from '../services/usuarios.service.js';

export async function register(req, res) {

    try {

        // Retrieving data from the front end
        const { nome, email, senha } = req.body;

        // validate required fields
        if(!nome || !email || !senha) {
            return res.status(400).json(
                {
                    "error": "Required data missing",
                    "details": "The 'name' and 'email' fields are required."
                }
            )
        }
        
        const novoUsuario = await registerService(nome, email, senha);

        return res.status(201).json(novoUsuario);

    } catch(err) {
        console.error(err);
        return res.status(err.status || 500).json({
            error: err.message || 'Internal Server ERror'
        })
    }

};

export async function login(req, res) {
    try {

        const { email, senha } = req.body;

        if(!email || !senha) {
            return res.status(400).json({
                error: "Email and password are required"
            })
        };

        const resultado = await loginService(email, senha);

        return res.status(200).json(resultado);
        
    } catch(err) {
        return res.status(err.status || 500).json({
            error: err.message || "Internal server error"
        })
    }
}