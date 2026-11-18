import type { HistoricalEntry } from './types'

export const revolutionTopics = [
  {
    id: 'revolucao-francesa', title: 'Revolução Francesa', date: '1789–1799', year: 1789,
    summary: 'A revolução que derrubou o Antigo Regime e transformou a França.',
    categories: ['europa', 'ideias'],
    body: '', source: '', organization: '', sourceTitle: '',
  },
  {
    id: 'revolucao-russa', title: 'Revolução Russa', date: '1917', year: 1917,
    summary: 'A queda do czarismo e a chegada dos bolcheviques ao poder.',
    categories: ['europa', 'mundo'],
    body: 'Em 1917, duas revoluções alteraram o poder na Rússia. A de fevereiro encerrou o regime czarista; a de outubro levou os bolcheviques ao governo. Os nomes seguem o calendário juliano então utilizado no país: no calendário gregoriano, ocorreram em março e novembro.',
    source: 'https://cdn.nationalarchives.gov.uk/documents/education/spotlight-on-the-russian-revolution.pdf',
    organization: 'The National Archives', sourceTitle: 'Spotlight On: The Russian Revolution',
  },
  {
    id: 'primavera-dos-povos', title: 'Primavera dos Povos', date: '1848–1849', year: 1848,
    summary: 'Levantes por constituições, participação política e mudanças sociais na Europa.',
    categories: ['europa', 'ideias'],
    body: 'Os movimentos de 1848 reuniram demandas liberais, nacionais e sociais em diferentes regiões europeias. Na monarquia dos Habsburgo, manifestações e disputas pelo poder foram seguidas pela reação imperial. As experiências tiveram resultados distintos e não formaram uma única revolução coordenada.',
    source: 'https://www.parlament.gv.at/verstehen/historisches/1848-1918/revolution-folgen/index.html',
    organization: 'Parlamento da Áustria', sourceTitle: 'Revolution 1848 und ihre Folgen',
  },
  {
    id: 'revolucao-americana', title: 'Revolução Americana', date: '1775–1783', year: 1775,
    summary: 'A luta pela independência das treze colônias britânicas na América do Norte.',
    categories: ['americas'],
    body: 'A guerra entre a Grã-Bretanha e suas colônias norte-americanas começou em 1775. A Declaração de Independência foi adotada em 1776, e o conflito terminou em 1783. Esse processo abriu caminho para a formação dos Estados Unidos e de novas instituições políticas.',
    source: 'https://www.nps.gov/inde/learn/historyculture/resources-americanrevolutionoverview.htm',
    organization: 'U.S. National Park Service', sourceTitle: 'Overview of the American Revolution',
  },
  {
    id: 'independencia-do-brasil', title: 'Independência do Brasil', date: '1822', year: 1822,
    summary: 'A separação política de Portugal e a formação do Império do Brasil.',
    categories: ['americas'],
    body: 'O 7 de setembro de 1822 tornou-se um marco simbólico da independência. A separação de Portugal, porém, envolveu um processo político e militar mais amplo. Na Bahia, os combates se estenderam até 2 de julho de 1823, mostrando que a independência teve diferentes trajetórias regionais.',
    source: 'https://www.gov.br/mast/pt-br/assuntos/noticias/2022/julho/as-independencias-do-brasil',
    organization: 'Museu de Astronomia e Ciências Afins', sourceTitle: 'As independências do Brasil',
  },
  {
    id: 'revolucao-haitiana', title: 'Revolução Haitiana', date: '1791–1804', year: 1791,
    summary: 'A luta contra a escravidão e o domínio colonial que levou à independência do Haiti.',
    categories: ['americas'],
    body: 'Iniciada em 1791 na colônia francesa de Saint-Domingue, a revolução articulou a luta de pessoas escravizadas por liberdade e a resistência ao domínio colonial. O processo terminou com a independência do Haiti em 1804, tornando-se um marco da história atlântica e da emancipação.',
    source: 'https://americanhistory.si.edu/explore/exhibitions/american-democracy/online/great-leap/great-debates/revolutionary-world',
    organization: 'Smithsonian National Museum of American History', sourceTitle: 'A Revolutionary World',
  },
  {
    id: 'revolucao-chinesa', title: 'Revolução Chinesa', date: '1946–1949', year: 1949,
    summary: 'A vitória comunista na guerra civil e a fundação da República Popular da China.',
    categories: ['mundo'],
    body: 'A vitória comunista em 1949, após a guerra civil chinesa, levou à criação da República Popular da China. O governo nacionalista retirou-se para Taiwan. A mudança transformou as relações internacionais na Ásia e passou a ocupar um lugar central nas disputas da Guerra Fria.',
    source: 'https://history.state.gov/milestones/1945-1952/chinese-rev',
    organization: 'Office of the Historian, U.S. Department of State', sourceTitle: 'The Chinese Revolution of 1949',
  },
  {
    id: 'iluminismo', title: 'Iluminismo', date: 'Séculos XVII–XVIII', year: 1700,
    summary: 'Razão, liberdade e direitos no centro de novas formas de pensar a sociedade.',
    categories: ['europa', 'ideias'],
    body: 'O Iluminismo valorizou a investigação racional e o debate sobre as instituições, a tolerância e os direitos. Seus autores não defendiam um programa único: pensadores como Voltaire, Montesquieu e Rousseau formularam propostas diferentes sobre liberdade, autoridade e organização política.',
    source: 'https://openstax.org/books/world-history-volume-2/pages/7-1-the-enlightenment',
    organization: 'OpenStax, Rice University', sourceTitle: 'The Enlightenment — World History Volume 2',
  },
  {
    id: 'revolucao-industrial', title: 'Revolução Industrial', date: 'c. 1760–1840', year: 1760,
    summary: 'Máquinas, fábricas e novas relações de trabalho transformaram a sociedade.',
    categories: ['europa', 'mundo'],
    body: '', source: '', organization: '', sourceTitle: '',
  },
]

// Os verbetes francês e industrial já têm conteúdo e fontes no catálogo principal.
export const additionalRevolutionEntries: HistoricalEntry[] = revolutionTopics
  .filter((topic) => topic.body !== '')
  .map((topic) => ({
    id: topic.id,
    kind: topic.id === 'iluminismo' ? 'period' : 'event',
    title: topic.title,
    summary: topic.summary,
    time: { scale: 'human', label: topic.date, timelineYear: topic.year },
    topics: ['revoluções', ...topic.categories.map((category) => ({
      europa: 'Europa', americas: 'Américas', mundo: 'História global', ideias: 'Ideias',
    })[category] ?? category)],
    sections: [{ heading: 'Contexto histórico', body: topic.body, classification: 'evidence' }],
    sources: [{ title: topic.sourceTitle, organization: topic.organization, url: topic.source, kind: 'reference' }],
    relatedEntryIds: ['revolucao-francesa', 'revolucao-industrial'],
  }))
