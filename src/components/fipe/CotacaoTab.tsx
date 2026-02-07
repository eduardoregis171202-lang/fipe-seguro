import { useState } from "react";
import { MessageCircle, ShieldAlert, Gauge, Zap, Bookmark } from "lucide-react";
import { formatCurrency } from "@/services/fipeApi";
import DealGauge from "./DealGauge";
import { salvarHistorico } from "./HistoricoTab";

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
    return { percentage, zone: 'red', label: "ALERTA VERMELHO", message: "Preço muito abaixo da FIPE. Provável golpe, sinistro, ou problema grave oculto. Desconfie!", kmAlert };
  }
  if (percentage >= 80 && percentage <= 95) {
    return { percentage, zone: 'green', label: "ÓTIMA OPORTUNIDADE", message: "Preço abaixo da FIPE! Pode ser uma boa oportunidade, mas faça vistoria completa antes de fechar.", kmAlert };
  }
  if (percentage > 95 && percentage <= 105) {
    return { percentage, zone: 'green', label: "PREÇO JUSTO", message: "Dentro da faixa normal de mercado. Negocie com segurança e faça vistoria cautelar.", kmAlert };
  }
  if (percentage > 105 && percentage <= 120) {
    return { percentage, zone: 'yellow', label: "ACIMA DA FIPE", message: "Preço acima da tabela. Só vale se o carro estiver impecável e com baixa quilometragem.", kmAlert };
  }
  return { percentage, zone: 'yellow', label: "MUITO CARO", message: "Preço muito acima da FIPE. Não pague isso. Negocie fortemente ou busque outras opções.", kmAlert };
}

const CotacaoTab = () => {
  const [fipeValue, setFipeValue] = useState("");
  const [adValue, setAdValue] = useState("");
  const [km, setKm] = useState("");
  const [carYear, setCarYear] = useState("");
  const [result, setResult] = useState<DealResult | null>(null);
  const [saved, setSaved] = useState(false);

  const handleEvaluate = () => {
    const fipe = Number(fipeValue.replace(/\D/g, ''));
    const ad = Number(adValue.replace(/\D/g, ''));
    const kmNum = Number(km.replace(/\D/g, ''));
    const year = Number(carYear);
    if (!fipe || !ad || !kmNum || !year || year < 1990 || year > new Date().getFullYear() + 1) return;
    const res = evaluateDeal(fipe, ad, kmNum, year);
    setResult(res);
    setSaved(false);

    // Auto-save to history
    salvarHistorico({
      tipo: 'cotacao',
      titulo: `Cotação ${res.label} — ${res.percentage.toFixed(0)}%`,
      resumo: `FIPE: ${formatCurrency(fipe)} · Anúncio: ${formatCurrency(ad)} · ${kmNum.toLocaleString('pt-BR')} km · ${year}`,
      dados: { fipe, ad, kmNum, year, result: res },
    });
    setSaved(true);
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

  const InputField = ({ label, icon, value, onChange, placeholder }: {
    label: string; icon: string; value: string; onChange: (v: string) => void; placeholder: string;
  }) => (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
        {icon} {label}
      </label>
      <input
        type="text" inputMode="numeric" placeholder={placeholder} value={value}
        onChange={e => onChange(formatInput(e.target.value))}
        className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground/50 transition-all"
        style={{ height: '52px' }}
      />
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Gauge className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Dealometer</h2>
            <p className="text-[10px] text-muted-foreground">Descubra se o negócio vale a pena</p>
          </div>
        </div>

        <InputField label="Valor FIPE" icon="📊" value={fipeValue} onChange={setFipeValue} placeholder="Ex: 45.000" />
        <InputField label="Valor do Anúncio" icon="💰" value={adValue} onChange={setAdValue} placeholder="Ex: 42.000" />

        <div className="grid grid-cols-2 gap-3">
          <InputField label="Quilometragem" icon="🛣️" value={km} onChange={setKm} placeholder="Ex: 60.000" />
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">📅 Ano</label>
            <input type="text" inputMode="numeric" placeholder="Ex: 2018" value={carYear}
              onChange={e => setCarYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50 transition-all"
              style={{ height: '52px' }} />
          </div>
        </div>

        <button onClick={handleEvaluate}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] glow-primary">
          <Zap className="w-4 h-4" />
          Avaliar Negócio
        </button>
      </div>

      {result && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
          <div className="glass-card rounded-2xl p-6 flex flex-col items-center">
            <DealGauge percentage={result.percentage} label={result.label} color={result.zone} />
            <div className="ember-line w-full my-4" />
            <p className="text-sm text-foreground/90 text-center leading-relaxed font-medium">{result.message}</p>

            {result.kmAlert && (
              <div className="mt-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 w-full">
                <p className="text-xs text-destructive font-medium">{result.kmAlert}</p>
              </div>
            )}

            {saved && (
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-accent font-medium">
                <Bookmark className="w-3 h-3" /> Salvo no histórico
              </div>
            )}
          </div>

          {result.zone === 'green' && (
            <button onClick={() => handleCTA('good')}
              className="w-full py-4 rounded-xl gradient-success text-success-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] animate-pulse-glow">
              <MessageCircle className="w-5 h-5" />
              Boa oferta! Quer uma vistoria antes de pagar?
            </button>
          )}
          {result.zone === 'red' && (
            <button onClick={() => handleCTA('bad')}
              className="w-full py-4 rounded-xl gradient-danger text-destructive-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97]">
              <MessageCircle className="w-5 h-5" />
              Isso parece golpe. Quer ajuda para um carro seguro?
            </button>
          )}
          {result.zone === 'yellow' && (
            <button onClick={() => handleCTA('bad')}
              className="w-full py-4 rounded-xl gradient-warning text-warning-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97]">
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
