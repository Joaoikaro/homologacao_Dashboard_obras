export const removePropertyEmpty = <T extends object>(obj: T): Partial<T> => {
  const newObj: Partial<T> = { ...obj }

  Object.keys(newObj).forEach((key) => {
    const value = newObj[key as keyof T]

    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.length === 0)
    ) {
      delete newObj[key as keyof T]
    }
  })

  return newObj
}
