const FIPE_API_BASE = "https://parallelum.com.br/fipe/api/v1";

export interface FipeMarca {
  codigo: string;
  nome: string;
}

export interface FipeModelo {
  codigo: number;
  nome: string;
}

export interface FipeAno {
  codigo: string;
  nome: string;
}

export interface FipePreco {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  TipoVeiculo: number;
  SiglaCombustivel: string;
}

export async function fetchMarcas(): Promise<FipeMarca[]> {
  const res = await fetch(`${FIPE_API_BASE}/carros/marcas`);
  if (!res.ok) throw new Error("Erro ao buscar marcas");
  return res.json();
}

export async function fetchModelos(marcaId: string): Promise<{ modelos: FipeModelo[] }> {
  const res = await fetch(`${FIPE_API_BASE}/carros/marcas/${marcaId}/modelos`);
  if (!res.ok) throw new Error("Erro ao buscar modelos");
  return res.json();
}

export async function fetchAnos(marcaId: string, modeloId: string): Promise<FipeAno[]> {
  const res = await fetch(`${FIPE_API_BASE}/carros/marcas/${marcaId}/modelos/${modeloId}/anos`);
  if (!res.ok) throw new Error("Erro ao buscar anos");
  return res.json();
}

export async function fetchPreco(marcaId: string, modeloId: string, anoId: string): Promise<FipePreco> {
  const res = await fetch(`${FIPE_API_BASE}/carros/marcas/${marcaId}/modelos/${modeloId}/anos/${anoId}`);
  if (!res.ok) throw new Error("Erro ao buscar preço");
  return res.json();
}

export function parseFipeValue(valor: string): number {
  // "R$ 45.000,00" -> 45000
  return Number(valor.replace(/[R$\s.]/g, '').replace(',', '.'));
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function generateSimulatedHistory(currentPrice: number): { labels: string[]; data: number[] } {
  const months = ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const data: number[] = [];
  
  // Simulate price variation over 12 months (±5% random walk)
  let price = currentPrice * (1 + (Math.random() * 0.06 - 0.03));
  for (let i = 0; i < 12; i++) {
    const variation = (Math.random() - 0.45) * 0.02; // slight upward bias
    price = price * (1 + variation);
    data.push(Math.round(price));
  }
  // Last month = current price
  data[11] = currentPrice;

  return { labels: months, data };
}

export function generateWhatsAppShareText(marca: string, modelo: string, ano: number, valor: string): string {
  return encodeURIComponent(
    `🚗 *Consulta Tabela FIPE*\n\n` +
    `📌 ${marca} ${modelo}\n` +
    `📅 Ano: ${ano}\n` +
    `💰 Valor FIPE: ${valor}\n\n` +
    `_Consultado via Fipe Scanner_`
  );
}
