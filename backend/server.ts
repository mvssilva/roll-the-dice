import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './database';
import diceRoutes from './routes/diceRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', diceRoutes);

app.get('/teste', async(req, res) => {
    try{
        await pool.query('SELECT 1');
        res.json({status: 'ok', message: 'API rodando e Banco de Dados conectado!'});   
    } 
    catch(error){
        console.error('Erro na conexão com o banco:', error);
        res.status(500).json({status: 'error', message: 'Falha ao conectar no banco de dados.'});
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});