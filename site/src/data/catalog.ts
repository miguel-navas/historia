import type { HistoricalEntry } from './types'

export const catalog: HistoricalEntry[] = [
  {
    id: 'formacao-da-terra',
    kind: 'period',
    title: 'A formação da Terra',
    summary:
      'O planeta se formou no início da história do Sistema Solar; rochas e meteoritos ajudam a investigar esse passado remoto.',
    time: {
      scale: 'geological',
      label: 'Há cerca de 4,54 bilhões de anos',
      timelineYear: -4_540_000_000,
    },
    topics: ['geologia', 'tempo profundo'],
    sections: [
      {
        heading: 'Um passado reconstruído por evidências',
        body:
          'A idade da Terra é estimada por datação radiométrica de materiais terrestres, lunares e meteoríticos. Como as rochas mais antigas foram alteradas ou recicladas, essa idade é uma estimativa científica, não a leitura de um único registro intacto.',
        classification: 'evidence',
      },
    ],
    sources: [
      {
        title: 'Age of the Earth',
        organization: 'U.S. Geological Survey',
        url: 'https://pubs.usgs.gov/gip/geotime/age.html',
        kind: 'reference',
      },
    ],
    relatedEntryIds: ['era-dos-dinossauros', 'homo-sapiens'],
  },
  {
    id: 'era-dos-dinossauros',
    kind: 'period',
    title: 'A era dos dinossauros',
    summary:
      'Dinossauros não avianos viveram durante o Mesozoico, muito antes do surgimento de Homo sapiens.',
    time: {
      scale: 'geological',
      label: 'Mesozoico: cerca de 252 a 66 milhões de anos atrás',
      timelineYear: -252_000_000,
    },
    topics: ['dinossauros', 'Mesozoico', 'extinção'],
    sections: [
      {
        heading: 'Triássico, Jurássico e Cretáceo',
        body:
          'O Mesozoico é dividido em Triássico, Jurássico e Cretáceo. Os dinossauros não avianos desapareceram na extinção em massa do final do Cretáceo, há cerca de 66 milhões de anos.',
        classification: 'evidence',
      },
      {
        heading: 'Uma fronteira importante na linha do tempo',
        body:
          'A era dos dinossauros não avianos terminou dezenas de milhões de anos antes de Homo sapiens aparecer. A proximidade entre esses assuntos no site é uma escolha de navegação, não uma afirmação de coexistência.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'When did dinosaurs live?',
        organization: 'Natural History Museum, London',
        url: 'https://www.nhm.ac.uk/discover/when-did-dinosaurs-live.html',
        kind: 'reference',
      },
    ],
    relatedEntryIds: ['formacao-da-terra', 'homo-sapiens'],
  },
  {
    id: 'homo-sapiens',
    kind: 'person',
    title: 'Homo sapiens',
    summary:
      'Nossa espécie surgiu na África; fósseis e outras evidências permitem estudar uma história evolutiva muito mais recente que a dos dinossauros.',
    time: {
      scale: 'human',
      label: 'Pelo menos cerca de 300 mil anos atrás',
      timelineYear: -300_000,
    },
    topics: ['origens humanas', 'evolução', 'África'],
    sections: [
      {
        heading: 'O que os fósseis permitem afirmar',
        body:
          'O Smithsonian Human Origins Program reúne evidências fósseis e pesquisas sobre a evolução humana. A história da espécie é reconstruída a partir de evidências que continuam a ser estudadas.',
        classification: 'evidence',
      },
    ],
    sources: [
      {
        title: 'Homo sapiens',
        organization: 'Smithsonian National Museum of Natural History',
        url: 'https://humanorigins.si.edu/evidence/human-fossils/species/homo-sapiens',
        kind: 'reference',
      },
    ],
    relatedEntryIds: ['formacao-da-terra', 'era-dos-dinossauros'],
  },
  {
    id: 'antigo-reino-egito',
    kind: 'civilization',
    title: 'Egito Antigo: o Antigo Reino',
    summary:
      'O Antigo Reino é associado à construção das pirâmides e ao desenvolvimento de uma sociedade registrada também em monumentos e inscrições.',
    time: {
      scale: 'human',
      label: 'c. 2613–2181 a.C.',
      timelineYear: -2613,
    },
    topics: ['Egito Antigo', 'África', 'pirâmides', 'Antiguidade'],
    sections: [
      {
        heading: 'Monumentos como evidência histórica',
        body:
          'A história desse período é reconstruída em parte por monumentos, inscrições e vestígios arquitetônicos. A escassez de registros escritos significa que algumas interpretações permanecem limitadas pelas evidências preservadas.',
        classification: 'evidence',
      },
    ],
    sources: [
      {
        title: 'Old Kingdom of Egypt: The Age of the Pyramids',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Old_Kingdom_of_Egypt/',
        kind: 'secondary',
      },
    ],
    relatedEntryIds: ['imperio-romano'],
  },
  {
    id: 'atene-antiga',
    kind: 'civilization',
    title: 'Atenas antiga',
    summary:
      'Atenas foi uma cidade-estado cuja história está ligada a debates sobre política, cultura e participação cívica no mundo grego antigo.',
    time: {
      scale: 'human',
      label: 'Antiguidade; florescimento entre os séculos V e IV a.C.',
      timelineYear: -500,
    },
    topics: ['Grécia', 'Antiguidade', 'democracia', 'filosofia'],
    sections: [
      {
        heading: 'Contexto de uma cidade-estado',
        body:
          'Atenas se tornou conhecida por suas contribuições políticas e culturais. A participação na vida cívica antiga tinha limites próprios e não deve ser confundida com a cidadania universal contemporânea.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'Athens',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Athens/',
        kind: 'secondary',
      },
    ],
    relatedEntryIds: ['mitologia-grega', 'imperio-romano'],
  },
  {
    id: 'mitologia-grega',
    kind: 'tradition',
    title: 'Mitologia grega',
    summary:
      'Narrativas sobre deuses, heróis e a relação entre pessoas e mundo natural formam tradições culturais variadas, transmitidas em diferentes versões.',
    time: {
      scale: 'cultural',
      label: 'Tradição cultural do mundo grego antigo',
    },
    topics: ['mitologia', 'Grécia', 'tradição oral', 'literatura'],
    sections: [
      {
        heading: 'Narrativas, religião e literatura',
        body:
          'Os mitos gregos chegaram até nós por meio de poemas, obras literárias e outras fontes que registram versões particulares. Eles são estudados como narrativas e tradições culturais, não como relatos históricos comprovados sobre a existência dos deuses.',
        classification: 'tradition',
      },
    ],
    sources: [
      {
        title: 'Greek Mythology',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Greek_Mythology/',
        kind: 'secondary',
      },
      {
        title: 'The Odyssey of Homer',
        organization: 'Perseus Digital Library, Tufts University',
        url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0135',
        kind: 'primary',
      },
    ],
    relatedEntryIds: ['atene-antiga'],
  },
  {
    id: 'imperio-romano',
    kind: 'civilization',
    title: 'Império Romano',
    summary:
      'O Império Romano se expandiu por regiões da Europa, do norte da África e do oeste da Ásia; sua história também inclui continuidades políticas no Oriente.',
    time: {
      scale: 'human',
      label: '27 a.C.–476 d.C. no Ocidente; continuidade oriental até 1453',
      timelineYear: -27,
    },
    topics: ['Roma', 'Antiguidade', 'impérios', 'Mediterrâneo'],
    sections: [
      {
        heading: 'Uma história com continuidades',
        body:
          'A deposição do último imperador do Ocidente em 476 não encerrou de imediato a história política romana no Oriente. A cronologia depende do recorte considerado, por isso o fim do império ocidental e a continuidade bizantina são apresentados separadamente.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'Roman Empire',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Roman_Empire/',
        kind: 'secondary',
      },
    ],
    relatedEntryIds: ['atene-antiga', 'revolucao-francesa'],
  },
  {
    id: 'imperio-mongol',
    kind: 'civilization',
    title: 'Império Mongol',
    summary:
      'Formado no século XIII, o império mongol conectou vastas regiões da Ásia e se transformou ao longo de sucessões e dinastias.',
    time: {
      scale: 'human',
      label: '1206–1368',
      timelineYear: 1206,
    },
    topics: ['Ásia Central', 'Mongólia', 'impérios', 'Idade Média'],
    sections: [
      {
        heading: 'Expansão e transformação',
        body:
          'O império foi fundado após a unificação de grupos das estepes sob Gêngis Khan. Seus territórios e poderes políticos mudaram com o tempo; a experiência mongol não se reduz a campanhas militares.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'Mongol Empire',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/Mongol_Empire/',
        kind: 'secondary',
      },
    ],
    relatedEntryIds: [],
  },
  {
    id: 'timbuktu-e-saber',
    kind: 'event',
    title: 'Timbuktu e as tradições de conhecimento da África Ocidental',
    summary:
      'Timbuktu é um ponto de entrada para explorar a história urbana, intelectual e cultural da África Ocidental.',
    time: {
      scale: 'human',
      label: 'Séculos medievais e início da era moderna',
      timelineYear: 1300,
    },
    topics: ['África Ocidental', 'Timbuktu', 'cidades', 'conhecimento'],
    sections: [
      {
        heading: 'Uma história regional',
        body:
          'A cidade deve ser estudada em seu contexto regional e por meio das fontes e patrimônios preservados. Esta seleção é apenas um ponto de partida e não representa a diversidade histórica do continente africano.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'Timbuktu',
        organization: 'UNESCO World Heritage Centre',
        url: 'https://whc.unesco.org/en/list/119/',
        kind: 'reference',
      },
    ],
    relatedEntryIds: [],
  },
  {
    id: 'machu-picchu',
    kind: 'civilization',
    title: 'Machu Picchu e o mundo Inca',
    summary:
      'Machu Picchu oferece um ponto de entrada para pesquisar a sociedade inca, sua paisagem e a história dos Andes.',
    time: {
      scale: 'human',
      label: 'Século XV',
      timelineYear: 1450,
    },
    topics: ['Andes', 'Incas', 'América do Sul', 'patrimônio'],
    sections: [
      {
        heading: 'Paisagem e patrimônio',
        body:
          'O sítio é apresentado em relação à paisagem andina e às sociedades que o construíram e utilizaram. A interpretação histórica deve distinguir o que a evidência arqueológica permite afirmar de explicações posteriores.',
        classification: 'evidence',
      },
    ],
    sources: [
      {
        title: 'Historic Sanctuary of Machu Picchu',
        organization: 'UNESCO World Heritage Centre',
        url: 'https://whc.unesco.org/en/list/274/',
        kind: 'reference',
      },
    ],
    relatedEntryIds: [],
  },
  {
    id: 'revolucao-francesa',
    kind: 'event',
    title: 'Revolução Francesa',
    summary:
      'Entre 1789 e 1799, a revolução transformou instituições e disputas políticas na França, com impactos que foram interpretados de maneiras diversas.',
    time: {
      scale: 'human',
      label: '1789–1799',
      timelineYear: 1789,
    },
    topics: ['revoluções', 'França', 'direitos', 'política'],
    sections: [
      {
        heading: 'Uma década de mudanças e conflitos',
        body:
          'A crise do Antigo Regime e a formação de novas instituições são aspectos centrais do período. A Declaração dos Direitos do Homem e do Cidadão é uma fonte primária importante, mas seus princípios e sua aplicação histórica devem ser analisados em contexto.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'French Revolution',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/French_Revolution/',
        kind: 'secondary',
      },
      {
        title: 'Declaration of the Rights of Man and of the Citizen',
        organization: 'The Avalon Project, Yale Law School',
        url: 'https://avalon.law.yale.edu/18th_century/rightsof.asp',
        kind: 'primary',
      },
    ],
    relatedEntryIds: ['imperio-romano', 'revolucao-industrial'],
  },
  {
    id: 'revolucao-industrial',
    kind: 'event',
    title: 'Revolução Industrial britânica',
    summary:
      'A industrialização britânica foi um processo gradual de mudanças tecnológicas e sociais, com datas e causas debatidas por historiadores.',
    time: {
      scale: 'human',
      label: 'c. 1760–1840 (recorte aproximado)',
      timelineYear: 1760,
    },
    topics: ['revoluções', 'industrialização', 'trabalho', 'tecnologia'],
    sections: [
      {
        heading: 'Um processo, não um único acontecimento',
        body:
          'A expressão “Revolução Industrial” resume mudanças de longa duração na produção, no trabalho e na vida social. A periodização é aproximada e varia conforme o aspecto estudado.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'British Industrial Revolution',
        organization: 'World History Encyclopedia',
        url: 'https://www.worldhistory.org/British_Industrial_Revolution/',
        kind: 'secondary',
      },
    ],
    relatedEntryIds: ['revolucao-francesa', 'mundo-pos-1945'],
  },
  {
    id: 'dia-d',
    kind: 'event',
    title: 'Desembarque da Normandia (Dia D)',
    summary:
      'Em 6 de junho de 1944, o desembarque aliado na Normandia iniciou uma etapa da Operação Overlord durante a Segunda Guerra Mundial.',
    time: {
      scale: 'human',
      label: '6 de junho de 1944',
      timelineYear: 1944,
    },
    topics: ['guerras', 'Segunda Guerra Mundial', 'Normandia', 'fontes primárias'],
    sections: [
      {
        heading: 'Um acontecimento documentado em arquivos',
        body:
          'O Dia D integrou uma operação multinacional e foi parte da campanha da Normandia. Os arquivos reúnem registros de diferentes órgãos e formatos, que permitem investigar o acontecimento por perspectivas documentais específicas.',
        classification: 'evidence',
      },
    ],
    sources: [
      {
        title: 'Records Relating to D-Day',
        organization: 'U.S. National Archives and Records Administration',
        url: 'https://www.archives.gov/research/military/ww2/d-day',
        kind: 'primary',
      },
      {
        title: 'World War II Records',
        organization: 'U.S. National Archives and Records Administration',
        url: 'https://www.archives.gov/research/military/ww2',
        kind: 'reference',
      },
    ],
    relatedEntryIds: ['mundo-pos-1945'],
  },
  {
    id: 'mundo-pos-1945',
    kind: 'period',
    title: 'Cooperação internacional no mundo contemporâneo',
    summary:
      'A Carta das Nações Unidas e a Declaração Universal dos Direitos Humanos são documentos para pesquisar projetos de cooperação internacional construídos no pós-guerra.',
    time: {
      scale: 'human',
      label: 'Desde 1945',
      timelineYear: 1945,
    },
    topics: ['mundo contemporâneo', 'Nações Unidas', 'direitos humanos', 'política'],
    sections: [
      {
        heading: 'Documentos e seus contextos',
        body:
          'A Carta da ONU e a Declaração Universal expressam princípios e objetivos institucionais. Sua existência não significa que esses objetivos tenham sido realizados de forma plena ou uniforme; estudar suas aplicações exige consultar fontes e perspectivas adicionais.',
        classification: 'interpretation',
      },
    ],
    sources: [
      {
        title: 'Charter of the United Nations: Full Text',
        organization: 'United Nations',
        url: 'https://www.un.org/en/about-us/un-charter/full-text',
        kind: 'primary',
      },
      {
        title: 'Universal Declaration of Human Rights',
        organization: 'United Nations',
        url: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights',
        kind: 'primary',
      },
    ],
    relatedEntryIds: ['dia-d', 'revolucao-industrial'],
  },
]
