import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {

    // 1 - pegar header
    const authHeader = req.headers.authorization;

    // 2 - verificar se existe
    if(!authHeader) {
        return res.status(401).json({ error: 'Token not provided' })
    }
    // 3 - extrair token
    const token = authHeader.split(' ')[1];

    try {

        // 4 - verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5 - salvar dados no request
        req.user = decoded;

        // 6 - liberar acesso
        next();
        
    } catch(err) {
        return res.status(401).json({ error: "Invalid or expired token" })
    }
}