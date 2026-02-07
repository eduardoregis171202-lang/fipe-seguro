import { useState } from "react";
import { Wallet, Fuel, Shield, Wrench, Receipt, DollarSign } from "lucide-react";
import { formatCurrency } from "@/services/fipeApi";

const estados = [
  { uf: "SP", aliquota: 4 }, { uf: "RJ", aliquota: 4 }, { uf: "MG", aliquota: 4 },
  { uf: "PR", aliquota: 3.5 }, { uf: "SC", aliquota: 2 }, { uf: "RS", aliquota: 3 },
  { uf: "BA", aliquota: 3 }, { uf: "PE", aliquota: 3 }, { uf: "CE", aliquota: 3 },
  { uf: "GO", aliquota: 3.75 }, { uf: "DF", aliquota: 3.5 }, { uf: "PA", aliquota: 2.5 },
  { uf: "MA", aliquota: 2.5 }, { uf: "ES", aliquota: 2 }, { uf: "MT", aliquota: 3 },
  { uf: "MS", aliquota: 3.5 }, { uf: "AM", aliquota: 3 }, { uf: "PI", aliquota: 2.5 },
  { uf: "AL", aliquota: 3 }, { uf: "SE", aliquota: 2.5 }, { uf: "RN", aliquota: 3 },
  { uf: "PB", aliquota: 2.5 }, { uf: "RO", aliquota: 3 }, { uf: "TO", aliquota: 2 },
  { uf: "AC", aliquota: 2 }, { uf: "AP", aliquota: 3 }, { uf: "RR", aliquota: 3 },
].sort((a, b) => a.uf.localeCompare(b.uf));

interface CostResult {
  ipva: number;
  seguro: number;
  combustivel: number;
  manutencao: number;
  total: number;
}

const CustoTab = () => {
  const [valorFipe, setValorFipe] = useState("");
  const [estado, setEstado] = useState("SP");
  const [kmMes, setKmMes] = useState("1500");
  const [consumo, setConsumo] = useState("12");
  const [precoCombustivel, setPrecoCombustivel] = useState("5.80");
  const [idadeCarro, setIdadeCarro] = useState("5");
  const [result, setResult] = useState<CostResult | null>(null);

  const formatInput = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('pt-BR');
  };

  const handleCalculate = () => {
    const fipe = Number(valorFipe.replace(/\D/g, ''));
    const km = Number(kmMes);
    const cons = Number(consumo.replace(',', '.'));
    const preco = Number(precoCombustivel.replace(',', '.'));
    const idade = Number(idadeCarro);
    const aliquota = estados.find(e => e.uf === estado)?.aliquota || 4;

    if (!fipe || !km || !cons || !preco) return;

    const ipvaMensal = (fipe * (aliquota / 100)) / 12;
    const seguroMensal = (fipe * (idade > 10 ? 0.06 : idade > 5 ? 0.05 : 0.04)) / 12;
    const combustivelMensal = (km / cons) * preco;
    const manutencaoMensal = idade > 10 ? 450 : idade > 5 ? 300 : 180;

    const total = ipvaMensal + seguroMensal + combustivelMensal + manutencaoMensal;

    setResult({
      ipva: Math.round(ipvaMensal),
      seguro: Math.round(seguroMensal),
      combustivel: Math.round(combustivelMensal),
      manutencao: manutencaoMensal,
      total: Math.round(total),
    });
  };

  const CostBar = ({ label, icon, value, total, color }: {
    label: string; icon: React.ReactNode; value: number; total: number; color: string;
  }) => (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-foreground">{label}</span>
          <span className="text-xs font-bold text-foreground font-display">{formatCurrency(value)}/mês</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${color}`}
            style={{ width: `${(value / total) * 100}%` }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Wallet className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Custo de Propriedade</h2>
            <p className="text-[10px] text-muted-foreground">Quanto custa manter seu carro por mês</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">💰 Valor FIPE (R$)</label>
          <input type="text" inputMode="numeric" placeholder="Ex: 50.000" value={valorFipe}
            onChange={e => setValorFipe(formatInput(e.target.value))}
            className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50" style={{ height: '52px' }} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">📍 Estado</label>
            <select value={estado} onChange={e => setEstado(e.target.value)}
              className="w-full px-3 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer" style={{ height: '52px' }}>
              {estados.map(e => <option key={e.uf} value={e.uf}>{e.uf} ({e.aliquota}%)</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">📅 Idade (anos)</label>
            <input type="text" inputMode="numeric" placeholder="5" value={idadeCarro}
              onChange={e => setIdadeCarro(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50" style={{ height: '52px' }} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">🛣️ KM/mês</label>
            <input type="text" inputMode="numeric" placeholder="1500" value={kmMes}
              onChange={e => setKmMes(e.target.value.replace(/\D/g, ''))}
              className="w-full px-3 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50" style={{ height: '52px' }} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">⛽ KM/L</label>
            <input type="text" inputMode="decimal" placeholder="12" value={consumo}
              onChange={e => setConsumo(e.target.value)}
              className="w-full px-3 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50" style={{ height: '52px' }} />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">⛽ R$/L</label>
            <input type="text" inputMode="decimal" placeholder="5.80" value={precoCombustivel}
              onChange={e => setPrecoCombustivel(e.target.value)}
              className="w-full px-3 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50" style={{ height: '52px' }} />
          </div>
        </div>

        <button onClick={handleCalculate}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] glow-primary">
          <Receipt className="w-4 h-4" />
          Calcular Custo Mensal
        </button>
      </div>

      {result && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 space-y-4">
          {/* Total */}
          <div className="rounded-2xl overflow-hidden">
            <div className="gradient-primary p-5">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wider font-medium">Custo mensal total</p>
              <p className="text-4xl font-extrabold text-primary-foreground font-display mt-1">
                {formatCurrency(result.total)}
              </p>
              <p className="text-xs text-primary-foreground/60 mt-1">{formatCurrency(result.total * 12)}/ano</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="glass-card rounded-2xl p-5 space-y-4">
            <CostBar label="Combustível" icon={<Fuel className="w-4 h-4 text-accent" />} value={result.combustivel} total={result.total} color="gradient-warning" />
            <CostBar label="IPVA" icon={<DollarSign className="w-4 h-4 text-primary" />} value={result.ipva} total={result.total} color="gradient-primary" />
            <CostBar label="Seguro" icon={<Shield className="w-4 h-4 text-destructive" />} value={result.seguro} total={result.total} color="gradient-danger" />
            <CostBar label="Manutenção" icon={<Wrench className="w-4 h-4 text-muted-foreground" />} value={result.manutencao} total={result.total} color="bg-muted-foreground" />
          </div>

          <div className="glass-card rounded-xl p-4 border-accent/30">
            <p className="text-xs text-accent font-semibold mb-1">💡 Dica</p>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {result.combustivel > result.total * 0.5
                ? "Combustível é mais da metade do custo. Considere um carro mais econômico ou com motor flex."
                : result.seguro > result.ipva
                ? "Seguro está caro. Pesquise em diferentes seguradoras e considere rastreador para desconto."
                : "Distribução de custos equilibrada. Mantenha as revisões em dia para evitar surpresas!"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustoTab;
