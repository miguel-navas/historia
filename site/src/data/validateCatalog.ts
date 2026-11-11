import type { HistoricalEntry } from './types'

export function validateCatalog(
  entries: readonly HistoricalEntry[],
  availableImages: ReadonlySet<string> = new Set(),
): string[] {
  const errors: string[] = []
  const ids = new Set<string>()

  for (const entry of entries) {
    if (!entry.id.trim()) {
      errors.push('Entry has an empty id')
    } else if (ids.has(entry.id)) {
      errors.push(`Duplicate entry id: ${entry.id}`)
    }

    ids.add(entry.id)

    if (!entry.title.trim()) {
      errors.push(`Entry "${entry.id}" has an empty title`)
    }
    if (!entry.summary.trim()) {
      errors.push(`Entry "${entry.id}" has an empty summary`)
    }
    if (!entry.time.label.trim()) {
      errors.push(`Entry "${entry.id}" has an empty time label`)
    }
    if (
      entry.time.scale !== 'cultural' &&
      (entry.time.timelineYear === undefined ||
        !Number.isFinite(entry.time.timelineYear))
    ) {
      errors.push(`Entry "${entry.id}" needs a valid timeline year`)
    }
    if (entry.time.scale === 'cultural' && entry.time.timelineYear !== undefined) {
      errors.push(`Cultural entry "${entry.id}" cannot have a timeline position`)
    }
    if (entry.sections.length === 0) {
      errors.push(`Entry "${entry.id}" needs at least one content section`)
    }
    if (entry.sources.length === 0) {
      errors.push(`Entry "${entry.id}" needs at least one source or further reading`)
    }

    for (const section of entry.sections) {
      if (!section.heading.trim() || !section.body.trim()) {
        errors.push(`Entry "${entry.id}" has an incomplete content section`)
      }
    }

    for (const source of entry.sources) {
      if (!source.title.trim() || !source.organization.trim()) {
        errors.push(`Entry "${entry.id}" has an incomplete source reference`)
      }

      try {
        const url = new URL(source.url)
        if (url.protocol !== 'https:' && url.protocol !== 'http:') {
          errors.push(`Entry "${entry.id}" has a source with an unsupported URL`)
        }
      } catch {
        errors.push(`Entry "${entry.id}" has an invalid source URL: ${source.url}`)
      }
    }

    if (entry.image) {
      if (!entry.image.alt.trim() || !entry.image.caption.trim()) {
        errors.push(`Image for "${entry.id}" needs alt text and a caption`)
      }
      if (!entry.image.credit.trim() || !entry.image.license.trim()) {
        errors.push(`Image for "${entry.id}" needs confirmed credit and license`)
      }
      if (!availableImages.has(entry.image.src)) {
        errors.push(`Image for "${entry.id}" is missing: ${entry.image.src}`)
      }
      if (
        entry.image.kind === 'documentary-source' &&
        !entry.image.provenance?.trim()
      ) {
        errors.push(`Documentary image for "${entry.id}" needs provenance`)
      }
    }
  }

  for (const entry of entries) {
    for (const relatedId of entry.relatedEntryIds) {
      if (!ids.has(relatedId)) {
        errors.push(`Entry "${entry.id}" links to missing entry "${relatedId}"`)
      }
    }
  }

  return errors
}
