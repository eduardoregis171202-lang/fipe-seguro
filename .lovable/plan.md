

## Converter Fipe Scanner para HTML puro

### Antes de tudo: existe um caminho mais simples

O projeto React atual pode ser hospedado no GitHub Pages **sem reescrever nada**. Basta rodar `npm run build` e subir a pasta `dist/` gerada. Isso gera HTML/CSS/JS estático que funciona em qualquer servidor.

**Porém**, se o objetivo e ter um arquivo HTML unico e editavel, sem dependencia de Node.js, npm ou build tools, o plano abaixo cobre a conversao completa.

---

### O que sera convertido

O projeto tem 4 abas funcionais + sistema de tema:

1. **Cotacao** - Busca FIPE via API, grafico de historico (Chart.js), avaliador de negocio (gauge SVG), simulador de financiamento
2. **Vistoria** - Checklist de 32 itens com persistencia em localStorage
3. **Custo** - Calculadora de custo mensal de propriedade (IPVA, seguro, combustivel, manutencao)
4. **Detran** - Deteccao de estado pela placa + redirecionamento ao portal estadual
5. **Tema** - Alternancia light/dark com persistencia

---

### Estrategia de conversao

Tudo sera consolidado em **um unico arquivo `index.html`** contendo:

- **CSS inline** (dentro de `<style>`) - recriando todas as variaveis de tema, gradientes, glass-cards, animacoes
- **JavaScript inline** (dentro de `<script>`) - toda logica reescrita em vanilla JS
- **Chart.js via CDN** - unica dependencia externa (`https://cdn.jsdelivr.net/npm/chart.js`)
- **Lucide Icons via SVG inline** - os icones serao embutidos como SVG direto no HTML

### Estrutura do arquivo unico

```text
index.html
|
+-- <head>
|   +-- Meta tags, manifest link, fontes do Google
|
+-- <style>
|   +-- Variaveis CSS (:root e .dark)
|   +-- Reset e base styles
|   +-- Componentes (glass-card, gradients, gauge, botoes)
|   +-- Animacoes
|   +-- Responsividade
|
+-- <body>
|   +-- Header (logo, titulo, toggle tema, abas)
|   +-- Main (container das 4 abas)
|   +-- Footer
|
+-- <script src="chart.js CDN">
+-- <script>
    +-- Estado global (tema, aba ativa)
    +-- Funcoes de renderizacao por aba
    +-- FIPE API (fetch nativo)
    +-- Logica de calculo (financiamento, custo, deal)
    +-- Deteccao de placa (PLACA_FAIXAS completo)
    +-- Checklist com localStorage
    +-- Gauge SVG dinamico
    +-- Grafico Chart.js
```

---

### Detalhes tecnicos

**CSS:**
- Recriacao das variaveis HSL para light e dark mode
- Classes utilitarias: `.glass-card`, `.gradient-primary`, `.glow-primary`, `.text-gradient`, `.ember-line`
- Fontes: Space Grotesk e Inter via Google Fonts CDN

**JavaScript (vanilla):**
- Sistema de abas: mostrar/esconder `<section>` por `display: none/block`
- Tema: toggle da classe `.dark` no `<html>` + `localStorage`
- FIPE API: `fetch()` nativo para `https://parallelum.com.br/fipe/api/v1`
- Selects em cascata: marca -> modelo -> ano (mesmo fluxo atual)
- DealGauge: SVG gerado dinamicamente via `innerHTML`
- PriceChart: instancia `new Chart()` direto
- Vistoria: checklist com `localStorage.getItem/setItem`
- Detran: tabela `PLACA_FAIXAS` completa (150+ faixas) + `window.open()`
- Custo: calculos de IPVA, seguro, combustivel, manutencao

**Funcionalidades preservadas:**
- Consulta FIPE real (API publica)
- Grafico de historico de precos (simulado)
- Avaliador de negocio com gauge visual
- Simulador de financiamento com todos os prazos
- Checklist de vistoria com progresso e compartilhamento WhatsApp
- Calculadora de custo com aliquotas por estado
- Deteccao automatica de estado pela placa
- Tema escuro/claro com persistencia
- Layout mobile-first responsivo

**Tamanho estimado:** ~2.500-3.000 linhas em um unico arquivo HTML

---

### Como usar no GitHub Pages

1. Criar repositorio no GitHub
2. Subir o arquivo `index.html` + `manifest.json` + `favicon.ico`
3. Ir em Settings > Pages > Source: "main branch" > pasta "/ (root)"
4. O site estara disponivel em `https://seuusuario.github.io/nome-do-repo/`

