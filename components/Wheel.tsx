import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { X, Plus } from "lucide-react";

const LUCKY_PERSON = "Luiz Felipe"; // 90% de chance
const LUCKY_CHANCE = 0.60; // 90%

const DEFAULT_PEOPLE = [
  "Luiz Felipe",
  "Cumpadi",
  "Daniela Nescau",
  "Ana",
  "Aline Fernada",
  "Japa",
  "Tayna",
  "Thallyson",
  "Guilherme",
  "Alissa",
  "Lucas Nescau",
  "Ranniel",
  "meliante - 8911",
];

interface WheelProps {
  people?: string[];
}

export default function Wheel({ people = DEFAULT_PEOPLE }: WheelProps) {
  const [currentPeople] = useState<string[]>(people);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [newPersonName, setNewPersonName] = useState("");
  const [showLazyMessage, setShowLazyMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("default");
  const wheelRef = useRef<HTMLDivElement>(null);
  const isUserInitiatedSpin = useRef(false);

  const hasLuckyPerson = () => {
    return currentPeople.some(person => 
      person.toLowerCase().includes(LUCKY_PERSON.toLowerCase())
    );
  };

  const getLuckyPerson = () => {
    return currentPeople.find(person =>
      person.toLowerCase().includes(LUCKY_PERSON.toLowerCase())
    );
  };

  const spinWheel = () => {
    console.log("🎲 spinWheel chamado - isSpinning:", isSpinning, "activeTab:", activeTab, "userInitiated:", isUserInitiatedSpin.current);
    
    if (isSpinning || currentPeople.length === 0) return;
    
    // Proteção: só pode girar na aba "default"
    if (activeTab !== "default") {
      console.warn("⚠️ Tentativa de girar na aba errada!");
      return;
    }
    
    // Proteção: só gira se foi iniciado pelo usuário
    if (!isUserInitiatedSpin.current) {
      console.warn("⚠️ Tentativa de girar sem interação do usuário!");
      return;
    }
    
    isUserInitiatedSpin.current = false; // Reseta após usar

    setIsSpinning(true);
    setWinner(null);
    setShowLazyMessage(false);

    // Verifica se o "sortudo" está na lista e se deve ser escolhido (90% de chance)
    const shouldPickLucky = hasLuckyPerson() && Math.random() < LUCKY_CHANCE;
    
    let selectedIndex: number;
    let selectedPerson: string;

    if (shouldPickLucky) {
      selectedPerson = getLuckyPerson()!;
      selectedIndex = currentPeople.indexOf(selectedPerson);
      console.log("🍀 SORTUDO! 90% de chance:", selectedPerson, "Índice:", selectedIndex);
    } else {
      selectedIndex = Math.floor(Math.random() * currentPeople.length);
      selectedPerson = currentPeople[selectedIndex];
      console.log("🎲 SORTEIO ALEATÓRIO (10%):", selectedPerson, "Índice:", selectedIndex);
    }

    // Calcular o ângulo para o vencedor
    const segmentAngle = 360 / currentPeople.length;
    
    // Voltas completas para o efeito visual (5-6 voltas)
    const spins = 5 + Math.floor(Math.random() * 2);
    const extraSpins = spins * 360;
    
    // Posição angular atual da roleta (normalizado 0-360)
    const currentAngle = ((rotation % 360) + 360) % 360;
    
    // Ângulo onde o índice selecionado está posicionado inicialmente
    // Index 0 = 0°, Index 1 = 27.69°, Index 2 = 55.38°, etc
    const selectedAngle = selectedIndex * segmentAngle;
    
    // Para trazer o índice selecionado ao topo, precisamos:
    // - Zerar a posição atual
    // - Aplicar as voltas extras
    // - Posicionar no ângulo correto
    // Como rotate() positivo gira no sentido horário, e queremos trazer
    // o índice X para o topo, giramos: 360 - selectedAngle
    const targetPosition = (360 - selectedAngle) % 360;
    
    // Calcula quanto girar a partir da posição atual
    let angleToRotate = targetPosition - currentAngle;
    if (angleToRotate < 0) angleToRotate += 360;
    
    // Rotação final
    const finalRotation = rotation + extraSpins + angleToRotate;

    console.log("📊 Debug:", {
      pessoa: selectedPerson,
      index: selectedIndex,
      segmentAngle: segmentAngle.toFixed(2),
      currentAngle: currentAngle.toFixed(2),
      selectedAngle: selectedAngle.toFixed(2),
      targetPosition: targetPosition.toFixed(2),
      angleToRotate: angleToRotate.toFixed(2),
      voltas: spins,
      finalRotation: finalRotation.toFixed(2)
    });

    setRotation(finalRotation);

    // Mostrar o vencedor após a animação
    setTimeout(() => {
      setWinner(selectedPerson);
      setIsSpinning(false);
    }, 3500);
  };

  const addPerson = () => {
    setShowLazyMessage(true);
  };

  const removePerson = (_index: number) => {
    setShowLazyMessage(true);
  };

  const handleTabChange = (value: string) => {
    console.log("📑 Mudando para aba:", value, "Winner atual:", winner, "isSpinning:", isSpinning);
    setActiveTab(value);
    setShowLazyMessage(false);
    
    // Não limpa o winner nem reseta estados ao mudar de aba
    // Isso evita que a roleta gire automaticamente
  };

  const renderWheelSegments = () => {
    if (currentPeople.length === 0) return null;

    const segmentAngle = 360 / currentPeople.length;
    const radius = 45; // porcentagem do raio onde os nomes ficam

    return currentPeople.map((person, index) => {
      // Calcula o ângulo: índice 0 fica no topo (0 graus), vai no sentido horário
      const angle = (index * segmentAngle * Math.PI) / 180;
      const x = 50 + radius * Math.sin(angle);
      const y = 50 - radius * Math.cos(angle);
      
      // Rotaciona o texto para ficar radial (do centro para fora)
      const textRotation = index * segmentAngle;

      return (
        <div
          key={index}
          className="absolute text-center font-semibold text-slate-900 dark:text-slate-100 pointer-events-none whitespace-nowrap"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) rotate(${textRotation}deg)`,
            fontSize: currentPeople.length > 10 ? "10px" : currentPeople.length > 8 ? "11px" : "12px",
            width: '90px',
            lineHeight: '1.2',
            textShadow: '0 1px 3px rgba(0,0,0,0.3), 0 0 1px rgba(255,255,255,0.8)',
          }}
        >
          {person}
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6">
      <Card className="overflow-hidden border-2">
        <CardHeader className="text-center pb-4 bg-gradient-to-b from-muted/30 to-transparent">
          <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">
            💸 Quem vai pagar a conta?
          </CardTitle>
          <CardDescription className="text-base">
            A roleta decide quem é o sortudo de hoje!
            <br />
            Um oferecimento de BABUINOS BOBOCAS BALBUCIANDO EM BANDO
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-11">
              <TabsTrigger value="default" className="text-sm sm:text-base">Lista Padrão</TabsTrigger>
              <TabsTrigger value="custom" className="text-sm sm:text-base">Personalizar</TabsTrigger>
            </TabsList>

            <TabsContent value="default" className="space-y-6">
              <div className="flex flex-col items-center space-y-6">
                {/* Roleta */}
                <div className="relative w-full flex justify-center py-6">
                  {/* Indicador */}
                  <div className="absolute -top-1 sm:top-0 left-1/2 -translate-x-1/2 z-20 drop-shadow-lg">
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] border-l-transparent border-r-[16px] sm:border-r-[20px] border-r-transparent border-t-[28px] sm:border-t-[36px] border-t-red-500" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] sm:border-l-[17px] border-l-transparent border-r-[14px] sm:border-r-[17px] border-r-transparent border-t-[24px] sm:border-t-[30px] border-t-red-600" />
                    </div>
                  </div>

                  {/* Círculo da roleta */}
                  <div className="relative">
                    <motion.div
                      ref={wheelRef}
                      className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden shadow-xl border-[6px] sm:border-[8px] border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                      style={{
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                      }}
                      animate={{ rotate: rotation }}
                      transition={{
                        duration: 3.5,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      {renderWheelSegments()}
                      
                      {/* Centro da roleta */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-800 rounded-full shadow-lg border-4 sm:border-[5px] border-slate-300 dark:border-slate-600 z-10 flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-slate-400 dark:bg-slate-500 rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Botão de girar */}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("🖱️ Botão clicado!");
                    isUserInitiatedSpin.current = true;
                    spinWheel();
                  }}
                  disabled={isSpinning || currentPeople.length === 0}
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[240px] h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSpinning ? "Sorteando..." : "🎲 Sortear"}
                </Button>

                {/* Resultado */}
                {winner && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full p-5 sm:p-6 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground rounded-xl shadow-lg border-2 border-primary/20"
                  >
                    <p className="text-sm sm:text-base text-center mb-1.5 opacity-90 font-medium">
                      💰 Vai pagar a conta:
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-center">
                      {winner}
                    </p>
                    <p className="text-xs sm:text-sm text-center mt-2 opacity-75">
                      Boa sorte! 😅
                    </p>
                  </motion.div>
                )}

                {/* Lista de participantes */}
                <div className="w-full pt-2">
                  <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                    Participantes ({currentPeople.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {currentPeople.map((person, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-secondary/80 hover:bg-secondary rounded-md text-xs sm:text-sm text-center truncate transition-colors border border-secondary-foreground/5"
                      >
                        {person}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                {showLazyMessage && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full p-4 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 rounded-lg"
                  >
                    <p className="text-sm text-amber-900 dark:text-amber-200 text-center font-medium">
                      😴 Ops! O dev ficou com preguiça de fazer isso aqui. 
                      Use a lista padrão e chora baixo.
                    </p>
                  </motion.div>
                )}

                <div className="w-full space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nome..."
                      value={newPersonName}
                      onChange={(e) => setNewPersonName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addPerson();
                      }}
                    />
                    <Button onClick={addPerson} size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      Quem tá no rateio ({currentPeople.length})
                    </h4>
                    <div className="max-h-[300px] overflow-y-auto space-y-1.5">
                      {currentPeople.map((person, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-3 py-2.5 bg-secondary/60 rounded-md text-sm border border-secondary-foreground/5"
                        >
                          <span className="truncate">{person}</span>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removePerson(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Volte pra &quot;Lista Padrão&quot; pra fazer o sorteio
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

