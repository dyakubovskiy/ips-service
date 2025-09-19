export const registration = async (payload: {
  email: string
  password: string
  name: string | null
  address: string | null
}): Promise<void> => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  const data = await response.json()

  console.log(data)
}
