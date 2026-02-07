import { useState, useMemo } from "react";
import { Calculator, MessageCircle, ShieldAlert } from "lucide-react";
import { formatCurrency } from "@/services/fipeApi";
import DealGauge from "./DealGauge";

interface DealResult {
  percentage: number;
  zone: 'green' | 'yellow' | 'red';
  label: string;
  message: string;
  kmAlert: string | null;
}

function evaluateDeal(fipeValue: number, adValue: number, km: number, carYear: number): DealResult {
  const percentage = (adValue / fipeValue) * 100;
  const currentYear = new Date().getFullYear();
  const carAge = currentYear - carYear;
  const expectedKm = carAge * 15000;

  let kmAlert: string | null = null;
  if (km < expectedKm * 0.4 && percentage < 85) {
    kmAlert = "⚠️ KM muito baixa para a idade + preço muito abaixo da FIPE. Forte indício de hodômetro adulterado ou golpe.";
  } else if (km > expectedKm * 1.8) {
    kmAlert = "⚠️ KM muito alta para a idade. Carro rodado demais — mecânica pode estar comprometida.";
  }

  if (percentage < 80) {
    return {
      percentage,
      zone: 'red',
      label: "ALERTA VERMELHO",
      message: "Preço muito abaixo da FIPE. Provável golpe, sinistro, ou problema grave oculto. Desconfie!",
      kmAlert,
    };
  }
  if (percentage >= 80 && percentage <= 95) {
    return {
      percentage,
      zone: 'green',
      label: "ÓTIMA OPORTUNIDADE",
      message: "Preço abaixo da FIPE! Pode ser uma boa oportunidade, mas faça vistoria completa antes de fechar.",
      kmAlert,
    };
  }
  if (percentage > 95 && percentage <= 105) {
    return {
      percentage,
      zone: 'green',
      label: "PREÇO JUSTO",
      message: "Dentro da faixa normal de mercado. Negocie com segurança e faça vistoria cautelar.",
      kmAlert,
    };
  }
  if (percentage > 105 && percentage <= 120) {
    return {
      percentage,
      zone: 'yellow',
      label: "ACIMA DA FIPE",
      message: "Preço acima da tabela. Só vale se o carro estiver impecável e com baixa quilometragem.",
      kmAlert,
    };
  }
  return {
    percentage,
    zone: 'yellow',
    label: "MUITO CARO",
    message: "Preço muito acima da FIPE. Não pague isso. Negocie fortemente ou busque outras opções.",
    kmAlert,
  };
}

const CotacaoTab = () => {
  const [fipeValue, setFipeValue] = useState("");
  const [adValue, setAdValue] = useState("");
  const [km, setKm] = useState("");
  const [carYear, setCarYear] = useState("");
  const [result, setResult] = useState<DealResult | null>(null);

  const handleEvaluate = () => {
    const fipe = Number(fipeValue.replace(/\D/g, ''));
    const ad = Number(adValue.replace(/\D/g, ''));
    const kmNum = Number(km.replace(/\D/g, ''));
    const year = Number(carYear);

    if (!fipe || !ad || !kmNum || !year || year < 1990 || year > new Date().getFullYear() + 1) return;

    setResult(evaluateDeal(fipe, ad, kmNum, year));
  };

  const handleCTA = (type: 'good' | 'bad') => {
    const msg = type === 'good'
      ? "Olá! Encontrei uma boa oferta no Fipe Scanner e gostaria de uma vistoria técnica antes de fechar negócio."
      : "Olá! O Fipe Scanner indicou que uma oferta parece suspeita. Pode me ajudar a encontrar um carro seguro?";
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const formatInput = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-xl p-4 space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Dealometer — Vale a pena?
        </h2>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Valor da Tabela FIPE (R$)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ex: 45.000"
            value={fipeValue}
            onChange={e => setFipeValue(formatInput(e.target.value))}
            className="w-full h-12 px-4 rounded-xl bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Valor do Anúncio (R$)</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ex: 42.000"
            value={adValue}
            onChange={e => setAdValue(formatInput(e.target.value))}
            className="w-full h-12 px-4 rounded-xl bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Quilometragem</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Ex: 60.000"
              value={km}
              onChange={e => setKm(formatInput(e.target.value))}
              className="w-full h-12 px-4 rounded-xl bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ano do carro</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Ex: 2018"
              value={carYear}
              onChange={e => setCarYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full h-12 px-4 rounded-xl bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <button
          onClick={handleEvaluate}
          className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          <ShieldAlert className="w-4 h-4" />
          Avaliar Negócio
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
          <div className="glass-card rounded-xl p-5 flex flex-col items-center">
            <DealGauge percentage={result.percentage} label={result.label} color={result.zone} />
            
            <p className="text-sm text-foreground/90 text-center mt-4 leading-relaxed">
              {result.message}
            </p>

            {result.kmAlert && (
              <div className="mt-3 p-3 rounded-xl bg-destructive/10 border border-destructive/20 w-full">
                <p className="text-xs text-destructive">{result.kmAlert}</p>
              </div>
            )}
          </div>

          {/* CTA */}
          {result.zone === 'green' && (
            <button
              onClick={() => handleCTA('good')}
              className="w-full py-4 rounded-xl gradient-success text-success-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] animate-pulse-glow"
            >
              <MessageCircle className="w-5 h-5" />
              Boa oferta! Quer uma vistoria antes de pagar?
            </button>
          )}
          {result.zone === 'red' && (
            <button
              onClick={() => handleCTA('bad')}
              className="w-full py-4 rounded-xl gradient-danger text-destructive-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Isso parece golpe. Quer ajuda para um carro seguro?
            </button>
          )}
          {result.zone === 'yellow' && (
            <button
              onClick={() => handleCTA('bad')}
              className="w-full py-4 rounded-xl gradient-warning text-warning-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Está caro. Quer ajuda para negociar melhor?
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CotacaoTab;
