import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { catalog } from './data/catalog'
import { revolutionTopics } from './data/revolutions'
import { warTopics } from './data/wars'
import { orientalTopics } from './data/oriental'
import { mythologyTopics } from './data/mythology'
import type { HistoricalEntry, TimeScale } from './data/types'
import './App.css'

type Route = {
  path: string
  query: URLSearchParams
}

type Track = {
  id: string
  title: string
  description: string
  matches: (entry: HistoricalEntry) => boolean
}

const kindLabels: Record<HistoricalEntry['kind'], string> = {
  period: 'Período',
  civilization: 'Civilização',
  event: 'Acontecimento',
  person: 'Pessoa',
  tradition: 'Tradição',
}

const scaleLabels: Record<TimeScale, string> = {
  geological: 'Tempo geológico',
  human: 'História humana',
  cultural: 'Tradição cultural',
}

const tracks: Track[] = [
  {
    id: 'origens',
    title: 'Origens e evolução',
    description: 'Evidências sobre a Terra, a vida e as origens humanas.',
    matches: (entry) =>
      entry.topics.some((topic) =>
        ['geologia', 'tempo profundo', 'dinossauros', 'evolução', 'origens humanas'].includes(
          topic.toLocaleLowerCase('pt-BR'),
        ),
      ),
  },
  {
    id: 'civilizacoes',
    title: 'Civilizações e sociedades',
    description: 'Sociedades, cidades e impérios em diferentes regiões.',
    matches: (entry) =>
      entry.kind === 'civilization' ||
      entry.topics.some((topic) =>
        ['cidades', 'impérios', 'patrimônio'].includes(topic.toLocaleLowerCase('pt-BR')),
      ),
  },
  {
    id: 'revolucoes',
    title: 'Revoluções e transformações',
    description: 'Mudanças políticas, sociais e tecnológicas.',
    matches: (entry) =>
      entry.topics.some((topic) =>
        ['revoluções', 'política', 'direitos', 'industrialização'].includes(
          topic.toLocaleLowerCase('pt-BR'),
        ),
      ),
  },
  {
    id: 'mitologias',
    title: 'Mitologias e tradições',
    description: 'Narrativas culturais apresentadas em seus contextos.',
    matches: (entry) =>
      entry.kind === 'tradition' ||
      entry.topics.some((topic) =>
        ['mitologia', 'tradição oral', 'literatura'].includes(
          topic.toLocaleLowerCase('pt-BR'),
        ),
      ),
  },
  {
    id: 'conexoes',
    title: 'Conexões entre regiões',
    description: 'Histórias para explorar em perspectivas geográficas diversas.',
    matches: (entry) =>
      entry.topics.some((topic) =>
        ['áfrica', 'áfrica ocidental', 'ásia central', 'andes', 'américa do sul'].includes(
          topic.toLocaleLowerCase('pt-BR'),
        ),
      ),
  },
]

const topNav = [
  { label: 'Pré-História', icon: 'spiral', href: '#/pre-historia' },
  { label: 'Antiguidade', icon: 'column', href: '#/antiguidade' },
  { label: 'Idade Média', icon: 'castle', href: '#/idade-media' },
  { label: 'Revoluções', icon: 'flame', href: '#/revolucoes' },
  { label: 'Guerras', icon: 'sword', href: '#/guerras' },
  { label: 'Oriental', icon: 'pagoda', href: '#/oriental' },
  { label: 'Mitologia', icon: 'scroll', href: '#/mitologia' },
]

function readRoute(hash: string): Route {
  const route = hash.replace(/^#/, '') || '/'
  const separator = route.indexOf('?')
  const path = separator === -1 ? route : route.slice(0, separator)
  const query = separator === -1 ? '' : route.slice(separator + 1)

  return {
    path: path || '/',
    query: new URLSearchParams(query),
  }
}

function navigateToSearch(query: string, scale: string, kind: string) {
  const params = new URLSearchParams()
  if (query.trim()) params.set('q', query.trim())
  if (scale !== 'all') params.set('scale', scale)
  if (kind !== 'all') params.set('kind', kind)
  const suffix = params.size > 0 ? `?${params.toString()}` : ''
  window.location.hash = `/busca${suffix}`
}

function EntryCard({ entry }: { entry: HistoricalEntry }) {
  return (
    <article className="entry-card">
      <a className="entry-card-link" href={`#/conteudos/${entry.id}`}>
        <span className="eyebrow">{kindLabels[entry.kind]}</span>
        <h3>{entry.title}</h3>
        <p>{entry.summary}</p>
        <span className="entry-time">{entry.time.label}</span>
      </a>
    </article>
  )
}

function EntryGrid({ entries }: { entries: HistoricalEntry[] }) {
  if (entries.length === 0) {
    return <p className="empty-state">Nenhum conteúdo encontrado com esses critérios.</p>
  }

  return (
    <div className="entry-grid">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

const homeCategories = [
  { title: 'Pré-História com Dinossauros', description: 'Dinossauros, era dos dinossauros e os primeiros humanos', href: '#/conteudos/era-dos-dinossauros', image: 'prehistoria', icon: 'spiral' },
  { title: 'Império Romano', description: 'Legiões, aquedutos e o poder de Roma', href: '#/conteudos/imperio-romano', image: 'roma', icon: 'laurel' },
  { title: 'Egito', description: 'Faraós, pirâmides e 3000 anos de história', href: '#/conteudos/antigo-reino-egito', image: 'egito', icon: 'cloud' },
  { title: 'Revolução Russa', description: '1917: queda do czar e revolução socialista', href: '#/busca?q=Revolu%C3%A7%C3%A3o', image: 'revolucao-russa-card', icon: 'flame' },
  { title: 'Guerra Mundial', description: 'Conflitos globais, trincheiras e grandes guerras', href: '#/conteudos/dia-d', image: 'guerra-mundial', icon: 'gear' },
]

const homeFeatures = [
  { title: 'Foguetes e Corrida Espacial', description: 'A corrida espacial: satélites, foguetes e a chegada à Lua', href: '#/conteudos/mundo-pos-1945', image: 'corrida-espacial', button: 'Saiba mais' },
  { title: 'Revolução Russa', description: '1917: revolução, sovietes e mudança de era', href: '#/busca?q=Revolu%C3%A7%C3%A3o', image: 'revolucao-russa', button: 'Explorar' },
  { title: 'Segunda Guerra Mundial', description: '1939–1945: o maior conflito da história mundial', href: '#/conteudos/dia-d', image: 'segunda-guerra', button: 'Ver especial' },
]

const iconPaths: Record<string, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  spiral: 'M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 0 0-8-5.6',
  laurel: 'M12 21V8M12 8c-4 0-6-3-6-5 4 0 6 2 6 5zM12 8c4 0 6-3 6-5-4 0-6 2-6 5zM12 15c-4 0-6-2-6-5M12 15c4 0 6-2 6-5',
  cloud: 'M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z',
  column: 'M4 21h16M6 18h12M8 18V8M16 18V8M12 18V8M5 8h14M12 3l8 5H4z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-2-4-2 1-2-2 1-2-4-2-1 2h-2l-1-2-4 2 1 2-2 2-2-1-2 4 2 1v2l-2 1 2 4 2-1 2 2-1 2 4 2 1-2h2l1 2 4-2-1-2 2-2 2 1 2-4-2-1z',
  sword: 'M14 4l6-2-2 6-8 8-4-4zM6 14l-3 3 2 2 3-3M4 20l2-2',
  castle: 'M4 21V8l3 2V5h3v5l2-2 2 2V5h3v5l3-2v13zM10 21v-5h4v5',
  flame: 'M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z',
  pagoda: 'M12 2v3M7 8h10M5 12h14M3 17h18M8 8l-2 4M16 8l2 4M7 12v5M17 12v5M10 21v-4h4v4',
  scroll: 'M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM9 9h7M9 13h7',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
  moon: 'M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z',
  play: 'M7 4l13 8-13 8z',
  book: 'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14',
  chevron: 'M9 5l7 7-7 7',
}

function Icon({ name }: { name: string }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} />
    </svg>
  )
}

function HomeFeatures() {
  const [page, setPage] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollTo(index: number) {
    const track = trackRef.current
    const next = Math.max(0, Math.min(homeFeatures.length - 1, index))
    const card = track?.children[next] as HTMLElement | undefined
    setPage(next)
    track?.scrollTo({ left: card?.offsetLeft ?? 0, behavior: 'smooth' })
  }

  return (
    <section className="home-features" aria-labelledby="highlights-title">
      <div className="section-heading">
        <h2 id="highlights-title">Em Destaque</h2>
        <a className="text-link" href="#/linha-do-tempo">
          Ver todas as épocas <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="home-features-wrap">
        <button className="carousel-arrow" type="button" aria-label="Anterior" onClick={() => scrollTo(page - 1)}>
          ‹
        </button>
        <div className="home-features-track" ref={trackRef}>
          {homeFeatures.map((feature) => (
            <a className="home-feature-card" href={feature.href} key={feature.title}>
              <img src={`/historia/assets/home/${feature.image}.jpg`} alt="" loading="lazy" />
              <span className="home-feature-body">
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
                <span className="home-feature-button">
                  {feature.button} <span aria-hidden="true">→</span>
                </span>
              </span>
            </a>
          ))}
        </div>
        <button className="carousel-arrow" type="button" aria-label="Próximo" onClick={() => scrollTo(page + 1)}>
          ›
        </button>
      </div>
      <div className="carousel-dots">
        {homeFeatures.map((feature, index) => (
          <button
            type="button"
            key={feature.title}
            aria-label={`Ir para ${feature.title}`}
            aria-current={page === index}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-panel home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="eyebrow">Uma jornada pela civilização</p>
          <h1 id="home-title">Explorando a <span>História</span></h1>
          <span className="hero-rule" aria-hidden="true" />
          <p className="hero-copy">
            Descubra a história da humanidade: das primeiras civilizações aos impérios,
            revoluções, guerras e mitos que moldaram o nosso mundo.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/linha-do-tempo">
              <Icon name="play" /> Iniciar exploração <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#/busca">
              <Icon name="book" /> Biblioteca histórica
            </a>
          </div>
        </div>
      </section>

      <section className="home-categories" aria-label="Explore por época">
        {homeCategories.map((category) => (
          <a className="home-category" href={category.href} key={category.title}>
            <span
              className="home-category-photo"
              style={{ backgroundImage: `url(/historia/assets/home/${category.image}.jpg)` }}
              aria-hidden="true"
            />
            <span className="home-category-title">
              <Icon name={category.icon} /> {category.title}
            </span>
            <span className="home-category-desc">{category.description}</span>
          </a>
        ))}
      </section>

      <HomeFeatures />
    </div>
  )
}

type ShowcaseCard = {
  id: string
  title: string
  meta: string
  imageSrc: string
  imageStyle?: CSSProperties
  searchText?: string
  yearRange?: [number, number]
  href: string
  categories: string[]
}

type EraShowcaseConfig = {
  id: string
  title: string
  subtitle: string
  heroImage: string
  exploreTitle: string
  searchPlaceholder: string
  filterGroupLabel: string
  filters: { id: string; label: string }[]
  cards: ShowcaseCard[]
}

const prehistoriaConfig: EraShowcaseConfig = {
  id: 'prehistoria',
  title: 'Pré-História',
  subtitle: 'Dinossauros, fogo e a origem da humanidade',
  heroImage: '/historia/assets/hero-prehistoria.jpg',
  exploreTitle: 'Explorar Pré-História',
  searchPlaceholder: 'Buscar por dinossauro, era ou fóssil',
  filterGroupLabel: 'Filtrar temas da Pré-História',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'dinossauros', label: 'Dinossauros' },
    { id: 'extincao', label: 'Extinção' },
    { id: 'humanos', label: 'Humanos' },
    { id: 'era-do-gelo', label: 'Era do Gelo' },
  ],
  cards: [
    {
      id: 'era-dos-dinossauros',
      title: 'Era dos Dinossauros',
      meta: 'Mesozoico • 252–66 milhões de anos • A era dos grandes dinossauros',
      imageSrc: '/historia/assets/prehistoria/era-dos-dinossauros.jpg',
      href: '#/conteudos/era-dos-dinossauros',
      categories: ['dinossauros'],
    },
    {
      id: 'tiranossauro-rex',
      title: 'Tiranossauro Rex',
      meta: '68–66 Ma • O predador ápice do final do Cretáceo',
      imageSrc: '/historia/assets/prehistoria/tiranossauro-rex.jpg',
      href: '#/conteudos/era-dos-dinossauros',
      categories: ['dinossauros'],
    },
    {
      id: 'velociraptor',
      title: 'Velociraptor',
      meta: '75–71 Ma • O caçador ágil e inteligente do Cretáceo',
      imageSrc: '/historia/assets/prehistoria/velociraptor.jpg',
      href: '#/conteudos/era-dos-dinossauros',
      categories: ['dinossauros'],
    },
    {
      id: 'triceratops',
      title: 'Triceratops e Herbívoros Gigantes',
      meta: '68–66 Ma • Triceratops, Estegossauro e outros herbívoros gigantes',
      imageSrc: '/historia/assets/prehistoria/triceratops.jpg',
      href: '#/conteudos/era-dos-dinossauros',
      categories: ['dinossauros'],
    },
    {
      id: 'pterossauros',
      title: 'Pterossauros e a Vida no Céu',
      meta: '228–66 Ma • Os répteis voadores que dominaram os céus',
      imageSrc: '/historia/assets/prehistoria/pterossauros.jpg',
      href: '#/conteudos/era-dos-dinossauros',
      categories: ['dinossauros'],
    },
    {
      id: 'extincao-meteoro',
      title: 'A Extinção - O Meteoro',
      meta: '66 Ma • O impacto do asteroide e a extinção em massa do Cretáceo',
      imageSrc: '/historia/assets/prehistoria/extincao-meteoro.jpg',
      href: '#/conteudos/era-dos-dinossauros',
      categories: ['extincao', 'dinossauros'],
    },
    {
      id: 'origem-humano',
      title: 'Origem do Ser Humano',
      meta: 'c. 7–2 Ma • A evolução dos primeiros hominídeos na África',
      imageSrc: '/historia/assets/prehistoria/origem-humano.jpg',
      href: '#/conteudos/homo-sapiens',
      categories: ['humanos'],
    },
    {
      id: 'neandertais',
      title: 'Neandertais',
      meta: '400–40 mil anos • Os neandertais e sua vida na Era do Gelo',
      imageSrc: '/historia/assets/prehistoria/neandertais.jpg',
      href: '#/conteudos/homo-sapiens',
      categories: ['humanos', 'era-do-gelo'],
    },
    {
      id: 'descoberta-fogo',
      title: 'A Descoberta do Fogo',
      meta: 'c. 1,5 Ma • O domínio do fogo pelos primeiros humanos',
      imageSrc: '/historia/assets/prehistoria/descoberta-fogo.jpg',
      href: '#/conteudos/homo-sapiens',
      categories: ['humanos'],
    },
    {
      id: 'pinturas-rupestres',
      title: 'Pinturas Rupestres',
      meta: 'c. 40–10 mil anos • A arte rupestre dos primeiros humanos',
      imageSrc: '/historia/assets/prehistoria/pinturas-rupestres.jpg',
      href: '#/conteudos/homo-sapiens',
      categories: ['humanos'],
    },
    {
      id: 'origem-terra',
      title: 'Origem da Terra',
      meta: 'c. 4,5 bilhões de anos • A formação do planeta Terra',
      imageSrc: '/historia/assets/prehistoria/origem-terra.jpg',
      href: '#/conteudos/formacao-da-terra',
      categories: ['extincao'],
    },
    {
      id: 'era-do-gelo',
      title: 'Era do Gelo e Mamutes',
      meta: '2,5 Ma–11 mil anos • A Era do Gelo e os mamutes peludos',
      imageSrc: '/historia/assets/prehistoria/era-do-gelo.jpg',
      href: '#/conteudos/homo-sapiens',
      categories: ['era-do-gelo'],
    },
  ],
}

const antiguidadeConfig: EraShowcaseConfig = {
  id: 'antiguidade',
  title: 'Antiguidade',
  subtitle: 'A origem das civilizações',
  heroImage: '/historia/assets/hero-antiguidade.jpg',
  exploreTitle: 'Explorar Antiguidade',
  searchPlaceholder: 'Buscar por civilização, personagem ou guerra',
  filterGroupLabel: 'Filtrar temas da Antiguidade',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'civilizacoes', label: 'Civilizações' },
    { id: 'personagens', label: 'Personagens' },
    { id: 'guerras', label: 'Guerras' },
    { id: 'maravilhas', label: 'Maravilhas' },
  ],
  cards: [
    {
      id: 'egito-antigo',
      title: 'Egito Antigo',
      meta: 'c. 3150–30 a.C. • A civilização do Nilo, pirâmides, faraós e templos',
      imageSrc: '/historia/assets/antiguidade/egito-antigo.jpg',
      href: '#/conteudos/antigo-reino-egito',
      categories: ['civilizacoes', 'maravilhas'],
    },
    {
      id: 'grecia-antiga',
      title: 'Grécia Antiga',
      meta: 'c. 800–146 a.C. • A pólis, filosofia, arte e democracia de Atenas e Esparta',
      imageSrc: '/historia/assets/antiguidade/grecia-antiga.jpg',
      href: '#/conteudos/atene-antiga',
      categories: ['civilizacoes'],
    },
    {
      id: 'roma-antiga',
      title: 'Roma Antiga',
      meta: '753 a.C.–476 d.C. • O império romano, leis, aquedutos e engenharia',
      imageSrc: '/historia/assets/antiguidade/roma-antiga.jpg',
      href: '#/conteudos/imperio-romano',
      categories: ['civilizacoes'],
    },
    {
      id: 'mesopotamia',
      title: 'Mesopotâmia',
      meta: 'c. 3500–539 a.C. • Sumérios, babilônios e assírios entre os rios Tigre e Eufrates',
      imageSrc: '/historia/assets/antiguidade/mesopotamia.jpg',
      href: '#/periodos/humano',
      categories: ['civilizacoes', 'maravilhas'],
    },
    {
      id: 'imperio-persa',
      title: 'Império Persa',
      meta: '550–330 a.C. • O império aquemênida de Ciro e Dario, do Irã à Anatólia',
      imageSrc: '/historia/assets/antiguidade/imperio-persa.jpg',
      href: '#/periodos/humano',
      categories: ['civilizacoes', 'personagens'],
    },
    {
      id: 'fenicios',
      title: 'Fenícios',
      meta: 'c. 1500–300 a.C. • Navegantes, comerciantes e o alfabeto fenício',
      imageSrc: '/historia/assets/antiguidade/fenicios.jpg',
      href: '#/periodos/humano',
      categories: ['civilizacoes'],
    },
    {
      id: 'guerras-punicas',
      title: 'Guerras Púnicas',
      meta: '264–146 a.C. • A disputa entre Roma e Cartago pelo domínio do Mediterrâneo',
      imageSrc: '/historia/assets/antiguidade/guerras-punicas.jpg',
      href: '#/conteudos/imperio-romano',
      categories: ['guerras', 'personagens'],
    },
    {
      id: 'guerra-peloponeso',
      title: 'Guerra do Peloponeso',
      meta: '431–404 a.C. • O conflito entre Atenas e Esparta pela hegemonia da Grécia',
      imageSrc: '/historia/assets/antiguidade/guerra-peloponeso.jpg',
      href: '#/conteudos/atene-antiga',
      categories: ['guerras', 'personagens'],
    },
    {
      id: 'sete-maravilhas',
      title: '7 Maravilhas do Mundo Antigo',
      meta: 'c. 300–200 a.C. • As sete maravilhas consagradas da antiguidade clássica',
      imageSrc: '/historia/assets/antiguidade/sete-maravilhas.jpg',
      href: '#/conteudos/antigo-reino-egito',
      categories: ['maravilhas'],
    },
  ],
}

const idadeMediaConfig: EraShowcaseConfig = {
  id: 'idade-media',
  title: 'Idade Média',
  subtitle: 'Castelos, cavaleiros e impérios',
  heroImage: '/historia/assets/hero-idade-media.jpg',
  exploreTitle: 'Explorar Idade Média',
  searchPlaceholder: 'Buscar por império, personagem ou guerra',
  filterGroupLabel: 'Filtrar temas da Idade Média',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'imperios', label: 'Impérios' },
    { id: 'personagens', label: 'Personagens' },
    { id: 'guerras', label: 'Guerras' },
    { id: 'vida-medieval', label: 'Vida Medieval' },
  ],
  cards: [
    {
      id: 'imperio-bizantino',
      title: 'Império Bizantino',
      meta: '330–1453 • O império romano do Oriente, cultura bizantina e Constantinopla',
      imageSrc: '/historia/assets/idade-media/imperio-bizantino.jpg',
      href: '#/periodos/humano',
      categories: ['imperios'],
    },
    {
      id: 'carlos-magno',
      title: 'Carlos Magno',
      meta: '768–814 • O primeiro imperador do Sacro Império Romano, unificação dos francos',
      imageSrc: '/historia/assets/idade-media/carlos-magno.jpg',
      href: '#/periodos/humano',
      categories: ['imperios', 'personagens'],
    },
    {
      id: 'vikings',
      title: 'Vikings',
      meta: '793–1066 • Os navegadores e guerreiros nórdicos que exploraram e saquearam a Europa',
      imageSrc: '/historia/assets/idade-media/vikings.jpg',
      href: '#/periodos/humano',
      categories: ['guerras', 'vida-medieval'],
    },
    {
      id: 'joana-darc',
      title: "Joana d'Arc",
      meta: '1412–1431 • A heroína francesa que liderou o exército na Guerra dos Cem Anos',
      imageSrc: '/historia/assets/idade-media/joana-darc.jpg',
      href: '#/periodos/humano',
      categories: ['personagens', 'guerras'],
    },
    {
      id: 'genghis-khan',
      title: 'Genghis Khan',
      meta: '1162–1227 • O fundador do Império Mongol e líder das conquistas mongóis',
      imageSrc: '/historia/assets/idade-media/genghis-khan.jpg',
      href: '#/conteudos/imperio-mongol',
      categories: ['imperios', 'personagens', 'guerras'],
    },
    {
      id: 'saladino',
      title: 'Saladino',
      meta: '1137–1193 • O sultão que unificou o Egito e o Levante e retomou Jerusalém',
      imageSrc: '/historia/assets/idade-media/saladino.jpg',
      href: '#/periodos/humano',
      categories: ['personagens', 'guerras'],
    },
    {
      id: 'reconquista-iberica',
      title: 'Reconquista Ibérica',
      meta: '718–1492 • A reconquista cristã da Península Ibérica dos mouros',
      imageSrc: '/historia/assets/idade-media/reconquista-iberica.jpg',
      href: '#/periodos/humano',
      categories: ['guerras'],
    },
    {
      id: 'queda-constantinopla',
      title: 'Queda de Constantinopla',
      meta: '1453 • A queda de Constantinopla e o fim do Império Bizantino',
      imageSrc: '/historia/assets/idade-media/queda-constantinopla.jpg',
      href: '#/periodos/humano',
      categories: ['imperios', 'guerras'],
    },
    {
      id: 'cavaleiros-templarios',
      title: 'Cavaleiros Templários',
      meta: '1119–1312 • A ordem militar templária e suas fortalezas na Terra Santa',
      imageSrc: '/historia/assets/idade-media/cavaleiros-templarios.jpg',
      href: '#/periodos/humano',
      categories: ['guerras', 'vida-medieval'],
    },
    {
      id: 'castelos-medievais',
      title: 'Castelos Medievais',
      meta: 'Séculos V–XV • Fortificações medievais, defesa e vida senhorial',
      imageSrc: '/historia/assets/idade-media/castelos-medievais.jpg',
      href: '#/periodos/humano',
      categories: ['vida-medieval'],
    },
    {
      id: 'peste-negra',
      title: 'A Peste Negra',
      meta: '1347–1351 • A pandemia que devastou a Europa medieval',
      imageSrc: '/historia/assets/idade-media/peste-negra.jpg',
      href: '#/periodos/humano',
      categories: ['vida-medieval'],
    },
  ],
}

const revolucoesConfig: EraShowcaseConfig = {
  id: 'revolucoes',
  title: 'Revoluções',
  subtitle: 'O mundo virou de cabeça para baixo',
  heroImage: '/historia/assets/hero-revolucoes.png',
  exploreTitle: 'Explorar Revoluções',
  searchPlaceholder: 'Buscar por revolução, personagem ou ano',
  filterGroupLabel: 'Filtrar temas das Revoluções',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'europa', label: 'Europa' },
    { id: 'americas', label: 'Américas' },
    { id: 'mundo', label: 'Mundo' },
    { id: 'ideias', label: 'Ideias' },
  ],
  cards: revolutionTopics.map((topic, index) => ({
    id: topic.id,
    title: topic.title,
    meta: `${topic.date} • ${topic.summary}`,
    searchText: catalog.find((entry) => entry.id === topic.id)?.sections.map((section) => section.body).join(' '),
    yearRange: topic.id === 'iluminismo' ? [1600, 1799] : [
      Number(topic.date.match(/\d{4}/g)?.[0]),
      Number(topic.date.match(/\d{4}/g)?.at(-1)),
    ],
    imageSrc: '/historia/assets/revolucoes/cards-referencia.webp',
    imageStyle: {
      // Janelas da ilustração original; títulos e botões são HTML acessível.
      backgroundSize: '349.091% 752.941%',
      backgroundPosition: `${[3.942, 47.445, 94.161][index % 3]}% ${[29.73, 57.658, 86.486][Math.floor(index / 3)]}%`,
    },
    href: `#/conteudos/${topic.id}`,
    categories: topic.categories,
  })),
}

const guerrasConfig: EraShowcaseConfig = {
  id: 'guerras',
  title: 'Guerras que Mudaram o Mundo',
  subtitle: 'Uma jornada pelos conflitos que moldaram a civilização',
  heroImage: '/historia/assets/hero-guerras.png',
  exploreTitle: 'Explorar Guerras',
  searchPlaceholder: 'Buscar por conflito, personagem ou ano',
  filterGroupLabel: 'Filtrar temas das Guerras',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'antiguidade', label: 'Antiguidade' },
    { id: 'medieval', label: 'Idade Média' },
    { id: 'napoleonica', label: 'Era Napoleônica' },
    { id: 'contemporanea', label: 'Mundo Contemporâneo' },
  ],
  cards: warTopics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    meta: `${topic.date} • ${topic.summary}`,
    searchText: topic.body,
    yearRange: topic.yearRange,
    imageSrc: '/historia/assets/guerras/cards-referencia.webp',
    imageStyle: {
      backgroundSize: '359.298% 677.647%',
      backgroundPosition: `${topic.imagePosition[0]}% ${topic.imagePosition[1]}%`,
    },
    href: `#/conteudos/${topic.id}`,
    categories: topic.categories,
  })),
}

const orientalConfig: EraShowcaseConfig = {
  id: 'oriental',
  title: 'Oriental',
  subtitle: 'Samurais, dragões e impérios milenares',
  heroImage: '/historia/assets/hero-oriental.png',
  exploreTitle: 'Explorar Oriental',
  searchPlaceholder: 'Buscar por império, guerreiro ou dinastia',
  filterGroupLabel: 'Filtrar temas de Oriental',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'china', label: 'China' },
    { id: 'japao', label: 'Japão' },
    { id: 'imperios', label: 'Impérios' },
    { id: 'guerreiros', label: 'Guerreiros' },
  ],
  cards: orientalTopics.map((topic) => ({
    id: topic.id, title: topic.title, meta: `${topic.date} • ${topic.summary}`,
    searchText: catalog.find((entry) => entry.id === topic.id)?.sections.map((section) => section.body).join(' '),
    yearRange: topic.yearRange,
    imageSrc: '/historia/assets/oriental/cards-atlas.png',
    imageStyle: {
      backgroundSize: '300% 400%',
      backgroundPosition: `${topic.tile[0] * 50}% ${topic.tile[1] * 100 / 3}%`,
    },
    href: `#/conteudos/${topic.id}`,
    categories: topic.categories,
  })),
}

const mitologiaConfig: EraShowcaseConfig = {
  id: 'mitologia',
  title: 'Mitologia',
  subtitle: 'Deuses, monstros e heróis que nunca morrem',
  heroImage: '/historia/assets/hero-mitologia.png',
  exploreTitle: 'Explorar Mitologia',
  searchPlaceholder: 'Buscar por deus, herói ou criatura',
  filterGroupLabel: 'Filtrar temas de Mitologia',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'grega', label: 'Grega' },
    { id: 'nordica', label: 'Nórdica' },
    { id: 'egipcia', label: 'Egípcia' },
    { id: 'criaturas', label: 'Criaturas' },
  ],
  cards: mythologyTopics.map((topic) => ({
    id: topic.id, title: topic.title, meta: topic.summary,
    searchText: catalog.find((entry) => entry.id === topic.id)?.sections.map((section) => section.body).join(' '),
    imageSrc: '/historia/assets/mitologia/cards-atlas.png',
    imageStyle: {
      backgroundSize: '300% 400%',
      backgroundPosition: `${topic.tile[0] * 50}% ${topic.tile[1] * 100 / 3}%`,
    },
    href: `#/conteudos/${topic.id}`,
    categories: topic.categories,
  })),
}

function normalizeShowcaseSearch(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR')
}

function EraShowcasePage({ config }: { config: EraShowcaseConfig }) {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('todos')

  const effectiveQuery = normalizeShowcaseSearch((submittedQuery || query).trim())

  const visibleCards = useMemo(() => {
    return config.cards.filter((card) => {
      if (activeFilter !== 'todos' && !card.categories.includes(activeFilter)) {
        return false
      }
      if (!effectiveQuery) return true
      const yearQuery = effectiveQuery.match(/^(\d{1,4})(?:\s*(a\.?\s*c\.?|d\.?\s*c\.?))?$/)
      if (yearQuery && card.yearRange) {
        const era = yearQuery[2]?.replace(/[.\s]/g, '')
        const beforeChrist = era === 'ac' || (!era && card.yearRange[1] < 0)
        const year = beforeChrist ? 1 - Number(yearQuery[1]) : Number(yearQuery[1])
        return year >= card.yearRange[0] && year <= card.yearRange[1]
      }
      return (
        normalizeShowcaseSearch(card.title).includes(effectiveQuery) ||
        normalizeShowcaseSearch(card.meta).includes(effectiveQuery) ||
        normalizeShowcaseSearch(card.searchText ?? '').includes(effectiveQuery)
      )
    })
  }, [activeFilter, config.cards, effectiveQuery])

  const heroStyle = {
    '--era-hero-image': `url('${config.heroImage}')`,
  } as CSSProperties

  return (
    <div className={`prehistoria-page ${config.id}-page`}>
      <section
        className="pre-hero"
        style={heroStyle}
        aria-labelledby={`${config.id}-title`}
      >
        <div className="pre-hero-content">
          <h1 id={`${config.id}-title`}>{config.title}</h1>
          <p className="pre-hero-subtitle">{config.subtitle}</p>
        </div>
      </section>

      <section className="pre-catalog" aria-labelledby={`${config.id}-explore-title`}>
        <div className="pre-toolbar">
          <h2 id={`${config.id}-explore-title`}>{config.exploreTitle}</h2>
          <div className="pre-controls">
            <form
              className="pre-search-bar"
              onSubmit={(event) => {
                event.preventDefault()
                setSubmittedQuery(query)
              }}
            >
              <Icon name="search" />
              <input
                type="search"
                aria-label={config.searchPlaceholder}
                placeholder={config.searchPlaceholder}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSubmittedQuery('')
                }}
              />
              <button className="pre-search-submit" type="submit">
                Buscar
              </button>
            </form>
            <div className="pre-filters" role="group" aria-label={config.filterGroupLabel}>
              {config.filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={`pre-filter-btn${activeFilter === filter.id ? ' is-active' : ''}`}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {visibleCards.length === 0 ? (
          <p className="empty-state">Nenhum tema encontrado com esses critérios.</p>
        ) : (
          <div className="pre-grid">
            {visibleCards.map((card) => (
              <a className="pre-card" href={card.href} key={card.id}>
                <span
                  className="pre-card-photo"
                  style={{ backgroundImage: `url(${card.imageSrc})`, ...card.imageStyle }}
                  aria-hidden="true"
                />
                <span className="pre-card-body">
                  <strong className="pre-card-title">{card.title}</strong>
                  <span className="pre-card-row">
                    <span className="pre-card-meta">{card.meta}</span>
                    <span className="pre-card-btn">Explorar</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function TimelineSection({
  title,
  description,
  entries,
}: {
  title: string
  description: string
  entries: HistoricalEntry[]
}) {
  return (
    <section className="timeline-section" aria-label={title}>
      <div className="timeline-heading">
        <span className="timeline-marker" aria-hidden="true" />
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <ol className="timeline-list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <span className="timeline-date">{entry.time.label}</span>
            <EntryCard entry={entry} />
          </li>
        ))}
      </ol>
    </section>
  )
}

function TimelinePage({ scaleFilter }: { scaleFilter?: TimeScale }) {
  const chronological = useMemo(
    () =>
      [...catalog]
        .filter((entry) => entry.time.scale !== 'cultural')
        .sort((a, b) => (a.time.timelineYear ?? 0) - (b.time.timelineYear ?? 0)),
    [],
  )
  const geological = chronological.filter((entry) => entry.time.scale === 'geological')
  const human = chronological.filter((entry) => entry.time.scale === 'human')
  const cultural = catalog.filter((entry) => entry.time.scale === 'cultural')

  return (
    <div className="page-content">
      <PageIntro
        eyebrow="Explore por períodos"
        title={scaleFilter ? scaleLabels[scaleFilter] : 'Linha do tempo'}
        description="A cronologia separa a história da Terra da história humana. Tradições culturais aparecem em uma seção própria, sem uma datação artificial."
      />
      {(!scaleFilter || scaleFilter === 'geological') && (
        <TimelineSection
          title="Tempo geológico"
          description="Bilhões de anos de transformações planetárias e da vida."
          entries={geological}
        />
      )}
      {(!scaleFilter || scaleFilter === 'human') && (
        <TimelineSection
          title="História humana"
          description="Uma história recente em escala geológica, diversa e conectada."
          entries={human}
        />
      )}
      {!scaleFilter && cultural.length > 0 && (
        <section className="section-block" aria-labelledby="cultural-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Sem posição cronológica única</p>
              <h2 id="cultural-title">Tradições culturais</h2>
            </div>
          </div>
          <EntryGrid entries={cultural} />
        </section>
      )}
    </div>
  )
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}

function TrackGrid() {
  return (
    <div className="track-grid">
      {tracks.map((track, index) => (
        <a className="track-card" href={`#/trilhas/${track.id}`} key={track.id}>
          <span className="track-number">0{index + 1}</span>
          <h3>{track.title}</h3>
          <p>{track.description}</p>
          <span className="track-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  )
}

function TracksPage({ trackId }: { trackId?: string }) {
  const track = tracks.find((item) => item.id === trackId)
  if (!trackId || !track) {
    return (
      <div className="page-content">
        <PageIntro
          eyebrow="Conexões temáticas"
          title="Trilhas de exploração"
          description="Escolha um tema para percorrer conteúdos em seus contextos históricos e culturais."
        />
        <TrackGrid />
      </div>
    )
  }

  const entries = catalog.filter(track.matches)
  return (
    <div className="page-content">
      <PageIntro eyebrow="Trilha temática" title={track.title} description={track.description} />
      <EntryGrid entries={entries} />
    </div>
  )
}

function SearchPage({ route }: { route: Route }) {
  const [query, setQuery] = useState(route.query.get('q') ?? '')
  const [scale, setScale] = useState(route.query.get('scale') ?? 'all')
  const [kind, setKind] = useState(route.query.get('kind') ?? 'all')
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
  const results = catalog.filter((entry) => {
    const matchesText =
      !normalizedQuery ||
      [entry.title, entry.summary, ...entry.topics]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedQuery)
    const matchesScale = scale === 'all' || entry.time.scale === scale
    const matchesKind = kind === 'all' || entry.kind === kind
    return matchesText && matchesScale && matchesKind
  })

  return (
    <div className="page-content">
      <PageIntro
        eyebrow="Pesquisa no catálogo"
        title="Encontre uma história"
        description="Pesquise por título, resumo ou assunto e combine os filtros disponíveis."
      />
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault()
          navigateToSearch(query, scale, kind)
        }}
      >
        <label className="search-field">
          <span>Buscar no catálogo</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex.: dinossauros, Atenas, revoluções"
          />
        </label>
        <label>
          <span>Período</span>
          <select value={scale} onChange={(event) => setScale(event.target.value)}>
            <option value="all">Todos</option>
            <option value="geological">Tempo geológico</option>
            <option value="human">História humana</option>
            <option value="cultural">Tradição cultural</option>
          </select>
        </label>
        <label>
          <span>Categoria</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="all">Todas</option>
            {Object.entries(kindLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <button className="button button-primary search-submit" type="submit">
          Pesquisar
        </button>
      </form>
      <div className="results-heading" aria-live="polite">
        <h2>Resultados</h2>
        <span>{results.length} {results.length === 1 ? 'conteúdo' : 'conteúdos'}</span>
      </div>
      <EntryGrid entries={results} />
    </div>
  )
}

function EntryDetailPage({ id }: { id: string }) {
  const entry = catalog.find((item) => item.id === id)
  if (!entry) {
    return <NotFoundPage />
  }

  const relatedEntries = catalog.filter((item) => entry.relatedEntryIds.includes(item.id))

  return (
    <article className="page-content detail-page">
      <a className="back-link" href="#/linha-do-tempo">← Voltar à exploração</a>
      <header className="page-intro detail-intro">
        <p className="eyebrow">{kindLabels[entry.kind]} · {scaleLabels[entry.time.scale]}</p>
        <h1>{entry.title}</h1>
        <p className="detail-time">{entry.time.label}</p>
        <p>{entry.summary}</p>
      </header>
      {entry.image && (
        <figure className="entry-image">
          <img src={entry.image.src} alt={entry.image.alt} />
          <figcaption>{entry.image.caption} Crédito: {entry.image.credit}. Licença: {entry.image.license}.</figcaption>
        </figure>
      )}
      <div className="detail-layout">
        <div className="detail-sections">
          {entry.sections.map((section) => (
            <section key={section.heading} className="content-section">
              <p className="eyebrow">{{ evidence: 'Evidência', interpretation: 'Interpretação', tradition: 'Tradição cultural' }[section.classification]}</p>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section className="sources-section" aria-labelledby="sources-title">
            <p className="eyebrow">Para continuar pesquisando</p>
            <h2 id="sources-title">Fontes e leituras</h2>
            <ul>
              {entry.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>
                  <span>{source.organization} · {source.kind === 'primary' ? 'fonte primária' : source.kind === 'secondary' ? 'fonte secundária' : 'referência'}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="detail-aside" aria-label="Assuntos relacionados">
          <h2>Assuntos</h2>
          <ul className="topic-list">
            {entry.topics.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
          {relatedEntries.length > 0 && (
            <>
              <h2>Conteúdos relacionados</h2>
              <ul className="related-list">
                {relatedEntries.map((related) => (
                  <li key={related.id}>
                    <a href={`#/conteudos/${related.id}`}>{related.title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </article>
  )
}

function NotFoundPage() {
  return (
    <div className="page-content not-found">
      <PageIntro
        eyebrow="Página não encontrada"
        title="Este caminho ainda não existe"
        description="Volte ao início ou continue explorando o catálogo."
      />
      <a className="button button-primary" href="#/">Ir para o início</a>
    </div>
  )
}

function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const route = useMemo(() => readRoute(hash), [hash])

  useEffect(() => {
    const updateRoute = () => setHash(window.location.hash)
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])

  const routeParts = route.path.split('/').filter(Boolean)
  let page
  if (route.path === '/' || route.path === '') {
    page = <HomePage />
  } else if (route.path === '/pre-historia') {
    page = <EraShowcasePage key="prehistoria" config={prehistoriaConfig} />
  } else if (route.path === '/antiguidade') {
    page = <EraShowcasePage key="antiguidade" config={antiguidadeConfig} />
  } else if (route.path === '/idade-media') {
    page = <EraShowcasePage key="idade-media" config={idadeMediaConfig} />
  } else if (route.path === '/revolucoes') {
    page = <EraShowcasePage key="revolucoes" config={revolucoesConfig} />
  } else if (route.path === '/guerras') {
    page = <EraShowcasePage key="guerras" config={guerrasConfig} />
  } else if (route.path === '/oriental') {
    page = <EraShowcasePage key="oriental" config={orientalConfig} />
  } else if (route.path === '/mitologia') {
    page = <EraShowcasePage key="mitologia" config={mitologiaConfig} />
  } else if (route.path === '/linha-do-tempo' || route.path === '/periodos') {
    page = <TimelinePage />
  } else if (route.path === '/periodos/geologico') {
    page = <TimelinePage scaleFilter="geological" />
  } else if (route.path === '/periodos/humano') {
    page = <TimelinePage scaleFilter="human" />
  } else if (route.path === '/trilhas') {
    page = <TracksPage />
  } else if (routeParts[0] === 'trilhas' && routeParts[1]) {
    page = <TracksPage trackId={routeParts[1]} />
  } else if (route.path === '/busca') {
    page = <SearchPage route={route} />
  } else if (routeParts[0] === 'conteudos' && routeParts[1]) {
    page = <EntryDetailPage id={routeParts[1]} />
  } else {
    page = <NotFoundPage />
  }

  return (
    <div className={`site-shell${route.path === '/' ? ' is-home' : ''}`}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main-content')?.focus()
        }}
      >
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <a className="brand" href="#/" aria-label="Explorando a História — início">
          <img className="brand-logo" src="/historia/assets/logo.png" alt="Explorando a História" />
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a className="nav-item" href="#/" aria-current={route.path === '/' ? 'page' : undefined}>
            <Icon name="home" /> Início
          </a>
          {topNav.map((item) => item.href ? (
            <a
              className="nav-item"
              href={item.href}
              key={item.label}
              aria-current={route.path === item.href.slice(1) ? 'page' : undefined}
            >
              <Icon name={item.icon} /> {item.label}
            </a>
          ) : (
            <button className="nav-item nav-item-static" type="button" key={item.label}>
              <Icon name={item.icon} /> {item.label}
            </button>
          ))}
          <details className="nav-explore">
            <summary className="nav-item">
              <Icon name="compass" /> Explorar <span aria-hidden="true" className="nav-caret">⌄</span>
            </summary>
            <div className="nav-explore-menu">
              <a href="#/linha-do-tempo" aria-current={route.path === '/linha-do-tempo' ? 'page' : undefined}>Linha do tempo</a>
              <a href="#/periodos" aria-current={route.path.startsWith('/periodos') ? 'page' : undefined}>Períodos</a>
              <a href="#/trilhas" aria-current={route.path.startsWith('/trilhas') ? 'page' : undefined}>Trilhas</a>
              <a href="#/busca" aria-current={route.path === '/busca' ? 'page' : undefined}>Buscar</a>
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <a className="round-button nav-search" href="#/busca" aria-label="Buscar">
            <Icon name="search" />
          </a>
          <span className="round-button" aria-hidden="true"><Icon name="moon" /></span>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {page}
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#/">Explorando a História</a>
        <p>Conhecimento histórico com contexto, fontes e espaço para novas perguntas.</p>
        <a href="#/busca">Pesquisar conteúdos</a>
      </footer>
    </div>
  )
}

export default App
