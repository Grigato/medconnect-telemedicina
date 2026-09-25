import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion'
import { supabase } from './lib/supabaseClient'
import {
  ArrowRight,
  Baby,
  Bell,
  Bone,
  Brain,
  Calendar,
  Check,
  ChevronDown,
  CircleHelp,
  CircleCheck,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Heart,
  History,
  Link2,
  LogOut,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Star,
  Stethoscope,
  Upload,
  UserRound,
  Users,
  Video,
  Wifi,
  X,
} from 'lucide-react'

const navItems = [
  { id: 'inicio', label: 'Início', icon: Stethoscope },
  { id: 'agendar', label: 'Agendar', icon: Calendar },
  { id: 'fila', label: 'Sala de espera', icon: Clock },
  { id: 'atendimento', label: 'Atendimento', icon: Video },
  { id: 'registros', label: 'Meus registros', icon: FileText },
]

const specialties = [
  { name: 'Clínica geral', description: 'Para sintomas e cuidados do dia a dia.', icon: Stethoscope, accent: 'bg-[#e1f6f2] text-[#078c91]' },
  { name: 'Cardiologia', description: 'Acompanhe a saúde do seu coração.', icon: Heart, accent: 'bg-[#fff0eb] text-[#d76c55]' },
  { name: 'Neurologia', description: 'Cuidados para mente e sistema nervoso.', icon: Brain, accent: 'bg-[#f0edff] text-[#7460c6]' },
  { name: 'Pediatria', description: 'Atenção especial para quem está crescendo.', icon: Baby, accent: 'bg-[#fff5d9] text-[#b4861a]' },
  { name: 'Ortopedia', description: 'Movimento, ossos e qualidade de vida.', icon: Bone, accent: 'bg-[#eaf4ff] text-[#3578a8]' },
  { name: 'Exames', description: 'Orientação clara para seus resultados.', icon: Microscope, accent: 'bg-[#f4ecfa] text-[#915ab1]' },
]

const doctors = [
  { id: 'helena-freire', name: 'Dra. Helena Freire', specialty: 'Clínica geral', crm: 'CRM 48.291', rating: '4,9', availability: 'Hoje às 14:30', experience: '12 anos de experiência', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=320&q=85' },
  { id: 'renata-nogueira', name: 'Dra. Renata Nogueira', specialty: 'Clínica geral', crm: 'CRM 52.184', rating: '4,8', availability: 'Hoje às 16:00', experience: '9 anos de experiência', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=320&q=85' },
  { id: 'lucas-menezes', name: 'Dr. Lucas Menezes', specialty: 'Cardiologia', crm: 'CRM 41.763', rating: '4,9', availability: 'Amanhã às 10:00', experience: '14 anos de experiência', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=320&q=85' },
  { id: 'marina-rocha', name: 'Dra. Marina Rocha', specialty: 'Cardiologia', crm: 'CRM 39.825', rating: '4,8', availability: 'Amanhã às 11:30', experience: '10 anos de experiência', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=320&q=85' },
  { id: 'caio-moura', name: 'Dr. Caio Moura', specialty: 'Neurologia', crm: 'CRM 45.902', rating: '4,9', availability: 'Hoje às 18:15', experience: '11 anos de experiência', image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=320&q=85' },
  { id: 'lara-martins', name: 'Dra. Lara Martins', specialty: 'Neurologia', crm: 'CRM 56.170', rating: '4,8', availability: 'Amanhã às 14:30', experience: '8 anos de experiência', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=320&q=85' },
  { id: 'beatriz-souza', name: 'Dra. Beatriz Souza', specialty: 'Pediatria', crm: 'CRM 50.636', rating: '5,0', availability: 'Hoje às 15:00', experience: '10 anos de experiência', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=320&q=85' },
  { id: 'rafael-leite', name: 'Dr. Rafael Leite', specialty: 'Ortopedia', crm: 'CRM 44.517', rating: '4,8', availability: 'Amanhã às 09:30', experience: '13 anos de experiência', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=320&q=85' },
  { id: 'paula-costa', name: 'Dra. Paula Costa', specialty: 'Exames', crm: 'CRM 47.358', rating: '4,9', availability: 'Hoje às 17:00', experience: '9 anos de experiência', image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=320&q=85' },
]

const defaultProfile = {
  name: 'Sua conta',
  email: '',
  phone: '',
  birthDate: '',
  city: '',
}

const historyItems = [
  { date: '02 ago 2026', title: 'Consulta de rotina', doctor: 'Clínica geral', specialty: 'Clínica geral' },
  { date: '14 jul 2026', title: 'Avaliação preventiva', doctor: 'Cardiologia', specialty: 'Cardiologia' },
  { date: '21 jun 2026', title: 'Orientação de exames', doctor: 'Clínica geral', specialty: 'Clínica geral' },
]

const tips = [
  'Mantenha um documento com foto por perto para uma identificação rápida.',
  'Prefira um ambiente silencioso e com boa iluminação para a consulta.',
  'Anote sintomas e dúvidas: isso ajuda a aproveitar melhor seu tempo com o médico.',
]

const cardHover = {
  y: -6,
  boxShadow: '0 22px 44px rgba(16, 49, 60, 0.14)',
}

function Button({ children, className = '', icon: Icon, type = 'button', variant = 'primary', ...props }) {
  const styles = {
    primary: 'bg-teal text-white hover:bg-[#0a9793] focus-visible:outline-teal',
    light: 'bg-white text-ocean hover:bg-[#f5fbfa] focus-visible:outline-white',
    outline: 'border border-white/35 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
    soft: 'bg-mint text-ocean hover:bg-[#cfeee9] focus-visible:outline-teal',
    ghost: 'border border-line bg-white text-ink hover:border-[#bcd6d1] hover:bg-fog focus-visible:outline-teal',
  }

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      className={`inline-flex min-h-12 max-w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
    </motion.button>
  )
}

function Surface({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? cardHover : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-ink">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-teal text-white shadow-[0_8px_18px_rgba(15,168,164,0.22)]">
        <Stethoscope className="h-5 w-5" strokeWidth={2.3} aria-hidden="true" />
      </div>
      <span className="font-display text-[1.42rem] leading-none tracking-[-0.04em]">MedConnect</span>
    </div>
  )
}

function StatusPill({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white ${className}`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#70f1db] opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#70f1db]" />
      </span>
      Projeto acadêmico em desenvolvimento
    </div>
  )
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal">{eyebrow}</p>
        <h1 className="font-display text-[2.45rem] leading-[1.04] tracking-[-0.035em] text-ink sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-xl text-[0.98rem] leading-7 text-[#59717a]">{description}</p>
      </div>
      {action}
    </div>
  )
}

function HomePage({ goTo }) {
  const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.56, ease: 'easeOut' } },
  }

  return (
    <main>
      <section className="px-4 pb-6 pt-4 sm:px-6 sm:pb-7 sm:pt-5 lg:px-8 lg:pt-7">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.6rem] bg-[linear-gradient(118deg,#083d50_0%,#0b6977_48%,#10b8a7_100%)] px-5 py-9 shadow-soft sm:rounded-[2rem] sm:px-10 sm:py-14 lg:min-h-[525px] lg:px-16 lg:py-16"
        >
          <div className="absolute -right-28 -top-24 h-96 w-96 rounded-full bg-[#5be3cf]/20 blur-3xl" />
          <div className="absolute bottom-0 left-[42%] h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-[50%] h-64 w-64 rounded-full border border-white/10" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div className="max-w-xl">
              <motion.div variants={heroItem}>
                <StatusPill />
              </motion.div>
              <motion.h1 variants={heroItem} className="mt-7 font-display text-[2.8rem] leading-[0.98] tracking-[-0.045em] text-white min-[400px]:text-[3.2rem] sm:text-6xl lg:text-[4.55rem]">
                Agendamento e atendimento <span className="italic text-[#a6f0df]">em um só lugar.</span>
              </motion.h1>
              <motion.p variants={heroItem} className="mt-6 max-w-md text-[1.04rem] leading-7 text-white/78">
                A MedConnect organiza consultas online, fila virtual e o acesso à sala de atendimento.
              </motion.p>
              <motion.div variants={heroItem} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="light" icon={Video} className="w-full sm:w-auto" onClick={() => goTo('fila')}>Consultar agora</Button>
                <Button variant="outline" icon={ArrowRight} className="w-full sm:w-auto" onClick={() => goTo('agendar')}>Agendar consulta</Button>
              </motion.div>
              <motion.div variants={heroItem} className="mt-9 flex items-center gap-3 text-sm text-white/72">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&q=80',
                    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=80&q=80',
                    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=80&q=80',
                  ].map((src, index) => (
                    <img key={src} src={src} alt={`Profissional MedConnect ${index + 1}`} className="h-8 w-8 rounded-full border-2 border-[#0b6977] object-cover" />
                  ))}
                </div>
                <span>Jornada integrada de atendimento.</span>
              </motion.div>
            </div>

            <motion.div variants={heroItem} className="relative mx-auto w-full max-w-[480px] lg:mr-0">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#0d6975] p-3 shadow-[0_24px_50px_rgba(0,32,44,.27)]">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85"
                  alt="Médica em consulta por telemedicina"
                  className="h-[318px] w-full rounded-[1.2rem] object-cover object-[center_18%] sm:h-[370px]"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-[1.2rem] bg-[#0d4352]/92 p-4 text-white backdrop-blur-md">
                  <div className="flex flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Video className="h-5 w-5" aria-hidden="true" /></div>
                      <div>
                        <p className="text-sm font-semibold">Agendamento online</p>
                        <p className="mt-0.5 text-xs text-white/66">Clínica geral</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#49d7c3]/20 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-[#a6f0df]">Online</span>
                  </div>
                </div>
              </motion.div>
              <motion.div whileHover={cardHover} transition={{ duration: 0.25 }} className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/60 bg-white/95 p-4 shadow-card backdrop-blur sm:block lg:-left-12">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-teal"><ShieldCheck className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  <div><p className="text-xs font-bold text-ink">Acesso organizado</p><p className="mt-0.5 text-[0.68rem] text-[#66808a]">Fluxo integrado</p></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden border-y border-line bg-line sm:grid-cols-4 sm:rounded-2xl sm:border">
        {[
          { icon: Users, number: '6', label: 'especialidades' },
          { icon: Calendar, number: '3', label: 'etapas para agendar' },
          { icon: MessageCircle, number: 'Chat', label: 'convite para chamada' },
          { icon: UserRound, number: 'Perfil', label: 'edição de dados' },
        ].map(({ icon: Icon, number, label }) => (
          <div key={label} className="bg-white px-4 py-5 text-center sm:py-6">
            <Icon className="mx-auto h-4 w-4 text-teal" aria-hidden="true" />
            <p className="mt-2 font-display text-2xl tracking-[-0.03em] text-ocean">{number}</p>
            <p className="mt-0.5 text-xs text-[#64808a]">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Comece por aqui</p>
            <h2 className="mt-2 font-display text-3xl tracking-[-0.035em] text-ink sm:text-4xl">O que você precisa hoje?</h2>
            <p className="mt-3 text-[0.96rem] text-[#5c747d]">Acesse seus serviços mais importantes sem complicação.</p>
          </div>
          <Button variant="ghost" icon={ArrowRight} className="w-full self-start sm:w-auto sm:self-auto" onClick={() => goTo('registros')}>Ver meus registros</Button>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {[
            { title: 'Agendar consulta', description: 'Escolha a especialidade, o profissional e o melhor horário.', icon: Calendar, action: 'agendar', tone: 'bg-mint text-teal' },
            { title: 'Entrar na fila', description: 'Fale com um clínico geral no próximo horário disponível.', icon: Video, action: 'fila', tone: 'bg-[#e8f4fb] text-[#2874a1]' },
            { title: 'Ver registros', description: 'Visualize documentos e histórico de consultas.', icon: FileText, action: 'registros', tone: 'bg-[#f0edff] text-[#7460c6]' },
          ].map(({ title, description, icon: Icon, action, tone }) => (
            <Surface key={title} className="group flex min-h-[220px] flex-col justify-between p-7">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div className="mt-7">
                <h3 className="text-lg font-bold tracking-[-0.02em] text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#66808a]">{description}</p>
              </div>
              <button onClick={() => goTo(action)} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-ocean transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
                Acessar <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </Surface>
          ))}
        </div>
      </section>

      <section className="bg-[#eaf3f4] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Especialidades</p>
            <h2 className="mt-2 max-w-md font-display text-3xl leading-[1.05] tracking-[-0.035em] text-ink sm:text-4xl">Cuidado certo para cada momento.</h2>
            <p className="mt-4 max-w-lg leading-7 text-[#5c747d]">Encontre profissionais preparados para ouvir, orientar e acompanhar você com atenção.</p>
            <Button variant="primary" icon={ArrowRight} className="mt-7 w-full sm:w-auto" onClick={() => goTo('agendar')}>Encontrar especialista</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {specialties.slice(0, 4).map(({ name, description, icon: Icon, accent }) => (
              <Surface key={name} className="p-5" hover>
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${accent}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-4 font-semibold text-ink">{name}</h3>
                <p className="mt-1.5 text-xs leading-5 text-[#66808a]">{description}</p>
              </Surface>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function SchedulePage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('Clínica geral')
  const [selectedDoctorId, setSelectedDoctorId] = useState(null)
  const [selectedSlotId, setSelectedSlotId] = useState(null)
  const [confirmedAppointment, setConfirmedAppointment] = useState(null)
  const [professionals, setProfessionals] = useState([])
  const [slots, setSlots] = useState([])
  const [catalogStatus, setCatalogStatus] = useState('loading')
  const [catalogError, setCatalogError] = useState('')
  const [availabilityStatus, setAvailabilityStatus] = useState('loading')
  const [availabilityError, setAvailabilityError] = useState('')
  const [bookingStatus, setBookingStatus] = useState('idle')
  const [bookingError, setBookingError] = useState('')
  const availableDoctors = professionals.filter((professional) => professional.specialty === selectedSpecialty)
  const selectedDoctor = availableDoctors.find((doctor) => doctor.id === selectedDoctorId) ?? availableDoctors[0]
  const availableSlots = slots.filter((slot) => slot.professional_id === selectedDoctor?.id)
  const selectedSlot = availableSlots.find((slot) => slot.id === selectedSlotId) ?? availableSlots[0]

  const formatDate = (value) => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))

  const formatTime = (value) => new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))

  async function loadAvailability() {
    setAvailabilityStatus('loading')
    setAvailabilityError('')

    const { data, error } = await supabase
      .from('availability_slots')
      .select('id, professional_id, starts_at, ends_at, status')
      .eq('status', 'available')
      .order('starts_at')

    if (error) {
      setAvailabilityError(error.message)
      setAvailabilityStatus('error')
      return
    }

    setSlots(data ?? [])
    setAvailabilityStatus(data?.length ? 'ready' : 'empty')
  }

  useEffect(() => {
    let cancelled = false

    async function loadProfessionals() {
      const { data, error } = await supabase
        .from('professionals')
        .select('id, name, specialty, description')
        .order('name')

      if (cancelled) return

      if (error) {
        setCatalogError(error.message)
        setCatalogStatus('error')
        return
      }

      setProfessionals(data ?? [])
      setCatalogStatus(data?.length ? 'ready' : 'empty')
    }

    loadProfessionals()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadSlots() {
      const { data, error } = await supabase
        .from('availability_slots')
        .select('id, professional_id, starts_at, ends_at, status')
        .eq('status', 'available')
        .order('starts_at')

      if (cancelled) return

      if (error) {
        setAvailabilityError(error.message)
        setAvailabilityStatus('error')
        return
      }

      setSlots(data ?? [])
      setAvailabilityStatus(data?.length ? 'ready' : 'empty')
    }

    loadSlots()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    setSelectedDoctorId(availableDoctors[0]?.id ?? null)
    setSelectedSlotId(null)
    setConfirmedAppointment(null)
    setBookingError('')
  }, [selectedSpecialty, professionals])

  useEffect(() => {
    const doctorSlots = slots.filter((slot) => slot.professional_id === selectedDoctorId)
    setSelectedSlotId((currentSlotId) => (
      doctorSlots.some((slot) => slot.id === currentSlotId)
        ? currentSlotId
        : doctorSlots[0]?.id ?? null
    ))
  }, [selectedDoctorId, slots])

  async function confirmAppointment() {
    if (!selectedDoctor || !selectedSlot || bookingStatus === 'submitting') return

    setBookingStatus('submitting')
    setBookingError('')

    const { data: appointmentId, error } = await supabase.rpc('book_appointment', {
      p_slot_id: selectedSlot.id,
    })

    if (error) {
      setBookingStatus('error')
      setBookingError(error.message)
      await loadAvailability()
      return
    }

    setConfirmedAppointment({
      id: appointmentId,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      startsAt: selectedSlot.starts_at,
      endsAt: selectedSlot.ends_at,
    })
    setSlots((currentSlots) => currentSlots.filter((slot) => slot.id !== selectedSlot.id))
    setSelectedSlotId(null)
    setBookingStatus('success')
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Agendamento" title="Escolha uma opção para sua consulta." description="Selecione uma especialidade, um profissional e o horário mais adequado." />
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <Surface className="h-fit !bg-ocean text-white" hover={false}>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a6f0df]">Agendamento online</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">Agendamento em três etapas.</h2>
          <div className="mt-7 space-y-5">
            {[
              ['1', 'Escolha uma especialidade'],
              ['2', 'Defina seu profissional'],
              ['3', 'Confirme o melhor horário'],
            ].map(([number, text], index) => (
              <div key={text} className="flex gap-3">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${index === 0 ? 'bg-[#9cebdc] text-ocean' : 'bg-white/12 text-white/75'}`}>{number}</span>
                <p className={`pt-1 text-sm ${index === 0 ? 'font-semibold text-white' : 'text-white/65'}`}>{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-white/12 bg-white/10 p-4 text-sm leading-6 text-white/78">
            <ShieldCheck className="mb-2 h-5 w-5 text-[#a6f0df]" aria-hidden="true" />
            Confira os detalhes antes de confirmar o horário escolhido.
          </div>
        </Surface>

        <div className="space-y-6">
          <Surface hover={false}>
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-sm font-bold text-teal">1</span><h2 className="text-lg font-bold text-ink">Qual cuidado você procura?</h2></div>
            <div className="mt-6 grid gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3">
              {specialties.map(({ name, icon: Icon, accent }) => {
                const selected = name === selectedSpecialty
                return (
                  <motion.button key={name} type="button" whileTap={{ scale: 0.98 }} onClick={() => { setSelectedSpecialty(name); setConfirmedAppointment(null); setBookingError('') }} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${selected ? 'border-teal bg-[#effaf8] shadow-sm' : 'border-line bg-white hover:border-[#bcd6d1]'}`}>
                    <span className={`grid h-9 w-9 place-items-center rounded-xl ${accent}`}><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <span className="text-sm font-semibold text-ink">{name}</span>
                    {selected && <Check className="ml-auto h-4 w-4 text-teal" aria-label="Selecionado" />}
                  </motion.button>
                )
              })}
            </div>
          </Surface>

          <Surface hover={false}>
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-sm font-bold text-teal">2</span><div><h2 className="text-lg font-bold text-ink">Escolha um profissional</h2><p className="mt-0.5 text-sm text-[#66808a]">Profissionais disponíveis no catálogo para {selectedSpecialty}.</p></div></div>
            {catalogStatus === 'loading' && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]" role="status">Carregando catálogo de profissionais...</p>}
            {catalogStatus === 'error' && <p className="mt-6 rounded-2xl border border-[#edb8b0] bg-[#fff3f1] p-4 text-sm text-[#9a3f32]" role="alert">Não foi possível carregar o catálogo. Confira a conexão e as regras de leitura do Supabase. Detalhe: {catalogError}</p>}
            {catalogStatus === 'empty' && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]">O catálogo ainda não possui profissionais disponíveis.</p>}
            {catalogStatus === 'ready' && availableDoctors.length === 0 && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]">Ainda não há profissionais cadastrados para esta especialidade.</p>}
            {catalogStatus === 'ready' && availableDoctors.length > 0 && (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {availableDoctors.map((doctor) => {
                    const selected = doctor.id === selectedDoctor?.id
                    return (
                      <motion.button key={doctor.id} type="button" whileTap={{ scale: 0.98 }} onClick={() => { setSelectedDoctorId(doctor.id); setConfirmedAppointment(null); setBookingError('') }} className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${selected ? 'border-teal bg-[#effaf8] shadow-sm' : 'border-line bg-fog hover:border-[#bcd6d1]'}`}>
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint text-teal"><Stethoscope className="h-5 w-5" aria-hidden="true" /></span>
                        <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-ink">{doctor.name}</span><span className="mt-1 block text-xs text-[#66808a]">{doctor.description}</span></span>
                        {selected && <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal text-white"><Check className="h-3 w-3" aria-label="Selecionado" /></span>}
                      </motion.button>
                    )
                  })}
                </div>
                {selectedDoctor && <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-fog p-4 min-[480px]:flex-row min-[480px]:items-center">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mint text-teal"><Stethoscope className="h-6 w-6" aria-hidden="true" /></span>
                  <div className="flex-1"><p className="font-bold text-ink">{selectedDoctor.name}</p><p className="mt-1 text-sm text-[#66808a]">{selectedDoctor.specialty} · {selectedDoctor.description}</p></div>
                  <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#58717a]">Atendimento online</span>
                </div>}
              </>
            )}
          </Surface>

          <Surface hover={false}>
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-sm font-bold text-teal">3</span><div><h2 className="text-lg font-bold text-ink">Selecione um horário</h2><p className="mt-0.5 text-sm text-[#66808a]">Horários consultados no banco, no fuso de São Paulo.</p></div></div>
            {availabilityStatus === 'loading' && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]" role="status">Carregando horários disponíveis...</p>}
            {availabilityStatus === 'error' && <div className="mt-6 rounded-2xl border border-[#edb8b0] bg-[#fff3f1] p-4 text-sm text-[#9a3f32]" role="alert"><p>Não foi possível carregar os horários. Confira a conexão e as regras de leitura do Supabase.</p><p className="mt-1 text-xs">Detalhe: {availabilityError}</p><Button variant="ghost" className="mt-3" onClick={loadAvailability}>Tentar novamente</Button></div>}
            {availabilityStatus === 'empty' && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]">Não há horários disponíveis neste momento.</p>}
            {availabilityStatus === 'ready' && !selectedDoctor && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]">Escolha um profissional disponível para consultar os horários.</p>}
            {availabilityStatus === 'ready' && selectedDoctor && availableSlots.length === 0 && <p className="mt-6 rounded-2xl border border-line bg-fog p-4 text-sm text-[#66808a]">Não há mais horários disponíveis para este profissional.</p>}
            {availabilityStatus === 'ready' && selectedDoctor && availableSlots.length > 0 && <div className="mt-6 grid gap-3 min-[470px]:grid-cols-2 xl:grid-cols-3">
              {availableSlots.map((slot) => {
                const selected = slot.id === selectedSlot?.id
                return (
                  <motion.button key={slot.id} type="button" whileTap={{ scale: 0.96 }} onClick={() => { setSelectedSlotId(slot.id); setConfirmedAppointment(null); setBookingError('') }} className={`rounded-2xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${selected ? 'border-teal bg-teal text-white' : 'border-line bg-white text-[#56707a] hover:border-teal hover:text-ocean'}`}>
                    <span className={`block text-xs font-semibold uppercase tracking-[0.1em] ${selected ? 'text-white/75' : 'text-[#66808a]'}`}>{formatDate(slot.starts_at)}</span>
                    <span className="mt-1 block text-lg font-bold">{formatTime(slot.starts_at)}</span>
                    <span className={`mt-1 block text-xs ${selected ? 'text-white/75' : 'text-[#66808a]'}`}>até {formatTime(slot.ends_at)}</span>
                  </motion.button>
                )
              })}
            </div>}
            {bookingStatus === 'error' && <p className="mt-5 rounded-2xl border border-[#edb8b0] bg-[#fff3f1] p-4 text-sm text-[#9a3f32]" role="alert">Não foi possível concluir a reserva. {bookingError}</p>}
            <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 text-sm text-[#5d777f]"><strong className="font-semibold text-ink">{selectedSlot ? `${formatDate(selectedSlot.starts_at)}, ${formatTime(selectedSlot.starts_at)}` : 'Escolha um horário'}</strong> · {selectedDoctor ? `Com ${selectedDoctor.name}` : 'Escolha um profissional disponível para continuar.'}</p>
              <Button icon={Calendar} className="w-full sm:w-auto" disabled={!selectedDoctor || !selectedSlot || bookingStatus === 'submitting'} onClick={confirmAppointment}>{bookingStatus === 'submitting' ? 'Reservando...' : 'Confirmar consulta'}</Button>
            </div>
          </Surface>
        </div>
      </div>
      <AnimatePresence>
        {confirmedAppointment && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#a6f0df] text-ocean"><Check className="h-5 w-5" aria-hidden="true" /></span>
            <span className="min-w-0 flex-1"><strong className="font-semibold">Consulta reservada.</strong> {formatDate(confirmedAppointment.startsAt)} às {formatTime(confirmedAppointment.startsAt)} com {confirmedAppointment.doctorName}.</span>
            <button className="ml-auto shrink-0 text-white/70 hover:text-white" onClick={() => setConfirmedAppointment(null)} aria-label="Fechar confirmação"><X className="h-4 w-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function QueuePage({ goTo }) {
  const [expanded, setExpanded] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [queueStatus, setQueueStatus] = useState('loading')
  const [queueError, setQueueError] = useState('')
  const [queueEntry, setQueueEntry] = useState(null)
  const [appointment, setAppointment] = useState(null)

  const formatDateTime = (value) => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))

  async function loadQueue() {
    setQueueStatus('loading')
    setQueueError('')

    const { data: appointments, error: appointmentError } = await supabase
      .from('appointments')
      .select('id, status, created_at, professional:professionals(name, specialty), slot:availability_slots!appointments_slot_id_fkey(starts_at, ends_at)')
      .in('status', ['scheduled', 'waiting', 'in_progress'])
      .order('created_at', { ascending: false })
      .limit(1)

    if (appointmentError) {
      setQueueError(appointmentError.message)
      setQueueStatus('error')
      return
    }

    const currentAppointment = appointments?.[0]

    if (!currentAppointment) {
      setAppointment(null)
      setQueueEntry(null)
      setQueueStatus('empty')
      return
    }

    const { data: queue, error: queueError } = await supabase
      .from('appointment_queue')
      .select('appointment_id, position, status, updated_at')
      .eq('appointment_id', currentAppointment.id)
      .maybeSingle()

    if (queueError) {
      setQueueError(queueError.message)
      setQueueStatus('error')
      return
    }

    if (!queue) {
      setQueueError('A consulta não possui uma entrada de fila associada.')
      setQueueStatus('error')
      return
    }

    setAppointment(currentAppointment)
    setQueueEntry(queue)
    setQueueStatus('ready')
  }

  useEffect(() => {
    const timer = window.setInterval(() => setTipIndex((current) => (current + 1) % tips.length), 4800)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    loadQueue()
  }, [])

  const professional = Array.isArray(appointment?.professional) ? appointment.professional[0] : appointment?.professional
  const slot = Array.isArray(appointment?.slot) ? appointment.slot[0] : appointment?.slot
  const isReady = queueEntry?.status === 'ready'

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Sala de espera" title="Acompanhe sua consulta." description="A situação exibida é lida do banco e pertence somente à sua conta." />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0b5966_0%,#0d8085_100%)] p-5 text-white shadow-soft sm:p-9">
          <div className="flex flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:justify-between"><StatusPill /><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">{professional?.specialty ?? 'Consulta'}</span></div>
          {queueStatus === 'loading' && <p className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-5 text-sm text-white/75" role="status">Carregando a situação da sua consulta...</p>}
          {queueStatus === 'empty' && <div className="mt-10"><p className="font-display text-3xl leading-tight">Nenhuma consulta na fila.</p><p className="mt-3 max-w-lg text-sm leading-6 text-white/74">Reserve um horário na tela de agendamento para acompanhar a fila por aqui.</p><Button variant="light" icon={Calendar} className="mt-7" onClick={() => goTo('agendar')}>Agendar consulta</Button></div>}
          {queueStatus === 'error' && <div className="mt-10"><p className="font-display text-3xl leading-tight">Não foi possível carregar a fila.</p><p className="mt-3 max-w-lg text-sm leading-6 text-white/74">{queueError}</p><Button variant="light" className="mt-7" onClick={loadQueue}>Tentar novamente</Button></div>}
          {queueStatus === 'ready' && queueEntry && (
            <div className="mt-10 grid gap-8 sm:grid-cols-[.95fr_1.05fr] sm:items-end">
              <div>
                <p className="text-sm text-white/68">Situação persistida da sua consulta</p>
                <p className="mt-2 font-display text-4xl tracking-[-0.04em] text-white">{isReady ? 'Atendimento liberado' : 'Aguardando atendimento'}</p>
                <p className="mt-3 text-sm leading-6 text-white/74">{slot ? `Consulta agendada para ${formatDateTime(slot.starts_at)}.` : 'Consulta vinculada à sua conta.'} Atualizada em {formatDateTime(queueEntry.updated_at)}.</p>
                {isReady ? <Button variant="light" icon={Video} className="mt-7 w-full min-[420px]:w-auto" onClick={() => goTo('atendimento')}>Ir para atendimento</Button> : <Button variant="light" icon={Wifi} className="mt-7 w-full min-[420px]:w-auto" onClick={loadQueue}>Atualizar situação</Button>}
              </div>
              <motion.div key={`${queueEntry.position}-${queueEntry.status}`} initial={{ opacity: 0, scale: 0.92, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} aria-live="polite" className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a6f0df]">Sua posição na fila</p>
                <p className="mt-3 font-display text-7xl tracking-[-0.05em]">{queueEntry.position}</p>
                <p className="mt-2 text-sm text-white/68">{isReady ? 'Você pode acessar a área de atendimento.' : queueEntry.position === 1 ? 'Você é a próxima pessoa.' : `${queueEntry.position - 1} pessoa${queueEntry.position - 1 > 1 ? 's' : ''} antes de você.`}</p>
              </motion.div>
            </div>
          )}
        </div>

        <Surface className="flex flex-col justify-between" hover={false}>
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-teal"><CircleHelp className="h-5 w-5" aria-hidden="true" /></span>
            <p className="mt-5 text-sm font-bold uppercase tracking-[0.13em] text-teal">Enquanto aguarda</p>
            <AnimatePresence mode="wait">
              <motion.p key={tipIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-3 font-display text-2xl leading-snug tracking-[-0.025em] text-ink">{tips[tipIndex]}</motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-7 flex gap-1.5" aria-label={`Dica ${tipIndex + 1} de ${tips.length}`}>
            {tips.map((tip, index) => <span key={tip} className={`h-1.5 rounded-full transition-all duration-300 ${index === tipIndex ? 'w-7 bg-teal' : 'w-1.5 bg-[#ccddd9]'}`} />)}
          </div>
        </Surface>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <Surface hover={false} className="p-0">
          <button onClick={() => setExpanded((current) => !current)} className="flex w-full items-center justify-between gap-4 p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-teal" aria-expanded={expanded}>
            <span><span className="block font-bold text-ink">Antes de entrar</span><span className="mt-1 block text-sm text-[#66808a]">Dicas rápidas para a sua consulta.</span></span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-teal transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }} className="overflow-hidden">
                <div className="border-t border-line px-6 pb-6 pt-5">
                  <ul className="space-y-3 text-sm leading-6 text-[#5d777f]">
                    {['Verifique sua conexão de internet.', 'Use fones de ouvido se tiver privacidade limitada.', 'Não feche esta página: avisaremos quando for sua vez.'].map((item) => <li key={item} className="flex gap-2.5"><Check className="mt-1 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />{item}</li>)}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Surface>
        <Surface hover={false} className="flex flex-col gap-5 min-[440px]:flex-row min-[440px]:items-center min-[440px]:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mint text-teal"><Stethoscope className="h-6 w-6" aria-hidden="true" /></span>
            <div><p className="font-bold text-ink">{professional?.name ?? 'Profissional'}</p><p className="mt-1 text-sm text-[#66808a]">{professional?.specialty ?? 'Informação disponível após reservar um horário.'}</p></div>
          </div>
          <div className="flex w-full flex-col gap-2 min-[440px]:w-auto min-[440px]:flex-row"><Button variant="soft" className="min-h-11 w-full px-4 min-[440px]:w-auto" icon={Wifi} onClick={loadQueue}>Atualizar fila</Button></div>
        </Surface>
      </div>
    </main>
  )
}

function AppointmentPage({ accountRole, profile, session }) {
  const [appointments, setAppointments] = useState([])
  const [appointmentsStatus, setAppointmentsStatus] = useState('loading')
  const [messages, setMessages] = useState([])
  const [messagesStatus, setMessagesStatus] = useState('idle')
  const [documents, setDocuments] = useState([])
  const [documentsStatus, setDocumentsStatus] = useState('idle')
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('')
  const [draft, setDraft] = useState('')
  const [platform, setPlatform] = useState('Google Meet')
  const [meetingUrl, setMeetingUrl] = useState('')
  const [documentFile, setDocumentFile] = useState(null)
  const [documentType, setDocumentType] = useState('exam_result')
  const [attachmentPanelOpen, setAttachmentPanelOpen] = useState(false)
  const documentInputRef = useRef(null)
  const [sending, setSending] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [downloadingDocumentId, setDownloadingDocumentId] = useState('')
  const [feedback, setFeedback] = useState('')

  const isProfessional = accountRole === 'doctor'
  const selectedAppointment = appointments.find((appointment) => appointment.id === selectedAppointmentId) ?? null
  const professional = Array.isArray(selectedAppointment?.professional) ? selectedAppointment.professional[0] : selectedAppointment?.professional
  const patient = Array.isArray(selectedAppointment?.patient) ? selectedAppointment.patient[0] : selectedAppointment?.patient
  const slot = Array.isArray(selectedAppointment?.slot) ? selectedAppointment.slot[0] : selectedAppointment?.slot

  const formatDateTime = (value) => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))

  const initials = (name) => (name || '?').split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  async function loadAppointments() {
    setAppointmentsStatus('loading')
    const { data, error } = await supabase
      .from('appointments')
      .select('id, status, created_at, professional:professionals(name, specialty), patient:profiles!appointments_patient_profile_fkey(full_name), slot:availability_slots!appointments_slot_id_fkey(starts_at, ends_at)')
      .in('status', ['scheduled', 'waiting', 'in_progress'])
      .order('created_at', { ascending: false })

    if (error) {
      setAppointments([])
      setAppointmentsStatus('error')
      setFeedback(`Não foi possível carregar as consultas. ${error.message}`)
      return
    }

    setAppointments(data ?? [])
    setSelectedAppointmentId((current) => (data ?? []).some((appointment) => appointment.id === current) ? current : data?.[0]?.id ?? '')
    setAppointmentsStatus('ready')
  }

  async function loadMessages(appointmentId = selectedAppointmentId) {
    if (!appointmentId) {
      setMessages([])
      setMessagesStatus('idle')
      return
    }

    setMessagesStatus('loading')
    const { data, error } = await supabase
      .from('appointment_messages')
      .select('id, sender_id, sender_type, content, meeting_platform, meeting_url, created_at')
      .eq('appointment_id', appointmentId)
      .order('created_at', { ascending: true })

    if (error) {
      setMessages([])
      setMessagesStatus('error')
      setFeedback(`Não foi possível carregar as mensagens. ${error.message}`)
      return
    }

    setMessages(data ?? [])
    setMessagesStatus('ready')
  }

  async function loadDocuments(appointmentId = selectedAppointmentId) {
    if (!appointmentId) {
      setDocuments([])
      setDocumentsStatus('idle')
      return
    }

    setDocumentsStatus('loading')
    const { data, error } = await supabase
      .from('appointment_documents')
      .select('id, uploaded_by, document_type, file_name, storage_path, mime_type, created_at')
      .eq('appointment_id', appointmentId)
      .order('created_at', { ascending: false })

    if (error) {
      setDocuments([])
      setDocumentsStatus('error')
      setFeedback(`Não foi possível carregar os anexos. ${error.message}`)
      return
    }

    setDocuments(data ?? [])
    setDocumentsStatus('ready')
  }

  useEffect(() => {
    loadAppointments()
  }, [accountRole])

  useEffect(() => {
    loadMessages()
    loadDocuments()
  }, [selectedAppointmentId])

  useEffect(() => {
    setDocumentType(isProfessional ? 'prescription' : 'exam_result')
  }, [isProfessional])

  useEffect(() => {
    if (!feedback) return undefined
    const timer = window.setTimeout(() => setFeedback(''), 3800)
    return () => window.clearTimeout(timer)
  }, [feedback])

  async function sendMessage({ content, url = null, platformName = null }) {
    if (!selectedAppointment || sending) return
    const text = content.trim()
    if (!text) return

    setSending(true)
    const { error } = await supabase
      .from('appointment_messages')
      .insert({
        appointment_id: selectedAppointment.id,
        sender_id: session.user.id,
        sender_type: isProfessional ? 'professional' : 'patient',
        content: text,
        meeting_platform: platformName,
        meeting_url: url,
      })

    setSending(false)

    if (error) {
      setFeedback(`Não foi possível enviar a mensagem. ${error.message}`)
      return
    }

    setDraft('')
    setMeetingUrl('')
    setFeedback(url ? 'Convite de vídeo enviado para a consulta.' : 'Mensagem enviada.')
    loadMessages(selectedAppointment.id)
  }

  function submitText() {
    sendMessage({ content: draft })
  }

  function sendMeetingInvite() {
    try {
      const url = new URL(meetingUrl.trim())
      if (url.protocol !== 'https:') throw new Error('invalid-url')
      sendMessage({
        content: 'Sua sala de atendimento está pronta. Entre quando estiver confortável.',
        url: url.toString(),
        platformName: platform,
      })
    } catch {
      setFeedback('Use um link seguro iniciado por https:// para enviar o convite.')
    }
  }

  async function uploadDocument() {
    if (!selectedAppointment || !documentFile || uploadingDocument) return

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!allowedTypes.includes(documentFile.type)) {
      setFeedback('Escolha um arquivo PDF, JPEG ou PNG.')
      return
    }

    if (documentFile.size > 5 * 1024 * 1024) {
      setFeedback('O arquivo deve ter no máximo 5 MB.')
      return
    }

    const safeName = documentFile.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '-')
    const uniqueId = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const storagePath = `${selectedAppointment.id}/${session.user.id}/${uniqueId}-${safeName}`

    setUploadingDocument(true)
    const { error: documentError } = await supabase
      .from('appointment_documents')
      .insert({
        appointment_id: selectedAppointment.id,
        uploaded_by: session.user.id,
        document_type: documentType,
        file_name: documentFile.name,
        storage_path: storagePath,
        mime_type: documentFile.type,
      })

    if (documentError) {
      setUploadingDocument(false)
      setFeedback(`Não foi possível registrar o anexo. ${documentError.message}`)
      return
    }

    const { error: uploadError } = await supabase
      .storage
      .from('appointment-documents')
      .upload(storagePath, documentFile, { contentType: documentFile.type, upsert: false })

    setUploadingDocument(false)

    if (uploadError) {
      setFeedback(`O anexo foi registrado, mas o envio do arquivo não foi concluído. ${uploadError.message}`)
      return
    }

    setDocumentFile(null)
    if (documentInputRef.current) documentInputRef.current.value = ''
    setAttachmentPanelOpen(false)
    setFeedback('Anexo enviado para a consulta.')
    loadDocuments(selectedAppointment.id)
  }

  async function downloadDocument(document) {
    if (downloadingDocumentId) return
    setDownloadingDocumentId(document.id)
    const { data, error } = await supabase
      .storage
      .from('appointment-documents')
      .createSignedUrl(document.storage_path, 60)
    setDownloadingDocumentId('')

    if (error || !data?.signedUrl) {
      setFeedback(`Não foi possível preparar o download. ${error?.message ?? ''}`.trim())
      return
    }

    const link = window.document.createElement('a')
    link.href = data.signedUrl
    link.target = '_blank'
    link.rel = 'noreferrer'
    link.click()
  }

  const otherPartyName = isProfessional ? patient?.full_name ?? 'Paciente' : professional?.name ?? 'Profissional'
  const documentTypeOptions = isProfessional
    ? [['prescription', 'Receita'], ['exam_request', 'Solicitação de exame'], ['other', 'Outro documento']]
    : [['exam_result', 'Resultado de exame'], ['image', 'Imagem'], ['other', 'Outro anexo']]
  const documentTypeLabel = {
    prescription: 'Receita',
    exam_request: 'Solicitação de exame',
    exam_result: 'Resultado de exame',
    image: 'Imagem',
    other: 'Anexo',
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow={isProfessional ? 'Área profissional' : 'Atendimento online'} title={isProfessional ? 'Mensagens das consultas atribuídas.' : 'Uma conversa organizada para a consulta.'} description={isProfessional ? 'Esta área restrita mostra somente consultas vinculadas ao perfil profissional autenticado.' : 'As mensagens pertencem somente à sua consulta. O profissional pode compartilhar um link de videochamada externo e seguro.'} />
      <div className="grid gap-6 lg:grid-cols-[.74fr_1.26fr]">
        <div className="space-y-6">
          <Surface hover={false} className="overflow-hidden !bg-ocean text-white">
            <div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-[#a6f0df]"><Video className="h-5 w-5" aria-hidden="true" /></span><span className="rounded-full bg-[#a6f0df]/15 px-3 py-1.5 text-xs font-bold text-[#a6f0df]">Consulta online</span></div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-[#a6f0df]">Consulta vinculada</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">{professional?.specialty ?? 'Selecione uma consulta'}</h2>
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/10 p-4"><p className="text-sm font-bold">{professional?.name ?? (isProfessional ? profile.name : 'Profissional')}</p><p className="mt-0.5 text-xs text-white/66">{slot ? formatDateTime(slot.starts_at) : 'Horário disponível após selecionar uma consulta.'}</p></div>
          </Surface>
          <Surface hover={false}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-teal"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="mt-4 font-bold text-ink">Acesso restrito</h2>
            <p className="mt-3 text-sm leading-6 text-[#5d777f]">{isProfessional ? 'Sua conta visualiza somente consultas atribuídas ao perfil profissional associado.' : 'Sua conta visualiza e envia mensagens somente na própria consulta.'}</p>
            <Button variant="soft" className="mt-5 min-h-11 px-4" icon={Wifi} onClick={() => { loadAppointments(); loadMessages() }}>Atualizar informações</Button>
          </Surface>
        </div>

        <Surface hover={false} className="flex min-h-0 flex-col p-0 sm:min-h-[610px]">
          <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-teal"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span><div><h2 className="font-bold text-ink">Chat privado da consulta</h2><p className="mt-0.5 text-xs text-[#66808a]">{otherPartyName}</p></div></div>
            {appointments.length > 1 && <label className="text-xs font-semibold text-[#66808a]"><span className="sr-only">Selecionar consulta</span><select value={selectedAppointmentId} onChange={(event) => setSelectedAppointmentId(event.target.value)} className="min-h-10 max-w-[240px] rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-teal focus:ring-4 focus:ring-[#dff5f1]">{appointments.map((appointment) => { const appointmentProfessional = Array.isArray(appointment.professional) ? appointment.professional[0] : appointment.professional; const appointmentPatient = Array.isArray(appointment.patient) ? appointment.patient[0] : appointment.patient; const appointmentSlot = Array.isArray(appointment.slot) ? appointment.slot[0] : appointment.slot; const appointmentLabel = isProfessional ? appointmentPatient?.full_name ?? 'Paciente' : appointmentProfessional?.name ?? 'Consulta'; return <option key={appointment.id} value={appointment.id}>{appointmentLabel} · {appointmentSlot ? formatDateTime(appointmentSlot.starts_at) : 'horário'}</option> })}</select></label>}
          </div>
          <div className="border-b border-line bg-[#fbfdfd] px-5 py-3 text-xs leading-5 text-[#6c858d] sm:px-7"><CircleHelp className="mr-1.5 inline h-3.5 w-3.5 text-teal" aria-hidden="true" />Mensagens, links e anexos pertencem somente a esta consulta. Não envie informações ou documentos reais neste ambiente.</div>
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-7">
            {appointmentsStatus === 'loading' && <p className="rounded-2xl bg-fog p-4 text-sm text-[#66808a]" role="status">Carregando consultas vinculadas...</p>}
            {appointmentsStatus === 'error' && <p className="rounded-2xl border border-[#edb8b0] bg-[#fff3f1] p-4 text-sm text-[#9a3f32]" role="alert">Não foi possível carregar suas consultas. Atualize a página ou tente novamente.</p>}
            {appointmentsStatus === 'ready' && !selectedAppointment && <p className="rounded-2xl bg-fog p-4 text-sm leading-6 text-[#66808a]">{isProfessional ? 'Ainda não há consulta vinculada ao seu perfil profissional.' : 'Reserve um horário para iniciar uma conversa privada com o profissional associado.'}</p>}
            {selectedAppointment && messagesStatus === 'loading' && <p className="rounded-2xl bg-fog p-4 text-sm text-[#66808a]" role="status">Carregando mensagens da consulta...</p>}
            {selectedAppointment && messagesStatus === 'error' && <p className="rounded-2xl border border-[#edb8b0] bg-[#fff3f1] p-4 text-sm text-[#9a3f32]" role="alert">Não foi possível carregar as mensagens. Use “Atualizar informações” para tentar novamente.</p>}
            {selectedAppointment && messagesStatus === 'ready' && messages.length === 0 && <p className="rounded-2xl bg-fog p-4 text-sm leading-6 text-[#66808a]">Nenhuma mensagem ainda. {isProfessional ? 'Envie uma orientação ou o convite da videochamada.' : 'Você pode iniciar a conversa.'}</p>}
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const isOwn = message.sender_id === session.user.id
                const isProfessionalMessage = message.sender_type === 'professional'
                const author = isProfessionalMessage ? professional?.name ?? 'Profissional' : patient?.full_name ?? (isOwn ? profile.name || 'Paciente' : 'Paciente')
                return (
                  <motion.article key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex max-w-full gap-2.5 min-[420px]:max-w-[88%] ${isOwn ? 'ml-auto flex-row-reverse' : ''}`}>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold ${isProfessionalMessage ? 'bg-mint text-teal' : 'bg-[#e9f1f3] text-ocean'}`}>{initials(author)}</span>
                    <div className={`rounded-2xl px-4 py-3 ${isOwn ? 'bg-ocean text-white' : 'bg-fog text-ink'}`}><p className={`mb-1 text-[0.67rem] font-bold ${isOwn ? 'text-white/66' : 'text-[#6d858d]'}`}>{author}</p><p className="text-sm leading-6">{message.content}</p><p className={`mt-2 text-[0.66rem] ${isOwn ? 'text-white/60' : 'text-[#789099]'}`}>{formatDateTime(message.created_at)}</p>{message.meeting_url && <a href={message.meeting_url} target="_blank" rel="noreferrer" className={`mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-bold transition-colors ${isOwn ? 'bg-white text-ocean hover:bg-[#eaf8f6]' : 'bg-teal text-white hover:bg-[#0a9793]'}`}><Video className="h-4 w-4" aria-hidden="true" />Entrar pelo {message.meeting_platform}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}</div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </div>
          {selectedAppointment && attachmentPanelOpen && <div className="border-t border-line bg-[#fbfdfd] px-5 py-4 sm:px-7"><div className="flex items-center justify-between gap-3"><div><h3 className="text-sm font-bold text-ink">Adicionar anexo</h3><p className="mt-1 text-xs text-[#6c858d]">PDF, JPEG ou PNG, com até 5 MB.</p></div><button type="button" onClick={() => setAttachmentPanelOpen(false)} className="grid h-9 w-9 place-items-center rounded-xl text-[#66808a] transition-colors hover:bg-fog hover:text-ocean" aria-label="Fechar anexos"><X className="h-4 w-4" aria-hidden="true" /></button></div><div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_180px_auto]"><label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink transition-colors hover:border-teal"><Upload className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" /><span className="truncate">{documentFile ? documentFile.name : 'Escolher arquivo'}</span><input ref={documentInputRef} type="file" accept="application/pdf,image/jpeg,image/png" onChange={(event) => setDocumentFile(event.target.files?.[0] ?? null)} className="sr-only" /></label><select value={documentType} onChange={(event) => setDocumentType(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-teal focus:ring-4 focus:ring-[#dff5f1]">{documentTypeOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><Button className="min-h-11 px-4" icon={Upload} disabled={!documentFile || uploadingDocument} onClick={uploadDocument}>{uploadingDocument ? 'Enviando...' : 'Enviar'}</Button></div><div className="mt-3 border-t border-line pt-3">{documentsStatus === 'loading' && <p className="text-xs text-[#66808a]">Carregando arquivos...</p>}{documentsStatus === 'error' && <p className="text-xs text-[#9a3f32]">Não foi possível carregar os arquivos.</p>}{documentsStatus === 'ready' && documents.length === 0 && <p className="text-xs text-[#66808a]">Nenhum arquivo compartilhado nesta consulta.</p>}{documents.length > 0 && <div className="flex flex-wrap gap-2">{documents.map((document) => <button key={document.id} type="button" onClick={() => downloadDocument(document)} disabled={downloadingDocumentId === document.id} className="inline-flex max-w-full items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-teal disabled:opacity-60"><FileText className="h-4 w-4 shrink-0 text-teal" aria-hidden="true" /><span className="max-w-40 truncate">{document.file_name}</span><Download className="h-3.5 w-3.5 shrink-0 text-[#66808a]" aria-hidden="true" /></button>)}</div>}</div></div>}
          {isProfessional && selectedAppointment && <div className="border-t border-line bg-fog px-5 py-4 sm:px-7"><div className="flex items-center gap-2"><Link2 className="h-4 w-4 text-teal" aria-hidden="true" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-ocean">Enviar convite de vídeo</p></div><div className="mt-3 grid gap-2 sm:grid-cols-[150px_1fr_auto]"><select value={platform} onChange={(event) => setPlatform(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-teal focus:ring-4 focus:ring-[#dff5f1]"><option>Google Meet</option><option>Zoom</option><option>Jitsi Meet</option></select><input value={meetingUrl} onChange={(event) => setMeetingUrl(event.target.value)} placeholder="Cole o link seguro da reunião" className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-[#91a5ab] focus:border-teal focus:ring-4 focus:ring-[#dff5f1]" /><Button className="min-h-11 w-full px-4 sm:w-auto" icon={Link2} disabled={sending} onClick={sendMeetingInvite}>{sending ? 'Enviando...' : 'Enviar'}</Button></div><p className="mt-2 text-xs leading-5 text-[#6c858d]">Use um link HTTPS. A MedConnect não hospeda a videochamada.</p></div>}
          {selectedAppointment && <div className="border-t border-line p-4 sm:px-7"><div className="flex items-end gap-2 sm:gap-3"><button type="button" onClick={() => setAttachmentPanelOpen((isOpen) => !isOpen)} className={`grid h-[54px] w-[54px] shrink-0 place-items-center rounded-2xl border text-lg font-medium transition-colors ${attachmentPanelOpen ? 'border-teal bg-mint text-teal' : 'border-line bg-fog text-[#66808a] hover:border-teal hover:text-teal'}`} aria-label="Adicionar ou visualizar anexos" aria-expanded={attachmentPanelOpen}><Plus className="h-5 w-5" aria-hidden="true" /></button><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitText() } }} rows="2" disabled={sending} placeholder={isProfessional ? 'Escreva uma orientação para o paciente...' : 'Escreva uma mensagem para o profissional...'} className="min-h-[54px] min-w-0 flex-1 resize-none rounded-2xl border border-line bg-fog px-4 py-3 text-sm text-ink outline-none placeholder:text-[#91a5ab] focus:border-teal focus:bg-white focus:ring-4 focus:ring-[#dff5f1] disabled:cursor-not-allowed disabled:opacity-70" /><Button className="min-h-[54px] shrink-0 px-4" icon={Send} disabled={sending} onClick={submitText} aria-label="Enviar mensagem">{sending ? 'Enviando...' : 'Enviar'}</Button></div></div>}
        </Surface>
      </div>
      <AnimatePresence>{feedback && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]"><CircleCheck className="h-5 w-5 shrink-0 text-[#a6f0df]" aria-hidden="true" /><span className="min-w-0 flex-1">{feedback}</span></motion.div>}</AnimatePresence>
    </main>
  )
}

function RecordsPage({ session }) {
  const [tab, setTab] = useState('documentos')
  const [notice, setNotice] = useState('')
  const [documents, setDocuments] = useState([])
  const [documentsStatus, setDocumentsStatus] = useState('loading')
  const [downloadingDocumentId, setDownloadingDocumentId] = useState('')

  const documentTypeLabel = {
    prescription: 'Receita',
    exam_request: 'Solicitação de exame',
    exam_result: 'Resultado de exame',
    image: 'Imagem',
    other: 'Anexo',
  }

  const formatDate = (value) => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value))

  async function loadDocuments() {
    setDocumentsStatus('loading')
    const { data, error } = await supabase
      .from('appointment_documents')
      .select('id, document_type, file_name, storage_path, mime_type, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      setDocuments([])
      setDocumentsStatus('error')
      setNotice(`Não foi possível carregar seus documentos. ${error.message}`)
      return
    }

    setDocuments(data ?? [])
    setDocumentsStatus('ready')
  }

  async function downloadDocument(document) {
    if (downloadingDocumentId) return
    setDownloadingDocumentId(document.id)
    const { data, error } = await supabase
      .storage
      .from('appointment-documents')
      .createSignedUrl(document.storage_path, 60)
    setDownloadingDocumentId('')

    if (error || !data?.signedUrl) {
      setNotice(`Não foi possível preparar o download. ${error?.message ?? ''}`.trim())
      return
    }

    const link = window.document.createElement('a')
    link.href = data.signedUrl
    link.target = '_blank'
    link.rel = 'noreferrer'
    link.click()
  }

  useEffect(() => {
    loadDocuments()
  }, [session.user.id])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Registros" title="Documentos e histórico." description="Acesse os arquivos compartilhados nas suas consultas e acompanhe sua jornada." />
      <Surface hover={false} className="p-0">
        <LayoutGroup id="records-tabs">
          <div className="flex gap-1 border-b border-line px-5 pt-3 sm:px-7">
            {[['documentos', 'Documentos', FileText], ['historico', 'Histórico de consultas', History]].map(([id, label, Icon]) => (
              <button key={id} onClick={() => setTab(id)} className={`relative inline-flex min-h-14 items-center gap-2 px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal sm:px-5 ${tab === id ? 'text-ocean' : 'text-[#789099] hover:text-ocean'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span><span className="sm:hidden">{id === 'documentos' ? 'Documentos' : 'Histórico'}</span>
                {tab === id && <motion.span layoutId="records-active-tab" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-teal sm:inset-x-5" transition={{ type: 'spring', stiffness: 430, damping: 32 }} />}
              </button>
            ))}
          </div>
        </LayoutGroup>
        <AnimatePresence mode="wait">
          {tab === 'documentos' ? (
            <motion.div key="documentos" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="p-4 sm:p-7">
              {documentsStatus === 'loading' && <p className="rounded-2xl bg-fog p-4 text-sm text-[#66808a]" role="status">Carregando documentos...</p>}
              {documentsStatus === 'error' && <p className="rounded-2xl border border-[#edb8b0] bg-[#fff3f1] p-4 text-sm text-[#9a3f32]" role="alert">Não foi possível carregar seus documentos. Atualize a página e tente novamente.</p>}
              {documentsStatus === 'ready' && documents.length === 0 && <div className="rounded-2xl bg-fog p-6 text-center"><span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-white text-teal"><FileText className="h-5 w-5" aria-hidden="true" /></span><h2 className="mt-4 font-bold text-ink">Nenhum documento disponível</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#66808a]">Os arquivos compartilhados em uma consulta aparecerão aqui para download.</p></div>}
              {documentsStatus === 'ready' && documents.length > 0 && <div className="grid gap-4 lg:grid-cols-2">{documents.map((document) => <motion.article key={document.id} whileHover={cardHover} transition={{ duration: 0.25 }} className="rounded-2xl border border-line bg-fog p-5"><div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-teal shadow-sm"><FileText className="h-5 w-5" aria-hidden="true" /></span><span className="rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-[#66808a]">{documentTypeLabel[document.document_type] ?? 'Documento'}</span></div><p className="mt-5 text-xs font-semibold text-[#718a91]">Enviado em {formatDate(document.created_at)}</p><h2 className="mt-1 truncate font-bold text-ink">{document.file_name}</h2><p className="mt-1.5 text-sm text-[#66808a]">Arquivo protegido e vinculado a uma consulta da sua conta.</p><Button variant="ghost" className="mt-5 min-h-10 px-3 text-xs" icon={Download} disabled={downloadingDocumentId === document.id} onClick={() => downloadDocument(document)}>{downloadingDocumentId === document.id ? 'Preparando...' : 'Baixar documento'}</Button></motion.article>)}</div>}
            </motion.div>
          ) : (
            <motion.div key="historico" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="divide-y divide-line p-4 sm:p-7">
              {historyItems.map((item) => (
                <article key={item.date} className="flex flex-col gap-4 py-5 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mint text-teal"><History className="h-5 w-5" aria-hidden="true" /></span><div><p className="text-xs font-semibold text-[#718a91]">{item.date}</p><h2 className="mt-1 font-bold text-ink">{item.title}</h2><p className="mt-1 text-sm text-[#66808a]">{item.doctor} · {item.specialty}</p></div></div>
                  <Button variant="ghost" className="min-h-10 self-start px-4 text-xs sm:self-auto" onClick={() => setNotice(`Resumo de ${item.date} disponível.`)}>Ver resumo</Button>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Surface>
      <AnimatePresence>
        {notice && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]"><CircleCheck className="h-5 w-5 shrink-0 text-[#a6f0df]" aria-hidden="true" /><span className="min-w-0 flex-1">{notice}</span></motion.div>}
      </AnimatePresence>
    </main>
  )
}

function ProfilePage({ profile, setProfile }) {
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [draft, setDraft] = useState(profile)
  const fields = [
    { label: 'Nome completo', name: 'name', type: 'text', className: 'sm:col-span-2' },
    { label: 'E-mail', name: 'email', type: 'email' },
    { label: 'Telefone', name: 'phone', type: 'tel' },
    { label: 'Data de nascimento', name: 'birthDate', type: 'date' },
    { label: 'Cidade / UF', name: 'city', type: 'text' },
  ]

  useEffect(() => {
    if (!saved) return undefined
    const timer = window.setTimeout(() => setSaved(false), 3500)
    return () => window.clearTimeout(timer)
  }, [saved])

  useEffect(() => {
    if (!editing) {
      setDraft(profile)
    }
  }, [editing, profile])

  const saveProfile = () => {
    setProfile(draft)
    setEditing(false)
    setSaved(true)
  }

  const startEditing = () => {
    setDraft(profile)
    setEditing(true)
  }

  const cancelEditing = () => {
    setDraft(profile)
    setEditing(false)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Meu perfil" title="Gerencie seus dados." description="Mantenha suas informações atualizadas." action={editing ? <div className="flex flex-wrap items-center gap-2"><Button variant="ghost" onClick={cancelEditing}>Cancelar</Button><Button icon={Check} onClick={saveProfile}>Salvar alterações</Button></div> : <Button icon={UserRound} onClick={startEditing}>Editar dados</Button>} />
      <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <Surface className="h-fit text-center" hover={false}>
          <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85" alt={profile.name} className="mx-auto h-24 w-24 rounded-3xl object-cover" />
          <h2 className="mt-5 text-lg font-bold text-ink">{profile.name}</h2>
          <p className="mt-1 text-sm text-[#66808a]">Conta pessoal</p>
          <div className="mt-7 rounded-2xl bg-fog p-4 text-left"><div className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" /><p className="text-sm leading-6 text-[#5d777f]"><strong className="font-semibold text-ink">Privacidade</strong><br />Não informe CPF, endereço, dados de saúde ou documentos reais.</p></div></div>
        </Surface>
        <Surface hover={false}>
          <h2 className="text-lg font-bold text-ink">Informações pessoais</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map(({ label, name, type, className = '' }) => (
              <label key={name} className={className}><span className="mb-2 block text-sm font-semibold text-[#58717a]">{label}</span><input type={type} disabled={!editing} value={draft[name] ?? ''} onChange={(event) => setDraft((current) => ({ ...current, [name]: event.target.value }))} className="min-h-12 w-full rounded-xl border border-line bg-fog px-4 text-sm text-ink outline-none transition-all placeholder:text-[#91a5ab] enabled:bg-white enabled:focus:border-teal enabled:focus:ring-4 enabled:focus:ring-[#dff5f1] disabled:cursor-default" /></label>
            ))}
          </div>
          <div className="mt-8 border-t border-line pt-6"><p className="font-semibold text-ink">Segurança da conta</p><p className="mt-1 text-sm leading-6 text-[#66808a]">A conta utiliza autenticação para proteger o acesso às informações da consulta.</p><p className="mt-5 flex gap-2 rounded-xl bg-fog p-3 text-xs leading-5 text-[#66808a]"><CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />Este ambiente não deve receber dados de saúde ou documentos reais.</p></div>
        </Surface>
      </div>
      <AnimatePresence>{saved && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]"><CircleCheck className="h-5 w-5 shrink-0 text-[#a6f0df]" aria-hidden="true" /><span className="min-w-0 flex-1">Dados atualizados.</span></motion.div>}</AnimatePresence>
    </main>
  )
}

function AuthPage() {
  const [mode, setMode] = useState('signin')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isSignUp = mode === 'signup'

  const submit = async (event) => {
    event.preventDefault()
    setFeedback('')

    if (isSignUp && fullName.trim().length < 3) {
      setFeedback('Informe um nome com pelo menos três caracteres.')
      return
    }

    setSubmitting(true)
    const result = isSignUp
      ? await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: fullName.trim() } },
      })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password })

    setSubmitting(false)

    if (result.error) {
      const errorMessage = result.error.message.toLowerCase()
      setFeedback(
        errorMessage.includes('email rate limit')
          ? 'O Supabase atingiu o limite temporário de e-mails de confirmação. Aguarde antes de tentar novamente e não envie várias solicitações seguidas.'
          : result.error.message
      )
      return
    }

    if (isSignUp && !result.data.session) {
      setFeedback('Conta criada. Confira seu e-mail para confirmar o cadastro antes de entrar.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f5faf9] px-4 py-8 sm:grid sm:place-items-center sm:p-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-[1.02fr_.98fr]">
        <section className="bg-ocean p-7 text-white sm:p-10">
          <Brand />
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.16em] text-[#a6f0df]">Acesso online</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Organize sua jornada de atendimento.</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/75">Crie sua conta para organizar consultas, acompanhar a fila e acessar o atendimento online.</p>
          <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-white/80"><ShieldCheck className="mb-2 h-5 w-5 text-[#a6f0df]" aria-hidden="true" />Para sua privacidade, não informe CPF, endereço, informações de saúde, receitas ou documentos reais.</div>
        </section>
        <section className="p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal">Sua conta</p>
          <h2 className="mt-2 font-display text-3xl text-ink">{isSignUp ? 'Criar acesso' : 'Entrar na MedConnect'}</h2>
          <p className="mt-3 text-sm leading-6 text-[#66808a]">{isSignUp ? 'Crie sua conta de paciente para acessar a plataforma.' : 'Entre para acessar suas consultas e informações.'}</p>
          <form className="mt-7 space-y-5" onSubmit={submit}>
            {isSignUp && <label className="block"><span className="mb-2 block text-sm font-semibold text-[#58717a]">Nome completo</span><input required minLength="3" value={fullName} onChange={(event) => setFullName(event.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-all focus:border-teal focus:ring-4 focus:ring-[#dff5f1]" placeholder="Ex.: Joana da Silva" /></label>}
            <label className="block"><span className="mb-2 block text-sm font-semibold text-[#58717a]">E-mail</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-all focus:border-teal focus:ring-4 focus:ring-[#dff5f1]" placeholder="nome@exemplo.com" /></label>
            <label className="block"><span className="mb-2 block text-sm font-semibold text-[#58717a]">Senha</span><input required type="password" minLength="6" autoComplete={isSignUp ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition-all focus:border-teal focus:ring-4 focus:ring-[#dff5f1]" placeholder="No mínimo 6 caracteres" /></label>
            {feedback && <p role="alert" className="rounded-xl bg-fog p-3 text-sm leading-6 text-[#58717a]">{feedback}</p>}
            <Button type="submit" className="w-full" icon={ArrowRight} disabled={submitting}>{submitting ? 'Aguarde...' : isSignUp ? 'Criar conta' : 'Entrar'}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-[#66808a]">{isSignUp ? 'Já possui uma conta?' : 'Ainda não possui uma conta?'} <button type="button" onClick={() => { setMode(isSignUp ? 'signin' : 'signup'); setFeedback('') }} className="font-semibold text-teal hover:text-ocean">{isSignUp ? 'Entrar' : 'Criar conta'}</button></p>
        </section>
      </div>
    </main>
  )
}

function AuthGate() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session)
        setLoading(false)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) return <main className="grid min-h-screen place-items-center bg-[#f5faf9] p-6 text-center text-sm text-[#66808a]">Verificando sua conta...</main>
  if (!session) return <AuthPage />

  return <App session={session} />
}

function App({ session }) {
  const [active, setActive] = useState('inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [accountRole, setAccountRole] = useState('patient')
  const profileStorageKey = `medconnect-profile-${session.user.id}`
  const [profile, setProfile] = useState(() => {
    const accountProfile = {
      ...defaultProfile,
      name: session.user.user_metadata.full_name || defaultProfile.name,
      email: session.user.email || '',
    }

    try {
      const savedProfile = JSON.parse(window.localStorage.getItem(profileStorageKey))
      return savedProfile ? { ...accountProfile, ...savedProfile, email: session.user.email || '' } : accountProfile
    } catch {
      return accountProfile
    }
  })
  const shortName = profile.name.trim().split(' ')[0] || 'Paciente'
  const visibleNavItems = accountRole === 'doctor'
    ? navItems.filter((item) => ['inicio', 'atendimento'].includes(item.id))
    : navItems

  useEffect(() => {
    let cancelled = false

    async function loadAccountProfile() {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', session.user.id)
        .maybeSingle()

      if (cancelled || !data) return

      setAccountRole(data.role)
      setProfile((current) => ({
        ...current,
        name: data.full_name || current.name,
        email: session.user.email || '',
      }))
    }

    loadAccountProfile()

    return () => {
      cancelled = true
    }
  }, [session.user.id, session.user.email])

  useEffect(() => {
    window.localStorage.setItem(profileStorageKey, JSON.stringify(profile))
  }, [profile, profileStorageKey])

  useEffect(() => {
    if (accountRole === 'doctor') setActive('atendimento')
  }, [accountRole])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const goTo = (id) => {
    setActive(id)
    setMobileOpen(false)
    setProfileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const page = {
    inicio: <HomePage goTo={goTo} />,
    agendar: <SchedulePage />,
    fila: <QueuePage goTo={goTo} />,
    atendimento: <AppointmentPage accountRole={accountRole} profile={profile} session={session} />,
    registros: <RecordsPage session={session} />,
    perfil: <ProfilePage profile={profile} setProfile={setProfile} />,
  }[active]

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="medconnect-shell">
      <header className="sticky top-0 z-50 border-b border-[#e5eeec]/80 bg-white/84 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 lg:px-8">
          <button onClick={() => goTo('inicio')} aria-label="Ir para a página inicial" className="rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"><Brand /></button>
          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {visibleNavItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => goTo(id)} className={`relative inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal ${active === id ? 'text-ocean' : 'text-[#64808a] hover:text-ocean'}`}>
                {active === id && <motion.span layoutId="navigation-indicator" className="absolute inset-0 rounded-xl bg-[#e7f5f3]" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                <Icon className="relative h-4 w-4" aria-hidden="true" /><span className="relative">{label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <button aria-label="Notificações" className="relative hidden h-10 w-10 place-items-center rounded-xl text-[#5e7981] transition-colors hover:bg-fog hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal sm:grid"><Bell className="h-[18px] w-[18px]" aria-hidden="true" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal" /></button>
            <div className="relative hidden sm:block">
              <button onClick={() => setProfileOpen((current) => !current)} aria-expanded={profileOpen} aria-label="Abrir menu do perfil" className="flex items-center gap-2.5 rounded-2xl p-1.5 pr-2.5 transition-colors hover:bg-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt={profile.name} className="h-9 w-9 rounded-xl object-cover" /><span className="text-left"><span className="block text-sm font-bold leading-4 text-ink">{shortName}</span><span className="block text-[0.69rem] leading-4 text-[#789099]">{accountRole === 'doctor' ? 'Profissional' : 'Paciente'}</span></span></button>
              <AnimatePresence>
                {profileOpen && <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.18 }} className="absolute right-0 top-[calc(100%+12px)] w-56 rounded-2xl border border-line bg-white p-2 shadow-lift"><button onClick={() => goTo('perfil')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink transition-colors hover:bg-fog"><UserRound className="h-4 w-4 text-teal" aria-hidden="true" />Meu perfil</button><button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#6e858d] transition-colors hover:bg-fog"><LogOut className="h-4 w-4" aria-hidden="true" />Sair da conta</button></motion.div>}
              </AnimatePresence>
            </div>
            <button onClick={() => setMobileOpen((current) => !current)} className="grid h-10 w-10 place-items-center rounded-xl text-ocean transition-colors hover:bg-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal lg:hidden" aria-label={mobileOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden border-t border-line bg-white lg:hidden" aria-label="Navegação móvel"><div className="grid gap-1 px-4 py-4 sm:px-6">{visibleNavItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => goTo(id)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${active === id ? 'bg-[#e7f5f3] text-ocean' : 'text-[#64808a]'}`}><Icon className="h-4 w-4" aria-hidden="true" />{label}</button>)}<button onClick={() => goTo('perfil')} className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#64808a]"><UserRound className="h-4 w-4" aria-hidden="true" />Meu perfil</button></div></motion.nav>}
        </AnimatePresence>
      </header>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: 'easeOut' }}>{page}</motion.div>
      </AnimatePresence>
      <footer className="border-t border-line bg-white px-4 py-8 sm:px-6 sm:py-9 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-center text-sm text-[#70888f] sm:flex-row sm:items-center sm:justify-between sm:text-left"><div className="self-center sm:self-auto"><Brand /></div><p>© 2026 MedConnect · Davi Grigato & Gustavo Queiroz.</p><div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal sm:justify-start"><ShieldCheck className="h-4 w-4" aria-hidden="true" />Organização e praticidade</div></div></footer>
      </LayoutGroup>
    </MotionConfig>
  )
}

export default AuthGate
