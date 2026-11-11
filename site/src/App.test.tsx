import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
  window.location.hash = '#/'
})

describe('App', () => {
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
