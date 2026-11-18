import { catalog } from './catalog'
import type { HistoricalEntry } from './types'
import { warTopics } from './wars'
import { orientalTopics } from './oriental'
import { revolutionTopics } from './revolutions'

export const exploreFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'eras', label: 'Épocas' },
  { id: 'wars', label: 'Guerras' },
  { id: 'gods', label: 'Deuses' },
  { id: 'empires', label: 'Impérios' },
  { id: 'people', label: 'Personagens' },
] as const

export type ExploreFilter = typeof exploreFilters[number]['id']

export const exploreWorlds = [
  { title: 'Antiguidade', description: 'Civilizações antigas e seus legados', href: '#/antiguidade', tile: [0, 0] },
  { title: 'Idade Média', description: 'Castelos, cavaleiros e sociedades medievais', href: '#/idade-media', tile: [1, 0] },
  { title: 'Revoluções', description: 'Transformações que mudaram o mundo', href: '#/revolucoes', tile: [2, 0] },
  { title: 'Guerras', description: 'Conflitos e seus contextos históricos', href: '#/guerras', tile: [0, 1] },
  { title: 'Oriental', description: 'Sociedades e tradições da Ásia', href: '#/oriental', tile: [1, 1] },
  { title: 'Mitologia', description: 'Deuses, heróis e narrativas culturais', href: '#/mitologia', tile: [2, 1] },
]

export const exploreHighlights = [
  { id: 'revolucao-francesa', tile: [0, 2], caption: '1789–1799 · Transformações na França' },
  { id: 'samurais', tile: [1, 2], caption: 'Elites guerreiras e cultura japonesa' },
  { id: 'mitologia-grega', tile: [2, 2], caption: 'Narrativas do Olimpo, deuses e heróis' },
  { id: 'segunda-guerra-mundial', tile: [0, 3], caption: '1939–1945 · Um conflito mundial' },
  { id: 'imperio-romano', tile: [1, 3], caption: 'Império, cidades e vida romana' },
  { id: 'zeus-e-olimpo', tile: [2, 3], caption: 'O deus do céu nas tradições gregas' },
].map((item) => ({ ...item, entry: catalog.find((entry) => entry.id === item.id)! }))

export const exploreTimeline = [
  { id: 'antigo-reino-egito', date: 'c. 2613 a.C.', title: 'Egito' },
  { id: 'atene-antiga', date: 'Século V a.C.', title: 'Atenas' },
  { id: 'imperio-romano', date: '27 a.C.', title: 'Império Romano' },
  { id: 'imperio-mongol', date: '1206', title: 'Império Mongol' },
  { id: 'machu-picchu', date: 'Século XV', title: 'Machu Picchu' },
  { id: 'revolucao-francesa', date: '1789', title: 'Revolução Francesa' },
  { id: 'guerras-napoleonicas', date: '1803', title: 'Guerras Napoleônicas' },
  { id: 'segunda-guerra-mundial', date: '1939', title: 'Segunda Guerra' },
]

const warIds = new Set([...warTopics.map((topic) => topic.id), 'dia-d'])
const deityIds = new Set([
  'mitologia-grega', 'zeus-e-olimpo', 'mitologia-nordica', 'thor-e-ragnarok',
  'mitologia-egipcia', 'mitologia-romana', 'mitologia-asteca-maia', 'mitologia-hindu',
])
const characterIds = new Set(['zeus-e-olimpo', 'thor-e-ragnarok', 'hercules-doze-trabalhos', 'medusa-e-minotauro'])
const ranges = new Map<string, [number, number]>([
  ...warTopics.map((topic): [string, [number, number]] => [topic.id, topic.yearRange]),
  ...orientalTopics.filter((topic) => topic.yearRange).map((topic): [string, [number, number]] => [topic.id, topic.yearRange!]),
  ...revolutionTopics.map((topic): [string, [number, number]] => {
    const years = topic.date.match(/\d{4}/g)?.map(Number)
    return [topic.id, years ? [years[0], years.at(-1)!] : [1600, 1799]]
  }),
  ['antigo-reino-egito', [-2612, -2180]],
  ['imperio-romano', [-26, 1453]],
])

export function normalizeExploreQuery(text: string) {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR').trim()
}

export function searchExploreCatalog(query: string, filter: ExploreFilter) {
  const normalized = normalizeExploreQuery(query)
  return catalog.filter((entry: HistoricalEntry) => {
    const matchesFilter = filter === 'all'
      || (filter === 'eras' && entry.kind === 'period' && entry.time.scale !== 'cultural')
      || (filter === 'wars' && warIds.has(entry.id))
      || (filter === 'gods' && deityIds.has(entry.id))
      || (filter === 'empires' && (entry.id.startsWith('imperio-') || entry.id === 'china-imperial'))
      || (filter === 'people' && ((entry.kind === 'person' && entry.id !== 'homo-sapiens') || characterIds.has(entry.id)))
    if (!matchesFilter) return false
    if (!normalized) return true
    const yearQuery = normalized.match(/^(\d{1,4})(?:\s*(a\.?\s*c\.?|d\.?\s*c\.?))?$/)
    const range = ranges.get(entry.id) ?? (entry.time.timelineYear === undefined ? undefined : [entry.time.timelineYear, entry.time.timelineYear])
    if (yearQuery && range) {
      const era = yearQuery[2]?.replace(/[.\s]/g, '')
      const bc = era === 'ac' || (!era && range[1] < 0)
      const year = bc ? 1 - Number(yearQuery[1]) : Number(yearQuery[1])
      return year >= range[0] && year <= range[1]
    }
    return normalizeExploreQuery([
      entry.title, entry.summary, entry.time.label, ...entry.topics,
      ...entry.sections.map((section) => section.body),
    ].join(' ')).includes(normalized)
  })
}
