import { useState, useMemo } from "react";
import { Search, Download, Car } from "lucide-react";
import { CATEGORIAS, getCarsWithinBudget, type CarData } from "@/data/carDatabase";
import { formatCurrency } from "@/services/fipeApi";
import CarCard from "./CarCard";
import CarDetailModal from "./CarDetailModal";
import { jsPDF } from "jspdf";

const BUDGET_PRESETS = [20000, 35000, 50000, 70000, 100000, 150000];

const CarIdealTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<CarData['categoria'] | null>(null);
  const [budget, setBudget] = useState(50000);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (!selectedCategory) return [];
    return getCarsWithinBudget(selectedCategory, budget);
  }, [selectedCategory, budget]);

  const handleSearch = () => {
    if (selectedCategory) setShowResults(true);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Fipe Scanner - Carros Recomendados", 20, 20);

    doc.setFontSize(11);
    doc.text(`Perfil: ${selectedCategory ? CATEGORIAS[selectedCategory].label : ''}`, 20, 32);
    doc.text(`Orçamento: ${formatCurrency(budget)}`, 20, 39);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 46);

    let y = 58;
    results.forEach((car, i) => {
      if (y > 260) { doc.addPage(); y = 20; }
      const avg = Math.round((car.precoEstimado.min + car.precoEstimado.max) / 2);
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${car.nome}`, 20, y);
      doc.setFontSize(9);
      doc.text(`Preço médio: ${formatCurrency(avg)} | Motor: ${car.detalhes.motor}`, 25, y + 6);
      doc.text(`Veredito: ${car.detalhes.veredito.substring(0, 90)}...`, 25, y + 12);
      y += 22;
    });

    doc.setFontSize(8);
    doc.setTextColor(130);
    doc.text("Relatório gerado por Fipe Scanner | fipescanner.com.br", 20, 285);

    doc.save(`fipe-scanner-${selectedCategory}.pdf`);
  };

  return (
    <div className="space-y-5">
      {/* Category Selection */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Qual seu perfil?</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {(Object.entries(CATEGORIAS) as [CarData['categoria'], typeof CATEGORIAS[keyof typeof CATEGORIAS]][]).map(
            ([key, cat]) => (
              <button
                key={key}
                onClick={() => { setSelectedCategory(key); setShowResults(false); }}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 active:scale-[0.97] ${
                  selectedCategory === key
                    ? "gradient-primary text-primary-foreground glow-primary"
                    : "glass-card hover:border-primary/30"
                }`}
              >
                <p className="text-sm font-semibold">{cat.label}</p>
                <p className={`text-[10px] mt-0.5 ${selectedCategory === key ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {cat.desc}
                </p>
              </button>
            )
          )}
        </div>
      </div>

      {/* Budget */}
      {selectedCategory && (
        <div className="glass-card rounded-xl p-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Orçamento máximo</h2>
          <p className="text-3xl font-bold text-gradient mb-4">{formatCurrency(budget)}</p>
          
          <input
            type="range"
            min={10000}
            max={160000}
            step={5000}
            value={budget}
            onChange={(e) => { setBudget(Number(e.target.value)); setShowResults(false); }}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>R$ 10 mil</span>
            <span>R$ 160 mil</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {BUDGET_PRESETS.map(v => (
              <button
                key={v}
                onClick={() => { setBudget(v); setShowResults(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  budget === v
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {v >= 1000 ? `${v / 1000}k` : v}
              </button>
            ))}
          </div>

          <button
            onClick={handleSearch}
            className="w-full mt-4 py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            Buscar Carros
          </button>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </h2>
            {results.length > 0 && (
              <button
                onClick={handleGeneratePDF}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <Car className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Nenhum carro encontrado nessa faixa de preço.</p>
              <p className="text-xs text-muted-foreground mt-1">Tente aumentar o orçamento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map(car => (
                <CarCard key={car.id} car={car} onViewDetails={setSelectedCar} />
              ))}
            </div>
          )}
        </div>
      )}

      {selectedCar && <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />}
    </div>
  );
};

export default CarIdealTab;
