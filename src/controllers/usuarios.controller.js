import { registerService } from '../services/usuarios.service.js';

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
        
        
        const novoUsuario = await registerService(email, senha);

        return res.status(201).json(novoUsuario);

    } catch(err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" })
    }

}