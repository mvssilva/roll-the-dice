interface DiceIconProps {
  diceType: string;
  className?: string;
  number?: string | number;
}

export function DiceIcon({ diceType, className = '', number }: DiceIconProps){

  // Função que desenha as "fatias" de cada dado com diferentes tons para dar o efeito 3D
  const getFacetedShape = () => {
    switch (diceType) {
      case 'D4': // Triângulo chapado
        return (
          <polygon points="50,10 90,85 10,85" className="fill-green-500" />
        );
      case 'D6': // Quadrado chapado
        return (
          <rect x="15" y="15" width="70" height="70" className="fill-cyan-400" />
        );
      case 'D8': // Hexágono vertical chapado
        return (
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" className="fill-purple-500" />
        );
      case 'D10': // Diamante truncado (como na imagem) chapado
        return (
          <polygon points="50,5 90,35 90,65 50,95 10,65 10,35" className="fill-pink-500" />
        );
      case 'D12': // Polígono circular chapado (Decágono com topo reto)
        return (
          <polygon points="36,5 64,5 90,24 95,50 90,76 64,95 36,95 10,76 5,50 10,24" className="fill-red-500" />
        );
      case 'D20': // Icosaedro 3D Perfeito
        return (
          <>
            {/* Triângulo Central */}
            <polygon points="25,40 75,40 50,80" className="fill-orange-400" />
            {/* Triângulos ao redor do centro */}
            <polygon points="50,5 75,40 25,40" className="fill-orange-500" />
            <polygon points="5,30 25,40 20,90" className="fill-orange-600" />
            <polygon points="95,30 80,90 75,40" className="fill-orange-600" />
            {/* Triângulos das pontas */}
            <polygon points="50,5 95,30 75,40" className="fill-orange-500" />
            <polygon points="50,5 25,40 5,30" className="fill-orange-400" />
            <polygon points="20,90 50,80 50,95" className="fill-orange-700" />
            <polygon points="80,90 50,95 50,80" className="fill-orange-700" />
            <polygon points="25,40 50,80 20,90" className="fill-orange-500" />
            <polygon points="75,40 80,90 50,80" className="fill-orange-500" />
          </>
        );
      default: // D100 - Esfera Facetada
        return (
          <>
            <polygon points="50,5 80,15 95,45 80,85 50,95 20,85 5,45 20,15" className="fill-slate-700" />
            <polygon points="50,25 70,45 60,75 40,75 30,45" className="fill-slate-500" />
            <polygon points="50,5 80,15 70,45 50,25" className="fill-slate-600" />
            <polygon points="80,15 95,45 70,45" className="fill-slate-700" />
            <polygon points="50,5 50,25 30,45 20,15" className="fill-slate-600" />
            <polygon points="20,15 30,45 5,45" className="fill-slate-700" />
          </>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-md"
      >
        {getFacetedShape()}
        <text 
          x="50" 
          y="50" 
          textAnchor="middle" 
          dominantBaseline="middle" 
          className="font-black font-sans fill-white select-none"
          fontSize="30"
          paintOrder="stroke"
          stroke="black"
          strokeWidth="0.5"
        >
          {number || diceType.replace('D', '')}
        </text>
      </svg>
    </div>
  );
}
