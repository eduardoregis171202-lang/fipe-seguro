import { useState } from "react";
import { Calculator, TrendingDown, DollarSign } from "lucide-react";
import { formatCurrency } from "@/services/fipeApi";

const FinanciamentoTab = () => {
  const [valor, setValor] = useState("");
  const [entrada, setEntrada] = useState("");
  const [juros, setJuros] = useState("1.5");
  const [prazo, setPrazo] = useState("48");
  const [result, setResult] = useState<{
    parcela: number;
    totalPago: number;
    totalJuros: number;
    valorFinanciado: number;
  } | null>(null);

  const formatInput = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('pt-BR');
  };

  const handleCalculate = () => {
    const v = Number(valor.replace(/\D/g, ''));
    const e = Number(entrada.replace(/\D/g, '')) || 0;
    const j = Number(juros.replace(',', '.'));
    const p = Number(prazo);

    if (!v || !j || !p || e >= v) return;

    const financiado = v - e;
    const taxaMensal = j / 100;
    // Tabela Price: PMT = PV * [i * (1+i)^n] / [(1+i)^n - 1]
    const parcela = financiado * (taxaMensal * Math.pow(1 + taxaMensal, p)) / (Math.pow(1 + taxaMensal, p) - 1);
    const totalPago = parcela * p + e;
    const totalJuros = totalPago - v;

    setResult({
      parcela: Math.round(parcela * 100) / 100,
      totalPago: Math.round(totalPago * 100) / 100,
      totalJuros: Math.round(totalJuros * 100) / 100,
      valorFinanciado: financiado,
    });
  };

  const prazoOptions = [12, 24, 36, 48, 60, 72];

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Calculator className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Simulador de Financiamento</h2>
            <p className="text-[10px] text-muted-foreground">Calcule suas parcelas pela Tabela Price</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">💰 Valor do Veículo (R$)</label>
          <input type="text" inputMode="numeric" placeholder="Ex: 50.000" value={valor}
            onChange={e => setValor(formatInput(e.target.value))}
            className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50 transition-all" style={{ height: '52px' }} />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">💵 Entrada (R$)</label>
          <input type="text" inputMode="numeric" placeholder="Ex: 10.000 (opcional)" value={entrada}
            onChange={e => setEntrada(formatInput(e.target.value))}
            className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50 transition-all" style={{ height: '52px' }} />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">📈 Taxa de Juros (% ao mês)</label>
          <input type="text" inputMode="decimal" placeholder="Ex: 1.5" value={juros}
            onChange={e => setJuros(e.target.value)}
            className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50 transition-all" style={{ height: '52px' }} />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-2 block uppercase tracking-wider">📅 Prazo (meses)</label>
          <div className="grid grid-cols-3 gap-2">
            {prazoOptions.map(p => (
              <button key={p} onClick={() => setPrazo(String(p))}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                  prazo === String(p) ? 'gradient-primary text-primary-foreground glow-primary' : 'bg-secondary text-secondary-foreground'
                }`}>
                {p}x
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleCalculate}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] glow-primary">
          <Calculator className="w-4 h-4" />
          Calcular Parcelas
        </button>
      </div>

      {result && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-3">
          {/* Main result */}
          <div className="rounded-2xl overflow-hidden">
            <div className="gradient-primary p-5">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider font-medium">Parcela mensal</p>
              <p className="text-4xl font-extrabold text-primary-foreground font-display mt-1">
                {formatCurrency(result.parcela)}
              </p>
              <p className="text-xs text-primary-foreground/60 mt-1">{prazo}x parcelas fixas</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card rounded-xl p-4">
              <DollarSign className="w-4 h-4 text-accent mb-1" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Financiado</p>
              <p className="text-sm font-bold text-foreground font-display">{formatCurrency(result.valorFinanciado)}</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <TrendingDown className="w-4 h-4 text-destructive mb-1" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total em Juros</p>
              <p className="text-sm font-bold text-destructive font-display">{formatCurrency(result.totalJuros)}</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total pago ao final</p>
            <p className="text-lg font-bold text-gradient font-display">{formatCurrency(result.totalPago)}</p>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full gradient-primary rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, ((result.totalPago - result.totalJuros) / result.totalPago) * 100)}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-muted-foreground">Veículo</span>
              <span className="text-[9px] text-destructive">Juros ({((result.totalJuros / result.totalPago) * 100).toFixed(0)}%)</span>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4 border-accent/30">
            <p className="text-xs text-accent font-semibold mb-1">💡 Dica do Especialista</p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {result.totalJuros > result.valorFinanciado * 0.5
                ? "⚠️ Os juros ultrapassam 50% do valor financiado. Considere dar uma entrada maior ou reduzir o prazo."
                : "Financiamento dentro de uma faixa razoável. Sempre negocie a taxa de juros com diferentes bancos!"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanciamentoTab;
