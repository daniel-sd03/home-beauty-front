export const ErrorDictionary: Record<string, string> = {
    // === Authentication and Account ===
    'INVALID_CREDENTIALS': 'E-mail ou senha incorretos.',
    'USER_ALREADY_EXISTS': 'Este e-mail já está cadastrado no sistema.',
    'USER_NOT_FOUND': 'Usuário não encontrado no sistema.',
    'ACCOUNT_ALREADY_ACTIVE': 'Esta conta já foi ativada anteriormente.',   
    'INVALID_VERIFICATION_CODE': 'Código de verificação inválido. Verifique os números digitados.',
    'EXPIRED_VERIFICATION_CODE': 'O código de verificação expirou. Por favor, solicite um novo código.',
    'ACCOUNT_DISABLED': 'Sua conta ainda não foi verificada. Redirecionando...',

    // === Profile and Professional ===
    'PROFILE_ALREADY_EXISTS': 'Você já possui um perfil de profissional cadastrado.',
    'INVALID_SPECIALTY_IDS': 'Uma ou mais especialidades selecionadas são inválidas.',
    'PROFESSIONAL_PROFILE_NOT_FOUND': 'Perfil de profissional não encontrado.',

    // === Data Validation (Inputs and Forms) ===
    'INVALID_CPF': 'O CPF informado é inválido. Verifique os números e tente novamente.',
    'INVALID_EMAIL': 'O e-mail informado possui um formato inválido.',
}