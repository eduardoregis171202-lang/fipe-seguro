export interface CarData {
  id: string;
  nome: string;
  marca: string;
  categoria: 'primeiro_carro' | 'familia' | 'uber' | 'conforto' | 'trabalho';
  anosReferencia: number[];
  precoEstimado: { min: number; max: number };
  detalhes: {
    motor: string;
    consumo: string;
    pontosPositivos: string[];
    pontosNegativos: string[];
    veredito: string;
  };
}

export const CATEGORIAS = {
  primeiro_carro: { label: '🚗 Primeiro Carro', desc: 'Econômicos e fáceis de manter' },
  familia: { label: '👨‍👩‍👧‍👦 Família', desc: 'Espaço, conforto e segurança' },
  uber: { label: '📱 Trabalho/App', desc: 'Ideal para Uber/99 e trabalho' },
  conforto: { label: '✈️ Viagem/Conforto', desc: 'Para quem prioriza conforto' },
  trabalho: { label: '🔧 Utilitário', desc: 'Picapes e veículos de carga' },
} as const;

export const CAR_DATABASE: CarData[] = [
  // ═══════════════════════════════════════
  // PRIMEIRO CARRO (10 modelos)
  // ═══════════════════════════════════════
  {
    id: "vw_gol_g5",
    nome: "VW Gol G5 1.0",
    marca: "Volkswagen",
    categoria: "primeiro_carro",
    anosReferencia: [2009, 2010, 2011, 2012, 2013],
    precoEstimado: { min: 18000, max: 30000 },
    detalhes: {
      motor: "1.0 8V Flex - 76cv",
      consumo: "Cidade: 12,5 km/l | Estrada: 14,8 km/l",
      pontosPositivos: ["Peças baratas e fáceis de encontrar", "Mecânica simples", "Bom valor de revenda", "Seguro acessível"],
      pontosNegativos: ["Motor fraco para estrada", "Acabamento simples", "Pouco espaço traseiro", "Sem airbag nos mais antigos"],
      veredito: "O Gol G5 é o queridinho dos iniciantes. Peças baratas, mecânica conhecida por qualquer oficina e seguro barato. Uma aposta segura para o primeiro carro."
    }
  },
  {
    id: "fiat_uno_vivace",
    nome: "Fiat Uno Vivace 1.0",
    marca: "Fiat",
    categoria: "primeiro_carro",
    anosReferencia: [2011, 2012, 2013, 2014],
    precoEstimado: { min: 16000, max: 27000 },
    detalhes: {
      motor: "1.0 EVO Flex - 75cv",
      consumo: "Cidade: 12,2 km/l | Estrada: 14,0 km/l",
      pontosPositivos: ["Design moderno para a época", "Econômico", "Boa dirigibilidade na cidade", "Preço acessível"],
      pontosNegativos: ["Porta-malas pequeno (185L)", "Motor barulhento", "Câmbio com engates longos", "Suspensão dura"],
      veredito: "O Uno Vivace é uma boa opção para quem precisa de um carro barato e econômico para o dia a dia na cidade. Evite viagens longas com ele."
    }
  },
  {
    id: "chevrolet_celta",
    nome: "Chevrolet Celta 1.0",
    marca: "Chevrolet",
    categoria: "primeiro_carro",
    anosReferencia: [2008, 2010, 2012, 2014, 2015],
    precoEstimado: { min: 15000, max: 28000 },
    detalhes: {
      motor: "1.0 VHC-E Flex - 78cv",
      consumo: "Cidade: 12,8 km/l | Estrada: 15,0 km/l",
      pontosPositivos: ["Muito econômico", "Peças baratas", "Motor confiável VHC", "Seguro barato"],
      pontosNegativos: ["Espaço interno limitado", "Acabamento pobre", "Direção sem assistência nos básicos", "Barulho interno"],
      veredito: "Carro honesto e barato de manter. Ideal para quem quer gastar pouco com combustível e manutenção. Só não espere conforto."
    }
  },
  {
    id: "ford_ka_g2",
    nome: "Ford Ka 1.0 (2ª Geração)",
    marca: "Ford",
    categoria: "primeiro_carro",
    anosReferencia: [2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 28000, max: 45000 },
    detalhes: {
      motor: "1.0 Ti-VCT Flex - 85cv",
      consumo: "Cidade: 12,4 km/l | Estrada: 14,2 km/l",
      pontosPositivos: ["Design moderno", "Bom porta-malas (257L)", "Direção elétrica", "Boa central multimídia"],
      pontosNegativos: ["Peças Ford ficando caras", "Suspensão firme demais", "Motor fraco com ar ligado", "Ford saiu do Brasil (assistência técnica)"],
      veredito: "Ótimo carro, mas a saída da Ford do Brasil é um ponto de atenção. Peças ainda existem, mas tendem a encarecer com o tempo."
    }
  },
  {
    id: "fiat_palio_fire",
    nome: "Fiat Palio Fire 1.0",
    marca: "Fiat",
    categoria: "primeiro_carro",
    anosReferencia: [2008, 2010, 2012, 2013],
    precoEstimado: { min: 13000, max: 22000 },
    detalhes: {
      motor: "1.0 Fire Flex - 73cv",
      consumo: "Cidade: 11,8 km/l | Estrada: 13,5 km/l",
      pontosPositivos: ["Muito barato para comprar", "Manutenção simples", "Peças populares", "Leve e ágil na cidade"],
      pontosNegativos: ["Zero itens de segurança", "Motor antiquado", "Acabamento precário", "Sem ar-condicionado nos básicos"],
      veredito: "O Palio Fire é para quem tem orçamento muito apertado. Funcional, mas não espere nenhum luxo ou tecnologia."
    }
  },
  {
    id: "renault_sandero_g1",
    nome: "Renault Sandero 1.0 (1ª Geração)",
    marca: "Renault",
    categoria: "primeiro_carro",
    anosReferencia: [2009, 2010, 2012, 2014],
    precoEstimado: { min: 18000, max: 29000 },
    detalhes: {
      motor: "1.0 16V Hi-Flex - 77cv",
      consumo: "Cidade: 11,5 km/l | Estrada: 13,8 km/l",
      pontosPositivos: ["Porta-malas generoso (320L)", "Posição de dirigir alta", "Bom custo-benefício", "Espaço interno acima da média"],
      pontosNegativos: ["Motor 1.0 fraco para o peso", "Câmbio impreciso", "Peças elétricas frágeis", "Desvaloriza rápido"],
      veredito: "Bom espaço pelo preço, mas atenção à parte elétrica. Prefira versões com ar e direção para melhor revenda."
    }
  },
  {
    id: "hyundai_hb20_g1",
    nome: "Hyundai HB20 1.0 (1ª Geração)",
    marca: "Hyundai",
    categoria: "primeiro_carro",
    anosReferencia: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 30000, max: 50000 },
    detalhes: {
      motor: "1.0 Flex - 80cv",
      consumo: "Cidade: 12,0 km/l | Estrada: 14,3 km/l",
      pontosPositivos: ["Design bonito", "Acabamento acima da média", "Motor econômico", "Boa revenda"],
      pontosNegativos: ["Porta-malas pequeno (300L)", "Suspensão seca", "Barulho de vento acima de 100km/h", "Peças importadas caras"],
      veredito: "O HB20 conquistou o Brasil pelo design e custo-benefício. Atenção: peças são mais caras que concorrentes nacionais."
    }
  },
  {
    id: "chevrolet_onix_10_g1",
    nome: "Chevrolet Onix 1.0 (1ª Geração)",
    marca: "Chevrolet",
    categoria: "primeiro_carro",
    anosReferencia: [2013, 2014, 2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 28000, max: 48000 },
    detalhes: {
      motor: "1.0 SPE/4 Flex - 80cv",
      consumo: "Cidade: 12,6 km/l | Estrada: 14,9 km/l",
      pontosPositivos: ["Carro mais vendido do Brasil", "Peças fáceis", "MyLink (versões completas)", "Bom consumo"],
      pontosNegativos: ["Motor 1.0 fraco em subidas", "Estabilidade mediana", "Pintura fina", "Acabamento plástico"],
      veredito: "O Onix 1.0 é uma aposta segura: fácil de revender, peças baratas e econômico. A versão LT com MyLink é a melhor escolha."
    }
  },
  {
    id: "vw_fox",
    nome: "VW Fox 1.0",
    marca: "Volkswagen",
    categoria: "primeiro_carro",
    anosReferencia: [2010, 2012, 2014, 2015],
    precoEstimado: { min: 22000, max: 35000 },
    detalhes: {
      motor: "1.0 Total Flex - 76cv",
      consumo: "Cidade: 12,3 km/l | Estrada: 14,5 km/l",
      pontosPositivos: ["Espaço interno surpreendente", "Porta-malas bom (280L)", "Versátil", "Mecânica VW confiável"],
      pontosNegativos: ["Motor 1.0 insuficiente", "Barulho interno", "Design datado", "Suspensão dura"],
      veredito: "O Fox é um hatch espaçoso e prático. Se puder, prefira a versão 1.6 que tem muito mais fôlego."
    }
  },
  {
    id: "fiat_mobi",
    nome: "Fiat Mobi 1.0",
    marca: "Fiat",
    categoria: "primeiro_carro",
    anosReferencia: [2017, 2018, 2019, 2020, 2021, 2022],
    precoEstimado: { min: 32000, max: 52000 },
    detalhes: {
      motor: "1.0 Fire Flex - 75cv",
      consumo: "Cidade: 13,0 km/l | Estrada: 14,5 km/l",
      pontosPositivos: ["Carro mais barato novo (referência)", "Muito econômico", "Fácil de estacionar", "Seguro barato"],
      pontosNegativos: ["Porta-malas minúsculo (215L)", "Motor antigo Fire", "Espaço traseiro apertado", "Acabamento básico"],
      veredito: "O Mobi é o carro de entrada da Fiat. Ideal para uso urbano solo. Não serve para família ou viagens longas."
    }
  },

  // ═══════════════════════════════════════
  // FAMÍLIA (10 modelos)
  // ═══════════════════════════════════════
  {
    id: "honda_fit_g2",
    nome: "Honda Fit 1.5 (2ª Geração)",
    marca: "Honda",
    categoria: "familia",
    anosReferencia: [2009, 2010, 2011, 2012, 2013, 2014],
    precoEstimado: { min: 32000, max: 50000 },
    detalhes: {
      motor: "1.5 i-VTEC Flex - 116cv",
      consumo: "Cidade: 10,5 km/l | Estrada: 13,2 km/l",
      pontosPositivos: ["Banco mágico (ultra versátil)", "Motor forte e econômico", "Confiabilidade Honda", "Espaço interno enorme para o tamanho"],
      pontosNegativos: ["Preço alto no usado", "Peças Honda caras", "Seguro elevado", "Design conservador"],
      veredito: "O Fit é um dos melhores hatches já vendidos no Brasil. O banco mágico é genial para famílias. Vale cada centavo."
    }
  },
  {
    id: "vw_polo",
    nome: "VW Polo 1.0 TSI",
    marca: "Volkswagen",
    categoria: "familia",
    anosReferencia: [2018, 2019, 2020, 2021, 2022, 2023],
    precoEstimado: { min: 55000, max: 85000 },
    detalhes: {
      motor: "1.0 TSI Flex - 128cv",
      consumo: "Cidade: 12,0 km/l | Estrada: 14,7 km/l",
      pontosPositivos: ["Motor turbo potente", "Excelente acabamento", "6 airbags", "Multimídia VW Play"],
      pontosNegativos: ["Preço elevado", "Câmbio automático só no Highline", "Suspensão firme", "Manutenção TSI mais cara"],
      veredito: "O Polo é o hatch premium da VW. Motor turbo forte e econômico. Versão Highline com automático é a ideal para família."
    }
  },
  {
    id: "chevrolet_onix_plus",
    nome: "Chevrolet Onix Plus 1.0 Turbo",
    marca: "Chevrolet",
    categoria: "familia",
    anosReferencia: [2020, 2021, 2022, 2023, 2024],
    precoEstimado: { min: 55000, max: 82000 },
    detalhes: {
      motor: "1.0 Turbo Flex - 116cv",
      consumo: "Cidade: 11,8 km/l | Estrada: 14,2 km/l",
      pontosPositivos: ["Porta-malas grande (470L)", "Wi-Fi nativo", "Motor turbo", "Sedan mais vendido"],
      pontosNegativos: ["Câmbio CVT controverso", "Recalls frequentes", "Suspensão simples", "Incêndios no modelo anterior (resolvido)"],
      veredito: "Sedan compacto com melhor custo-benefício do mercado. Prefira versões Premier com câmbio automático de 6 marchas."
    }
  },
  {
    id: "toyota_etios_sedan",
    nome: "Toyota Etios Sedan 1.5",
    marca: "Toyota",
    categoria: "familia",
    anosReferencia: [2013, 2015, 2017, 2018, 2019],
    precoEstimado: { min: 35000, max: 58000 },
    detalhes: {
      motor: "1.5 VVT-i Flex - 107cv",
      consumo: "Cidade: 11,0 km/l | Estrada: 13,8 km/l",
      pontosPositivos: ["Confiabilidade Toyota lendária", "Manutenção barata", "Mecânica simples", "Ótima revenda"],
      pontosNegativos: ["Design polêmico", "Acabamento básico", "Pouca tecnologia", "Sem opção turbo"],
      veredito: "Feio, mas MUITO confiável. O Etios é a escolha racional: dura anos sem dar problema. Design à parte, é imbatível em custo de manutenção."
    }
  },
  {
    id: "fiat_argo",
    nome: "Fiat Argo 1.3",
    marca: "Fiat",
    categoria: "familia",
    anosReferencia: [2018, 2019, 2020, 2021, 2022, 2023],
    precoEstimado: { min: 42000, max: 68000 },
    detalhes: {
      motor: "1.3 Firefly Flex - 109cv",
      consumo: "Cidade: 10,8 km/l | Estrada: 13,5 km/l",
      pontosPositivos: ["Design bonito", "Motor Firefly moderno", "Multimídia Uconnect", "Boa relação custo-benefício"],
      pontosNegativos: ["Porta-malas irregular (300L)", "Câmbio automático CVT vibra", "Suspensão curta", "Pintura frágil"],
      veredito: "O Argo substituiu o Palio com louvor. Versão Drive 1.3 é a mais equilibrada. Evite o câmbio CVT se possível."
    }
  },
  {
    id: "hyundai_hb20s",
    nome: "Hyundai HB20S 1.6",
    marca: "Hyundai",
    categoria: "familia",
    anosReferencia: [2014, 2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 38000, max: 55000 },
    detalhes: {
      motor: "1.6 Gamma Flex - 128cv",
      consumo: "Cidade: 10,2 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Motor 1.6 forte", "Câmbio automático de 6 marchas", "Acabamento refinado", "Design elegante"],
      pontosNegativos: ["Porta-malas 450L (bom mas não o melhor)", "Consumo acima da média", "Peças importadas", "Embreagem frágil no manual"],
      veredito: "Sedan compacto premium. Versão automática é excelente. Confira histórico de embreagem nos manuais."
    }
  },
  {
    id: "chevrolet_spin",
    nome: "Chevrolet Spin 1.8",
    marca: "Chevrolet",
    categoria: "familia",
    anosReferencia: [2014, 2016, 2018, 2019, 2021],
    precoEstimado: { min: 38000, max: 65000 },
    detalhes: {
      motor: "1.8 Econo.Flex - 111cv",
      consumo: "Cidade: 9,5 km/l | Estrada: 12,0 km/l",
      pontosPositivos: ["7 lugares", "Porta-malas enorme", "Versátil para família grande", "Manutenção GM acessível"],
      pontosNegativos: ["Motor fraco para o peso", "Câmbio automático de 6 marchas antigo", "Consumo alto", "Peso elevado"],
      veredito: "A Spin é a minivan acessível. Com 7 lugares, é imbatível para família grande com orçamento apertado. Motor 1.8 sofre com carga total."
    }
  },
  {
    id: "honda_city",
    nome: "Honda City 1.5",
    marca: "Honda",
    categoria: "familia",
    anosReferencia: [2015, 2016, 2017, 2018, 2019, 2020],
    precoEstimado: { min: 48000, max: 72000 },
    detalhes: {
      motor: "1.5 i-VTEC Flex - 116cv",
      consumo: "Cidade: 10,8 km/l | Estrada: 13,5 km/l",
      pontosPositivos: ["Confiabilidade Honda", "Câmbio CVT suave", "Espaço traseiro excelente", "Porta-malas grande (536L)"],
      pontosNegativos: ["Preço alto no usado", "CVT sem emoção", "Seguro caro", "Design simples"],
      veredito: "Sedan familiar Honda. Confiável, econômico e espaçoso. O porta-malas de 536L é um dos maiores da categoria."
    }
  },
  {
    id: "renault_logan",
    nome: "Renault Logan 1.6",
    marca: "Renault",
    categoria: "familia",
    anosReferencia: [2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 28000, max: 45000 },
    detalhes: {
      motor: "1.6 SCe Flex - 118cv",
      consumo: "Cidade: 10,5 km/l | Estrada: 13,2 km/l",
      pontosPositivos: ["Porta-malas gigante (510L)", "Motor 1.6 forte", "Preço acessível", "Bom espaço interno"],
      pontosNegativos: ["Design datado", "Acabamento simples", "Câmbio manual impreciso", "Parte elétrica frágil"],
      veredito: "O Logan entrega muito espaço por pouco dinheiro. Porta-malas de 510L é referência. Atenção à parte elétrica Renault."
    }
  },
  {
    id: "nissan_march",
    nome: "Nissan March 1.6",
    marca: "Nissan",
    categoria: "familia",
    anosReferencia: [2013, 2015, 2016, 2017, 2018],
    precoEstimado: { min: 25000, max: 42000 },
    detalhes: {
      motor: "1.6 16V Flex - 111cv",
      consumo: "Cidade: 10,0 km/l | Estrada: 12,8 km/l",
      pontosPositivos: ["Câmbio CVT disponível", "Posição de dirigir elevada", "Design simpático", "Motor 1.6 adequado"],
      pontosNegativos: ["Acabamento básico", "Desvalorização alta", "Espaço traseiro justo", "Consumo acima da média"],
      veredito: "O March é um carro honesto, mas desvaloriza rápido. Se encontrar barato, é uma boa opção com o motor 1.6."
    }
  },

  // ═══════════════════════════════════════
  // UBER / TRABALHO (8 modelos)
  // ═══════════════════════════════════════
  {
    id: "toyota_corolla_g11",
    nome: "Toyota Corolla 2.0 (11ª Geração)",
    marca: "Toyota",
    categoria: "uber",
    anosReferencia: [2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 65000, max: 95000 },
    detalhes: {
      motor: "2.0 Dual VVT-i Flex - 154cv",
      consumo: "Cidade: 9,5 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Confiabilidade lendária Toyota", "Conforto de sedan médio", "Ótima revenda", "Manutenção previsível"],
      pontosNegativos: ["Preço alto mesmo usado", "Design conservador", "Consumo não é o melhor", "Câmbio CVT sem emoção"],
      veredito: "O Corolla é o rei dos apps e taxistas por um motivo: não quebra. O custo total de propriedade é muito baixo a longo prazo."
    }
  },
  {
    id: "chevrolet_cobalt",
    nome: "Chevrolet Cobalt 1.8",
    marca: "Chevrolet",
    categoria: "uber",
    anosReferencia: [2013, 2014, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 30000, max: 50000 },
    detalhes: {
      motor: "1.8 Econo.Flex - 111cv",
      consumo: "Cidade: 10,0 km/l | Estrada: 13,5 km/l",
      pontosPositivos: ["Porta-malas grande (563L)", "Espaço traseiro amplo", "Manutenção GM barata", "Preço acessível"],
      pontosNegativos: ["Design sem graça", "Motor poderia ser mais potente", "Acabamento plástico", "Peso elevado"],
      veredito: "Sedan espaçoso e barato. Excelente para motoristas de app que precisam de espaço e economia na manutenção."
    }
  },
  {
    id: "nissan_versa",
    nome: "Nissan Versa 1.6",
    marca: "Nissan",
    categoria: "uber",
    anosReferencia: [2013, 2015, 2017, 2018, 2019],
    precoEstimado: { min: 30000, max: 52000 },
    detalhes: {
      motor: "1.6 16V Flex - 111cv",
      consumo: "Cidade: 10,2 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Espaço traseiro de sedan médio", "Câmbio CVT suave", "Boa posição de dirigir", "Porta-malas grande (460L)"],
      pontosNegativos: ["Desvalorização", "Consumo acima da média", "Acabamento mediano", "Motor sem brilho"],
      veredito: "O Versa surpreende pelo espaço interno. É um sedan compacto com alma de sedan médio. Bom para app com passageiros."
    }
  },
  {
    id: "renault_kwid",
    nome: "Renault Kwid 1.0",
    marca: "Renault",
    categoria: "uber",
    anosReferencia: [2018, 2019, 2020, 2021, 2022],
    precoEstimado: { min: 28000, max: 48000 },
    detalhes: {
      motor: "1.0 SCe Flex - 70cv",
      consumo: "Cidade: 14,0 km/l | Estrada: 15,5 km/l",
      pontosPositivos: ["Muito econômico", "Visual de SUV", "Central multimídia", "Barato para comprar"],
      pontosNegativos: ["Motor muito fraco (70cv)", "Segurança nota 1 Latin NCAP", "Acabamento frágil", "Estabilidade ruim"],
      veredito: "O Kwid é econômico e barato, mas tem segurança questionável. Só vale para uso urbano leve. Não recomendo para estrada."
    }
  },
  {
    id: "fiat_cronos",
    nome: "Fiat Cronos 1.3",
    marca: "Fiat",
    categoria: "uber",
    anosReferencia: [2019, 2020, 2021, 2022, 2023],
    precoEstimado: { min: 45000, max: 70000 },
    detalhes: {
      motor: "1.3 Firefly Flex - 109cv",
      consumo: "Cidade: 10,5 km/l | Estrada: 13,2 km/l",
      pontosPositivos: ["Design moderno", "Porta-malas grande (525L)", "Motor Firefly eficiente", "Sedan mais barato novo"],
      pontosNegativos: ["Câmbio CVT vibra", "Suspensão firme", "Isolamento acústico fraco", "Pintura fina"],
      veredito: "O Cronos é o sedan de entrada ideal para apps. Porta-malas enorme e preço justo. Prefira a versão manual se possível."
    }
  },
  {
    id: "chevrolet_prisma",
    nome: "Chevrolet Prisma 1.4",
    marca: "Chevrolet",
    categoria: "uber",
    anosReferencia: [2014, 2015, 2016, 2017, 2018, 2019],
    precoEstimado: { min: 32000, max: 50000 },
    detalhes: {
      motor: "1.4 SPE/4 Flex - 106cv",
      consumo: "Cidade: 10,5 km/l | Estrada: 13,8 km/l",
      pontosPositivos: ["Motor 1.4 equilibrado", "Peças baratas", "MyLink disponível", "Sedan popular confiável"],
      pontosNegativos: ["Estabilidade média", "Pintura fina", "Acabamento plástico", "Suspensão básica"],
      veredito: "O Prisma é o sedan popular da GM. Motor 1.4 é ideal: nem fraco, nem gastador. Versão LTZ é a mais completa."
    }
  },
  {
    id: "toyota_yaris_sedan",
    nome: "Toyota Yaris Sedan 1.5",
    marca: "Toyota",
    categoria: "uber",
    anosReferencia: [2019, 2020, 2021, 2022, 2023],
    precoEstimado: { min: 55000, max: 80000 },
    detalhes: {
      motor: "1.5 VVT-iE Flex - 110cv",
      consumo: "Cidade: 11,0 km/l | Estrada: 14,2 km/l",
      pontosPositivos: ["Confiabilidade Toyota", "Câmbio CVT suave", "7 airbags", "Controle de estabilidade"],
      pontosNegativos: ["Preço alto para a categoria", "Motor sem empolgação", "Design genérico", "Espaço traseiro justo"],
      veredito: "Mini Corolla. Mesma confiabilidade Toyota em pacote menor. Ideal para quem quer Toyota mas não pode pagar Corolla."
    }
  },
  {
    id: "hyundai_hb20s_comfort",
    nome: "Hyundai HB20S 1.0 Turbo",
    marca: "Hyundai",
    categoria: "uber",
    anosReferencia: [2020, 2021, 2022, 2023],
    precoEstimado: { min: 55000, max: 78000 },
    detalhes: {
      motor: "1.0 TGDI Turbo Flex - 120cv",
      consumo: "Cidade: 11,5 km/l | Estrada: 14,0 km/l",
      pontosPositivos: ["Motor turbo potente para 1.0", "Câmbio automático 6AT", "Design renovado", "Acabamento bom"],
      pontosNegativos: ["Preço esticado", "Peças importadas", "Seguro caro", "Motor turbo requer cuidado com óleo"],
      veredito: "O HB20S turbo é uma evolução enorme. Motor forte e econômico. Atenção: manutenção de motor turbo é diferente do aspirado."
    }
  },

  // ═══════════════════════════════════════
  // CONFORTO / VIAGEM (8 modelos)
  // ═══════════════════════════════════════
  {
    id: "toyota_corolla_g12",
    nome: "Toyota Corolla 2.0 (12ª Geração)",
    marca: "Toyota",
    categoria: "conforto",
    anosReferencia: [2020, 2021, 2022, 2023, 2024],
    precoEstimado: { min: 95000, max: 140000 },
    detalhes: {
      motor: "2.0 Dynamic Force Flex - 177cv",
      consumo: "Cidade: 10,0 km/l | Estrada: 14,5 km/l",
      pontosPositivos: ["Confiabilidade absoluta", "Versão híbrida disponível", "Safety Sense (piloto semi-autônomo)", "Acabamento premium"],
      pontosNegativos: ["Preço salgado", "Design polarizador", "CVT sem emoção", "Manutenção cara em concessionária"],
      veredito: "O novo Corolla é um sedan de luxo disfarçado. Versão híbrida faz 18km/l na cidade. Referência em confiabilidade."
    }
  },
  {
    id: "honda_civic_g10",
    nome: "Honda Civic 2.0 (10ª Geração)",
    marca: "Honda",
    categoria: "conforto",
    anosReferencia: [2017, 2018, 2019, 2020, 2021],
    precoEstimado: { min: 80000, max: 120000 },
    detalhes: {
      motor: "2.0 i-VTEC Flex - 155cv",
      consumo: "Cidade: 9,8 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Design esportivo lindo", "Motor forte e suave", "Acabamento premium", "Dirigibilidade excelente"],
      pontosNegativos: ["Preço alto", "Seguro caro", "Suspensão firme", "Consumo moderado"],
      veredito: "O Civic G10 é um dos melhores sedans já vendidos no Brasil. Design atemporal, motor forte e prazer de dirigir. Sonho de consumo realista."
    }
  },
  {
    id: "jeep_compass",
    nome: "Jeep Compass 2.0 Flex",
    marca: "Jeep",
    categoria: "conforto",
    anosReferencia: [2017, 2018, 2019, 2020, 2021, 2022],
    precoEstimado: { min: 80000, max: 130000 },
    detalhes: {
      motor: "2.0 Flex - 166cv",
      consumo: "Cidade: 8,5 km/l | Estrada: 11,5 km/l",
      pontosPositivos: ["Presença imponente", "Espaço interno generoso", "Multimídia grande", "Status da marca Jeep"],
      pontosNegativos: ["Consumo alto", "Câmbio automático de 6 marchas lento", "Manutenção cara", "Problemas elétricos relatados"],
      veredito: "O Compass dominou o mercado de SUVs. Bonito e espaçoso, mas atenção ao consumo e custo de manutenção. Prefira versões diesel se disponível."
    }
  },
  {
    id: "hyundai_creta",
    nome: "Hyundai Creta 1.6",
    marca: "Hyundai",
    categoria: "conforto",
    anosReferencia: [2017, 2018, 2019, 2020, 2021, 2022],
    precoEstimado: { min: 65000, max: 100000 },
    detalhes: {
      motor: "1.6 Gamma Flex - 130cv",
      consumo: "Cidade: 9,5 km/l | Estrada: 12,5 km/l",
      pontosPositivos: ["Acabamento refinado", "Multimídia completa", "Câmbio automático suave", "Design moderno"],
      pontosNegativos: ["Motor 1.6 fraco para o peso", "Porta-malas mediano", "Peças caras", "Suspensão mole"],
      veredito: "O Creta é um SUV urbano com ótimo acabamento. Motor 1.6 é justo; se puder, espere a versão turbo de 2022+."
    }
  },
  {
    id: "vw_tcross",
    nome: "VW T-Cross 1.0 TSI",
    marca: "Volkswagen",
    categoria: "conforto",
    anosReferencia: [2019, 2020, 2021, 2022, 2023],
    precoEstimado: { min: 70000, max: 105000 },
    detalhes: {
      motor: "1.0 TSI Flex - 128cv",
      consumo: "Cidade: 11,0 km/l | Estrada: 13,5 km/l",
      pontosPositivos: ["Motor turbo potente e econômico", "Plataforma MQB (moderna)", "6 airbags", "VW Play multimídia"],
      pontosNegativos: ["Espaço interno poderia ser maior", "Preço premium", "Suspensão firme", "Porta-malas 373L (mediano)"],
      veredito: "SUV compacto com mecânica de Polo. Motor 1.0 TSI é surpreendente. Melhor opção VW para quem quer SUV sem gastar muito combustível."
    }
  },
  {
    id: "jeep_renegade",
    nome: "Jeep Renegade 1.8 Flex",
    marca: "Jeep",
    categoria: "conforto",
    anosReferencia: [2016, 2017, 2018, 2019, 2020, 2021],
    precoEstimado: { min: 55000, max: 90000 },
    detalhes: {
      motor: "1.8 E.torQ Flex - 139cv",
      consumo: "Cidade: 9,0 km/l | Estrada: 11,8 km/l",
      pontosPositivos: ["Design único e charmoso", "Marca Jeep", "Boa altura do solo", "Multimídia grande"],
      pontosNegativos: ["Motor 1.8 fraco para o peso", "Câmbio automático lento", "Consumo elevado", "Manutenção cara"],
      veredito: "O Renegade tem design único mas mecânica fraca no 1.8 Flex. Versão diesel é outra história. No flex, use mais na cidade."
    }
  },
  {
    id: "chevrolet_tracker",
    nome: "Chevrolet Tracker 1.0 Turbo",
    marca: "Chevrolet",
    categoria: "conforto",
    anosReferencia: [2021, 2022, 2023, 2024],
    precoEstimado: { min: 75000, max: 110000 },
    detalhes: {
      motor: "1.0 Turbo Flex - 116cv",
      consumo: "Cidade: 11,0 km/l | Estrada: 13,5 km/l",
      pontosPositivos: ["Design moderno", "Wi-Fi nativo", "Preço competitivo", "Espaço interno bom"],
      pontosNegativos: ["Motor 1.0 é justo para SUV", "Câmbio automático de 6 marchas preguiçoso", "Suspensão mole", "Acabamento mediano"],
      veredito: "O novo Tracker surpreendeu pelo preço e espaço. Motor 1.0 turbo é econômico mas falta fôlego em subidas com carga."
    }
  },
  {
    id: "nissan_kicks",
    nome: "Nissan Kicks 1.6",
    marca: "Nissan",
    categoria: "conforto",
    anosReferencia: [2017, 2018, 2019, 2020, 2021, 2022],
    precoEstimado: { min: 60000, max: 95000 },
    detalhes: {
      motor: "1.6 16V Flex - 114cv",
      consumo: "Cidade: 10,0 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Design brasileiro premiado", "Câmera 360° (versão top)", "Espaço interno bom", "Zero Gravity Seats (conforto)"],
      pontosNegativos: ["Motor 1.6 aspirado fraco", "CVT monótono", "Preço esticado", "Porta-malas mediano (432L)"],
      veredito: "O Kicks foi projetado no Brasil e tem design premiado. Bancos Zero Gravity são um diferencial real em viagens. Motor poderia ser melhor."
    }
  },

  // ═══════════════════════════════════════
  // UTILITÁRIO / TRABALHO (4 modelos)
  // ═══════════════════════════════════════
  {
    id: "fiat_strada",
    nome: "Fiat Strada 1.3 (Nova Geração)",
    marca: "Fiat",
    categoria: "trabalho",
    anosReferencia: [2021, 2022, 2023, 2024],
    precoEstimado: { min: 65000, max: 100000 },
    detalhes: {
      motor: "1.3 Firefly Flex - 107cv",
      consumo: "Cidade: 10,5 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Cabine dupla de verdade", "Picape mais vendida do Brasil", "Motor econômico", "Versão Adventure completa"],
      pontosNegativos: ["Caçamba pequena", "Motor 1.3 fraco para carga", "Câmbio CVT polêmico", "Acabamento simples"],
      veredito: "A nova Strada reinventou a categoria com cabine dupla acessível. Para trabalho leve e dia a dia, é imbatível."
    }
  },
  {
    id: "vw_saveiro",
    nome: "VW Saveiro 1.6",
    marca: "Volkswagen",
    categoria: "trabalho",
    anosReferencia: [2011, 2014, 2016, 2018, 2020],
    precoEstimado: { min: 35000, max: 65000 },
    detalhes: {
      motor: "1.6 MSI Flex - 120cv",
      consumo: "Cidade: 9,8 km/l | Estrada: 12,5 km/l",
      pontosPositivos: ["Motor 1.6 forte", "Caçamba grande", "Mecânica VW conhecida", "Boa revenda"],
      pontosNegativos: ["Cabine simples apertada", "Conforto limitado", "Suspensão dura", "Acabamento básico"],
      veredito: "A Saveiro é a picape de trabalho por excelência. Motor 1.6 não deixa na mão. Versão Cross é a mais procurada."
    }
  },
  {
    id: "chevrolet_montana_nova",
    nome: "Chevrolet Montana 1.0 Turbo",
    marca: "Chevrolet",
    categoria: "trabalho",
    anosReferencia: [2023, 2024],
    precoEstimado: { min: 85000, max: 115000 },
    detalhes: {
      motor: "1.0 Turbo Flex - 133cv",
      consumo: "Cidade: 10,5 km/l | Estrada: 13,0 km/l",
      pontosPositivos: ["Design moderno", "Cabine ampla", "Caçamba com 877L", "Motor turbo forte"],
      pontosNegativos: ["Preço elevado", "Recém-lançada (histórico curto)", "Câmbio automático de 6 marchas básico", "Manutenção turbo"],
      veredito: "A nova Montana veio para brigar com a Strada. Maior, mais potente e mais cara. Design de SUV com caçamba."
    }
  },
  {
    id: "fiat_toro",
    nome: "Fiat Toro 1.8 Flex",
    marca: "Fiat",
    categoria: "trabalho",
    anosReferencia: [2017, 2018, 2019, 2020, 2021, 2022],
    precoEstimado: { min: 70000, max: 110000 },
    detalhes: {
      motor: "1.8 E.torQ Flex - 139cv",
      consumo: "Cidade: 9,0 km/l | Estrada: 11,5 km/l",
      pontosPositivos: ["Picape com cara de SUV", "Conforto de passeio", "Caçamba grande", "Versátil: trabalho e lazer"],
      pontosNegativos: ["Motor 1.8 fraco para carga pesada", "Consumo alto", "Câmbio automático de 6 marchas lento com carga", "Manutenção cara"],
      veredito: "A Toro é a picape lifestyle. Mais para passeio que trabalho pesado. Versão diesel é outra categoria. No flex, use para carga leve."
    }
  },
];

export function getCarsByCategory(categoria: CarData['categoria']): CarData[] {
  return CAR_DATABASE.filter(car => car.categoria === categoria);
}

export function getCarsWithinBudget(categoria: CarData['categoria'], budget: number): CarData[] {
  return CAR_DATABASE.filter(
    car => car.categoria === categoria && car.precoEstimado.min <= budget
  );
}

export function searchCars(query: string): CarData[] {
  const q = query.toLowerCase();
  return CAR_DATABASE.filter(
    car => car.nome.toLowerCase().includes(q) || car.marca.toLowerCase().includes(q)
  );
}
