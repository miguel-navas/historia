import type { HistoricalEntry } from './types'

type WarTopic = {
  id: string
  title: string
  date: string
  yearRange: [number, number]
  summary: string
  categories: string[]
  imagePosition: [number, number]
  body: string
  source: string
  organization: string
  sourceTitle: string
  extraSources?: HistoricalEntry['sources']
  relatedEntryIds: string[]
}

export const warTopics: WarTopic[] = [
  {
    id: 'segunda-guerra-mundial', title: 'Segunda Guerra Mundial', date: '1939–1945',
    yearRange: [1939, 1945], categories: ['contemporanea'], imagePosition: [7.984, 40.02],
    summary: 'Um conflito global com frentes na Europa, África, Ásia e Pacífico.',
    body: 'A Segunda Guerra Mundial colocou os Aliados e as potências do Eixo em confronto. A invasão alemã da Polônia em 1939 marcou o início da guerra na Europa, enquanto a guerra entre Japão e China já ocorria desde 1937. Adolf Hitler liderava a Alemanha nazista; Winston Churchill tornou-se primeiro-ministro britânico em 1940. O conflito atingiu militares e civis em escala mundial e terminou em 1945, após as rendições da Alemanha e do Japão.',
    source: 'https://www.nam.ac.uk/explore/second-world-war',
    organization: 'National Army Museum', sourceTitle: 'Second World War',
    relatedEntryIds: ['dia-d', 'mundo-pos-1945'],
  },
  {
    id: 'conquistas-mongois', title: 'Conquistas Mongóis', date: '1206–1294',
    yearRange: [1206, 1294], categories: ['medieval'], imagePosition: [50.338, 40.02],
    summary: 'A expansão dos exércitos mongóis pela Ásia e por regiões da Europa.',
    body: 'Em 1206, Temüjin foi proclamado Genghis Khan, reunindo os mongóis sob uma liderança central. As conquistas avançaram pela Ásia e alcançaram regiões da Europa durante seu governo e o de seus sucessores. O período de 1206 a 1294 é um recorte da expansão imperial, não o tempo de vida de um único governante. A história do império combina campanhas militares, destruição e novas conexões entre regiões.',
    source: 'https://royalarmouries.org/objects-and-stories/stories/the-mongols/rise-of-the-mongols',
    organization: 'Royal Armouries', sourceTitle: 'Rise of the Mongols',
    extraSources: [{
      title: 'Map of the Mongol Empire — expansion 1206–1294',
      organization: 'National Museum of Mongolia',
      url: 'https://artsandculture.google.com/asset/map-of-the-mongol-empire/RgG0mlqBaJdnGw?hl=en',
      kind: 'reference',
    }],
    relatedEntryIds: ['imperio-mongol'],
  },
  {
    id: 'cruzadas', title: 'Cruzadas', date: '1095–1291',
    yearRange: [1095, 1291], categories: ['medieval'], imagePosition: [92.152, 40.02],
    summary: 'Campanhas, disputas territoriais e encontros culturais no Mediterrâneo medieval.',
    body: 'As cruzadas à Terra Santa começaram após a convocação do papa Urbano II em 1095 e envolveram campanhas e disputas pelo controle de territórios do Mediterrâneo oriental. Saladino retomou Jerusalém em 1187. Além dos combates, houve relações comerciais e intercâmbios entre comunidades de diferentes tradições. A tomada de Constantinopla por cruzados em 1204 mostra que os conflitos não se limitaram a uma oposição entre cristãos e muçulmanos. A queda de Acre, em 1291, encerra o recorte apresentado aqui.',
    source: 'https://www.metmuseum.org/pt/essays/the-crusades-1095-1291',
    organization: 'The Metropolitan Museum of Art', sourceTitle: 'The Crusades (1095–1291)',
    relatedEntryIds: ['conquistas-mongois', 'imperio-romano'],
  },
  {
    id: 'conquistas-de-alexandre', title: 'Conquistas de Alexandre', date: '336–323 a.C.',
    yearRange: [-335, -322], categories: ['antiguidade'], imagePosition: [7.984, 79.022],
    summary: 'Da Macedônia à conquista do Império Persa e à expansão pela Ásia.',
    body: 'Alexandre governou a Macedônia entre 336 e 323 a.C. Em 334 a.C., atravessou o Helesponto e iniciou sua campanha na Ásia. Chegou ao Egito em 332 a.C. e conquistou o Império Persa, avançando até regiões próximas ao vale do Indo. Morreu na Babilônia em 323 a.C. O intervalo do card corresponde ao seu reinado; a grande campanha asiática começou dois anos depois.',
    source: 'https://www.ucl.ac.uk/museums-static/digitalegypt/chronology/alexandergreat.html',
    organization: 'University College London', sourceTitle: 'Alexander the Great',
    relatedEntryIds: ['guerras-greco-persas', 'atene-antiga'],
  },
  {
    id: 'guerras-greco-persas', title: 'Guerras Greco-Persas', date: '499–449 a.C.',
    yearRange: [-498, -448], categories: ['antiguidade'], imagePosition: [50.338, 79.022],
    summary: 'Cidades gregas e o Império Persa em disputas pelo Egeu e seus territórios.',
    body: 'O apoio de Atenas e Erétria à revolta das cidades jônicas, iniciada em 499 a.C., esteve entre os antecedentes das campanhas persas. Maratona, Termópilas e Salamina tornaram-se episódios conhecidos desses conflitos. Em 480 a.C., a frota de Xerxes enfrentou a aliança grega em Salamina. As guerras envolveram cidades com alianças diversas; não foram um confronto entre dois povos inteiramente unidos. O intervalo até 449 a.C. é uma periodização ampla das disputas.',
    source: 'https://2500years.culture.gov.gr/en/chapters/persiki-polemi/to-tropaio-ton-athinaion-ston-marathona',
    organization: 'Ministério da Cultura da Grécia', sourceTitle: 'Persian Wars — Proving History',
    extraSources: [{
      title: 'Luxury and Power: Persia to Greece — Guide for teachers',
      organization: 'The British Museum',
      url: 'https://www.britishmuseum.org/sites/default/files/2023-04/Guide_for_teachers__Luxury_and_Power_Persia_to_Greece_Exhibition_The%20British_Museum.pdf',
      kind: 'reference',
    }],
    relatedEntryIds: ['atene-antiga', 'conquistas-de-alexandre'],
  },
  {
    id: 'guerras-napoleonicas', title: 'Guerras Napoleônicas', date: '1803–1815',
    yearRange: [1803, 1815], categories: ['napoleonica'], imagePosition: [92.152, 79.022],
    summary: 'Campanhas de Napoleão e coalizões que transformaram o mapa político europeu.',
    body: 'As Guerras Napoleônicas envolveram o governo de Napoleão Bonaparte e sucessivas coalizões de países. Entre 1803 e 1815, campanhas, negociações e disputas de poder mudaram a Europa e tiveram efeitos além dela. A derrota de Napoleão em Waterloo, em 1815, encerrou sua tentativa de retomar o poder. A trajetória do período está ligada às transformações políticas iniciadas pela Revolução Francesa.',
    source: 'https://www.nam.ac.uk/whats-on/napoleonic-wars-bsl-tour',
    organization: 'National Army Museum', sourceTitle: 'Napoleonic Wars',
    relatedEntryIds: ['revolucao-francesa'],
  },
]

export const warEntries: HistoricalEntry[] = warTopics.map((topic) => ({
  id: topic.id,
  kind: 'event',
  title: topic.title,
  summary: topic.summary,
  time: { scale: 'human', label: topic.date, timelineYear: topic.yearRange[0] },
  topics: ['guerras', 'conflitos', ...topic.categories.map((category) => ({
    antiguidade: 'Antiguidade', medieval: 'Idade Média', napoleonica: 'Era Napoleônica', contemporanea: 'Mundo Contemporâneo',
  })[category] ?? category)],
  sections: [{ heading: 'Contexto histórico', body: topic.body, classification: 'evidence' }],
  sources: [{ title: topic.sourceTitle, organization: topic.organization, url: topic.source, kind: 'reference' }, ...(topic.extraSources ?? [])],
  relatedEntryIds: topic.relatedEntryIds,
}))
