import { X, ThumbsUp, ThumbsDown, MessageCircle, Car } from "lucide-react";
import { CarData } from "@/data/carDatabase";
import { formatCurrency } from "@/services/fipeApi";

interface CarDetailModalProps {
  car: CarData;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "5511999999999"; // placeholder

const CarDetailModal = ({ car, onClose }: CarDetailModalProps) => {
  const avgPrice = Math.round((car.precoEstimado.min + car.precoEstimado.max) / 2);

  const handleCTA = () => {
    const msg = encodeURIComponent(
      `Olá! Vi o ${car.nome} no Fipe Scanner e gostaria de uma consultoria técnica antes de comprar.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-t-2xl sm:rounded-2xl p-5 animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">{car.nome}</h2>
              <p className="text-xs text-muted-foreground">{car.marca} · {car.anosReferencia[0]}-{car.anosReferencia[car.anosReferencia.length - 1]}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Price */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Faixa de preço estimada</p>
          <p className="text-2xl font-bold text-gradient">{formatCurrency(avgPrice)}</p>
          <p className="text-xs text-muted-foreground">
            De {formatCurrency(car.precoEstimado.min)} até {formatCurrency(car.precoEstimado.max)}
          </p>
        </div>

        {/* Specs */}
        <div className="space-y-3 mb-4">
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">🔧 Motor</p>
            <p className="text-sm text-foreground">{car.detalhes.motor}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">⛽ Consumo</p>
            <p className="text-sm text-foreground">{car.detalhes.consumo}</p>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-accent" />
              <p className="text-xs font-semibold text-accent">Pontos Positivos</p>
            </div>
            <ul className="space-y-1.5">
              {car.detalhes.pontosPositivos.map((p, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ThumbsDown className="w-4 h-4 text-destructive" />
              <p className="text-xs font-semibold text-destructive">Pontos Negativos</p>
            </div>
            <ul className="space-y-1.5">
              {car.detalhes.pontosNegativos.map((p, i) => (
                <li key={i} className="text-sm text-foreground/90 flex items-start gap-2">
                  <span className="text-destructive mt-0.5">✗</span> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="glass-card rounded-xl p-4 mb-5 border-primary/30">
          <p className="text-xs font-semibold text-primary mb-1">💡 Veredito do Especialista</p>
          <p className="text-sm text-foreground/90 leading-relaxed">{car.detalhes.veredito}</p>
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          className="w-full py-4 rounded-xl gradient-success text-success-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] animate-pulse-glow"
        >
          <MessageCircle className="w-5 h-5" />
          Medo de comprar bomba? Contrate minha Consultoria
        </button>
      </div>
    </div>
  );
};

export default CarDetailModal;
