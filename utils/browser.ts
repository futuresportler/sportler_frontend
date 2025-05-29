export const isBrowser = () => typeof window !== "undefined"

export const isServer = () => typeof window === "undefined"

export const getLocalStorage = (key: string): string | null => {
  if (!isBrowser()) return null
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return null
  }
}

export const setLocalStorage = (key: string, value: string): boolean => {
  if (!isBrowser()) return false
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error("Error setting localStorage:", error)
    return false
  }
}

export const removeLocalStorage = (key: string): boolean => {
  if (!isBrowser()) return false
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing from localStorage:", error)
    return false
  }
}
