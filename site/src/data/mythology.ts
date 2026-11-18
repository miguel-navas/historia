import type { HistoricalEntry, SourceReference } from './types'

type MythologyTopic = {
  id: string
  title: string
  summary: string
  categories: string[]
  tile: [number, number]
  body: string
  sources: SourceReference[]
  relatedEntryIds: string[]
}

export const mythologyTopics: MythologyTopic[] = [
  {
    id: 'mitologia-grega', title: 'Mitologia grega', categories: ['grega'], tile: [0, 0],
    summary: 'Deuses, heróis e narrativas nas tradições da Grécia antiga.',
    body: '', sources: [], relatedEntryIds: [],
  },
  {
    id: 'zeus-e-olimpo', title: 'Zeus e o Olimpo', categories: ['grega'], tile: [1, 0],
    summary: 'O deus do céu, seus raios e a morada dos deuses nas narrativas gregas.',
    body: 'Nas tradições gregas, Zeus é o deus do céu e uma figura central entre as divindades olímpicas. Seus raios aparecem como atributo em narrativas e representações artísticas. O Monte Olimpo era imaginado como morada dos deuses, mas os cultos se distribuíam por diferentes cidades e santuários. Os mitos apresentam relações e episódios variados; não formam uma única história com versão definitiva.',
    sources: [{ title: 'Greek Gods and Religious Practices', organization: 'The Metropolitan Museum of Art', url: 'https://www.metmuseum.org/ru/essays/greek-gods-and-religious-practices', kind: 'reference' }],
    relatedEntryIds: ['mitologia-grega', 'hercules-doze-trabalhos'],
  },
  {
    id: 'hercules-doze-trabalhos', title: 'Hércules e os 12 Trabalhos', categories: ['grega'], tile: [2, 0],
    summary: 'Herácles e as tarefas extraordinárias narradas na tradição clássica.',
    body: 'Herácles, conhecido na tradição romana como Hércules, é um herói associado a feitos extraordinários. Na Biblioteca atribuída a Apolodoro, Euristeu lhe impõe tarefas como enfrentar o Leão de Nemeia e trazer Cérbero do mundo dos mortos. A sequência e os detalhes variam entre autores. São narrativas heroicas da tradição clássica, não registros de façanhas historicamente comprovadas.',
    sources: [{ title: 'Biblioteca, livro 2 — Os trabalhos de Hércules', organization: 'University of Victoria — Classical Mythology', url: 'https://myths.uvic.ca/APOL1-L2.html', kind: 'primary' }],
    relatedEntryIds: ['mitologia-grega', 'zeus-e-olimpo'],
  },
  {
    id: 'medusa-e-minotauro', title: 'Medusa e o Minotauro', categories: ['grega', 'criaturas'], tile: [0, 1],
    summary: 'Duas figuras diferentes dos mitos gregos: a Górgona e o monstro do labirinto.',
    body: 'Medusa e o Minotauro pertencem a histórias diferentes. Medusa é uma das Górgonas, representada de maneiras diversas na arte e na literatura. O Minotauro aparece no mito de Teseu e Ariadne, ligado ao labirinto de Creta. Suas imagens foram reinterpretadas ao longo do tempo; reunir os dois neste tema é uma escolha de navegação, não afirmar que participam da mesma aventura.',
    sources: [
      { title: 'Medusa in Ancient Greek Art', organization: 'The Metropolitan Museum of Art', url: 'https://www.metmuseum.org/es/essays/medusa-in-ancient-greek-art', kind: 'reference' },
      { title: 'Myths of the Labyrinth', organization: 'Ashmolean Museum — University of Oxford', url: 'https://www.ashmolean.org/article/myths-of-the-labyrinth', kind: 'reference' },
    ],
    relatedEntryIds: ['mitologia-grega', 'dragoes-criaturas-lendarias'],
  },
  {
    id: 'mitologia-nordica', title: 'Mitologia Nórdica', categories: ['nordica'], tile: [1, 1],
    summary: 'Odin, Yggdrasil, Valhalla e narrativas preservadas do mundo nórdico.',
    body: 'Nas narrativas nórdicas preservadas, Odin está ligado à busca por sabedoria e à árvore do mundo, Yggdrasil. Valhalla é seu salão, associado aos guerreiros mortos escolhidos pelas valquírias. As fontes foram registradas em épocas diferentes, várias por autores cristãos medievais. Por isso, não devem ser tratadas como descrição de um sistema uniforme compartilhado por todas as comunidades nórdicas.',
    sources: [{ title: 'Old Norse Myths and Sagas', organization: 'Swedish History Museum', url: 'https://historiska.se/en/explore-history/history-hub/old-norse-myths-and-sagas/', kind: 'reference' }],
    relatedEntryIds: ['thor-e-ragnarok', 'dragoes-criaturas-lendarias'],
  },
  {
    id: 'thor-e-ragnarok', title: 'Thor e o Ragnarök', categories: ['nordica'], tile: [2, 1],
    summary: 'O deus do trovão e as narrativas sobre o destino do mundo nórdico.',
    body: 'Thor aparece nas narrativas nórdicas como protetor que enfrenta gigantes com seu martelo, Mjölnir. O Ragnarök descreve um confronto derradeiro envolvendo deuses e outras forças do cosmos, anunciado por Heimdall. Essas histórias têm contextos e versões próprios. As adaptações contemporâneas podem modificar personagens e relações e não substituem a leitura das tradições e de suas fontes.',
    sources: [{ title: 'Old Norse Myths and Sagas', organization: 'Swedish History Museum', url: 'https://historiska.se/en/explore-history/history-hub/old-norse-myths-and-sagas/', kind: 'reference' }],
    relatedEntryIds: ['mitologia-nordica'],
  },
  {
    id: 'mitologia-egipcia', title: 'Mitologia Egípcia', categories: ['egipcia'], tile: [0, 2],
    summary: 'Divindades, ritos funerários e narrativas do Egito antigo.',
    body: 'Na religião do Egito antigo, Anúbis estava associado ao embalsamamento, à proteção dos mortos e à orientação pelo além. Osíris era ligado aos mortos e à vida após a morte, com associações também à vegetação e à terra fértil. As relações entre divindades, os cultos e as representações mudaram conforme a região e a época. Não havia um panteão inteiramente fixo durante toda a história egípcia.',
    sources: [{ title: 'Religion and gods in ancient Egypt', organization: 'Australian Museum', url: 'https://australian.museum/learn/cultures/international-collection/ancient-egyptian/religion-and-gods-in-ancient-egypt/', kind: 'reference' }],
    relatedEntryIds: ['antigo-reino-egito'],
  },
  {
    id: 'mitologia-romana', title: 'Mitologia Romana', categories: [], tile: [1, 2],
    summary: 'Júpiter, Juno e outras divindades nos cultos e nas histórias de Roma.',
    body: 'Júpiter, Juno e Minerva estavam entre as divindades importantes da religião romana. As tradições religiosas de Roma incluíam cultos públicos, práticas domésticas e narrativas sobre a comunidade. Houve contatos e aproximações com figuras gregas, mas os deuses romanos não se resumem a uma simples troca de nomes. As histórias e os ritos devem ser compreendidos em seus contextos sociais e políticos.',
    sources: [{ title: 'Roman religion', organization: 'Cambridge University Press', url: 'https://assets.cambridge.org/052182/5113/excerpt/0521825113_excerpt.htm', kind: 'reference' }],
    relatedEntryIds: ['imperio-romano', 'mitologia-grega'],
  },
  {
    id: 'mitologia-asteca-maia', title: 'Mitologia Asteca e Maia', categories: [], tile: [2, 2],
    summary: 'Tradições mesoamericanas distintas: a Serpente Emplumada e o Popol Vuh.',
    body: 'Entre os mexicas, frequentemente chamados astecas, Quetzalcóatl era venerado como a Serpente Emplumada, com antecedentes mais amplos na Mesoamérica. Entre os maias K’iche’, o Popol Vuh preserva narrativas de criação, da humanidade feita de milho e dos Gêmeos Heróis. Essas tradições têm histórias e contextos próprios. O Popol Vuh não é um livro único de todos os povos maias, nem as narrativas maias e mexicas devem ser tratadas como um só conjunto.',
    sources: [
      { title: 'Quetzalcóatl', organization: 'Museus Vaticanos', url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/museo-etnologico/collezione/quetzalcoatl.html', kind: 'reference' },
      { title: 'Creation Story of the Maya', organization: 'Smithsonian National Museum of the American Indian', url: 'https://maya.nmai.si.edu/the-maya/creation-story-maya', kind: 'reference' },
    ],
    relatedEntryIds: ['dragoes-criaturas-lendarias'],
  },
  {
    id: 'mitologia-hindu', title: 'Mitologia Hindu', categories: [], tile: [0, 3],
    summary: 'Divindades e narrativas sagradas em tradições religiosas vivas e diversas.',
    body: 'Em diversas tradições hindus, Brahma, Vishnu e Shiva são associados à criação, à preservação e à dissolução cósmica. Epopeias como o Ramayana e o Mahabharata atravessam literatura, arte e devoção, com reflexões sobre dever e conduta. Essas narrativas continuam presentes em práticas religiosas e artísticas, e as interpretações variam entre comunidades e escolas.',
    sources: [
      { title: 'Hindu Gods and Goddesses', organization: 'Rubin Museum of Himalayan Art', url: 'https://rubinmuseum.org/highlights/hindu-gods-and-goddesses/', kind: 'reference' },
      { title: 'Epic India: Scenes from the Ramayana', organization: 'The Metropolitan Museum of Art', url: 'https://www.metmuseum.org/exhibitions/listings/2010/epic-india?exhshow=art', kind: 'reference' },
    ],
    relatedEntryIds: ['buda-e-budismo', 'rota-da-seda'],
  },
  {
    id: 'dragoes-criaturas-lendarias', title: 'Dragões e Criaturas Lendárias', categories: ['criaturas'], tile: [1, 3],
    summary: 'Dragões, fênix e monstros marinhos em diferentes contextos culturais.',
    body: 'Dragões têm significados diferentes conforme a tradição. Na arte chinesa, dragões e o fenghuang, frequentemente traduzido como fênix, podem expressar poder, virtude e harmonia; não se deve atribuir automaticamente ao fenghuang o renascimento das cinzas da fênix ocidental. O kraken pertence ao folclore marítimo escandinavo. Encontros com lulas gigantes podem ter inspirado relatos, mas essa hipótese não demonstra a existência do monstro das lendas.',
    sources: [
      { title: 'Mythical Creatures', organization: 'Gardiner Museum', url: 'https://chineseceramics.gardinermuseum.on.ca/story/mythical-creatures/', kind: 'reference' },
      { title: 'Kraken', organization: 'American Museum of Natural History', url: 'https://www.amnh.org/explore/ology/ology-cards/285-kraken', kind: 'reference' },
    ],
    relatedEntryIds: ['medusa-e-minotauro', 'mitologia-nordica'],
  },
]

export const mythologyEntries: HistoricalEntry[] = mythologyTopics
  .filter((topic) => topic.id !== 'mitologia-grega')
  .map((topic) => ({
    id: topic.id, kind: 'tradition', title: topic.title, summary: topic.summary,
    time: { scale: 'cultural', label: 'Tradição cultural — sem datação de um acontecimento histórico' },
    topics: ['mitologia', 'tradições culturais', ...topic.categories.map((category) => ({
      grega: 'Grécia', nordica: 'Tradições nórdicas', egipcia: 'Egito', criaturas: 'Criaturas lendárias',
    })[category] ?? category)],
    sections: [{ heading: 'Narrativas e contexto cultural', body: topic.body, classification: 'tradition' }],
    sources: topic.sources, relatedEntryIds: topic.relatedEntryIds,
  }))
