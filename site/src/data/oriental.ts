import type { HistoricalEntry } from './types'

type OrientalTopic = {
  id: string
  title: string
  date: string
  year: number
  yearRange?: [number, number]
  kind: HistoricalEntry['kind']
  summary: string
  categories: string[]
  tile: [number, number]
  body: string
  source: string
  organization: string
  sourceTitle: string
  relatedEntryIds: string[]
}

export const orientalTopics: OrientalTopic[] = [
  {
    id: 'china-imperial', title: 'China Imperial', date: '221 a.C.–1912', year: -220, yearRange: [-220, 1912],
    kind: 'civilization', categories: ['china', 'imperios'], tile: [0, 0],
    summary: 'Dinastias, cidades e transformações da unificação Qin ao fim dos Qing.',
    body: 'A unificação promovida por Qin Shi Huang em 221 a.C. é um marco inicial da China Imperial. Dinastias como Han, Tang, Song, Yuan, Ming e Qing governaram em diferentes épocas, com períodos de expansão, fragmentação e reunificação. Esse longo percurso não corresponde a um território sempre igual e continuamente unido. A abdicação do último imperador Qing, em 1912, encerrou o regime imperial.',
    source: 'https://asia.si.edu/education/educator-resources/teaching-china-with-the-smithsonian/interactives/timelines/timeline-of-chinese-history-art-and-culture/',
    organization: 'Smithsonian National Museum of Asian Art', sourceTitle: 'Timeline of Chinese History, Art, and Culture',
    relatedEntryIds: ['grande-muralha-da-china', 'exercito-de-terracota'],
  },
  {
    id: 'grande-muralha-da-china', title: 'A Grande Muralha da China', date: 'Da Antiguidade à dinastia Ming', year: -219,
    kind: 'event', categories: ['china'], tile: [1, 0],
    summary: 'Fortificações construídas e reconstruídas por diferentes estados e dinastias.',
    body: 'A Grande Muralha reúne sistemas de defesa de épocas diferentes. Qin Shi Huang conectou fortificações anteriores por volta de 220 a.C.; grandes intervenções ocorreram depois, incluindo obras da dinastia Ming, entre os séculos XIV e XVII. Torres, passagens e muralhas fizeram parte de estratégias de defesa e controle territorial. O monumento não foi uma única obra executada integralmente por um só imperador.',
    source: 'https://whc.unesco.org/en/list/438', organization: 'UNESCO', sourceTitle: 'The Great Wall',
    relatedEntryIds: ['china-imperial', 'imperio-mongol'],
  },
  {
    id: 'exercito-de-terracota', title: 'Exército de Terracota', date: 'Século III a.C. · c. 210 a.C.', year: -209,
    kind: 'event', categories: ['china'], tile: [2, 0],
    summary: 'Soldados e cavalos de argila no complexo funerário de Qin Shi Huang.',
    body: 'Milhares de figuras de soldados e cavalos integram o complexo funerário de Qin Shi Huang, primeiro imperador da China unificada. O imperador foi sepultado em 210 a.C., mas a construção do complexo começou antes. As figuras, descobertas em 1974, revelam detalhes de armas, vestimentas e organização militar do período Qin. São objetos arqueológicos; a imagem utilizada no card é apenas ilustrativa.',
    source: 'https://whc.unesco.org/en/list/441', organization: 'UNESCO', sourceTitle: 'Mausoleum of the First Qin Emperor',
    relatedEntryIds: ['china-imperial', 'grande-muralha-da-china'],
  },
  {
    id: 'rota-da-seda', title: 'Rota da Seda', date: 'Da Antiguidade à era moderna', year: -199,
    kind: 'event', categories: ['china'], tile: [0, 1],
    summary: 'Redes terrestres e marítimas de comércio, conhecimentos e culturas pela Eurásia.',
    body: 'As Rotas da Seda foram redes de caminhos terrestres e marítimos que conectaram comunidades da Eurásia e de outras regiões. Mercadores transportavam seda e muitos outros produtos; conhecimentos, técnicas e crenças também circulavam. Os percursos mudaram conforme as condições políticas e econômicas. Por isso, não havia uma única estrada nem uma data universal de abertura e encerramento. O nome Rota da Seda foi criado no século XIX para descrever essas conexões mais antigas.',
    source: 'https://www.unesco.org/en/silk-roads/about-silk-roads', organization: 'UNESCO', sourceTitle: 'About the Silk Roads',
    relatedEntryIds: ['china-imperial', 'imperio-mongol', 'buda-e-budismo'],
  },
  {
    id: 'japao-feudal', title: 'Japão Feudal', date: 'c. 1185–1868', year: 1185, yearRange: [1185, 1868],
    kind: 'period', categories: ['japao'], tile: [1, 1],
    summary: 'Xogunatos, domínios regionais e mudanças na sociedade japonesa.',
    body: 'Do final do século XII à Restauração Meiji, governos militares e senhores regionais exerceram grande influência sobre a política japonesa. Esse recorte amplo inclui diferentes xogunatos, guerras entre domínios e a consolidação do governo Tokugawa. O termo Japão Feudal é uma simplificação didática para uma sociedade que mudou durante esses séculos. Minamoto no Yoritomo recebeu o título de xogum em 1192, e não no início convencional de 1185 usado para a era dos samurais.',
    source: 'https://education.asianart.org/wp-content/uploads/sites/6/2019/12/ArtsofSamuraiPacket.pdf',
    organization: 'Asian Art Museum', sourceTitle: 'Arts of the Samurai — Educator Resource Packet',
    relatedEntryIds: ['samurais', 'ninjas'],
  },
  {
    id: 'samurais', title: 'Samurais', date: 'Japão medieval e início da era moderna', year: 1185,
    kind: 'period', categories: ['japao', 'guerreiros'], tile: [2, 1],
    summary: 'Elites guerreiras, administração e cultura em diferentes épocas do Japão.',
    body: 'Os samurais formaram elites guerreiras cujas funções mudaram ao longo da história japonesa. Além do combate, exerceram atividades administrativas, literárias e de patrocínio das artes. Armas, armaduras e valores também se transformaram conforme as condições políticas. O bushidō não deve ser tratado como um código único e imutável seguido por todos os guerreiros de todas as épocas. Na era Meiji, medidas sucessivas retiraram seus privilégios, incluindo a proibição de portar espadas em 1876.',
    source: 'https://www.vam.ac.uk/articles/samurai-japanese-arms-armour',
    organization: 'Victoria and Albert Museum', sourceTitle: 'Samurai: Japanese arms & armour',
    relatedEntryIds: ['japao-feudal', 'ninjas'],
  },
  {
    id: 'ninjas', title: 'Ninjas', date: 'Do século XIV ao período Edo', year: 1300,
    kind: 'period', categories: ['japao', 'guerreiros'], tile: [0, 2],
    summary: 'Shinobi: informação, infiltração e atuação clandestina além dos mitos.',
    body: 'Os agentes conhecidos como shinobi tinham entre suas tarefas reunir informações para seus senhores. Seus conhecimentos incluíam infiltração, disfarce e comunicação; retornar com informações podia exigir evitar o combate. A imagem do ninja de roupa preta e poderes extraordinários foi ampliada pela literatura e pelo teatro. Registros de atuação de shinobi aparecem do século XIV ao período Edo. Samurais e ninjas não formavam necessariamente grupos opostos e isolados.',
    source: 'https://ninjacenter.rscn.mie-u.ac.jp/ninja/', organization: 'Universidade de Mie — International Ninja Research Center',
    sourceTitle: 'Pesquisas sobre ninjas e shinobi', relatedEntryIds: ['japao-feudal', 'samurais'],
  },
  {
    id: 'imperio-mongol', title: 'Império Mongol', date: '1206–1368', year: 1206, yearRange: [1206, 1368],
    kind: 'civilization', categories: ['imperios'], tile: [1, 2],
    summary: 'Conquistas, dinastias e conexões por vastas regiões da Eurásia.',
    body: '', source: '', organization: '', sourceTitle: '', relatedEntryIds: [],
  },
  {
    id: 'imperio-persa', title: 'Império Persa', date: 'c. 550–330 a.C.', year: -549, yearRange: [-549, -329],
    kind: 'civilization', categories: ['imperios'], tile: [2, 2],
    summary: 'O império aquemênida de Ciro e Dario, entre a Ásia e o Mediterrâneo.',
    body: 'O Império Persa aquemênida se expandiu sob Ciro e seus sucessores a partir do século VI a.C. Sob Dario I, abrangia regiões entre o Mediterrâneo, o Egito e partes da Ásia. Sua administração articulava territórios e populações diversos. A conquista por Alexandre encerrou o domínio aquemênida no século IV a.C. O título Império Persa refere-se aqui ao recorte aquemênida, não a todas as dinastias da história do Irã.',
    source: 'https://www.metmuseum.org/ja/essays/the-achaemenid-persian-empire-550-330-b-c',
    organization: 'The Metropolitan Museum of Art', sourceTitle: 'The Achaemenid Persian Empire (550–330 B.C.)',
    relatedEntryIds: ['guerras-greco-persas', 'conquistas-de-alexandre'],
  },
  {
    id: 'imperio-mughal', title: 'Índia — Império Mughal', date: '1526–1857', year: 1526, yearRange: [1526, 1857],
    kind: 'civilization', categories: ['imperios'], tile: [0, 3],
    summary: 'Cortes, artes e arquitetura de um império do sul da Ásia.',
    body: 'A conquista de Delhi por Babur em 1526 marcou o início do poder Mughal no subcontinente indiano. O território e a força do império mudaram ao longo dos séculos. As cortes imperiais promoveram pintura, arquitetura e intercâmbios culturais; o Taj Mahal tornou-se uma de suas obras mais conhecidas. Mesmo após a perda de grande parte de seu território, os imperadores permaneceram como centro simbólico de autoridade até a deposição do último governante, em 1857.',
    source: 'https://asia-archive.si.edu/learn/worlds-within-worlds-imperial-paintings-from-india-and-iran/the-mughal-empire/',
    organization: 'Smithsonian National Museum of Asian Art', sourceTitle: 'The Mughal Empire',
    relatedEntryIds: ['rota-da-seda', 'buda-e-budismo'],
  },
  {
    id: 'genghis-khan', title: 'Genghis Khan', date: 'c. 1162–1227', year: 1162, yearRange: [1162, 1227],
    kind: 'person', categories: ['guerreiros'], tile: [1, 3],
    summary: 'Temüjin, a unificação dos mongóis e a formação de um novo poder na Ásia.',
    body: 'Temüjin, conhecido como Genghis Khan, Gêngis Khan ou Chinggis Khan, reuniu grupos mongóis e foi proclamado líder em 1206. Sua atuação combinou alianças e campanhas militares, criando a base de um império que continuaria a se expandir após sua morte em 1227. A data de nascimento é aproximada. Sua trajetória deve ser estudada junto aos efeitos das conquistas sobre as populações envolvidas, sem reduzir o período à história de um único governante.',
    source: 'https://royalarmouries.org/objects-and-stories/stories/the-mongols/rise-of-the-mongols',
    organization: 'Royal Armouries', sourceTitle: 'Rise of the Mongols',
    relatedEntryIds: ['imperio-mongol', 'conquistas-mongois'],
  },
  {
    id: 'buda-e-budismo', title: 'Buda e o Budismo', date: 'Séculos VI–V a.C. · datas debatidas', year: -499,
    kind: 'tradition', categories: [], tile: [2, 3],
    summary: 'O Buda histórico, seus ensinamentos e tradições budistas na Ásia.',
    body: 'Siddhartha Gautama, conhecido como Buda, é a figura histórica associada à origem do budismo no sul da Ásia. Sua cronologia exata é debatida entre pesquisadores e varia nas tradições budistas, por isso não apresentamos um par de datas como certeza. A investigação de sua vida distingue evidências históricas de narrativas religiosas. Os ensinamentos deram origem a diferentes escolas e tradições que se difundiram por diversas regiões e hoje têm seguidores em todo o mundo.',
    source: 'https://iep.utm.edu/buddha/', organization: 'Internet Encyclopedia of Philosophy', sourceTitle: 'Buddha',
    relatedEntryIds: ['rota-da-seda', 'china-imperial'],
  },
]

// O Império Mongol reaproveita o verbete existente para manter um único ID canônico.
export const orientalEntries: HistoricalEntry[] = orientalTopics
  .filter((topic) => topic.id !== 'imperio-mongol')
  .map((topic) => ({
    id: topic.id, kind: topic.kind, title: topic.title, summary: topic.summary,
    time: { scale: 'human', label: topic.date, timelineYear: topic.year },
    topics: ['história da Ásia', ...topic.categories.map((category) => ({
      china: 'China', japao: 'Japão', imperios: 'Impérios', guerreiros: 'Guerreiros',
    })[category] ?? category)],
    sections: [{ heading: 'Contexto histórico', body: topic.body, classification: 'evidence' }],
    sources: [{ title: topic.sourceTitle, organization: topic.organization, url: topic.source, kind: 'reference' }],
    relatedEntryIds: topic.relatedEntryIds,
  }))
