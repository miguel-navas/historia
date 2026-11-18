import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { catalog } from './data/catalog'

afterEach(() => {
  cleanup()
  window.location.hash = '#/'
})

describe('App', () => {
  it('opens Revoluções from the menu and gives all nine cards specific content destinations', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('link', { name: 'Revoluções' }))
    expect(await screen.findByRole('heading', { name: 'Explorar Revoluções' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Revoluções' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: 'Explorar Revoluções' })).toBeNull()
    const cards = document.querySelectorAll<HTMLAnchorElement>('.pre-card')
    expect(cards.length).toBe(9)
    expect(new Set(Array.from(cards, (card) => card.hash)).size).toBe(9)
    for (const card of cards) {
      const id = card.hash.replace('#/conteudos/', '')
      expect(catalog.some((entry) => entry.id === id)).toBe(true)
    }
    fireEvent.click(screen.getByRole('link', { name: /Revolução Russa.*1917/ }))
    expect(await screen.findByRole('heading', { name: 'Revolução Russa' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Fontes e leituras' })).toBeTruthy()
  })

  it('combines revolution region filters and search by year or historical figure', () => {
    window.location.hash = '#/revolucoes'
    render(<App />)
    const filters = screen.getByRole('group', { name: 'Filtrar temas das Revoluções' })
    const search = screen.getByRole('searchbox', { name: 'Buscar por revolução, personagem ou ano' })
    fireEvent.click(within(filters).getByRole('button', { name: 'Américas' }))
    expect(document.querySelectorAll('.pre-card').length).toBe(3)
    fireEvent.change(search, { target: { value: '1822' } })
    expect(document.querySelectorAll('.pre-card').length).toBe(1)
    expect(screen.getByRole('link', { name: /Independência do Brasil/ })).toBeTruthy()
    fireEvent.click(within(filters).getByRole('button', { name: 'Ideias' }))
    expect(screen.getByText('Nenhum tema encontrado com esses critérios.')).toBeTruthy()
    fireEvent.click(within(filters).getByRole('button', { name: 'Todos' }))
    fireEvent.change(search, { target: { value: 'Voltaire' } })
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))
    expect(document.querySelectorAll('.pre-card').length).toBe(1)
    expect(screen.getByRole('link', { name: /Iluminismo/ })).toBeTruthy()
    fireEvent.change(search, { target: { value: '' } })
    expect(document.querySelectorAll('.pre-card').length).toBe(9)
  })

  it('resets the showcase search and filter when navigating between eras', async () => {
    window.location.hash = '#/revolucoes'
    render(<App />)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar por revolução, personagem ou ano' }), {
      target: { value: '1917' },
    })
    fireEvent.click(screen.getByRole('link', { name: 'Idade Média' }))
    expect(await screen.findByRole('heading', { name: 'Explorar Idade Média' })).toBeTruthy()
    expect(document.querySelectorAll('.pre-card').length).toBe(11)
    fireEvent.click(screen.getByRole('link', { name: 'Revoluções' }))
    expect(await screen.findByRole('heading', { name: 'Explorar Revoluções' })).toBeTruthy()
    expect(document.querySelectorAll('.pre-card').length).toBe(9)
  })

  it('matches unaccented revolution searches and years within displayed ranges', () => {
    window.location.hash = '#/revolucoes'
    render(<App />)
    const search = screen.getByRole('searchbox', { name: 'Buscar por revolução, personagem ou ano' })
    fireEvent.change(search, { target: { value: 'revolucao francesa' } })
    expect(document.querySelectorAll('.pre-card').length).toBe(1)
    expect(screen.getByRole('link', { name: /Revolução Francesa/ })).toBeTruthy()
    fireEvent.change(search, { target: { value: '1800' } })
    expect(screen.getByRole('link', { name: /Revolução Haitiana/ })).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Revolução Francesa/ })).toBeNull()
    fireEvent.change(search, { target: { value: 'independencia' } })
    expect(screen.getByRole('link', { name: /Independência do Brasil/ })).toBeTruthy()
  })
  it('renders the home page and navigation destinations', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Explorando a História' })).toBeTruthy()
    expect(screen.getByRole('navigation', { name: 'Navegação principal' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Iniciar exploração' }).getAttribute('href'))
      .toBe('#/linha-do-tempo')
  })

  it('presents the hero as the whole home page, with working destinations', () => {
    render(<App />)

    expect(screen.queryByRole('heading', { name: 'Uma jornada pela história' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Em destaque' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Biblioteca histórica' }).getAttribute('href'))
      .toBe('#/busca')
  })

  it('keeps skip navigation and home links keyboard-focusable', () => {
    render(<App />)

    const skipLink = screen.getByRole('link', { name: 'Pular para o conteúdo' })
    const homeLink = screen.getByRole('link', { name: 'Início' })
    skipLink.focus()

    expect(document.activeElement).toBe(skipLink)
    expect(skipLink.tabIndex).toBe(0)
    expect(homeLink.tabIndex).toBe(0)
    expect(skipLink.getAttribute('href')).toBe('#main-content')
  })

  it('navigates to a timeline with separate geological and human sections', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('link', { name: 'Iniciar exploração' }))

    expect(await screen.findByRole('heading', { name: 'Linha do tempo' })).toBeTruthy()
    expect(screen.getByRole('region', { name: 'Tempo geológico' })).toBeTruthy()
    expect(screen.getByRole('region', { name: 'História humana' })).toBeTruthy()
  })

  it('opens a shareable content route with contextual sources', () => {
    window.location.hash = '#/conteudos/mitologia-grega'
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Mitologia grega' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Fontes e leituras' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'The Odyssey of Homer' }).getAttribute('href'))
      .toContain('perseus.tufts.edu')
  })

  it('shows thematic tracks with relevant content links', () => {
    window.location.hash = '#/trilhas/mitologias'
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Mitologias e tradições' })).toBeTruthy()
    expect(screen.getByRole('link', { name: /Mitologia grega/ })).toBeTruthy()
  })

  it('combines text, timescale, and category search filters', () => {
    window.location.hash = '#/busca'
    render(<App />)

    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar no catálogo' }), {
      target: { value: 'Atenas' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Período' }), {
      target: { value: 'human' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Categoria' }), {
      target: { value: 'civilization' },
    })

    expect(screen.getByRole('link', { name: /Atenas antiga/ })).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Mitologia grega/ })).toBeNull()
  })

  it('shows an empty state when no content matches combined filters', () => {
    window.location.hash = '#/busca'
    render(<App />)

    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar no catálogo' }), {
      target: { value: 'Atlântida' },
    })
    fireEvent.change(screen.getByRole('combobox', { name: 'Período' }), {
      target: { value: 'human' },
    })

    expect(screen.getByText('Nenhum conteúdo encontrado com esses critérios.')).toBeTruthy()
  })

  it('renders the Pre-Historia page with hero (without Explorar button), search, filters, and 12 cards', () => {
    window.location.hash = '#/pre-historia'
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Pré-História' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Explorar Pré-História/ })).toBeNull()
    expect(screen.getByRole('heading', { name: 'Explorar Pré-História' })).toBeTruthy()
    expect(screen.getByRole('searchbox', { name: 'Buscar por dinossauro, era ou fóssil' })).toBeTruthy()

    expect(screen.getByText('Era dos Dinossauros')).toBeTruthy()
    expect(screen.getByText('Era do Gelo e Mamutes')).toBeTruthy()
    expect(document.querySelectorAll('.pre-card').length).toBe(12)

    fireEvent.click(screen.getByRole('button', { name: 'Era do Gelo' }))
    expect(document.querySelectorAll('.pre-card').length).toBe(2)

    fireEvent.click(screen.getByRole('button', { name: 'Todos' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar por dinossauro, era ou fóssil' }), {
      target: { value: 'Velociraptor' },
    })
    expect(document.querySelectorAll('.pre-card').length).toBe(1)
  })

  it('renders the Antiguidade page with hero (without Explorar button), search, filters, and 9 cards', () => {
    window.location.hash = '#/antiguidade'
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Antiguidade' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Explorar Antiguidade/ })).toBeNull()
    expect(screen.getByRole('heading', { name: 'Explorar Antiguidade' })).toBeTruthy()
    expect(screen.getByRole('searchbox', { name: 'Buscar por civilização, personagem ou guerra' })).toBeTruthy()

    expect(screen.getByText('Egito Antigo')).toBeTruthy()
    expect(screen.getByText('7 Maravilhas do Mundo Antigo')).toBeTruthy()
    expect(document.querySelectorAll('.pre-card').length).toBe(9)

    const filterGroup = screen.getByRole('group', { name: 'Filtrar temas da Antiguidade' })
    fireEvent.click(within(filterGroup).getByRole('button', { name: 'Guerras' }))
    expect(document.querySelectorAll('.pre-card').length).toBe(2)

    fireEvent.click(within(filterGroup).getByRole('button', { name: 'Todos' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar por civilização, personagem ou guerra' }), {
      target: { value: 'Mesopotâmia' },
    })
    expect(document.querySelectorAll('.pre-card').length).toBe(1)
  })

  it('renders the Idade Media page with hero (without Explorar button), search, filters, and 11 cards', () => {
    window.location.hash = '#/idade-media'
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Idade Média' })).toBeTruthy()
    expect(screen.queryByRole('link', { name: /Explorar Idade Média/ })).toBeNull()
    expect(screen.getByRole('heading', { name: 'Explorar Idade Média' })).toBeTruthy()
    expect(screen.getByRole('searchbox', { name: 'Buscar por império, personagem ou guerra' })).toBeTruthy()

    expect(screen.getByText('Império Bizantino')).toBeTruthy()
    expect(screen.getByText('A Peste Negra')).toBeTruthy()
    expect(document.querySelectorAll('.pre-card').length).toBe(11)

    const filterGroup = screen.getByRole('group', { name: 'Filtrar temas da Idade Média' })
    fireEvent.click(within(filterGroup).getByRole('button', { name: 'Vida Medieval' }))
    expect(document.querySelectorAll('.pre-card').length).toBe(4)

    fireEvent.click(within(filterGroup).getByRole('button', { name: 'Todos' }))
    fireEvent.change(screen.getByRole('searchbox', { name: 'Buscar por império, personagem ou guerra' }), {
      target: { value: 'Saladino' },
    })
    expect(document.querySelectorAll('.pre-card').length).toBe(1)
  })
})
