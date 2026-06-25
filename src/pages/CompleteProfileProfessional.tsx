import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import {
    Phone, CreditCard, Calendar, User, CheckCircle2,
    Briefcase, MapPin, MessageCircle, AlignLeft, Scissors
} from 'lucide-react'
import { BrandInstagram } from '@/components/brand-instagram'
import { cn } from "@/lib/utils"
import { completeProfessionalProfile } from '@/services/auth'
import { fetchSpecialties, type SpecialtyDTO } from '@/services/specialty'

// Utility input masks
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

export default function CompleteProfileProfessional() {
    const navigate = useNavigate()

    // SECURITY GUARDS: Restrict unauthorized roles or already finalized onboardings
    const [isProfileComplete] = useState(() => localStorage.getItem('isProfileComplete') === 'true')
    const [role] = useState(() => localStorage.getItem('role'))

    if (isProfileComplete) {
        return <Navigate to="/inicio" replace />
    }

    if (role !== 'PROFESSIONAL') {
        return <Navigate to="/completar-cadastro" replace />
    }

    // Step Flow Control
    const [step, setStep] = useState(1)

    // Form State - Step 1
    const [phone, setPhone] = useState('')
    const [cpf, setCpf] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState('')

    // Form State - Step 2
    const [description, setDescription] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [instagram, setInstagram] = useState('')
    const [radius, setRadius] = useState<number | ''>('')
    const [specialtiesList, setSpecialtiesList] = useState<SpecialtyDTO[]>([])
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])

    // UI Performance States
    const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [sucesso, setSucesso] = useState(false)

    // LAZY LOADING: Fetch backend specialties only when transitioning to Step 2
    useEffect(() => {
        if (step === 2 && specialtiesList.length === 0) {
            loadSpecialties()
        }
    }, [step])

    async function loadSpecialties() {
        setIsLoadingSpecialties(true)
        try {
            const data = await fetchSpecialties()
            setSpecialtiesList(data)
        } catch (err) {
            setError('Falha ao carregar as especialidades. Tente novamente.')
        } finally {
            setIsLoadingSpecialties(false)
        }
    }

    // Input data sync validator for Step 1
    const handleNextStep = () => {
        setError('')
        const cleanCpf = cpf.replace(/\D/g, '')
        if (cleanCpf.length !== 11) {
            return setError('O CPF deve conter 11 dígitos.')
        }
        if (!phone || !birthDate || !gender) {
            return setError('Preencha todos os campos obrigatórios.')
        }
        setStep(2)
    }

    // Multi-select handler for backend specialty tags
    const handleToggleSpecialty = (id: string) => {
        setSelectedSpecialties(prev => 
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    // Form submit controller matching ProfessionalOnboardingDTO structure
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        if (selectedSpecialties.length === 0) {
            return setError('Selecione pelo menos uma especialidade.')
        }
        if (Number(radius) < 1 || Number(radius) > 150) {
            return setError('O raio de atendimento deve ser entre 1km e 150km.')
        }

        setIsLoading(true)

        const cleanPhone = phone.replace(/\D/g, '')
        const cleanCpf = cpf.replace(/\D/g, '')
        const cleanWhitespaceWhatsapp = whatsapp ? whatsapp.replace(/\D/g, '') : ''
        const cleanInstagram = instagram.replace('@', '')

        try {
            await completeProfessionalProfile(
                cleanPhone,
                cleanCpf,
                birthDate,
                gender,
                description,
                cleanWhitespaceWhatsapp,
                cleanInstagram,
                Number(radius),
                selectedSpecialties
            )

            localStorage.setItem('isProfileComplete', 'true')
            setSucesso(true)

            // Delayed redirection for refined user experience feedback
            setTimeout(() => {
                navigate('/inicio', { replace: true })
            }, 2000)

        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card/40 shadow-2xl p-8 md:p-12 relative">

                {/* Wizard Header Info Banner */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {sucesso ? <CheckCircle2 size={26} /> : <Briefcase size={26} />}
                    </div>
                    <h2 className="text-2xl font-extrabold text-foreground tracking-tight md:text-3xl">
                        {sucesso ? "Tudo pronto!" : "Configure seu Perfil"}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {sucesso
                            ? "Sua conta profissional foi configurada."
                            : `Passo ${step} de 2: ${step === 1 ? 'Dados Pessoais' : 'Atuação Profissional'}`
                        }
                    </p>
                </div>

                {sucesso ? (
                    <div className="flex flex-col items-center justify-center space-y-3 rounded-xl bg-green-500/10 p-6 text-center border border-green-500/20 my-4">
                        <CheckCircle2 size={40} className="text-green-500 animate-in zoom-in duration-300" />
                        <p className="font-semibold text-green-600">Perfil profissional criado com sucesso!</p>
                        <p className="text-sm text-green-600/80">Redirecionando para o seu painel...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                                {error}
                            </div>
                        )}

                        {/* STEP 1: PERSONAL DATA */}
                        {step === 1 && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-foreground">Telefone</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="(00) 00000-0000"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(maskPhone(e.target.value))}
                                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-foreground">CPF</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                            <CreditCard size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="000.000.000-00"
                                            required
                                            value={cpf}
                                            onChange={(e) => setCpf(maskCPF(e.target.value))}
                                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">Data de Nascimento</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                                <Calendar size={18} />
                                            </div>
                                            <input
                                                type="date"
                                                required
                                                value={birthDate}
                                                max={new Date().toISOString().split("T")[0]}
                                                onChange={(e) => setBirthDate(e.target.value)}
                                                className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">Gênero</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                                <User size={18} />
                                            </div>
                                            <select
                                                required
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                className={cn(
                                                    "w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none",
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
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark mt-4"
                                >
                                    Avançar
                                </button>
                            </div>
                        )}

                        {/* STEP 2: PROFESSIONAL CONFIGURATIONS */}
                        {step === 2 && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                                        <Scissors size={16} /> Especialidades <span className="text-red-500">*</span>
                                    </label>

                                    {isLoadingSpecialties ? (
                                        <div className="text-sm text-muted-foreground animate-pulse">
                                            Carregando especialidades...
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {specialtiesList.map((spec) => {
                                                const isSelected = selectedSpecialties.includes(spec.id)
                                                return (
                                                    <button
                                                        type="button"
                                                        key={spec.id}
                                                        onClick={() => handleToggleSpecialty(spec.id)}
                                                        className={cn(
                                                            "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                                            isSelected
                                                                ? "bg-primary text-white border-primary shadow-sm"
                                                                : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                                                        )}
                                                    >
                                                        {spec.name}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">Raio de Atendimento (km) <span className="text-red-500">*</span></label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                                <MapPin size={18} />
                                            </div>
                                            <input
                                                type="number"
                                                min="1"
                                                max="150"
                                                required
                                                placeholder="Ex: 15"
                                                value={radius}
                                                onChange={(e) => setRadius(e.target.value === '' ? '' : Number(e.target.value))}
                                                className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">Máximo de 150km.</p>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-foreground">WhatsApp (Opcional)</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                                <MessageCircle size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="(00) 00000-0000"
                                                value={whatsapp}
                                                onChange={(e) => setWhatsapp(maskPhone(e.target.value))}
                                                className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-foreground">Instagram (Opcional)</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                                            <BrandInstagram size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="@seu.perfil"
                                            value={instagram}
                                            onChange={(e) => setInstagram(e.target.value)}
                                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-foreground">Descrição (Opcional)</label>
                                    <div className="relative group">
                                        <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground">
                                            <AlignLeft size={18} />
                                        </div>
                                        <textarea
                                            rows={3}
                                            placeholder="Conte um pouco sobre seu trabalho e experiência..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full bg-background border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-1/3 rounded-xl bg-muted px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted/80"
                                    >
                                        Voltar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={cn(
                                            "w-2/3 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed",
                                            isLoading && "animate-pulse"
                                        )}
                                    >
                                        {isLoading ? "Salvando..." : "Concluir Perfil"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </div>
        </main>
    )
}