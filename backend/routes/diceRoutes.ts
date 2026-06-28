// abrindo o caminho url para o front
import { Router } from "express";
import { clearHistory, getHistory, rollDice } from "../controllers/diceController";

const router = Router();

router.post('/roll', rollDice);
router.get('/history', getHistory);
router.delete('/history', clearHistory);

export default router;