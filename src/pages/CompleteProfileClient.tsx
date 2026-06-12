import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Phone, CreditCard, Calendar, User, CheckCircle2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { completeClientProfile } from '../services/auth' 

// Utility functions to format inputs visually
const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
}

export default function CompleteProfileClient() {
    const navigate = useNavigate()

    // Retrieve user status and role from local storage
    const [isProfileComplete] = useState(() => localStorage.getItem('isProfileComplete') === 'true')
    const [role] = useState(() => localStorage.getItem('role'))

    // SECURITY GUARD 1: Redirects to home if the user has already completed their profile
    if (isProfileComplete) {
        return <Navigate to="/inicio" replace />
    }

    // SECURITY GUARD 2: Redirects professionals to their specific onboarding flow
    if (role === 'PROFESSIONAL') {
        return <Navigate to="/completar-cadastro-profissional" replace /> 
    }

    // Form state
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')
    
    // UI feedback state
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState(false) 

    // Handles the form submission and payload formatting
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        // Strip non-numeric characters before sending to the backend
        const cleanPhone = phone.replace(/\D/g, '')
        const cleanCpf = cpf.replace(/\D/g, '')

        // Basic front-end validation
        if (cleanCpf.length !== 11) {
            return setError('O CPF deve conter 11 dígitos.')
        }

        setIsLoading(true)

        try {
            // Send payload matching the backend DTO exactly
            await completeClientProfile(cleanPhone, cleanCpf, birthDate, gender)
            
            // Update local storage to trigger the security guard on future visits
            localStorage.setItem('isProfileComplete', 'true')
            
            // Trigger success UI state
            setSucesso(true)
            
            // Wait 2 seconds for the user to read the message, then redirect replacing history
            setTimeout(() => {
                navigate('/inicio', { replace: true })
            }, 2000)
            
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Ocorreu um erro ao salvar seus dados.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
            <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-card/40 shadow-2xl p-8 md:p-12 relative">
                
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 size={26} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-foreground tracking-tight md:text-3xl">Último passo!</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Precisamos de mais alguns detalhes para personalizar sua experiência e garantir a segurança da sua conta.
                    </p>
                </div>

                {/* Conditional Rendering: Success Screen vs Input Form */}
                {sucesso ? (
                    // Success State UI
                    <div className="flex flex-col items-center justify-center space-y-3 rounded-xl bg-green-500/10 p-6 text-center border border-green-500/20 my-4">
                        <CheckCircle2 size={40} className="text-green-500 animate-in zoom-in duration-300" />
                        <p className="font-semibold text-green-600">Cadastro finalizado com sucesso!</p>
                        <p className="text-sm text-green-600/80">Redirecionando para o painel principal...</p>
                    </div>
                ) : (
                    // Form UI
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Telefone / WhatsApp</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <Phone size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="(00) 00000-0000"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                                    className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">CPF</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                    <CreditCard size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="000.000.000-00"
                                    required
                                    value={cpf}
                                    onChange={(e) => setCpf(maskCPF(e.target.value))}
                                    className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Data de Nascimento</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Calendar size={18} />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        value={birthDate}
                                        max={new Date().toISOString().split("T")[0]} 
                                        onChange={(e) => setBirthDate(e.target.value)}
                                        className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Gênero</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <User size={18} />
                                    </div>
                                    <select
                                        required
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className={cn(
                                            "w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none",
                                            !gender && "text-muted-foreground" 
                                        )}
                                    >
                                        <option value="" disabled hidden>Selecione</option>
                                        <option value="MALE" className="text-foreground">Masculino</option>
                                        <option value="FEMALE" className="text-foreground">Feminino</option>
                                        <option value="OTHER" className="text-foreground">Outro</option>
                                        <option value="PREFER_NOT_TO_SAY" className="text-foreground">Prefiro não dizer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-primary-darker disabled:opacity-70 disabled:cursor-not-allowed mt-4",
                                isLoading && "animate-pulse"
                            )}
                        >
                            {isLoading ? "Salvando dados..." : "Concluir Cadastro"}
                        </button>
                    </form>
                )}

            </div>
        </main>
    )
}