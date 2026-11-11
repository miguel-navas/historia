import { describe, expect, it } from 'vitest'
import { catalog } from './catalog'
import type { HistoricalEntry } from './types'
import { validateCatalog } from './validateCatalog'

const validEntry: HistoricalEntry = {
  id: 'formation-terra',
  kind: 'period',
  title: 'Formação da Terra',
  summary: 'Uma síntese sobre a formação do planeta.',
  time: {
    scale: 'geological',
    label: 'Há cerca de 4,54 bilhões de anos',
    timelineYear: -4_540_000_000,
  },
  topics: ['geologia'],
  sections: [
    {
      heading: 'Contexto',
      body: 'A Terra se formou no início do Sistema Solar.',
      classification: 'evidence',
    },
  ],
  sources: [
    {
      title: 'Earth facts',
      organization: 'NASA',
      url: 'https://science.nasa.gov/earth/facts/',
      kind: 'reference',
    },
  ],
  relatedEntryIds: [],
}

describe('validateCatalog', () => {
  it('accepts the researched initial catalog and its internal links', () => {
    expect(validateCatalog(catalog)).toEqual([])
  })

  it('does not publish gallery images without confirmed rights', () => {
    expect(catalog.every((entry) => entry.image === undefined)).toBe(true)
  })

  it('keeps geological, human, and cultural chronology distinct', () => {
    const dinosaurs = catalog.find((entry) => entry.id === 'era-dos-dinossauros')
    const humans = catalog.find((entry) => entry.id === 'homo-sapiens')
    const mythology = catalog.find((entry) => entry.id === 'mitologia-grega')

    expect(dinosaurs?.time.scale).toBe('geological')
    expect(humans?.time.scale).toBe('human')
    expect(mythology?.time.scale).toBe('cultural')
    expect(dinosaurs!.time.timelineYear!).toBeLessThan(humans!.time.timelineYear!)
    expect(mythology?.time.timelineYear).toBeUndefined()
  })

  it('accepts a sourced entry with explicit geological timescale', () => {
    expect(validateCatalog([validEntry])).toEqual([])
  })

  it('reports duplicate identifiers and broken related-entry links', () => {
    const duplicate = { ...validEntry, relatedEntryIds: ['missing-entry'] }

    expect(validateCatalog([validEntry, duplicate])).toEqual(
      expect.arrayContaining([
        'Duplicate entry id: formation-terra',
        'Entry "formation-terra" links to missing entry "missing-entry"',
      ]),
    )
  })

  it('rejects unsourced and undated timeline entries', () => {
    const incomplete: HistoricalEntry = {
      ...validEntry,
      id: 'incompleta',
      sources: [],
      time: { scale: 'human', label: 'Data desconhecida' },
    }

    expect(validateCatalog([incomplete])).toEqual(
      expect.arrayContaining([
        'Entry "incompleta" needs a valid timeline year',
        'Entry "incompleta" needs at least one source or further reading',
      ]),
    )
  })

  it('requires local asset files and provenance for documentary images', () => {
    const withImage: HistoricalEntry = {
      ...validEntry,
      image: {
        src: '/media/terra.webp',
        alt: 'Representação artística da Terra primitiva',
        caption: 'Ilustração da Terra primitiva.',
        credit: 'Equipe do projeto',
        license: 'CC BY 4.0',
        kind: 'documentary-source',
      },
    }

    expect(validateCatalog([withImage])).toEqual(
      expect.arrayContaining([
        'Image for "formation-terra" is missing: /media/terra.webp',
        'Documentary image for "formation-terra" needs provenance',
      ]),
    )
    expect(validateCatalog([withImage], new Set(['/media/terra.webp']))).toContain(
      'Documentary image for "formation-terra" needs provenance',
    )
  })
})
