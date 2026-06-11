import { useCallback, useState } from 'react'

/**
 * Estado sincronizado com o localStorage do navegador.
 * Mantém o valor persistido entre acessos do usuário.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next =
          value instanceof Function ? (value as (p: T) => T)(prev) : value
        try {
          window.localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // ignora quota/privacidade
        }
        return next
      })
    },
    [key],
  )

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // noop
    }
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, remove] as const
}
