import { useState } from "react";
import { ArrowLeftRight, Car } from "lucide-react";
import { CAR_DATABASE, type CarData } from "@/data/carDatabase";
import { formatCurrency } from "@/services/fipeApi";

const marcas = [...new Set(CAR_DATABASE.map(c => c.marca))].sort();

const ComparadorTab = () => {
  const [car1, setCar1] = useState<CarData | null>(null);
  const [car2, setCar2] = useState<CarData | null>(null);
  const [marca1, setMarca1] = useState("");
  const [marca2, setMarca2] = useState("");

  const carsForMarca = (marca: string) => CAR_DATABASE.filter(c => c.marca === marca);

  const SelectCar = ({ side, marca, setMarca, car, setCar }: {
    side: string; marca: string; setMarca: (v: string) => void; car: CarData | null; setCar: (v: CarData | null) => void;
  }) => (
    <div className="flex-1 space-y-2">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">{side}</p>
      <select value={marca} onChange={e => { setMarca(e.target.value); setCar(null); }}
        className="w-full h-11 px-2 rounded-xl bg-secondary text-foreground border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
        <option value="">Marca</option>
        {marcas.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <select value={car?.id || ""} onChange={e => setCar(CAR_DATABASE.find(c => c.id === e.target.value) || null)}
        disabled={!marca}
        className="w-full h-11 px-2 rounded-xl bg-secondary text-foreground border border-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer disabled:opacity-30">
        <option value="">Modelo</option>
        {carsForMarca(marca).map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
      </select>
    </div>
  );

  const CompareRow = ({ label, val1, val2, highlight }: { label: string; val1: string; val2: string; highlight?: boolean }) => (
    <div className={`flex items-stretch border-b border-border/30 last:border-0 ${highlight ? 'bg-primary/5' : ''}`}>
      <div className="flex-1 p-3 text-xs text-foreground font-medium border-r border-border/30">{val1 || "—"}</div>
      <div className="w-20 p-3 flex items-center justify-center shrink-0">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider text-center">{label}</span>
      </div>
      <div className="flex-1 p-3 text-xs text-foreground font-medium text-right border-l border-border/30">{val2 || "—"}</div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Selection */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <ArrowLeftRight className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Comparador de Carros</h2>
            <p className="text-[10px] text-muted-foreground">Compare specs lado a lado</p>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <SelectCar side="Carro A" marca={marca1} setMarca={setMarca1} car={car1} setCar={setCar1} />
          <div className="flex items-center justify-center pt-8">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">VS</span>
            </div>
          </div>
          <SelectCar side="Carro B" marca={marca2} setMarca={setMarca2} car={car2} setCar={setCar2} />
        </div>
      </div>

      {/* Comparison */}
      {car1 && car2 && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
          {/* Names */}
          <div className="flex gap-3">
            <div className="flex-1 glass-card rounded-xl p-3 text-center">
              <Car className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground font-display">{car1.nome}</p>
            </div>
            <div className="flex-1 glass-card rounded-xl p-3 text-center">
              <Car className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xs font-bold text-foreground font-display">{car2.nome}</p>
            </div>
          </div>

          {/* Specs Table */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <CompareRow label="Preço" 
              val1={formatCurrency(Math.round((car1.precoEstimado.min + car1.precoEstimado.max) / 2))}
              val2={formatCurrency(Math.round((car2.precoEstimado.min + car2.precoEstimado.max) / 2))}
              highlight
            />
            <CompareRow label="Motor" val1={car1.detalhes.motor} val2={car2.detalhes.motor} />
            <CompareRow label="Consumo" val1={car1.detalhes.consumo.split('|')[0].trim()} val2={car2.detalhes.consumo.split('|')[0].trim()} />
            <CompareRow label="Estrada" val1={car1.detalhes.consumo.split('|')[1]?.trim() || "—"} val2={car2.detalhes.consumo.split('|')[1]?.trim() || "—"} />
            <CompareRow label="Anos" 
              val1={`${car1.anosReferencia[0]}-${car1.anosReferencia[car1.anosReferencia.length-1]}`} 
              val2={`${car2.anosReferencia[0]}-${car2.anosReferencia[car2.anosReferencia.length-1]}`} 
            />
          </div>

          {/* Pros / Cons */}
          <div className="grid grid-cols-2 gap-3">
            {[car1, car2].map((car, i) => (
              <div key={car.id} className="glass-card rounded-xl p-3">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-2">
                  {i === 0 ? '🅰️' : '🅱️'} Prós
                </p>
                {car.detalhes.pontosPositivos.slice(0, 3).map((p, j) => (
                  <p key={j} className="text-[10px] text-foreground/80 mb-1 flex items-start gap-1">
                    <span className="text-success">✓</span> {p}
                  </p>
                ))}
                <p className="text-[10px] font-bold text-destructive uppercase tracking-wider mb-2 mt-3">Contras</p>
                {car.detalhes.pontosNegativos.slice(0, 3).map((p, j) => (
                  <p key={j} className="text-[10px] text-foreground/80 mb-1 flex items-start gap-1">
                    <span className="text-destructive">✗</span> {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Verdicts */}
          <div className="space-y-3">
            {[car1, car2].map((car, i) => (
              <div key={car.id} className="glass-card rounded-xl p-4 border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                  💡 {i === 0 ? 'Carro A' : 'Carro B'} — Veredito
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">{car.detalhes.veredito}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!car1 || !car2) && (
        <div className="glass-card rounded-2xl p-8 text-center">
          <ArrowLeftRight className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-sm text-muted-foreground">Selecione dois carros para comparar</p>
          <p className="text-xs text-muted-foreground/60 mt-1">40 modelos disponíveis na base</p>
        </div>
      )}
    </div>
  );
};

export default ComparadorTab;
