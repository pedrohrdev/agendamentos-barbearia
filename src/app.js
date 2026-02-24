import express from 'express';
import { supabase } from './database/index.js';
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express();
app.use(express.json());

app.get('/health', async (req, res) => {
    try {
            
        const { data, error: dbError } = await supabase
            .from('usuarios')
            .select('email')
            .limit(1);

        // Se houver erro, logamos no terminal para debug
        if (dbError) {
            console.error('❌ Erro na consulta ao banco:', dbError.message);
        }

        // No Supabase, se o erro for PGRST116, a tabela existe mas está vazia (sucesso de conexão)
        // Se não houver erro, também é sucesso.
        const isConnected = !dbError || dbError.code === 'PGRST116';

        res.status(200).json({
            status: 'UP',
            database: isConnected ? 'Connected' : 'Error',
            details: dbError ? dbError.message : 'Conexão estabelecida com sucesso!',
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        // Se cair aqui, geralmente é o "fetch failed" (erro de rede/DNS)
        console.error('💥 Erro crítico de rede:', err.message);
        res.status(500).json({ 
            status: 'DOWN', 
            error: 'Falha na comunicação com o Supabase',
            details: err.message 
        });
    }
});

app.use('/usuarios', usuariosRoutes);

export default app;