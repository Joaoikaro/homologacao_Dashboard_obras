export function mapFiltersToApi(filters: Record<string, any>, mapper: Record<string, string>) {
  const apiFilters: Record<string, any> = {}

  Object.entries(filters).forEach(([key, value]) => {
    const apiKey = mapper[key] || key

    apiFilters[apiKey] = value
  })

  return apiFilters
}
