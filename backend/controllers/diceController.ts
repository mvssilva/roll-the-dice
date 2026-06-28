// componente do projeto responsável por verificar se a solicitações são validas (Ex: qual tipo de dado?)
import { Request, Response } from 'express';
import pool from '../database'; // conexao com o banco de dados

// tipos de dados permitidos
const allowedDice = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];

export const rollDice = async (req: Request, res: Response): Promise<any> =>{
    
    try {
        const { diceType } = req.body;

        // verificando se o dado existe ou chegou algum solicitacao de modelo de dado nao implementado
        if(!diceType || !allowedDice.includes(diceType)){
            return res.status(400).json({
                error: 'Modelo de dado inválido. Utilize algum dos modelos permitidos!'
            });
        }

        // extrai a quantidade de faces do dado
        const maxFaces = parseInt(diceType.replace('D',''), 10);

        // sorteio
        const result = Math.floor(Math.random() * maxFaces) + 1;

        // inserir resultado no historico (banco de dados)
        try {
            await pool.query('INSERT INTO rolls (dice_type, result) VALUES (?, ?)', [diceType, result]);
            return res.json({dice: diceType, result: result});
        } catch (error) {
            console.error('Erro ao salvar no banco:', error);
            return res.status(500).json({error: 'Erro interno ao salvar o resultado da rolagem dos dados.'});
        }
    }
    catch (error){
        console.error("Erro no controller:", error);
        return res.status(500).json({ error: "Erro interno" });
    }
};

// funcao de busca do histórico, com limite pras ultimas 10 jogadas
export const getHistory = async (req: Request, res: Response): Promise<any> =>{
    try{
        const [rolls] = await pool.query('SELECT * FROM rolls ORDER BY created_at DESC LIMIT 6');
        return res.json(rolls);
    } catch (error){
        console.error('Erro ao buscar histórico:', error);
        return res.status(500).json({error: 'Erro interno ao buscar historico de rolagens dos dados.'});
    }
};

// funcao de limpar todo o histórico
export const clearHistory = async (req: Request, res: Response): Promise<any> =>{
    try {
        await pool.query('DELETE FROM rolls');
        return res.json({message: 'Histórico apagado com sucesso!'});
    } catch (error) {
        console.error('Erro ao limpar histórico:', error);
        return res.status(500).json({error: 'Erro interno ao limpara histórico.'});
    }
};