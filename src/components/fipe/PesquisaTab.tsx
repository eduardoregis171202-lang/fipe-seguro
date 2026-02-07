import { useState, useEffect } from "react";
import { Search, Share2, AlertCircle } from "lucide-react";
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

  // Load marcas on mount
  useEffect(() => {
    setLoadingMarcas(true);
    setError("");
    fetchMarcas()
      .then(setMarcas)
      .catch(() => setError("Erro ao carregar marcas. Tente novamente."))
      .finally(() => setLoadingMarcas(false));
  }, []);

  // Load modelos when marca changes
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

  // Load anos when modelo changes
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
    label, value, onChange, options, loading, disabled
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    loading: boolean;
    disabled: boolean;
  }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled || loading}
        className="w-full h-12 px-3 rounded-xl bg-secondary text-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-40 appearance-none cursor-pointer"
      >
        <option value="">
          {loading ? "Carregando..." : `Selecione ${label.toLowerCase()}`}
        </option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Scanner de Mercado</h2>
        
        <SelectField
          label="Marca"
          value={selectedMarca}
          onChange={setSelectedMarca}
          options={marcas.map(m => ({ value: m.codigo, label: m.nome }))}
          loading={loadingMarcas}
          disabled={false}
        />
        <SelectField
          label="Modelo"
          value={selectedModelo}
          onChange={setSelectedModelo}
          options={modelos.map(m => ({ value: String(m.codigo), label: m.nome }))}
          loading={loadingModelos}
          disabled={!selectedMarca}
        />
        <SelectField
          label="Ano"
          value={selectedAno}
          onChange={setSelectedAno}
          options={anos.map(a => ({ value: a.codigo, label: a.nome }))}
          loading={loadingAnos}
          disabled={!selectedModelo}
        />

        <button
          onClick={handleSearch}
          disabled={!selectedAno || loadingPreco}
          className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          Consultar Preço FIPE
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loadingPreco && <LoadingSpinner text="Consultando tabela FIPE..." />}

      {/* Result */}
      {resultado && !loadingPreco && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
          <div className="glass-card rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">Resultado da consulta</p>
            <h3 className="font-bold text-foreground">{resultado.Marca} {resultado.Modelo}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Ano: {resultado.AnoModelo} · {resultado.Combustivel} · Ref: {resultado.MesReferencia}
            </p>
            <p className="text-3xl font-bold text-gradient mt-3">{resultado.Valor}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Código FIPE: {resultado.CodigoFipe}</p>

            <button
              onClick={handleShare}
              className="mt-4 w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar no WhatsApp
            </button>
          </div>

          {/* Chart */}
          {chartData && (
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                Histórico de preços (simulado)
              </h3>
              <PriceChart labels={chartData.labels} data={chartData.data} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PesquisaTab;
