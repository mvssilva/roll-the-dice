import { DiceIcon } from './DiceIcon';

const AVAILABLE_DICE = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100'];

interface DiceSelectorProps {
    selectedDice: string;
    onSelect: (dice: string) => void;
}

export function DiceSelector({ selectedDice, onSelect }: DiceSelectorProps){
    return (
        <div className="mb-8 flex flex-wrap justify-center gap-4">
            {AVAILABLE_DICE.map((dice) => (
                <button
                    key={dice}
                    onClick={()=> onSelect(dice)}
                    className={`
                        transition-all duration-200
                        ${selectedDice === dice
                            ? 'scale-125 drop-shadow-xl -translate-y-2' // Dado selecionado fica maior e "flutuando"
                            : 'scale-90 opacity-70 hover:opacity-100 hover:scale-100'
                        }
                        `}  
                >
                    <DiceIcon diceType = {dice} className = 'w-18 h-18 text-xl'/>
                </button>
            ))}
        </div>
    );
}
