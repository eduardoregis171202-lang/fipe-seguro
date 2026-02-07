import { useState } from "react";
import { ShieldCheck, ExternalLink, MapPin } from "lucide-react";

const DETRAN_URLS: Record<string, { nome: string; url: string }> = {
  AC: { nome: "Acre", url: "https://detran.ac.gov.br" },
  AL: { nome: "Alagoas", url: "https://www.detran.al.gov.br" },
  AP: { nome: "Amapá", url: "https://www.detran.ap.gov.br" },
  AM: { nome: "Amazonas", url: "https://www.detran.am.gov.br" },
  BA: { nome: "Bahia", url: "https://www.detran.ba.gov.br" },
  CE: { nome: "Ceará", url: "https://www.detran.ce.gov.br" },
  DF: { nome: "Distrito Federal", url: "https://www.detran.df.gov.br" },
  ES: { nome: "Espírito Santo", url: "https://www.detran.es.gov.br" },
  GO: { nome: "Goiás", url: "https://www.detran.go.gov.br" },
  MA: { nome: "Maranhão", url: "https://www.detran.ma.gov.br" },
  MT: { nome: "Mato Grosso", url: "https://www.detran.mt.gov.br" },
  MS: { nome: "Mato Grosso do Sul", url: "https://www.detran.ms.gov.br" },
  MG: { nome: "Minas Gerais", url: "https://www.detran.mg.gov.br" },
  PA: { nome: "Pará", url: "https://www.detran.pa.gov.br" },
  PB: { nome: "Paraíba", url: "https://www.detran.pb.gov.br" },
  PR: { nome: "Paraná", url: "https://www.detran.pr.gov.br" },
  PE: { nome: "Pernambuco", url: "https://www.detran.pe.gov.br" },
  PI: { nome: "Piauí", url: "https://www.detran.pi.gov.br" },
  RJ: { nome: "Rio de Janeiro", url: "https://www.detran.rj.gov.br" },
  RN: { nome: "Rio Grande do Norte", url: "https://www.detran.rn.gov.br" },
  RS: { nome: "Rio Grande do Sul", url: "https://www.detranrs.rs.gov.br" },
  RO: { nome: "Rondônia", url: "https://www.detran.ro.gov.br" },
  RR: { nome: "Roraima", url: "https://www.detran.rr.gov.br" },
  SC: { nome: "Santa Catarina", url: "https://www.detran.sc.gov.br" },
  SP: { nome: "São Paulo", url: "https://www.detran.sp.gov.br" },
  SE: { nome: "Sergipe", url: "https://www.detran.se.gov.br" },
  TO: { nome: "Tocantins", url: "https://www.detran.to.gov.br" },
};

// Mapeamento simplificado: primeira letra da placa → estado(s) mais comuns
// Formato antigo: ABC-1234 / Mercosul: ABC1D23
const PLACA_UF_MAP: Record<string, string> = {
  // Antigas
  A: "SP", B: "SP", C: "SP", D: "SP", E: "MG", F: "MG",
  G: "MG", H: "MG", I: "PR", J: "PR", K: "SC", L: "RS",
  M: "RS", N: "RS", O: "BA", P: "BA", Q: "CE", R: "PE",
  S: "RJ", T: "RJ", U: "GO", V: "DF", W: "MT", X: "PA",
  Y: "AM", Z: "AL",
};

function detectUF(placa: string): string | null {
  const clean = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length < 3) return null;
  const firstLetter = clean[0];
  return PLACA_UF_MAP[firstLetter] || null;
}

function isValidPlaca(placa: string): boolean {
  const clean = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
  // Formato antigo: AAA1234 ou Mercosul: AAA1A23
  const antigoRegex = /^[A-Z]{3}\d{4}$/;
  const mercosulRegex = /^[A-Z]{3}\d[A-Z]\d{2}$/;
  return antigoRegex.test(clean) || mercosulRegex.test(clean);
}

function formatPlaca(value: string): string {
  const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  if (clean.length <= 3) return clean;
  return clean.slice(0, 3) + '-' + clean.slice(3);
}

const DetranTab = () => {
  const [placa, setPlaca] = useState("");
  const [selectedUF, setSelectedUF] = useState("");
  const [detectedUF, setDetectedUF] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handlePlacaChange = (value: string) => {
    const formatted = formatPlaca(value);
    setPlaca(formatted);
    setError("");

    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length >= 3) {
      const uf = detectUF(clean);
      if (uf) {
        setDetectedUF(uf);
        setSelectedUF(uf);
      }
    } else {
      setDetectedUF(null);
    }
  };

  const handleConsultar = () => {
    if (!isValidPlaca(placa)) {
      setError("Placa inválida. Use o formato ABC-1234 ou ABC1D23.");
      return;
    }
    if (!selectedUF || !DETRAN_URLS[selectedUF]) {
      setError("Selecione o estado do veículo.");
      return;
    }
    setError("");
    window.open(DETRAN_URLS[selectedUF].url, '_blank', 'noopener,noreferrer');
  };

  const ufEntries = Object.entries(DETRAN_URLS).sort((a, b) => a[1].nome.localeCompare(b[1].nome));

  return (
    <div className="space-y-5">
      <div className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold font-display text-foreground">Consulta Detran</h2>
            <p className="text-[10px] text-muted-foreground">Verifique a situação do veículo</p>
          </div>
        </div>

        {/* Placa Input */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
            🔖 Placa do Veículo
          </label>
          <input
            type="text"
            inputMode="text"
            placeholder="Ex: ABC-1234"
            value={placa}
            onChange={e => handlePlacaChange(e.target.value)}
            maxLength={8}
            className="w-full px-4 rounded-xl bg-secondary text-foreground border border-border text-lg font-bold font-display tracking-[0.3em] text-center uppercase focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:text-sm placeholder:font-medium transition-all"
            style={{ height: '56px' }}
          />
        </div>

        {/* UF detected / select */}
        {detectedUF && DETRAN_URLS[detectedUF] && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/10 border border-accent/30">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            <p className="text-xs text-foreground">
              Estado detectado: <span className="font-bold text-accent">{DETRAN_URLS[detectedUF].nome} ({detectedUF})</span>
            </p>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
            📍 Estado (UF)
          </label>
          <div className="relative">
            <select
              value={selectedUF}
              onChange={e => setSelectedUF(e.target.value)}
              className="w-full px-4 pr-10 rounded-xl bg-secondary text-foreground border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer transition-all"
              style={{ height: '52px' }}
            >
              <option value="">Selecione o estado</option>
              {ufEntries.map(([uf, { nome }]) => (
                <option key={uf} value={uf}>{nome} ({uf})</option>
              ))}
            </select>
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {error && (
          <p className="text-xs text-destructive font-medium">{error}</p>
        )}

        <button
          onClick={handleConsultar}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.97] glow-primary"
        >
          <ExternalLink className="w-4 h-4" />
          Consultar no Detran
        </button>
      </div>

      {/* Info Card */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider">📋 O que consultar no Detran?</h3>
        <ul className="space-y-2">
          {[
            { emoji: "🔍", text: "Débitos e multas pendentes" },
            { emoji: "📄", text: "Situação do CRLV e licenciamento" },
            { emoji: "🚫", text: "Restrições e bloqueios judiciais" },
            { emoji: "🔁", text: "Recall pendente do fabricante" },
            { emoji: "⚠️", text: "Registro de sinistro ou roubo/furto" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-foreground/80">
              <span className="shrink-0">{item.emoji}</span>
              {item.text}
            </li>
          ))}
        </ul>
        <div className="mt-2 p-3 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-[10px] text-accent font-semibold">
            💡 Dica: Sempre consulte antes de comprar um veículo usado. É gratuito na maioria dos estados!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetranTab;
