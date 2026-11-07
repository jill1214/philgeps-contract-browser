/** Province-wide geographic scope. IDs are intentionally unverified until matched to source registries. */
export const SORSOGON_SCOPE = {
  province: 'Sorsogon',
  region: 'Region V - Bicol',
  level: 'province',
  independentCivicInitiative: true,
  officeIds: [] as string[],
  officeIdsVerified: false,
  projectCountVerified: false,
} as const

export interface SorsogonLocation {
  region?: string | null
  province?: string | null
  municipality?: string | null
  barangay?: string | null
}

export function isSorsogonProject(location: SorsogonLocation | null | undefined): boolean {
  return location?.province?.trim().toLocaleLowerCase() === 'sorsogon'
}

export function filterSorsogonProjects<T extends { location?: SorsogonLocation | null }>(
  projects: readonly T[],
  filters: { municipality?: string; barangay?: string } = {},
): T[] {
  const normalize = (value: string | null | undefined) => value?.trim().toLocaleLowerCase() ?? ''
  return projects.filter(project => {
    if (!isSorsogonProject(project.location)) return false
    if (filters.municipality && normalize(project.location?.municipality) !== normalize(filters.municipality)) return false
    if (filters.barangay && normalize(project.location?.barangay) !== normalize(filters.barangay)) return false
    return true
  })
}
