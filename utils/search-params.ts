/**
 * Utility function to extract and format search parameters
 */
export function extractSearchParams(searchParams: URLSearchParams, city?: string) {
  const sport = searchParams.get("sport") || ""
  const location = searchParams.get("location") || ""
  const type = searchParams.get("type") || "coach"

  return {
    sport,
    location,
    type,
    city: city || "",
  }
}

/**
 * Utility function to apply filters based on search parameters
 * This is a generic function that can be used for coaches, academies, and courts
 */
export function applySearchFilters(items: any[], filters: { sport?: string; location?: string }) {
  let filteredItems = [...items]

  if (filters.sport) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.sport?.toLowerCase().includes(filters.sport.toLowerCase()) ||
        (Array.isArray(item.sports) &&
          item.sports.some((s: string) => s.toLowerCase().includes(filters.sport.toLowerCase()))),
    )
  }

  if (filters.location) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.location?.toLowerCase().includes(filters.location.toLowerCase()) ||
        item.city?.toLowerCase().includes(filters.location.toLowerCase()),
    )
  }

  return filteredItems
}
