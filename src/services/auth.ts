interface LoginResponse {
    token: string;
  }
  
  export async function loginUser(login: string, password: string): Promise<string> {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    })
  
    if (!response.ok) {
      throw new Error('E-mail ou senha inválidos. Tente novamente.')
    }
  
    const data: LoginResponse = await response.json()
    
    return data.token
  }