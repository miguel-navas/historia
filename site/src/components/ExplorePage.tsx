import { useRef, useState, type CSSProperties } from 'react'
import {
  exploreFilters, exploreHighlights, exploreTimeline, exploreWorlds,
  searchExploreCatalog, type ExploreFilter,
} from '../data/explore'
import './ExplorePage.css'

function atlasStyle(tile: number[]): CSSProperties {
  return { backgroundPosition: `${tile[0] * 50}% ${tile[1] * 100 / 3}%` }
}

function readParams(queryString: string) {
  const params = new URLSearchParams(queryString)
  const filter = exploreFilters.find((item) => item.id === params.get('filter'))?.id ?? 'all'
  return { query: params.get('q') ?? '', filter }
}

export default function ExplorePage({ queryString }: { queryString: string }) {
  const [search, setSearch] = useState(() => ({ source: queryString, ...readParams(queryString) }))
  if (search.source !== queryString) {
    setSearch({ source: queryString, ...readParams(queryString) })
  }
  const { query, filter } = search
  const setQuery = (nextQuery: string) => setSearch((current) => ({ ...current, query: nextQuery }))
  const setFilter = (nextFilter: ExploreFilter) => setSearch((current) => ({ ...current, filter: nextFilter }))
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLElement>(null)

  const filtering = query.trim() !== '' || filter !== 'all'
  const results = filtering ? searchExploreCatalog(query, filter) : []

  function shareSearch(nextQuery = query, nextFilter = filter) {
    const params = new URLSearchParams()
    if (nextQuery.trim()) params.set('q', nextQuery.trim())
    if (nextFilter !== 'all') params.set('filter', nextFilter)
    window.location.hash = `/explorar${params.size ? `?${params}` : ''}`
  }

  return (
    <div className="explore-page">
      <section className="explore-hero" aria-labelledby="explore-title">
        <div className="explore-hero-copy">
          <h1 id="explore-title">Explorar</h1>
          <p>Explore toda a História em um só lugar</p>
          <button className="button button-primary explore-start" type="button" onClick={() => {
            searchRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
            inputRef.current?.focus({ preventScroll: true })
          }}>
            <span aria-hidden="true">→</span> Começar a Explorar
          </button>
        </div>
      </section>

      <section className="explore-browser" ref={searchRef} aria-labelledby="explore-search-title">
        <div className="explore-toolbar">
          <h2 id="explore-search-title">Explorar</h2>
          <div className="explore-controls">
            <form className="pre-search-bar" role="search" onSubmit={(event) => { event.preventDefault(); shareSearch() }}>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></svg>
              <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Buscar por tema, personagem, ano ou civilização" placeholder="Buscar por tema, personagem, ano ou civilização" />
              <button className="pre-search-submit" type="submit">Buscar</button>
            </form>
            <div className="pre-filters" role="group" aria-label="Filtrar exploração">
              {exploreFilters.map((item) => <button key={item.id} type="button" className={`pre-filter-btn${filter === item.id ? ' is-active' : ''}`} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
            </div>
          </div>
        </div>

        {filtering ? (
          <section className="explore-results" aria-labelledby="explore-results-title">
            <div className="explore-section-heading">
              <h2 id="explore-results-title">Resultados</h2>
              <span role="status">{results.length} {results.length === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}</span>
              <button className="explore-clear" type="button" onClick={() => { setQuery(''); setFilter('all'); shareSearch('', 'all'); inputRef.current?.focus() }}>Limpar busca e filtros</button>
            </div>
            {results.length ? <div className="explore-result-grid">{results.map((entry) => (
              <a className="explore-result-card" href={`#/conteudos/${entry.id}`} key={entry.id}>
                <span className="eyebrow">{entry.time.scale === 'cultural' ? 'Tradição cultural' : entry.time.label}</span>
                <h3>{entry.title}</h3><p>{entry.summary}</p><span className="explore-card-action">Explorar <span aria-hidden="true">→</span></span>
              </a>
            ))}</div> : <p className="empty-state">Nenhum conteúdo encontrado com esses critérios.</p>}
          </section>
        ) : <>
          <section aria-labelledby="explore-worlds-title" className="explore-worlds">
            <h2 id="explore-worlds-title">Os 6 Mundos</h2>
            <div className="explore-six-grid">{exploreWorlds.map((world) => (
              <a className="explore-world-card" href={world.href} key={world.title}>
                <span className="explore-atlas" style={atlasStyle(world.tile)} aria-hidden="true" />
                <h3>{world.title}</h3><p>{world.description}</p><span className="explore-card-action">Explorar</span>
              </a>
            ))}</div>
          </section>
          <section aria-labelledby="explore-highlights-title" className="explore-highlights">
            <h2 id="explore-highlights-title">Em Destaque</h2>
            <div className="explore-six-grid">{exploreHighlights.map(({ entry, tile, caption }) => (
              <a className="explore-highlight-card" href={`#/conteudos/${entry.id}`} key={entry.id}>
                <span className="explore-atlas" style={atlasStyle(tile)} aria-hidden="true" />
                <h3>{entry.title}</h3><p>{caption}</p><span className="explore-card-action">Explorar</span>
              </a>
            ))}</div>
          </section>
        </>}
      </section>

      <section className="explore-timeline" aria-labelledby="explore-timeline-title">
        <div className="explore-section-heading"><h2 id="explore-timeline-title">Linha do Tempo</h2><a href="#/linha-do-tempo">Ver linha do tempo completa <span aria-hidden="true">→</span></a></div>
        <p className="explore-timeline-caption">Marcos selecionados da história humana, em ordem cronológica.</p>
        <div className="explore-timeline-scroll" tabIndex={0} role="region" aria-label="Marcos históricos em ordem cronológica">
          <ol>{exploreTimeline.map((item) => <li key={item.id}><a href={`#/conteudos/${item.id}`}><span className="explore-timeline-dot" aria-hidden="true" /><span className="explore-timeline-date">{item.date}</span><strong>{item.title}</strong></a></li>)}</ol>
        </div>
      </section>
      <nav className="explore-shortcuts" aria-label="Mais caminhos de exploração">
        <a href="#/pre-historia">Pré-História</a><a href="#/periodos">Períodos</a><a href="#/trilhas">Trilhas temáticas</a><a href="#/busca">Biblioteca histórica</a>
      </nav>
    </div>
  )
}
