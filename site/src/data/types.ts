export type EntryKind =
  | 'period'
  | 'civilization'
  | 'event'
  | 'person'
  | 'tradition'

export type TimeScale = 'geological' | 'human' | 'cultural'

export interface TimeContext {
  scale: TimeScale
  label: string
  timelineYear?: number
}

export interface ContentSection {
  heading: string
  body: string
  classification: 'evidence' | 'interpretation' | 'tradition'
}

export interface SourceReference {
  title: string
  organization: string
  url: string
  kind: 'primary' | 'secondary' | 'reference'
}

export interface LicensedImage {
  src: string
  alt: string
  caption: string
  credit: string
  license: string
  provenance?: string
  kind: 'illustration' | 'documentary-source'
}

export interface HistoricalEntry {
  id: string
  kind: EntryKind
  title: string
  summary: string
  time: TimeContext
  topics: string[]
  sections: ContentSection[]
  sources: SourceReference[]
  relatedEntryIds: string[]
  image?: LicensedImage
}
