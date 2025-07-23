// utils/formatarData.ts
export default function formatarData(data: string | Date) {
  const d = new Date(data)

  
return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC' // importante pra SSR
  }).format(d)
}
