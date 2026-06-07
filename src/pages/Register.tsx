import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Scissors } from 'lucide-react'
import { cn } from "@/lib/utils"
import { registerUser } from "@/services/auth"
import { Link, useNavigate, useLocation } from 'react-router-dom' 

// Define the properties accepted by the InputField component
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ReactNode
    label: string
}

// Reusable input component with a built-in password visibility toggle
function InputField({ icon, label, className, type = "text", ...props }: InputFieldProps) {
    // State to handle password visibility
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"
    // Dynamically change input type based on the toggle state
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">{label}</label>
            <div className="relative group">
                {/* Input Icon */}
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                    {icon}
                </div>
                
                {/* Actual Input Field */}
                <input
                    type={inputType}
                    className={cn(
                        "w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                        className
                    )}
                    {...props}
                />
                
                {/* Toggle Password Button (Only renders if type is password) */}
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

export default function Register() {
    // Router hooks for navigation and reading memory state
    const navigate = useNavigate()
    const location = useLocation()
    
    // Check if a role was passed from the Login screen, otherwise default to 'USER'
    const initialRole = location.state?.role || 'USER'

    // Form state management 
    const [role, setRole] = useState<'USER' | 'PROFESSIONAL'>(initialRole)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    // UI state management (loading indicator and error messages)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Handles the form submission
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevents page reload
        setError('')       // Clears any previous errors

        // Front-end validation: check if passwords match
        if (password !== confirmPassword) {
            return setError('As senhas não coincidem. Verifique e tente novamente.')
        }

        setIsLoading(true) // Start loading animation

        try {
            // Call the API service to register the user
            await registerUser(firstName, lastName, email, password, role)

            // On success, redirect to verification screen passing the email securely in state
            navigate('/verificar-email', { state: { email: email } })

        } catch (err: any) {
            console.error(err)
            // Display API error message to the user
            setError(err.message || 'Ocorreu um erro ao criar a conta.')
        } finally {
            setIsLoading(false) // Stop loading animation regardless of success/error
        }
    }

    // Dynamic UI variables: changes text and images based on the selected role
    const isProfessional = role === 'PROFESSIONAL'
    const sideTitle = isProfessional ? "Eleve sua carreira" : "Junte-se a nós"
    const sideHeadline = isProfessional 
        ? "Gerencie sua agenda e conquiste mais clientes." 
        : "Comece sua jornada de beleza e bem-estar hoje."
    const sideText = isProfessional
        ? "Crie sua conta profissional para oferecer seus serviços, organizar seus horários e aumentar sua renda."
        : "Crie sua conta gratuita em poucos segundos e tenha acesso aos melhores profissionais da região."

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
            {/* Main Layout Wrapper (2-column grid on desktop) */}
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/40 shadow-2xl md:grid-cols-2">

                {/* Left Side: Dynamic Branding & Imagery (Hidden on mobile) */}
                <div className="relative hidden md:block">
                    <img
                        src={isProfessional 
                            ? "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" 
                            : "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop"
                        }
                        alt="Background"
                        className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                    />
                    {/* Color overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-card/40" />

                    {/* Text content over the image */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight" />
                        <div className="space-y-4">
                            <p className="text-sm font-medium uppercase tracking-widest text-secondary-foreground/80">
                                {sideTitle}
                            </p>
                            <h1 className="text-4xl font-extrabold tracking-tight transition-all">
                                {sideHeadline}
                            </h1>
                            <p className="max-w-md text-lg text-white/80 transition-all">
                                {sideText}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Registration Form Container */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-card/40">

                    {/* Mobile Header (Only visible on small screens) */}
                    <div className="flex flex-col items-center mb-6 md:hidden">
                        <h2 className="text-2xl font-bold text-foreground">Crie sua conta</h2>
                    </div>

                    {/* Desktop Header (Hidden on mobile) */}
                    <div className="hidden md:block mb-6 space-y-1.5">
                        <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Criar nova conta</h2>
                        <p className="text-muted-foreground">Preencha os dados abaixo para se cadastrar.</p>
                    </div>

                    {/* Role Selector Tabs (Client vs Professional) */}
                    <div className="flex p-1 mb-8 rounded-xl bg-background border border-border">
                        <button
                            type="button"
                            onClick={() => setRole('USER')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
                                !isProfessional 
                                    ? "bg-primary text-white shadow-sm" 
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <User size={16} />
                            Sou Cliente
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('PROFESSIONAL')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all",
                                isProfessional 
                                    ? "bg-primary text-white shadow-sm" 
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <Scissors size={16} />
                            Sou Profissional
                        </button>
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Error Message Display */}
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* First and Last Name Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Nome"
                                type="text"
                                placeholder="Seu nome"
                                icon={<User size={18} />}
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <InputField
                                label="Sobrenome"
                                type="text"
                                placeholder="Seu sobrenome"
                                icon={<User size={18} />}
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <InputField
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            icon={<Mail size={18} />}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* Password Inputs */}
                        <InputField
                            label="Senha"
                            type="password"
                            placeholder="Crie uma senha forte"
                            icon={<Lock size={18} />}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={6}
                        />
                        <InputField
                            label="Confirmar Senha"
                            type="password"
                            placeholder="Repita sua senha"
                            icon={<Lock size={18} />}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={6}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                "w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-primary-darker disabled:opacity-70 disabled:cursor-not-allowed mt-2",
                                isLoading && "animate-pulse" // Adds pulsing effect while loading
                            )}
                        >
                            <UserPlus size={20} className={isLoading ? "hidden" : ""} />
                            {isLoading 
                                ? "Criando conta..." 
                                : isProfessional ? "Cadastrar como Profissional" : "Cadastrar como Cliente"
                            }
                        </button>
                    </form>

                    {/* Navigation Link back to Login */}
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Já tem uma conta?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                            Faça login aqui
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    )
}