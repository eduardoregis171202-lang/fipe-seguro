import { useState } from "react";
import { Search, ShieldCheck, Scan } from "lucide-react";
import PesquisaTab from "@/components/fipe/PesquisaTab";
import CotacaoTab from "@/components/fipe/CotacaoTab";

type TabId = 'pesquisa' | 'cotacao';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'pesquisa', label: 'Pesquisa', icon: <Search className="w-5 h-5" /> },
  { id: 'cotacao', label: 'Cotação', icon: <ShieldCheck className="w-5 h-5" /> },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('pesquisa');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Scan className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground tracking-tight">Fipe Scanner</h1>
            <p className="text-[10px] text-muted-foreground">Compre seu carro com segurança</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5 pb-24 max-w-lg mx-auto w-full">
        {activeTab === 'pesquisa' && <PesquisaTab />}
        {activeTab === 'cotacao' && <CotacaoTab />}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-t border-border/50 safe-bottom">
        <div className="max-w-lg mx-auto flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Index;
