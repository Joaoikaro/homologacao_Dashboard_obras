export function alphabeticalSort(array: { value: string; nome: string }[]) {
  const numberToLetter = (num: string) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']


return num
      .split('')
      .map((char) => {
        const digit = parseInt(char, 10)


return isNaN(digit) ? char : letters[digit]
      })
      .join('')
  }

  return [...array].sort((a, b) => {
    const nameComparison = a.nome
      .toUpperCase()
      .localeCompare(b.nome.toUpperCase())

    if (nameComparison !== 0) {
      return nameComparison
    }

    const valueA = a.value.trim()
    const valueB = b.value.trim()

    const numA = Number(valueA)
    const numB = Number(valueB)

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB
    }

    if (!isNaN(numA)) return -1
    if (!isNaN(numB)) return 1

    return numberToLetter(valueA).localeCompare(numberToLetter(valueB))
  })
}
