import { useState, useEffect } from "react";
import { History, Trash2, ExternalLink, Clock } from "lucide-react";
import { formatCurrency } from "@/services/fipeApi";

export interface HistoricoEntry {
  id: string;
  tipo: 'cotacao' | 'financiamento' | 'custo';
  titulo: string;
  resumo: string;
  data: string;
  dados: Record<string, any>;
}

const STORAGE_KEY = "fipe_scanner_historico";

export function salvarHistorico(entry: Omit<HistoricoEntry, 'id' | 'data'>) {
  const historico = getHistorico();
  const newEntry: HistoricoEntry = {
    ...entry,
    id: Date.now().toString(),
    data: new Date().toISOString(),
  };
  historico.unshift(newEntry);
  // Keep last 50 entries
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historico.slice(0, 50)));
}

export function getHistorico(): HistoricoEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const HistoricoTab = () => {
  const [entries, setEntries] = useState<HistoricoEntry[]>(getHistorico());

  useEffect(() => {
    setEntries(getHistorico());
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEntries([]);
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEntries(updated);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const tipoIcon: Record<string, string> = {
    cotacao: '🎯',
    financiamento: '🏦',
    custo: '🧮',
  };

  const tipoColor: Record<string, string> = {
    cotacao: 'bg-primary/10 text-primary',
    financiamento: 'bg-accent/10 text-accent',
    custo: 'bg-success/10 text-success',
  };

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <History className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-display text-foreground">Histórico</h2>
              <p className="text-[10px] text-muted-foreground">{entries.length} consultas salvas</p>
            </div>
          </div>
          {entries.length > 0 && (
            <button onClick={handleClear}
              className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all">
              <Trash2 className="w-3 h-3" /> Limpar
            </button>
          )}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
          <p className="text-sm text-muted-foreground">Nenhuma consulta salva ainda</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Suas cotações e simulações aparecerão aqui</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {entries.map(entry => (
            <div key={entry.id} className="glass-card rounded-xl p-4 flex items-start gap-3">
              <div className="text-lg mt-0.5">{tipoIcon[entry.tipo] || '📋'}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tipoColor[entry.tipo] || 'bg-secondary text-muted-foreground'}`}>
                    {entry.tipo}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{formatDate(entry.data)}</span>
                </div>
                <p className="text-sm font-semibold text-foreground truncate">{entry.titulo}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{entry.resumo}</p>
              </div>
              <button onClick={() => handleDelete(entry.id)}
                className="p-2 rounded-lg hover:bg-destructive/10 transition-colors shrink-0">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoTab;
