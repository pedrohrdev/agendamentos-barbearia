/* 

    auth.middleware.js:

        Pega Authorization header

        Remove "Bearer "

        jwt.verify()

        req.user = payload

        next()

    Se token inválido → 401

    Sem try/catch bagunçado.

*/