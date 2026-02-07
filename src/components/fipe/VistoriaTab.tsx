import { useState, useEffect } from "react";
import { ClipboardCheck, CheckCircle2, Circle, RotateCcw, Share2 } from "lucide-react";

interface CheckItem {
  id: string;
  text: string;
  checked: boolean;
}

interface CheckCategory {
  name: string;
  icon: string;
  items: CheckItem[];
}

const initialChecklist: CheckCategory[] = [
  {
    name: "Documentação",
    icon: "📄",
    items: [
      { id: "doc1", text: "CRLV em dia e sem restrições", checked: false },
      { id: "doc2", text: "Verificar débitos de IPVA e multas", checked: false },
      { id: "doc3", text: "Consultar situação no Detran (roubo/furto)", checked: false },
      { id: "doc4", text: "Conferir número do chassi com documento", checked: false },
      { id: "doc5", text: "Verificar se há financiamento em aberto", checked: false },
      { id: "doc6", text: "Checar recalls pendentes no site do fabricante", checked: false },
    ],
  },
  {
    name: "Exterior",
    icon: "🚗",
    items: [
      { id: "ext1", text: "Verificar pintura (diferenças de tom = repintura)", checked: false },
      { id: "ext2", text: "Checar alinhamento de portas e capô", checked: false },
      { id: "ext3", text: "Procurar ferrugem (caixas de roda, soleira, assoalho)", checked: false },
      { id: "ext4", text: "Conferir pneus (desgaste uniforme, marca, DOT)", checked: false },
      { id: "ext5", text: "Verificar vidros (trincas, marca original)", checked: false },
      { id: "ext6", text: "Testar todas as luzes (farol, ré, seta, freio)", checked: false },
      { id: "ext7", text: "Checar para-choques (encaixe, riscos profundos)", checked: false },
    ],
  },
  {
    name: "Interior",
    icon: "💺",
    items: [
      { id: "int1", text: "Verificar odor (mofo, cigarro, animal)", checked: false },
      { id: "int2", text: "Testar ar-condicionado (frio forte)", checked: false },
      { id: "int3", text: "Conferir painel (todas as luzes acendem na chave)", checked: false },
      { id: "int4", text: "Testar todos os vidros elétricos", checked: false },
      { id: "int5", text: "Verificar bancos (rasgos, manchas, ajustes)", checked: false },
      { id: "int6", text: "Testar multimídia, rádio e USB", checked: false },
      { id: "int7", text: "Checar retrovisores elétricos", checked: false },
    ],
  },
  {
    name: "Motor",
    icon: "🔧",
    items: [
      { id: "mot1", text: "Motor frio: verificar cor do óleo (tampa)", checked: false },
      { id: "mot2", text: "Checar nível e cor do líquido de arrefecimento", checked: false },
      { id: "mot3", text: "Observar fumaça no escapamento (azul/branca = problema)", checked: false },
      { id: "mot4", text: "Ouvir ruídos estranhos em marcha lenta", checked: false },
      { id: "mot5", text: "Verificar correias e mangueiras (rachaduras)", checked: false },
      { id: "mot6", text: "Checar bateria (data, terminais)", checked: false },
    ],
  },
  {
    name: "Test Drive",
    icon: "🏁",
    items: [
      { id: "td1", text: "Testar freios (ruído, vibração, eficiência)", checked: false },
      { id: "td2", text: "Verificar câmbio (trocas suaves, sem trancos)", checked: false },
      { id: "td3", text: "Ouvir suspensão em buracos e lombadas", checked: false },
      { id: "td4", text: "Testar direção (alinhamento, barulhos)", checked: false },
      { id: "td5", text: "Verificar se puxa para algum lado", checked: false },
      { id: "td6", text: "Observar temperatura do motor após 15min", checked: false },
    ],
  },
];

const STORAGE_KEY = "fipe_scanner_vistoria";

const VistoriaTab = () => {
  const [checklist, setChecklist] = useState<CheckCategory[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialChecklist;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  const toggleItem = (catIndex: number, itemId: string) => {
    setChecklist(prev => prev.map((cat, ci) =>
      ci === catIndex
        ? { ...cat, items: cat.items.map(item => item.id === itemId ? { ...item, checked: !item.checked } : item) }
        : cat
    ));
  };

  const totalItems = checklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedItems = checklist.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0);
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  const handleReset = () => setChecklist(initialChecklist);

  const handleShare = () => {
    const unchecked = checklist.flatMap(cat =>
      cat.items.filter(i => !i.checked).map(i => `❌ ${i.text}`)
    );
    const checked = checklist.flatMap(cat =>
      cat.items.filter(i => i.checked).map(i => `✅ ${i.text}`)
    );
    const text = encodeURIComponent(
      `📋 *Vistoria Veicular - Fipe Scanner*\n\n` +
      `✅ ${checkedItems}/${totalItems} itens verificados\n\n` +
      (unchecked.length > 0 ? `*Pendentes:*\n${unchecked.slice(0, 10).join('\n')}\n\n` : '') +
      `_Verificado via Fipe Scanner_`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-5">
      {/* Progress Header */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <ClipboardCheck className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold font-display text-foreground">Checklist de Vistoria</h2>
            <p className="text-[10px] text-muted-foreground">Verifique cada item antes de comprar</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'gradient-success' : 'gradient-primary'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-bold font-display text-foreground">{checkedItems}/{totalItems}</span>
        </div>

        <div className="flex gap-2">
          <button onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all">
            <RotateCcw className="w-3.5 h-3.5" /> Resetar
          </button>
          <button onClick={handleShare}
            className="flex-1 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all">
            <Share2 className="w-3.5 h-3.5" /> Compartilhar
          </button>
        </div>
      </div>

      {/* Categories */}
      {checklist.map((cat, catIndex) => {
        const catChecked = cat.items.filter(i => i.checked).length;
        return (
          <div key={cat.name} className="glass-card rounded-2xl overflow-hidden">
            <div className="p-4 pb-2 flex items-center justify-between">
              <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider">
                {cat.icon} {cat.name}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                catChecked === cat.items.length ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'
              }`}>
                {catChecked}/{cat.items.length}
              </span>
            </div>
            <div className="px-2 pb-2">
              {cat.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(catIndex, item.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all active:scale-[0.98] ${
                    item.checked ? 'bg-success/5' : 'hover:bg-secondary/50'
                  }`}
                >
                  {item.checked
                    ? <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    : <Circle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  }
                  <span className={`text-sm leading-snug ${item.checked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VistoriaTab;
