export const URLBASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const ENDPOINT = {
  login: `${URLBASE}/login`,
  users: `${URLBASE}/usuarios`,
  register: `${URLBASE}/registrarse`
}
