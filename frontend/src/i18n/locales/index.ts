export const languages: {
    code: string
    name: string
}[] = [
    { code: 'en', name: 'English' },
    { code: 'it', name: 'Italiano' }
]

export function getCurrentLocale(): string {
  if (typeof document === 'undefined') return 'en'
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : 'en'
}