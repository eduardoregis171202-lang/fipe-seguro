import { useState } from "react";
import { Search, ShieldCheck, Gauge, Flame } from "lucide-react";
import PesquisaTab from "@/components/fipe/PesquisaTab";
import CotacaoTab from "@/components/fipe/CotacaoTab";

type TabId = 'pesquisa' | 'cotacao';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'pesquisa', label: 'Pesquisa', icon: <Search className="w-5 h-5" /> },
  { id: 'cotacao', label: 'Cotação', icon: <Gauge className="w-5 h-5" /> },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('pesquisa');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 px-4 pt-3 pb-2">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
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
          {/* Ember line */}
          <div className="ember-line mt-3 rounded-full" />
        </div>
      </header>

      {/* Tab Switcher */}
      <div className="sticky top-[68px] z-30 bg-background/80 backdrop-blur-xl px-4 py-2.5">
        <div className="max-w-lg mx-auto flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                activeTab === tab.id
                  ? 'gradient-primary text-primary-foreground glow-primary'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-6 max-w-lg mx-auto w-full">
        {activeTab === 'pesquisa' && <PesquisaTab />}
        {activeTab === 'cotacao' && <CotacaoTab />}
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
