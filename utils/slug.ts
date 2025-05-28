/**
 * Utility functions for generating and parsing URL slugs
 */

export function generateSlug(name: string, sport?: string): string {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()

  if (sport) {
    const cleanSport = sport
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    return `${cleanName}-${cleanSport}`
  }

  return cleanName
}

export function parseSlugToId(slug: string, items: any[]): number | null {
  // Try to find item by matching the slug with generated slug
  const item = items.find((item) => {
    const generatedSlug = generateSlug(item.name || item.title, item.sport || item.sports?.[0])
    return generatedSlug === slug
  })

  return item ? item.id : null
}

export function normalizeCity(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export function formatCityForDisplay(city: string): string {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()
}

export function generateCitySlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}
