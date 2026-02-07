import { useState, useEffect } from "react";
import { Search, Share2, AlertCircle, ChevronDown, TrendingUp } from "lucide-react";
import {
  fetchMarcas, fetchModelos, fetchAnos, fetchPreco,
  parseFipeValue, formatCurrency, generateSimulatedHistory, generateWhatsAppShareText,
  type FipeMarca, type FipeModelo, type FipeAno, type FipePreco
} from "@/services/fipeApi";
import LoadingSpinner from "./LoadingSpinner";
import PriceChart from "./PriceChart";

const PesquisaTab = () => {
  const [marcas, setMarcas] = useState<FipeMarca[]>([]);
  const [modelos, setModelos] = useState<FipeModelo[]>([]);
  const [anos, setAnos] = useState<FipeAno[]>([]);

  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedModelo, setSelectedModelo] = useState("");
  const [selectedAno, setSelectedAno] = useState("");

  const [resultado, setResultado] = useState<FipePreco | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] } | null>(null);

  const [loadingMarcas, setLoadingMarcas] = useState(false);
  const [loadingModelos, setLoadingModelos] = useState(false);
  const [loadingAnos, setLoadingAnos] = useState(false);
  const [loadingPreco, setLoadingPreco] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoadingMarcas(true);
    setError("");
    fetchMarcas()
      .then(setMarcas)
      .catch(() => setError("Erro ao carregar marcas. Tente novamente."))
      .finally(() => setLoadingMarcas(false));
  }, []);

  useEffect(() => {
    if (!selectedMarca) { setModelos([]); return; }
    setSelectedModelo("");
    setSelectedAno("");
    setResultado(null);
    setChartData(null);
    setLoadingModelos(true);
    setError("");
    fetchModelos(selectedMarca)
      .then(res => setModelos(res.modelos))
      .catch(() => setError("Erro ao carregar modelos."))
      .finally(() => setLoadingModelos(false));
  }, [selectedMarca]);

  useEffect(() => {
    if (!selectedMarca || !selectedModelo) { setAnos([]); return; }
    setSelectedAno("");
    setResultado(null);
    setChartData(null);
    setLoadingAnos(true);
    setError("");
    fetchAnos(selectedMarca, selectedModelo)
      .then(setAnos)
      .catch(() => setError("Erro ao carregar anos."))
      .finally(() => setLoadingAnos(false));
  }, [selectedMarca, selectedModelo]);

  const handleSearch = async () => {
    if (!selectedMarca || !selectedModelo || !selectedAno) return;
    setLoadingPreco(true);
    setError("");
    try {
      const preco = await fetchPreco(selectedMarca, selectedModelo, selectedAno);
      setResultado(preco);
      const price = parseFipeValue(preco.Valor);
      setChartData(generateSimulatedHistory(price));
    } catch {
      setError("Erro ao consultar preço. Tente novamente.");
    } finally {
      setLoadingPreco(false);
    }
  };

  const handleShare = () => {
    if (!resultado) return;
    const text = generateWhatsAppShareText(resultado.Marca, resultado.Modelo, resultado.AnoModelo, resultado.Valor);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const SelectField = ({
    label, value, onChange, options, loading, disabled, icon
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    loading: boolean;
    disabled: boolean;
    icon?: string;
  }) => (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
        {icon} {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled || loading}
          className="w-full h-13 px-4 pr-10 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-30 appearance-none cursor-pointer transition-all"
          style={{ height: '52px' }}
        >
          <option value="">
            {loading ? "Carregando..." : `Selecione`}
          </option>
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Search Form */}
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Search className="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 className="text-sm font-bold font-display text-foreground">Scanner de Mercado</h2>
        </div>

        <SelectField
          label="Marca" icon="🏭"
          value={selectedMarca} onChange={setSelectedMarca}
          options={marcas.map(m => ({ value: m.codigo, label: m.nome }))}
          loading={loadingMarcas} disabled={false}
        />
        <SelectField
          label="Modelo" icon="🚗"
          value={selectedModelo} onChange={setSelectedModelo}
          options={modelos.map(m => ({ value: String(m.codigo), label: m.nome }))}
          loading={loadingModelos} disabled={!selectedMarca}
        />
        <SelectField
          label="Ano" icon="📅"
          value={selectedAno} onChange={setSelectedAno}
          options={anos.map(a => ({ value: a.codigo, label: a.nome }))}
          loading={loadingAnos} disabled={!selectedModelo}
        />

        <button
          onClick={handleSearch}
          disabled={!selectedAno || loadingPreco}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-40 glow-primary"
        >
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

      {/* Result */}
      {resultado && !loadingPreco && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
          {/* Price Card */}
          <div className="rounded-2xl overflow-hidden">
            <div className="gradient-primary p-5 pb-4">
              <p className="text-xs text-primary-foreground/70 font-medium">Resultado da consulta</p>
              <h3 className="font-bold text-primary-foreground text-lg font-display mt-1">
                {resultado.Marca} {resultado.Modelo}
              </h3>
              <p className="text-xs text-primary-foreground/60 mt-0.5">
                Ano: {resultado.AnoModelo} · {resultado.Combustivel}
              </p>
            </div>
            <div className="glass-card border-t-0 rounded-t-none p-5">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Valor FIPE</p>
                  <p className="text-3xl font-extrabold text-gradient font-display mt-1">{resultado.Valor}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground">Ref: {resultado.MesReferencia}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Cód: {resultado.CodigoFipe}</p>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="mt-5 w-full py-3.5 rounded-xl bg-accent text-accent-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] glow-accent"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar no WhatsApp
              </button>
            </div>
          </div>

          {/* Chart */}
          {chartData && (
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider">
                  Histórico de preços
                </h3>
                <span className="ml-auto text-[9px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">simulado</span>
              </div>
              <PriceChart labels={chartData.labels} data={chartData.data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PesquisaTab;
