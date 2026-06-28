import { useEffect, useState } from 'react'
import { DiceSelector } from './components/DiceSelector';
import { DiceIcon } from './components/DiceIcon';
import { HistoryPanel } from './components/HistoryPanel';

interface RollRecord {
  id: number;
  diceType: string;
  result: number;
}

export default function App() {

  const [selectedDice, setSelectedDice] = useState<string>('D6');
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<RollRecord[]>([]);

  // puxando o historico de jogadas 
  useEffect(()=> {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/history');
      if(response.ok){
        const data = await response.json();
        setHistory(data.history || data);
      }
    }
    catch (error){
      console.error('Error ao buscar histórico:', error);
    }
  };

  // lidando com as trocas dos dados
  const handleDiceSelect = (dice: string) => {
    setSelectedDice(dice); 
    setRollResult(null);   
  };

  // comunicacao back-end
  const handleRoll = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3000/api/roll', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ diceType: selectedDice })
      });

      if (!response.ok) throw new Error(`Erro do servidor: ${response.status}`);

      const data = await response.json();
      // Atualiza o estado com o número sorteado pelo back-end, exibindo-o no SVG
      setRollResult(data.result);

      fetchHistory();
      
    } catch (error) {
      console.error("Falha ao comunicar com a API:", error);
      alert("Erro ao rolar o dado. Verifique o console.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/history', {method: 'DELETE'});

      if(response.ok){
        setHistory([]);
        setRollResult(null);
      }
    } catch (error) {
      console.error("Erro ao limpar histórico:", error);
    }
  }
  
  return (
    <div className='min-h-screen bg-zinc-200 flex flex-col items-center p-8 font-mono text-zinc-900'>
      
      <header className='mb-8 text-center border-b-4 border-zinc-900 pb-6 w-full max-w-2xl'>
        <h1 className='text-4xl font-black uppercase tracking-tighter'>Roll the Dice</h1>
      </header>

      <main className='bg-zinc-100 border-4 border-zinc-900 rounded-2xl shadow-[8px_8px_0px_#18181b] p-8 w-full max-w-2xl'>
        
        {/* seletor dos dados */}
        <DiceSelector 
          selectedDice={selectedDice} 
          onSelect={handleDiceSelect}
        />

        {/* base central dividia em 2 colunas (esquerda = Dado, direita = histórico) */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-5 gap-8'>

          {/* colunas 1: O dado grande e o botão de jogar */}
          <div className='md:col-span-3 mt-4 flex flex-col items-center justify-center p-6 bg-zinc-50 border-4 border-zinc-900 rounded-2xl w-full max-w-md shadow-[4px_4px_0px_#18181b]'>
            <div className='w-40 h-40 mb-8'>
              <DiceIcon diceType={selectedDice}
                number={rollResult!== null ? rollResult :'?'}
                className='w-full h-full'  
              />
            </div>

            <button
              onClick={handleRoll}
              disabled={isLoading}
              className='w-full py-4 bg-zinc-900 text-white font-black text-2xl uppercase tracking-wider rounded-xl border-4 border-zinc-900 hover:-translate-y-1 hover
              hover:shadow-[6px_6px_0px_rgba(0,0,0,0.5)] active:translate-y-0 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'A Jogar...' : 'Jogar Dado'}
            </button>
          </div>
          
          {/* coluna 2: o painel de históricos de jogadas */}
          <div className='md:col-span-2 h-full flex flex-col'>
            <HistoryPanel history={history} onClear={handleClearHistory}/>
          </div>
        </div>
      </main>
    </div>
  );
}

