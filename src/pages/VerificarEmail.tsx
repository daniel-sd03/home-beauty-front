import { useState } from 'react'
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom'
import { CheckCircle2, MailOpen, ArrowLeft } from 'lucide-react'
import { cn } from "@/lib/utils"
import { verifyAccountEmail, resendCodeEmail } from '../services/auth' 

export default function VerificarEmail() {
    // Router hooks for navigation and accessing the secure state (memory)
    const navigate = useNavigate()
    const location = useLocation()
    
    // Retrieve the email passed securely from the Register/Login screen
    const email = location.state?.email

    // Security Check: If there's no email in memory (e.g., user typed the URL directly), redirect to login
    if (!email) {
        return <Navigate to="/login" replace />
    }

    // UI and Form state management
    const [codigo, setCodigo] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false) 
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState(false)
    const [msgReenvio, setMsgReenvio] = useState('') 

    // Handles the submission of the verification code
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevents page reload
        setError('')       // Clears previous errors
        setMsgReenvio('')  // Clears previous resend messages

        // Front-end validation: Code must be exactly 6 characters
        if (codigo.length !== 6) {
            return setError('O código deve ter exatamente 6 caracteres.')
        }

        setIsLoading(true)

        try {
            // Call API service to verify the code
            await verifyAccountEmail(email, codigo)
            
            // On success, trigger the success UI state
            setSucesso(true)
            
            // Wait 2 seconds for the user to read the success message, then redirect to login
            setTimeout(() => {
                navigate('/login')
            }, 2000)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    // Handles the request to send a new verification code to the user's email
    const handleReenviar = async () => {
        setError('')
        setMsgReenvio('')
        setIsResending(true)

        try {
            // Call API service to resend the code
            await resendCodeEmail(email)
            setMsgReenvio('Um novo código foi enviado para a sua caixa de entrada!')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsResending(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
            {/* Main Layout Wrapper (2-column grid on desktop) */}
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/40 shadow-2xl md:grid-cols-2">
                
                {/* Left Side: Decorative image and branding (Hidden on mobile screens) */}
                <div className="relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=800&auto=format&fit=crop"
                        alt="Background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Color overlay over the image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-card/40" />
                    
                    {/* Text content over the image */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-2 text-2xl font-bold tracking-tight" />
                        <div className="space-y-4">
                            <p className="text-sm font-medium uppercase tracking-widest text-secondary-foreground/80">Quase lá</p>
                            <h1 className="text-4xl font-extrabold tracking-tight">Segurança em primeiro lugar.</h1>
                            <p className="max-w-md text-lg text-white/80">Protegemos sua conta confirmando sua identidade. Verifique sua caixa de entrada para liberar seu acesso.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Verification Form Container */}
                <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-card/40 relative">
                    
                    {/* Back to Login Link */}
                    <Link to="/login" className="absolute top-6 left-6 md:top-8 md:left-12 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={16} /> Voltar ao login
                    </Link>

                    {/* Form Header (Icon, Title, and dynamic Email display) */}
                    <div className="mb-6 flex flex-col items-center text-center mt-4">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <MailOpen size={26} />
                        </div>
                        <h2 className="text-2xl font-extrabold text-foreground tracking-tight md:text-3xl">Confirme seu e-mail</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enviamos um código de confirmação para:<br />
                            <span className="font-semibold text-foreground break-all">{email}</span>
                        </p>
                    </div>

                    {/* Conditional Rendering: Show Success Message OR the Input Form */}
                    {sucesso ? (
                        // Success View
                        <div className="flex flex-col items-center justify-center space-y-3 rounded-xl bg-green-500/10 p-6 text-center border border-green-500/20 my-4">
                            <CheckCircle2 size={40} className="text-green-500" />
                            <p className="font-semibold text-green-600">E-mail verificado com sucesso!</p>
                            <p className="text-sm text-green-600/80">Redirecionando para a tela de login...</p>
                        </div>
                    ) : (
                        // Form View
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Display general errors or resend success messages */}
                            {error && <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">{error}</div>}
                            {msgReenvio && <div className="p-3 text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-xl text-center">{msgReenvio}</div>}

                            {/* Code Input Field */}
                            <div className="space-y-2 text-center">
                                <label className="text-sm font-medium text-foreground">Código de verificação</label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value.toUpperCase())} // Forces uppercase characters
                                    placeholder="000000"
                                    className="w-full bg-background border border-border rounded-xl py-3.5 text-center text-2xl font-bold tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all uppercase placeholder:font-normal placeholder:tracking-normal"
                                    required
                                    autoFocus // Automatically focuses the input when the page loads
                                />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" disabled={isLoading} className={cn("w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed", isLoading && "animate-pulse")}>
                                {isLoading ? "Validando..." : "Confirmar Código"}
                            </button>
                        </form>
                    )}
                    
                    {/* Resend Code Section (Only visible if the account is not verified yet) */}
                    {!sucesso && (
                        <div className="mt-8 text-center text-sm text-muted-foreground">
                            Não recebeu o código?{' '}
                            <button 
                                type="button" 
                                onClick={handleReenviar} 
                                disabled={isResending}
                                className="font-semibold text-primary hover:text-primary-dark transition-colors disabled:opacity-50"
                            >
                                {isResending ? "Reenviando..." : "Reenviar e-mail"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}