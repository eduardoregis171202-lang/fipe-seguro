import { useState, useEffect } from "react";
import { Gauge, Zap, Search, ChevronDown, Calculator, TrendingDown, DollarSign, AlertCircle, TrendingUp } from "lucide-react";
import {
  fetchMarcas, fetchModelos, fetchAnos, fetchPreco, parseFipeValue,
  formatCurrency, generateSimulatedHistory,
  type FipeMarca, type FipeModelo, type FipeAno, type FipePreco
} from "@/services/fipeApi";
import DealGauge from "./DealGauge";
import PriceChart from "./PriceChart";
import LoadingSpinner from "./LoadingSpinner";
import { salvarHistorico } from "./HistoricoTab";

// ─── Deal Evaluation ────────────────────────────────────────
interface DealResult {
  percentage: number;
  zone: 'green' | 'yellow' | 'red';
  label: string;
  message: string;
}

function evaluateDeal(fipeValue: number, adValue: number): DealResult {
  const percentage = (adValue / fipeValue) * 100;

  if (percentage < 80) {
    return { percentage, zone: 'red', label: "ALERTA VERMELHO", message: "Preço muito abaixo da FIPE. Provável golpe, sinistro, ou problema grave oculto. Desconfie!" };
  }
  if (percentage <= 95) {
    return { percentage, zone: 'green', label: "ÓTIMA OPORTUNIDADE", message: "Preço abaixo da FIPE! Pode ser uma boa oportunidade, mas faça vistoria completa antes de fechar." };
  }
  if (percentage <= 105) {
    return { percentage, zone: 'green', label: "PREÇO JUSTO", message: "Dentro da faixa normal de mercado. Negocie com segurança e faça vistoria cautelar." };
  }
  if (percentage <= 120) {
    return { percentage, zone: 'yellow', label: "ACIMA DA FIPE", message: "Preço acima da tabela. Só vale se o carro estiver impecável e com baixa quilometragem." };
  }
  return { percentage, zone: 'yellow', label: "MUITO CARO", message: "Preço muito acima da FIPE. Não pague isso. Negocie fortemente ou busque outras opções." };
}

// ─── Shared Input ────────────────────────────────────────────
const formatInput = (value: string) => {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  return Number(num).toLocaleString('pt-BR');
};

// ─── Select Field ────────────────────────────────────────────
const SelectField = ({ label, icon, value, onChange, options, loading, disabled }: {
  label: string; icon: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; loading: boolean; disabled: boolean;
}) => (
  <div>
    <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
      {icon} {label}
    </label>
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled || loading}
        className="w-full px-4 pr-10 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-30 appearance-none cursor-pointer transition-all"
        style={{ height: '52px' }}>
        <option value="">{loading ? "Carregando..." : "Selecione"}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

// ─── Financing Section ───────────────────────────────────────
const FinanciamentoSection = ({ fipeValue }: { fipeValue: number }) => {
  const [entrada, setEntrada] = useState("");
  const [juros, setJuros] = useState("1.5");
  const [prazo, setPrazo] = useState("48");
  const [result, setResult] = useState<{
    parcela: number; totalPago: number; totalJuros: number; valorFinanciado: number;
  } | null>(null);

  const handleCalculate = () => {
    const e = Number(entrada.replace(/\D/g, '')) || 0;
    const j = Number(juros.replace(',', '.'));
    const p = Number(prazo);
    if (!fipeValue || !j || !p || e >= fipeValue) return;

    const financiado = fipeValue - e;
    const taxaMensal = j / 100;
    const parcela = financiado * (taxaMensal * Math.pow(1 + taxaMensal, p)) / (Math.pow(1 + taxaMensal, p) - 1);
    const totalPago = parcela * p + e;
    const totalJuros = totalPago - fipeValue;

    setResult({
      parcela: Math.round(parcela * 100) / 100,
      totalPago: Math.round(totalPago * 100) / 100,
      totalJuros: Math.round(totalJuros * 100) / 100,
      valorFinanciado: financiado,
    });
  };

  const prazoOptions = [12, 24, 36, 48, 60, 72];

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Calculator className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Simulador de Financiamento</h2>
            <p className="text-[10px] text-muted-foreground">Valor FIPE: {formatCurrency(fipeValue)}</p>
          </div>
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
          <div className="rounded-2xl overflow-hidden">
            <div className="gradient-primary p-5">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider font-medium">Parcela mensal</p>
              <p className="text-4xl font-extrabold text-primary-foreground font-display mt-1">{formatCurrency(result.parcela)}</p>
              <p className="text-xs text-primary-foreground/60 mt-1">{prazo}x parcelas fixas</p>
            </div>
          </div>

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

// ─── Main CotacaoTab ─────────────────────────────────────────
const CotacaoTab = () => {
  // FIPE Search state
  const [marcas, setMarcas] = useState<FipeMarca[]>([]);
  const [modelos, setModelos] = useState<FipeModelo[]>([]);
  const [anos, setAnos] = useState<FipeAno[]>([]);
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedModelo, setSelectedModelo] = useState("");
  const [selectedAno, setSelectedAno] = useState("");
  const [loadingMarcas, setLoadingMarcas] = useState(false);
  const [loadingModelos, setLoadingModelos] = useState(false);
  const [loadingAnos, setLoadingAnos] = useState(false);
  const [loadingPreco, setLoadingPreco] = useState(false);
  const [error, setError] = useState("");
  const [fipeResult, setFipeResult] = useState<FipePreco | null>(null);
  const [fipeValue, setFipeValue] = useState(0);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] } | null>(null);

  // Deal evaluation state
  const [adValue, setAdValue] = useState("");
  const [dealResult, setDealResult] = useState<DealResult | null>(null);
  const [saved, setSaved] = useState(false);

  // Fetch marcas on mount
  useEffect(() => {
    setLoadingMarcas(true);
    fetchMarcas()
      .then(setMarcas)
      .catch(() => setError("Erro ao carregar marcas."))
      .finally(() => setLoadingMarcas(false));
  }, []);

  // Fetch modelos when marca changes
  useEffect(() => {
    if (!selectedMarca) { setModelos([]); return; }
    setSelectedModelo(""); setSelectedAno("");
    setFipeResult(null); setFipeValue(0); setChartData(null); setDealResult(null);
    setLoadingModelos(true); setError("");
    fetchModelos(selectedMarca)
      .then(res => setModelos(res.modelos))
      .catch(() => setError("Erro ao carregar modelos."))
      .finally(() => setLoadingModelos(false));
  }, [selectedMarca]);

  // Fetch anos when modelo changes
  useEffect(() => {
    if (!selectedMarca || !selectedModelo) { setAnos([]); return; }
    setSelectedAno("");
    setFipeResult(null); setFipeValue(0); setChartData(null); setDealResult(null);
    setLoadingAnos(true); setError("");
    fetchAnos(selectedMarca, selectedModelo)
      .then(setAnos)
      .catch(() => setError("Erro ao carregar anos."))
      .finally(() => setLoadingAnos(false));
  }, [selectedMarca, selectedModelo]);

  // Fetch FIPE price
  const handleFipeSearch = async () => {
    if (!selectedMarca || !selectedModelo || !selectedAno) return;
    setLoadingPreco(true); setError(""); setDealResult(null);
    try {
      const preco = await fetchPreco(selectedMarca, selectedModelo, selectedAno);
      setFipeResult(preco);
      const price = parseFipeValue(preco.Valor);
      setFipeValue(price);
      setChartData(generateSimulatedHistory(price));
    } catch {
      setError("Erro ao consultar preço FIPE.");
    } finally {
      setLoadingPreco(false);
    }
  };

  // Evaluate deal
  const handleEvaluate = () => {
    const ad = Number(adValue.replace(/\D/g, ''));
    if (!fipeValue || !ad) return;
    const res = evaluateDeal(fipeValue, ad);
    setDealResult(res);
    setSaved(false);

    salvarHistorico({
      tipo: 'cotacao',
      titulo: `Cotação ${res.label} — ${res.percentage.toFixed(0)}%`,
      resumo: `${fipeResult?.Marca} ${fipeResult?.Modelo} · FIPE: ${formatCurrency(fipeValue)} · Anúncio: ${formatCurrency(ad)}`,
      dados: { fipeValue, ad, result: res },
    });
    setSaved(true);
  };


  return (
    <div className="space-y-5">
      {/* ─── FIPE Search ─── */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Search className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Buscar na Tabela FIPE</h2>
            <p className="text-[10px] text-muted-foreground">Selecione marca, modelo e ano</p>
          </div>
        </div>

        <SelectField label="Marca" icon="🏭" value={selectedMarca} onChange={setSelectedMarca}
          options={marcas.map(m => ({ value: m.codigo, label: m.nome }))}
          loading={loadingMarcas} disabled={false} />
        <SelectField label="Modelo" icon="🚗" value={selectedModelo} onChange={setSelectedModelo}
          options={modelos.map(m => ({ value: String(m.codigo), label: m.nome }))}
          loading={loadingModelos} disabled={!selectedMarca} />
        <SelectField label="Ano" icon="📅" value={selectedAno} onChange={setSelectedAno}
          options={anos.map(a => ({ value: a.codigo, label: a.nome }))}
          loading={loadingAnos} disabled={!selectedModelo} />

        <button onClick={handleFipeSearch} disabled={!selectedAno || loadingPreco}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-40 glow-primary">
          <Search className="w-4 h-4" />
          Consultar Preço FIPE
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-xs text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loadingPreco && <LoadingSpinner text="Consultando tabela FIPE..." />}

      {/* ─── FIPE Result ─── */}
      {fipeResult && !loadingPreco && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-5">
          {/* Price Card */}
          <div className="rounded-2xl overflow-hidden">
            <div className="gradient-primary p-5 pb-4">
              <p className="text-xs text-primary-foreground/70 font-medium">Resultado da consulta</p>
              <h3 className="font-bold text-primary-foreground text-lg font-display mt-1">
                {fipeResult.Marca} {fipeResult.Modelo}
              </h3>
              <p className="text-xs text-primary-foreground/60 mt-0.5">
                Ano: {fipeResult.AnoModelo} · {fipeResult.Combustivel}
              </p>
            </div>
            <div className="glass-card border-t-0 rounded-t-none p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Valor FIPE</p>
                  <p className="text-3xl font-extrabold text-gradient font-display mt-1">{fipeResult.Valor}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">Ref: {fipeResult.MesReferencia}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Cód: {fipeResult.CodigoFipe}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          {chartData && (
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider">Histórico de preços</h3>
                <span className="ml-auto text-[9px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">simulado</span>
              </div>
              <PriceChart labels={chartData.labels} data={chartData.data} />
            </div>
          )}

          {/* ─── Dealometer ─── */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Gauge className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-sm font-bold font-display text-foreground">Dealometer</h2>
                <p className="text-[10px] text-muted-foreground">Compare com o valor do anúncio</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
                💰 Valor do Anúncio (R$)
              </label>
              <input type="text" inputMode="numeric" placeholder="Ex: 42.000" value={adValue}
                onChange={e => setAdValue(formatInput(e.target.value))}
                className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50 transition-all"
                style={{ height: '52px' }} />
            </div>

            <button onClick={handleEvaluate}
              className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] glow-primary">
              <Zap className="w-4 h-4" />
              Avaliar Negócio
            </button>
          </div>

          {/* Deal Result */}
          {dealResult && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center">
                <DealGauge percentage={dealResult.percentage} label={dealResult.label} color={dealResult.zone} />
                <div className="ember-line w-full my-4" />
                <p className="text-sm text-foreground/90 text-center leading-relaxed font-medium">{dealResult.message}</p>
              </div>

            </div>
          )}

          {/* ─── Financiamento Section ─── */}
          <FinanciamentoSection fipeValue={fipeValue} />
        </div>
      )}
    </div>
  );
};

export default CotacaoTab;
