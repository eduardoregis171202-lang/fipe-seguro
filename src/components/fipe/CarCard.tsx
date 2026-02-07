import { Car, Eye } from "lucide-react";
import { CarData } from "@/data/carDatabase";
import { formatCurrency } from "@/services/fipeApi";

interface CarCardProps {
  car: CarData;
  onViewDetails: (car: CarData) => void;
}

const CarCard = ({ car, onViewDetails }: CarCardProps) => {
  const avgPrice = Math.round((car.precoEstimado.min + car.precoEstimado.max) / 2);

  return (
    <div className="glass-card rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 active:scale-[0.98]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
          <Car className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">{car.nome}</h3>
          <p className="text-xs text-muted-foreground">{car.marca}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Preço médio estimado</p>
          <p className="text-lg font-bold text-gradient">{formatCurrency(avgPrice)}</p>
          <p className="text-[10px] text-muted-foreground">
            {formatCurrency(car.precoEstimado.min)} - {formatCurrency(car.precoEstimado.max)}
          </p>
        </div>
        <button
          onClick={() => onViewDetails(car)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-xs font-medium transition-transform active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          Detalhes
        </button>
      </div>
    </div>
  );
};

export default CarCard;
