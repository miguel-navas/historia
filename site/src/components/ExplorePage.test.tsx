import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../App'
import { catalog } from '../data/catalog'
import { exploreTimeline } from '../data/explore'

afterEach(() => { cleanup(); window.location.hash = '#/' })

describe('Explorar', () => {
  it('opens the central hub with six worlds, six highlights and eight chronological destinations', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('link', { name: 'Explorar' }))
    expect(await screen.findByRole('heading', { name: 'Os 6 Mundos' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Explorar' }).getAttribute('aria-current')).toBe('page')
    expect(screen.getByRole('button', { name: 'Começar a Explorar' })).toBeTruthy()
    const worlds = document.querySelectorAll<HTMLAnchorElement>('.explore-world-card')
    expect(Array.from(worlds, (link) => link.hash)).toEqual([
      '#/antiguidade', '#/idade-media', '#/revolucoes', '#/guerras', '#/oriental', '#/mitologia',
    ])
    const highlights = document.querySelectorAll<HTMLAnchorElement>('.explore-highlight-card')
    expect(highlights.length).toBe(6)
    for (const link of highlights) expect(catalog.some((entry) => link.hash === `#/conteudos/${entry.id}`)).toBe(true)
    const years = exploreTimeline.map((item) => catalog.find((entry) => entry.id === item.id)!.time.timelineYear!)
    expect(years.length).toBe(8)
    expect(years).toEqual([...years].sort((a, b) => a - b))
    fireEvent.click(worlds[4])
    expect(await screen.findByRole('heading', { name: 'Explorar Oriental' })).toBeTruthy()
  })

  it('combines full-catalog searches and categories, then clears back to the overview', async () => {
    window.location.hash = '#/explorar'
    render(<App />)
    const input = screen.getByRole('searchbox', { name: 'Buscar por tema, personagem, ano ou civilização' })
    fireEvent.change(input, { target: { value: 'Napoleao' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guerras' }))
    expect(within(screen.getByRole('region', { name: 'Resultados' })).getByRole('link', { name: /Guerras Napoleônicas/ })).toBeTruthy()
    expect(document.querySelectorAll('.explore-result-card').length).toBe(1)
    fireEvent.change(input, { target: { value: 'Mjolnir' } })
    expect(screen.getByText('Nenhum conteúdo encontrado com esses critérios.')).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Deuses' }))
    expect(screen.getByRole('link', { name: /Thor e o Ragnarök/ })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Limpar busca e filtros' }))
    expect(await screen.findByRole('heading', { name: 'Os 6 Mundos' })).toBeTruthy()
    expect((input as HTMLInputElement).value).toBe('')
    expect(document.querySelectorAll('.explore-world-card').length).toBe(6)
  })

  it('loads shareable parameters and keeps the fields synchronized after URL navigation', async () => {
    window.location.hash = '#/explorar?q=Zeus&filter=gods'
    render(<App />)
    const input = screen.getByRole('searchbox', { name: 'Buscar por tema, personagem, ano ou civilização' })
    expect((input as HTMLInputElement).value).toBe('Zeus')
    expect(screen.getByRole('button', { name: 'Deuses' }).getAttribute('aria-pressed')).toBe('true')
    fireEvent.change(input, { target: { value: 'Napoleao' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guerras' }))
    input.focus()
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }))
    await waitFor(() => expect(window.location.hash).toContain('q=Napoleao&filter=wars'))
    expect(document.activeElement).toBe(input)
    window.location.hash = '#/explorar?q=Qin&filter=empires'
    await waitFor(() => expect((screen.getByRole('searchbox', { name: 'Buscar por tema, personagem, ano ou civilização' }) as HTMLInputElement).value).toBe('Qin'))
    expect(screen.getByRole('button', { name: 'Impérios' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('link', { name: /China Imperial/ })).toBeTruthy()
    fireEvent.click(screen.getByRole('button', { name: 'Limpar busca e filtros' }))
    expect(await screen.findByRole('heading', { name: 'Os 6 Mundos' })).toBeTruthy()
    expect(document.activeElement).toBe(input)
    window.location.hash = '#/explorar'
    expect(await screen.findByRole('heading', { name: 'Os 6 Mundos' })).toBeTruthy()
  })

  it('understands year intervals and explicit BC/AD, without treating myths as historical events', () => {
    window.location.hash = '#/explorar'
    render(<App />)
    const input = screen.getByRole('searchbox', { name: 'Buscar por tema, personagem, ano ou civilização' })
    fireEvent.click(screen.getByRole('button', { name: 'Guerras' }))
    fireEvent.change(input, { target: { value: '480 a.C.' } })
    expect(document.querySelectorAll('.explore-result-card').length).toBe(1)
    expect(screen.getByRole('link', { name: /Guerras Greco-Persas/ })).toBeTruthy()
    fireEvent.change(input, { target: { value: '480 d.C.' } })
    expect(screen.getByText('Nenhum conteúdo encontrado com esses critérios.')).toBeTruthy()
    fireEvent.change(input, { target: { value: '1944' } })
    expect(within(screen.getByRole('region', { name: 'Resultados' })).getByRole('heading', { name: 'Segunda Guerra Mundial' })).toBeTruthy()
    fireEvent.change(input, { target: { value: '1944 d.C.' } })
    expect(within(screen.getByRole('region', { name: 'Resultados' })).getByRole('heading', { name: 'Desembarque da Normandia (Dia D)' })).toBeTruthy()
    expect(document.querySelectorAll('.explore-result-card').length).toBe(2)
    fireEvent.click(screen.getByRole('button', { name: 'Deuses' }))
    expect(screen.getByText('Nenhum conteúdo encontrado com esses critérios.')).toBeTruthy()
  })
})
