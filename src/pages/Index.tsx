import { useState } from "react";
import { Gauge, ClipboardCheck, ArrowLeftRight, Wallet, History, Flame } from "lucide-react";
import CotacaoTab from "@/components/fipe/CotacaoTab";
import VistoriaTab from "@/components/fipe/VistoriaTab";
import ComparadorTab from "@/components/fipe/ComparadorTab";
import CustoTab from "@/components/fipe/CustoTab";
import HistoricoTab from "@/components/fipe/HistoricoTab";

type TabId = 'cotacao' | 'vistoria' | 'comparador' | 'custo' | 'historico';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'cotacao', label: 'Cotação', icon: <Gauge className="w-4.5 h-4.5" /> },
  { id: 'vistoria', label: 'Vistoria', icon: <ClipboardCheck className="w-4.5 h-4.5" /> },
  { id: 'comparador', label: 'Comparar', icon: <ArrowLeftRight className="w-4.5 h-4.5" /> },
  { id: 'custo', label: 'Custo', icon: <Wallet className="w-4.5 h-4.5" /> },
  { id: 'historico', label: 'Histórico', icon: <History className="w-4.5 h-4.5" /> },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('cotacao');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 px-4 pt-3 pb-0">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-gradient tracking-tight">
                Fipe Scanner
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Compre seu carro com segurança</p>
            </div>
          </div>

          {/* Scrollable Tab Bar */}
          <div className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-[0.95] shrink-0 ${
                  activeTab === tab.id
                    ? 'gradient-primary text-primary-foreground glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="ember-line rounded-full" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5 pb-8 max-w-lg mx-auto w-full">
        {activeTab === 'cotacao' && <CotacaoTab />}
        {activeTab === 'vistoria' && <VistoriaTab />}
        {activeTab === 'comparador' && <ComparadorTab />}
        {activeTab === 'custo' && <CustoTab />}
        {activeTab === 'historico' && <HistoricoTab />}
      </main>

      {/* Footer */}
      <footer className="px-4 py-4 border-t border-border/30">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[10px] text-muted-foreground">
            Dados fornecidos pela Tabela FIPE · Fipe Scanner © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
