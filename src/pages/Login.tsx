import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
import { cn } from "@/lib/utils"
import { loginUser } from '@/services/auth'
import { Link, useNavigate } from 'react-router-dom'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ReactNode
    label: string
}

// Reusable input component with embedded icon and password toggle
function InputField({ icon, label, className, type = "text", ...props }: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    {icon}
                </div>
                <input
                    type={inputType}
                    className={cn(
                        "w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        className
                    )}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    )
}

 // Preserved for future Social Login implementation
// function SocialButton({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
//     return (
//         <button
//             type="button"
//             className="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card/60 hover:border-border-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
//         >
//             {icon}
//             <span>{children}</span>
//         </button>
//     )
// }


export default function Login() {
    const navigate = useNavigate()

    // Form state management
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Handles authentication flow and token storage
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await loginUser(email, password)
            
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            localStorage.setItem('isProfileComplete', String(response.isProfileComplete))
            
            navigate('/inicio') 
            
        } catch (err: any) {
            console.error(err)

            if (err.code === 'UNVERIFIED_EMAIL') {
                return navigate('/verificar-email', { state: { email: email } })
            }

            setError(err.response?.data?.message || err.message || 'Credenciais inválidas.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">

            {/* Main Wrapper: Split Layout */}
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/40 shadow-2xl md:grid-cols-2">

                {/* Left Side: Branding & Imagery (Hidden on mobile) */}
                <div className="relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop"
                        alt="Interior de um salão de beleza moderno e elegante"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Brand color overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-card/40" />

                    <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight" />

                        <div className="space-y-4">
                            <p className="text-sm font-medium uppercase tracking-widest text-secondary-foreground/80">
                                Seu momento de brilhar
                            </p>
                            <h1 className="text-4xl font-extrabold tracking-tight">
                                Descubra e agende os melhores profissionais de beleza.
                            </h1>
                            <p className="max-w-md text-lg text-white/80">
                                Acesse sua conta para gerenciar seus agendamentos, histórico de serviços e pagamentos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Authentication Form */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-card/40">

                    {/* Mobile Header (Hidden on desktop) */}
                    <div className="flex flex-col items-center mb-10 md:hidden">
                        <h2 className="text-2xl font-bold text-foreground">Acesse sua conta</h2>
                    </div>

                    {/* Desktop Header */}
                    <div className="hidden md:block mb-10 space-y-1.5">
                        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Bem-vindo de volta</h2>
                        <p className="text-muted-foreground">Por favor, insira suas credenciais para acessar.</p>
                    </div>

                    {/* Preserved for future Social Login implementation */}
                    {/* <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <SocialButton icon={<img src="https://authjs.dev/img/providers/google.svg" className="h-5 w-5" alt="Google logo" />}>
                            Entrar com Google
                        </SocialButton>
                        <SocialButton icon={<img src="https://authjs.dev/img/providers/apple.svg" className="h-5 w-5" alt="Apple logo" />}>
                            Entrar com Apple
                        </SocialButton>
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-card/40 px-3 text-sm text-muted-foreground font-medium">ou use seu e-mail</span>
                        </div>
                    </div> 
                    */}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Error Feedback Banner */}
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl">
                                {error}
                            </div>
                        )}

                        <InputField
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={<Mail size={18} />}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className="space-y-1.5">
                            <InputField
                                label="Senha"
                                type="password"
                                placeholder="••••••••"
                                icon={<Lock size={18} />}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-primary-darker disabled:opacity-70 disabled:cursor-not-allowed",
                                isLoading && "animate-pulse"
                            )}
                        >
                            <LogIn size={20} className={isLoading ? "hidden" : ""} />
                            {isLoading ? "Entrando..." : "Entrar na Conta"}
                        </button>
                    </form>

                    {/* Standard Client Registration */}
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Ainda não tem uma conta?{' '}
                        <Link to="/registrar" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                            Cadastre-se grátis
                        </Link>
                    </div>

                    {/* Section Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-border" />
                        </div>
                    </div>

                    {/* Professional Registration Call-to-Action */}
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-primary/5 border border-primary/10 p-5 text-center transition-colors hover:bg-primary/10 hover:border-primary/20">
                        <span className="text-sm font-semibold text-foreground mb-1">
                            É um profissional da beleza?
                        </span>
                        <span className="text-xs text-muted-foreground mb-3">
                            Ofereça seus serviços e gerencie sua agenda em um só lugar.
                        </span>
                        <Link 
                            to="/registrar" 
                            state={{ role: 'PROFESSIONAL' }} 
                            className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
                        >
                            Venha trabalhar conosco <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    )
}