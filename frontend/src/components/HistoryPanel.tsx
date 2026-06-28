export interface RollRecord {
  id: number;
  diceType: string;
  result: number;
  created_at?: string;
}

interface HistoryPanelProps {
  history: RollRecord[];
  onClear: () => void;
}

export function HistoryPanel({ history, onClear }: HistoryPanelProps){
    return (
        <section className="w-full h-full flex flex-col">
            <div className="flex justify-between items-end mb-4 h-8 shrink-0">
                <h2 className="text-md font-black uppercase text-zinc-900 leading-none">Histórico</h2>
                {history.length > 0 && (
                <button onClick={onClear} className="text-sm font-bold uppercase border-2 border-zinc-900 px-3 py-1 rounded-md hover:bg-zinc-900 hover:text-white transition-colors">
                    Limpar
                </button>
                )}
            </div>

           <div className="bg-zinc-100 border-4 border-zinc-900 rounded-xl overflow-hidden shadow-[4px_4px_0px_#18181b] flex flex-col h-107.5 min-h-107.5 max-h-107.5 shrink-0">
                {history.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center m-auto p-6 text-center font-bold text-zinc-600 uppercase">
                        Nenhum lançamento.
                    </div>   
                ) : (
                    <ul className="divide-y-2 divide-zinc-900 overflow-hidden h-full ">
                        {history.map((roll) =>(
                            <li key={roll.id} className="p-3 flex justify-between items-center hover:bg-zinc-100 transition-colors h-17.5">
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg text-zinc-700 leading-tight">
                                        {roll.diceType || (roll as any).dice_type || (roll as any).dice || 'Dado'}
                                    </span>
                                    
                                    {roll.created_at && (
                                        <span className="text-xs font-semibold text-zinc-500 mt-0.5">
                                        {new Date(roll.created_at).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit' // Opcional, pode remover se quiser só hora e minuto
                                        })}
                                        </span>
                                    )}
                                </div>
                                <span className="font-black text-xl w-12 h-12 flex items-center justify-center bg-zinc-200 rounded-md border-2 border-zinc-900 shrink-0">
                                    {roll.result}
                                </span> 
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}