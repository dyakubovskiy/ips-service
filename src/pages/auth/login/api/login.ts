interface LoginData {
  user: {
    id: string
    email: string
    password_hash: string
    name: string | null
    address: string | null
    role: string
    created_at: string
  }
  token: string
}

export const login = async (payload: {
  email: string
  password: string
}): Promise<LoginData | null> => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  return response.status === 200 ? data : null
}
