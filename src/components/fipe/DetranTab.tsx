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

// Faixas oficiais de placas por estado brasileiro (fonte: DENATRAN)
const PLACA_FAIXAS: { inicio: string; fim: string; uf: string }[] = [
  // Faixas principais
  { inicio: "AAA", fim: "BEZ", uf: "PR" },
  { inicio: "BFA", fim: "GKI", uf: "SP" },
  { inicio: "GKJ", fim: "HOK", uf: "MG" },
  { inicio: "HOL", fim: "HQE", uf: "MA" },
  { inicio: "HQF", fim: "HTW", uf: "MS" },
  { inicio: "HTX", fim: "HZA", uf: "CE" },
  { inicio: "HZB", fim: "IAP", uf: "SE" },
  { inicio: "IAQ", fim: "JDO", uf: "RS" },
  { inicio: "JDP", fim: "JKR", uf: "DF" },
  { inicio: "JKS", fim: "JSZ", uf: "BA" },
  { inicio: "JTA", fim: "JWE", uf: "PA" },
  { inicio: "JWF", fim: "JXY", uf: "AM" },
  { inicio: "JXZ", fim: "KAU", uf: "MT" },
  { inicio: "KAV", fim: "KFC", uf: "GO" },
  { inicio: "KFD", fim: "KME", uf: "PE" },
  { inicio: "KMF", fim: "LVE", uf: "RJ" },
  { inicio: "LVF", fim: "LWQ", uf: "PI" },
  { inicio: "LWR", fim: "MMM", uf: "SC" },
  { inicio: "MMN", fim: "MOW", uf: "PB" },
  { inicio: "MOX", fim: "MTZ", uf: "ES" },
  { inicio: "MUA", fim: "MVK", uf: "AL" },
  { inicio: "MVL", fim: "MXG", uf: "TO" },
  { inicio: "MXH", fim: "MZM", uf: "RN" },
  { inicio: "MZN", fim: "NAG", uf: "AC" },
  { inicio: "NAH", fim: "NBA", uf: "RR" },
  { inicio: "NBB", fim: "NEH", uf: "RO" },
  { inicio: "NEI", fim: "NFB", uf: "AP" },
  // Faixas redistribuídas (N)
  { inicio: "NFC", fim: "NGZ", uf: "GO" },
  { inicio: "NHA", fim: "NHT", uf: "MA" },
  { inicio: "NHU", fim: "NIX", uf: "PI" },
  { inicio: "NIY", fim: "NJW", uf: "MT" },
  { inicio: "NJX", fim: "NLU", uf: "GO" },
  { inicio: "NLV", fim: "NMO", uf: "AL" },
  { inicio: "NMP", fim: "NNI", uf: "MA" },
  { inicio: "NNJ", fim: "NOH", uf: "RN" },
  { inicio: "NOI", fim: "NPB", uf: "AM" },
  { inicio: "NPC", fim: "NPQ", uf: "MT" },
  { inicio: "NPR", fim: "NQK", uf: "PB" },
  { inicio: "NQL", fim: "NRE", uf: "CE" },
  { inicio: "NRF", fim: "NSD", uf: "MS" },
  { inicio: "NSE", fim: "NTC", uf: "PA" },
  { inicio: "NTD", fim: "NTW", uf: "BA" },
  { inicio: "NTX", fim: "NUG", uf: "MT" },
  { inicio: "NUH", fim: "NUL", uf: "RR" },
  { inicio: "NUM", fim: "NVF", uf: "CE" },
  { inicio: "NVG", fim: "NVN", uf: "SE" },
  { inicio: "NVO", fim: "NWR", uf: "GO" },
  { inicio: "NWS", fim: "NXQ", uf: "MA" },
  { inicio: "NXR", fim: "NXT", uf: "AC" },
  { inicio: "NXU", fim: "NXW", uf: "PE" },
  { inicio: "NXX", fim: "NYG", uf: "MG" },
  { inicio: "NYH", fim: "NZZ", uf: "BA" },
  // Faixas redistribuídas (O)
  { inicio: "OAA", fim: "OAO", uf: "AM" },
  { inicio: "OAP", fim: "OBS", uf: "MT" },
  { inicio: "OBT", fim: "OCA", uf: "PA" },
  { inicio: "OCB", fim: "OCU", uf: "CE" },
  { inicio: "OCV", fim: "ODT", uf: "ES" },
  { inicio: "ODU", fim: "OEI", uf: "PI" },
  { inicio: "OEJ", fim: "OES", uf: "SE" },
  { inicio: "OET", fim: "OFH", uf: "PB" },
  { inicio: "OFI", fim: "OFW", uf: "PA" },
  { inicio: "OFX", fim: "OGG", uf: "PB" },
  { inicio: "OGH", fim: "OHA", uf: "GO" },
  { inicio: "OHB", fim: "OHK", uf: "AL" },
  { inicio: "OHL", fim: "OHW", uf: "RO" },
  { inicio: "OHX", fim: "OIQ", uf: "CE" },
  { inicio: "OIR", fim: "OJQ", uf: "MA" },
  { inicio: "OJR", fim: "OKC", uf: "RN" },
  { inicio: "OKD", fim: "OKH", uf: "SC" },
  { inicio: "OKI", fim: "OLG", uf: "BA" },
  { inicio: "OLH", fim: "OLN", uf: "TO" },
  { inicio: "OLO", fim: "OMH", uf: "MG" },
  { inicio: "OMI", fim: "OOF", uf: "GO" },
  { inicio: "OOG", fim: "OOU", uf: "MS" },
  { inicio: "OOV", fim: "ORC", uf: "MG" },
  { inicio: "ORD", fim: "ORM", uf: "AL" },
  { inicio: "ORN", fim: "OSV", uf: "CE" },
  { inicio: "OSW", fim: "OTZ", uf: "PA" },
  { inicio: "OUA", fim: "OUE", uf: "PI" },
  { inicio: "OUF", fim: "OVD", uf: "BA" },
  { inicio: "OVE", fim: "OVF", uf: "ES" },
  { inicio: "OVG", fim: "OVG", uf: "AC" },
  { inicio: "OVH", fim: "OVL", uf: "ES" },
  { inicio: "OVM", fim: "OVV", uf: "DF" },
  { inicio: "OVW", fim: "OVY", uf: "PI" },
  { inicio: "OVZ", fim: "OWG", uf: "RN" },
  { inicio: "OWH", fim: "OXK", uf: "MG" },
  { inicio: "OXL", fim: "OXL", uf: "RO" },
  { inicio: "OXM", fim: "OXM", uf: "AM" },
  { inicio: "OXN", fim: "OXN", uf: "AL" },
  { inicio: "OXO", fim: "OXO", uf: "PB" },
  { inicio: "OXP", fim: "OXP", uf: "AC" },
  { inicio: "OXQ", fim: "OXZ", uf: "MA" },
  { inicio: "OYA", fim: "OYC", uf: "TO" },
  { inicio: "OYD", fim: "OYK", uf: "ES" },
  { inicio: "OYL", fim: "OYZ", uf: "PE" },
  { inicio: "OZA", fim: "OZA", uf: "CE" },
  { inicio: "OZB", fim: "OZB", uf: "SE" },
  { inicio: "OZC", fim: "OZV", uf: "BA" },
  { inicio: "OZW", fim: "PBZ", uf: "DF" },
  // Faixas redistribuídas (P)
  { inicio: "PCA", fim: "PGZ", uf: "PE" },
  { inicio: "PHA", fim: "PHZ", uf: "AM" },
  { inicio: "PIA", fim: "PIZ", uf: "PI" },
  { inicio: "PJA", fim: "PLZ", uf: "BA" },
  { inicio: "PMA", fim: "POZ", uf: "CE" },
  { inicio: "PPA", fim: "PPZ", uf: "ES" },
  { inicio: "PQA", fim: "PRZ", uf: "GO" },
  { inicio: "PSA", fim: "PTZ", uf: "MA" },
  { inicio: "PUA", fim: "PZZ", uf: "MG" },
  // Faixas redistribuídas (Q)
  { inicio: "QAA", fim: "QAZ", uf: "MS" },
  { inicio: "QBA", fim: "QCZ", uf: "MT" },
  { inicio: "QDA", fim: "QEZ", uf: "PA" },
  { inicio: "QFA", fim: "QFZ", uf: "PB" },
  { inicio: "QGA", fim: "QGZ", uf: "RN" },
  { inicio: "QHA", fim: "QJZ", uf: "SC" },
  { inicio: "QKA", fim: "QKM", uf: "TO" },
  { inicio: "QKN", fim: "QKZ", uf: "SE" },
  { inicio: "QLA", fim: "QLM", uf: "AL" },
  { inicio: "QLN", fim: "QLT", uf: "AP" },
  { inicio: "QLU", fim: "QLZ", uf: "AC" },
  { inicio: "QMA", fim: "QMP", uf: "SE" },
  { inicio: "QMQ", fim: "QQZ", uf: "MG" },
  { inicio: "QRA", fim: "QRA", uf: "RO" },
  { inicio: "QRB", fim: "QRM", uf: "ES" },
  { inicio: "QRN", fim: "QRZ", uf: "PI" },
  { inicio: "QSA", fim: "QSM", uf: "PB" },
  { inicio: "QSN", fim: "QSZ", uf: "SP" },
  { inicio: "QTA", fim: "QTJ", uf: "RO" },
  { inicio: "QTK", fim: "QTM", uf: "SC" },
  { inicio: "QTN", fim: "QTS", uf: "GO" },
  { inicio: "QTT", fim: "QTT", uf: "AL" },
  { inicio: "QTU", fim: "QTZ", uf: "BA" },
  { inicio: "QUA", fim: "QUZ", uf: "MG" },
  { inicio: "QVA", fim: "QVZ", uf: "PA" },
  { inicio: "QWA", fim: "QWF", uf: "TO" },
  { inicio: "QWG", fim: "QWL", uf: "AL" },
  { inicio: "QWM", fim: "QWQ", uf: "AC" },
  { inicio: "QWR", fim: "QXZ", uf: "MG" },
  { inicio: "QYA", fim: "QYZ", uf: "PE" },
  { inicio: "QZA", fim: "QZZ", uf: "AM" },
  // Faixas redistribuídas (R)
  { inicio: "RAA", fim: "RAJ", uf: "SC" },
  { inicio: "RAK", fim: "RAZ", uf: "MT" },
  { inicio: "RBA", fim: "RBJ", uf: "ES" },
  { inicio: "RBK", fim: "RCN", uf: "GO" },
  { inicio: "RCO", fim: "RDR", uf: "BA" },
  { inicio: "RDS", fim: "REB", uf: "SC" },
  { inicio: "REC", fim: "REZ", uf: "DF" },
  { inicio: "RFA", fim: "RGD", uf: "MG" },
  { inicio: "RGE", fim: "RGN", uf: "RN" },
  { inicio: "RGO", fim: "RGZ", uf: "AL" },
  { inicio: "RHA", fim: "RHZ", uf: "PR" },
  { inicio: "RIA", fim: "RIN", uf: "CE" },
  { inicio: "RIO", fim: "RKV", uf: "RJ" },
  { inicio: "RKW", fim: "RLP", uf: "SC" },
  { inicio: "RLQ", fim: "RMC", uf: "PB" },
  { inicio: "RMD", fim: "RMZ", uf: "MG" },
  { inicio: "ROA", fim: "ROZ", uf: "MA" },
  { inicio: "RPA", fim: "RPZ", uf: "BA" },
  { inicio: "RQA", fim: "RQL", uf: "RN" },
  { inicio: "RQM", fim: "RQV", uf: "ES" },
  { inicio: "RQW", fim: "RRH", uf: "SE" },
  { inicio: "RRI", fim: "RRZ", uf: "MT" },
  { inicio: "RSA", fim: "RSF", uf: "TO" },
  { inicio: "RSG", fim: "RST", uf: "PI" },
  { inicio: "RSU", fim: "RSZ", uf: "RO" },
  { inicio: "RTA", fim: "RVZ", uf: "MG" },
  { inicio: "RWA", fim: "RWJ", uf: "MS" },
  { inicio: "RWK", fim: "RXJ", uf: "PA" },
  { inicio: "RXK", fim: "RYZ", uf: "SC" },
  { inicio: "RZA", fim: "RZD", uf: "RR" },
  { inicio: "RZE", fim: "RZZ", uf: "PE" },
  // Faixas redistribuídas (S)
  { inicio: "SAA", fim: "SAJ", uf: "AL" },
  { inicio: "SAK", fim: "SAM", uf: "AP" },
  { inicio: "SAN", fim: "SBV", uf: "CE" },
  { inicio: "SBW", fim: "SDO", uf: "GO" },
  { inicio: "SDP", fim: "SFO", uf: "PR" },
  { inicio: "SFP", fim: "SGM", uf: "ES" },
  { inicio: "SGN", fim: "SGZ", uf: "DF" },
  { inicio: "SHA", fim: "SHA", uf: "AC" },
  { inicio: "SHB", fim: "SJI", uf: "MG" },
  { inicio: "SJJ", fim: "SKT", uf: "BA" },
  { inicio: "SKU", fim: "SLF", uf: "PB" },
  { inicio: "SLG", fim: "SLL", uf: "RO" },
  { inicio: "SLM", fim: "SLV", uf: "PI" },
  { inicio: "SLW", fim: "SML", uf: "MS" },
  { inicio: "SMM", fim: "SNJ", uf: "MA" },
  { inicio: "SNK", fim: "SPB", uf: "PE" },
  { inicio: "SPC", fim: "SPV", uf: "MT" },
  { inicio: "SQQ", fim: "SQU", uf: "AC" },
  { inicio: "SQV", fim: "SSE", uf: "RJ" },
  { inicio: "SSF", fim: "SSQ", uf: "DF" },
  { inicio: "SSR", fim: "SWZ", uf: "SP" },
  { inicio: "SXA", fim: "SXJ", uf: "SC" },
  { inicio: "SYA", fim: "SYZ", uf: "MG" },
  { inicio: "SZA", fim: "SZZ", uf: "PA" },
  // Faixas redistribuídas (T)
  { inicio: "TAA", fim: "TAH", uf: "AM" },
  { inicio: "TAI", fim: "TBZ", uf: "PR" },
  { inicio: "TCA", fim: "TDZ", uf: "MG" },
  { inicio: "TFA", fim: "TFN", uf: "GO" },
  { inicio: "TGO", fim: "TGQ", uf: "AP" },
  { inicio: "THI", fim: "THL", uf: "RO" },
  { inicio: "THM", fim: "TIN", uf: "CE" },
  { inicio: "TIO", fim: "TMJ", uf: "SP" },
];

function detectUF(placa: string): string | null {
  const clean = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length < 3) return null;
  const prefix = clean.slice(0, 3);

  for (const faixa of PLACA_FAIXAS) {
    if (prefix >= faixa.inicio && prefix <= faixa.fim) {
      return faixa.uf;
    }
  }
  return null;
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
  const [error, setError] = useState("");

  const handlePlacaChange = (value: string) => {
    const formatted = formatPlaca(value);
    setPlaca(formatted);
    setError("");

    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length >= 3) {
      const uf = detectUF(clean);
      if (uf) {
        setSelectedUF(uf);
      }
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
