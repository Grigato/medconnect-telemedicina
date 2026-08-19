import React, { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion'
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
  Send,
  ShieldCheck,
  Star,
  Stethoscope,
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
  name: 'Joana da Silva',
  email: 'joana.silva@email.com',
  phone: '(11) 99876-5412',
  birthDate: '1992-08-14',
  city: 'São Paulo, SP',
}

const defaultMessages = [
  { id: 'welcome', author: 'doctor', text: 'Olá, Joana. Sou a Dra. Helena. Quando estiver confortável, pode me enviar uma mensagem por aqui.' },
  { id: 'ready', author: 'doctor', text: 'Assim que a consulta começar, enviarei o convite da sala de vídeo por este chat.' },
]

const records = [
  { date: '02 ago 2026', title: 'Receita digital (exemplo)', detail: 'Perfil demonstrativo · Clínica geral', tag: 'Demonstração' },
  { date: '14 jul 2026', title: 'Pedido de exame (exemplo)', detail: 'Perfil demonstrativo · Cardiologia', tag: 'Demonstração' },
]

const historyItems = [
  { date: '02 ago 2026', title: 'Consulta de rotina (exemplo)', doctor: 'Perfil demonstrativo', specialty: 'Clínica geral' },
  { date: '14 jul 2026', title: 'Avaliação preventiva (exemplo)', doctor: 'Perfil demonstrativo', specialty: 'Cardiologia' },
  { date: '21 jun 2026', title: 'Orientação de exames (exemplo)', doctor: 'Perfil demonstrativo', specialty: 'Clínica geral' },
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
                A MedConnect é um protótipo para organizar consultas online, fila virtual e o acesso à sala de atendimento.
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
                <span>Perfis e dados usados apenas para demonstração.</span>
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
                        <p className="text-sm font-semibold">Agendamento demonstrativo</p>
                        <p className="mt-0.5 text-xs text-white/66">Exemplo de consulta · Clínica geral</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#49d7c3]/20 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-[#a6f0df]">Exemplo</span>
                  </div>
                </div>
              </motion.div>
              <motion.div whileHover={cardHover} transition={{ duration: 0.25 }} className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/60 bg-white/95 p-4 shadow-card backdrop-blur sm:block lg:-left-12">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-teal"><ShieldCheck className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  <div><p className="text-xs font-bold text-ink">Acesso organizado</p><p className="mt-0.5 text-[0.68rem] text-[#66808a]">Fluxo demonstrativo</p></div>
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
            { title: 'Ver registros', description: 'Visualize exemplos de documentos e histórico de consultas.', icon: FileText, action: 'registros', tone: 'bg-[#f0edff] text-[#7460c6]' },
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
  const [selectedDoctorId, setSelectedDoctorId] = useState('helena-freire')
  const [selectedTime, setSelectedTime] = useState('14:30')
  const [confirmed, setConfirmed] = useState(false)
  const availableTimes = ['10:00', '11:30', '14:30', '16:00', '18:15']
  const availableDoctors = doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
  const selectedDoctor = availableDoctors.find((doctor) => doctor.id === selectedDoctorId) ?? availableDoctors[0]

  useEffect(() => {
    setSelectedDoctorId(availableDoctors[0].id)
  }, [selectedSpecialty])

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Agendamento" title="Escolha uma opção para sua consulta." description="Selecione uma especialidade, um perfil demonstrativo e um horário para visualizar o fluxo de agendamento." />
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <Surface className="h-fit !bg-ocean text-white" hover={false}>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a6f0df]">Fluxo do protótipo</p>
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
                  <motion.button key={name} type="button" whileTap={{ scale: 0.98 }} onClick={() => { setSelectedSpecialty(name); setConfirmed(false) }} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${selected ? 'border-teal bg-[#effaf8] shadow-sm' : 'border-line bg-white hover:border-[#bcd6d1]'}`}>
                    <span className={`grid h-9 w-9 place-items-center rounded-xl ${accent}`}><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                    <span className="text-sm font-semibold text-ink">{name}</span>
                    {selected && <Check className="ml-auto h-4 w-4 text-teal" aria-label="Selecionado" />}
                  </motion.button>
                )
              })}
            </div>
          </Surface>

          <Surface hover={false}>
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-sm font-bold text-teal">2</span><div><h2 className="text-lg font-bold text-ink">Escolha um perfil</h2><p className="mt-0.5 text-sm text-[#66808a]">Perfis demonstrativos em {selectedSpecialty}.</p></div></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {availableDoctors.map((doctor) => {
                const selected = doctor.id === selectedDoctor.id
                return (
                  <motion.button key={doctor.id} type="button" whileTap={{ scale: 0.98 }} onClick={() => { setSelectedDoctorId(doctor.id); setConfirmed(false) }} className={`relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${selected ? 'border-teal bg-[#effaf8] shadow-sm' : 'border-line bg-fog hover:border-[#bcd6d1]'}`}>
                    <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src={doctor.image} alt={doctor.name} className="h-12 w-12 rounded-xl object-cover" />
                    <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-1.5"><span className="truncate text-sm font-bold text-ink">{doctor.name}</span><span className="inline-flex items-center gap-1 text-[0.68rem] font-bold text-[#bd8a11]"><Star className="h-3 w-3 fill-current" />{doctor.rating}</span></span><span className="mt-1 block text-xs text-[#66808a]">{doctor.experience}</span><span className="mt-2 block text-xs font-semibold text-teal">{doctor.availability}</span></span>
                    {selected && <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal text-white"><Check className="h-3 w-3" aria-label="Selecionado" /></span>}
                  </motion.button>
                )
              })}
            </div>
            <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-fog p-4 min-[480px]:flex-row min-[480px]:items-center">
              <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src={selectedDoctor.image} alt={selectedDoctor.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div className="flex-1"><p className="font-bold text-ink">{selectedDoctor.name}</p><p className="mt-1 text-sm text-[#66808a]">{selectedDoctor.specialty} · {selectedDoctor.crm}</p></div>
              <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#58717a]">Atendimento online</span>
            </div>
          </Surface>

          <Surface hover={false}>
            <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-sm font-bold text-teal">3</span><h2 className="text-lg font-bold text-ink">Selecione um horário</h2></div>
            <div className="mt-6 grid grid-cols-2 gap-3 min-[390px]:grid-cols-3 sm:flex sm:flex-wrap">
              {availableTimes.map((time) => (
                <motion.button key={time} type="button" whileTap={{ scale: 0.96 }} onClick={() => setSelectedTime(time)} className={`min-w-0 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:min-w-[84px] ${selectedTime === time ? 'border-teal bg-teal text-white' : 'border-line text-[#56707a] hover:border-teal hover:text-ocean'}`}>{time}</motion.button>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="min-w-0 text-sm text-[#5d777f]"><strong className="font-semibold text-ink">Hoje, {selectedTime}</strong> · Com {selectedDoctor.name}</p>
              <Button icon={Calendar} className="w-full sm:w-auto" onClick={() => setConfirmed(true)}>Confirmar consulta</Button>
            </div>
          </Surface>
        </div>
      </div>
      <AnimatePresence>
        {confirmed && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#a6f0df] text-ocean"><Check className="h-5 w-5" aria-hidden="true" /></span>
            <span className="min-w-0 flex-1"><strong className="font-semibold">Agendamento demonstrativo concluído.</strong> O fluxo com {selectedDoctor.name} foi atualizado nesta tela.</span>
            <button className="ml-auto shrink-0 text-white/70 hover:text-white" onClick={() => setConfirmed(false)} aria-label="Fechar confirmação"><X className="h-4 w-4" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function QueuePage({ goTo }) {
  const [position, setPosition] = useState(3)
  const [expanded, setExpanded] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setTipIndex((current) => (current + 1) % tips.length), 4800)
    return () => window.clearInterval(timer)
  }, [])

  const nextPosition = () => setPosition((current) => (current > 1 ? current - 1 : current))

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Sala de espera" title="Você está quase lá." description="Acompanhe sua posição e fique à vontade. Avisaremos assim que o profissional estiver pronto para receber você." />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0b5966_0%,#0d8085_100%)] p-5 text-white shadow-soft sm:p-9">
          <div className="flex flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:justify-between"><StatusPill /><span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80">Clínica geral</span></div>
          <div className="mt-10 grid gap-8 sm:grid-cols-[.95fr_1.05fr] sm:items-end">
            <div>
              <p className="text-sm text-white/68">Simulação da posição na fila</p>
              <p className="mt-2 font-display text-6xl tracking-[-0.05em] text-white">Exemplo</p>
              <p className="mt-3 text-sm leading-6 text-white/74">Use este fluxo para visualizar como o paciente acompanha a fila antes de acessar o atendimento.</p>
              <Button variant="light" icon={Video} className="mt-7 w-full min-[420px]:w-auto" onClick={() => (position === 1 ? goTo('atendimento') : nextPosition())}>{position === 1 ? 'Ir para atendimento' : 'Simular atualização'}</Button>
            </div>
            <motion.div key={position} initial={{ opacity: 0, scale: 0.92, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} aria-live="polite" className="rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a6f0df]">Sua posição na fila</p>
              <p className="mt-3 font-display text-7xl tracking-[-0.05em]">{position}</p>
              <p className="mt-2 text-sm text-white/68">{position === 1 ? 'Você é a próxima pessoa.' : `${position - 1} pessoa${position - 1 > 1 ? 's' : ''} antes de você.`}</p>
            </motion.div>
          </div>
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
            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=180&q=85" alt="Dra. Helena Freire" className="h-14 w-14 rounded-2xl object-cover" />
            <div><p className="font-bold text-ink">Dra. Helena Freire</p><p className="mt-1 text-sm text-[#66808a]">Clínica geral · CRM 48.291</p></div>
          </div>
          <div className="flex w-full flex-col gap-2 min-[440px]:w-auto min-[440px]:flex-row"><Button variant="ghost" className="min-h-11 w-full px-4 min-[440px]:w-auto" icon={Phone}>Suporte</Button><Button variant="soft" className="min-h-11 w-full px-4 min-[440px]:w-auto" icon={Wifi}>Testar conexão</Button></div>
        </Surface>
      </div>
    </main>
  )
}

function AppointmentPage({ profile }) {
  const [mode, setMode] = useState('patient')
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = JSON.parse(window.localStorage.getItem('medconnect-consultation-chat'))
      return Array.isArray(savedMessages) && savedMessages.length ? savedMessages : defaultMessages
    } catch {
      return defaultMessages
    }
  })
  const [draft, setDraft] = useState('')
  const [platform, setPlatform] = useState('Google Meet')
  const [meetingUrl, setMeetingUrl] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    window.localStorage.setItem('medconnect-consultation-chat', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (!feedback) return undefined
    const timer = window.setTimeout(() => setFeedback(''), 3500)
    return () => window.clearTimeout(timer)
  }, [feedback])

  const submitText = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, { id: `message-${Date.now()}`, author: mode, text }])
    setDraft('')
  }

  const sendMeetingInvite = () => {
    try {
      const url = new URL(meetingUrl.trim())
      if (url.protocol !== 'https:') throw new Error('invalid-url')
      setMessages((current) => [...current, { id: `meeting-${Date.now()}`, author: 'doctor', text: 'Sua sala de atendimento está pronta. Entre quando estiver confortável.', platform, meetingUrl: url.toString() }])
      setMeetingUrl('')
      setFeedback('Convite de vídeo enviado para a conversa.')
    } catch {
      setFeedback('Use um link seguro iniciado por https:// para enviar o convite.')
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Atendimento online" title="Uma conversa organizada para a consulta." description="No protótipo, o profissional compartilha pelo chat um link de videochamada criado em uma plataforma externa." />
      <div className="grid gap-6 lg:grid-cols-[.74fr_1.26fr]">
        <div className="space-y-6">
          <Surface hover={false} className="overflow-hidden !bg-ocean text-white">
            <div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/12 text-[#a6f0df]"><Video className="h-5 w-5" aria-hidden="true" /></span><span className="rounded-full bg-[#a6f0df]/15 px-3 py-1.5 text-xs font-bold text-[#a6f0df]">Demonstração</span></div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.15em] text-[#a6f0df]">Horário ilustrativo</p>
            <h2 className="mt-2 font-display text-3xl leading-tight">Clínica geral com perfil demonstrativo</h2>
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"><motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src={doctors[0].image} alt="Dra. Helena Freire" className="h-11 w-11 rounded-xl object-cover" /><div><p className="text-sm font-bold">Dra. Helena Freire</p><p className="mt-0.5 text-xs text-white/66">CRM 48.291 · Clínica geral</p></div></div>
          </Surface>
          <Surface hover={false}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-teal"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="mt-4 font-bold text-ink">Como funciona</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-[#5d777f]">
              {['Envie uma dúvida pelo chat se precisar.', 'Aguarde o profissional compartilhar o convite.', 'Abra o link e confirme sua entrada na plataforma escolhida.'].map((item, index) => <li key={item} className="flex gap-3"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint text-[0.68rem] font-bold text-teal">{index + 1}</span>{item}</li>)}
            </ol>
          </Surface>
        </div>

        <Surface hover={false} className="flex min-h-0 flex-col p-0 sm:min-h-[610px]">
          <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-teal"><MessageCircle className="h-5 w-5" aria-hidden="true" /></span><div><h2 className="font-bold text-ink">Chat da consulta</h2><p className="mt-0.5 text-xs text-[#66808a]">Dra. Helena Freire está disponível</p></div></div>
            <LayoutGroup id="consultation-mode">
              <div className="relative flex w-fit rounded-xl bg-fog p-1" aria-label="Visão de demonstração">
                {[['patient', 'Paciente'], ['doctor', 'Profissional']].map(([id, label]) => <button key={id} onClick={() => setMode(id)} className={`relative z-10 rounded-lg px-3 py-2 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${mode === id ? 'text-ocean' : 'text-[#789099]'}`}>{mode === id && <motion.span layoutId="consultation-mode-active" className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm" transition={{ type: 'spring', stiffness: 430, damping: 32 }} />}{label}</button>)}
              </div>
            </LayoutGroup>
          </div>
          <div className="border-b border-line bg-[#fbfdfd] px-5 py-3 text-xs leading-5 text-[#6c858d] sm:px-7"><CircleHelp className="mr-1.5 inline h-3.5 w-3.5 text-teal" aria-hidden="true" />Modo de demonstração: em produção, o acesso de paciente e profissional é definido pelo login de cada conta.</div>
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-6 sm:px-7">
            <AnimatePresence initial={false}>
              {messages.map((message) => {
                const isOwn = message.author === mode
                const author = message.author === 'doctor' ? 'Dra. Helena Freire' : profile.name || 'Paciente'
                return (
                  <motion.article key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex max-w-full gap-2.5 min-[420px]:max-w-[88%] ${isOwn ? 'ml-auto flex-row-reverse' : ''}`}>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold ${message.author === 'doctor' ? 'bg-mint text-teal' : 'bg-[#e9f1f3] text-ocean'}`}>{message.author === 'doctor' ? 'HF' : (profile.name || 'P').split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                    <div className={`rounded-2xl px-4 py-3 ${isOwn ? 'bg-ocean text-white' : 'bg-fog text-ink'}`}><p className={`mb-1 text-[0.67rem] font-bold ${isOwn ? 'text-white/66' : 'text-[#6d858d]'}`}>{author}</p><p className="text-sm leading-6">{message.text}</p>{message.meetingUrl && <a href={message.meetingUrl} target="_blank" rel="noreferrer" className={`mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs font-bold transition-colors ${isOwn ? 'bg-white text-ocean hover:bg-[#eaf8f6]' : 'bg-teal text-white hover:bg-[#0a9793]'}`}><Video className="h-4 w-4" aria-hidden="true" />Entrar pelo {message.platform}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}</div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </div>
          {mode === 'doctor' && <div className="border-t border-line bg-fog px-5 py-4 sm:px-7"><div className="flex items-center gap-2"><Link2 className="h-4 w-4 text-teal" aria-hidden="true" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-ocean">Enviar convite de vídeo</p></div><div className="mt-3 grid gap-2 sm:grid-cols-[150px_1fr_auto]"><select value={platform} onChange={(event) => setPlatform(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink outline-none focus:border-teal focus:ring-4 focus:ring-[#dff5f1]"><option>Google Meet</option><option>Zoom</option><option>Jitsi Meet</option></select><input value={meetingUrl} onChange={(event) => setMeetingUrl(event.target.value)} placeholder="Cole o link seguro da reunião" className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-[#91a5ab] focus:border-teal focus:ring-4 focus:ring-[#dff5f1]" /><Button className="min-h-11 w-full px-4 sm:w-auto" icon={Link2} onClick={sendMeetingInvite}>Enviar</Button></div><p className="mt-2 text-xs leading-5 text-[#6c858d]">Use o link criado pelo profissional na plataforma escolhida. Nunca envie informações clínicas sensíveis no link.</p></div>}
          <div className="border-t border-line p-4 sm:px-7"><div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-end"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitText() } }} rows="2" placeholder={mode === 'doctor' ? 'Escreva uma orientação para o paciente...' : 'Escreva uma mensagem para a médica...'} className="min-h-[54px] w-full flex-1 resize-none rounded-2xl border border-line bg-fog px-4 py-3 text-sm text-ink outline-none placeholder:text-[#91a5ab] focus:border-teal focus:bg-white focus:ring-4 focus:ring-[#dff5f1]" /><Button className="min-h-[54px] w-full px-4 min-[480px]:w-auto" icon={Send} onClick={submitText} aria-label="Enviar mensagem">Enviar</Button></div></div>
        </Surface>
      </div>
      <AnimatePresence>{feedback && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]"><CircleCheck className="h-5 w-5 shrink-0 text-[#a6f0df]" aria-hidden="true" /><span className="min-w-0 flex-1">{feedback}</span></motion.div>}</AnimatePresence>
    </main>
  )
}

function RecordsPage() {
  const [tab, setTab] = useState('receitas')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Registros" title="Exemplos de documentos e histórico." description="Esta área apresenta como receitas, pedidos e atendimentos poderiam ser organizados para o paciente." />
      <Surface hover={false} className="p-0">
        <LayoutGroup id="records-tabs">
          <div className="flex gap-1 border-b border-line px-5 pt-3 sm:px-7">
            {[['receitas', 'Receitas e pedidos', FileText], ['historico', 'Histórico de consultas', History]].map(([id, label, Icon]) => (
              <button key={id} onClick={() => setTab(id)} className={`relative inline-flex min-h-14 items-center gap-2 px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal sm:px-5 ${tab === id ? 'text-ocean' : 'text-[#789099] hover:text-ocean'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{label}</span><span className="sm:hidden">{id === 'receitas' ? 'Receitas' : 'Histórico'}</span>
                {tab === id && <motion.span layoutId="records-active-tab" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-teal sm:inset-x-5" transition={{ type: 'spring', stiffness: 430, damping: 32 }} />}
              </button>
            ))}
          </div>
        </LayoutGroup>
        <AnimatePresence mode="wait">
          {tab === 'receitas' ? (
            <motion.div key="receitas" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="p-4 sm:p-7">
              <div className="grid gap-4 lg:grid-cols-2">
                {records.map((record) => (
                  <motion.article key={record.title} whileHover={cardHover} transition={{ duration: 0.25 }} className="rounded-2xl border border-line bg-fog p-5">
                    <div className="flex items-start justify-between gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-teal shadow-sm"><FileText className="h-5 w-5" aria-hidden="true" /></span><span className="rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold text-[#66808a]">{record.tag}</span></div>
                    <p className="mt-5 text-xs font-semibold text-[#718a91]">{record.date}</p>
                    <h2 className="mt-1 font-bold text-ink">{record.title}</h2>
                    <p className="mt-1.5 text-sm text-[#66808a]">{record.detail}</p>
                    <button onClick={() => setNotice(`${record.title} aberto em modo demonstrativo.`)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal">Visualizar documento <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                  </motion.article>
                ))}
              </div>
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

  const saveProfile = () => {
    setEditing(false)
    setSaved(true)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <PageHeading eyebrow="Meu perfil" title="Edite seus dados de demonstração." description="Use esta tela para visualizar como uma pessoa poderia atualizar suas informações básicas." action={<Button variant={editing ? 'soft' : 'primary'} icon={editing ? Check : UserRound} onClick={() => (editing ? saveProfile() : setEditing(true))}>{editing ? 'Salvar alterações' : 'Editar dados'}</Button>} />
      <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <Surface className="h-fit text-center" hover={false}>
          <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=85" alt={profile.name} className="mx-auto h-24 w-24 rounded-3xl object-cover" />
          <h2 className="mt-5 text-lg font-bold text-ink">{profile.name}</h2>
          <p className="mt-1 text-sm text-[#66808a]">Perfil de demonstração</p>
          <div className="mt-7 rounded-2xl bg-fog p-4 text-left"><div className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" /><p className="text-sm leading-6 text-[#5d777f]"><strong className="font-semibold text-ink">Perfil atualizado</strong><br />Você controla os dados exibidos nesta demonstração.</p></div></div>
        </Surface>
        <Surface hover={false}>
          <h2 className="text-lg font-bold text-ink">Informações pessoais</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map(({ label, name, type, className = '' }) => (
              <label key={name} className={className}><span className="mb-2 block text-sm font-semibold text-[#58717a]">{label}</span><input type={type} disabled={!editing} value={profile[name]} onChange={(event) => setProfile((current) => ({ ...current, [name]: event.target.value }))} className="min-h-12 w-full rounded-xl border border-line bg-fog px-4 text-sm text-ink outline-none transition-all placeholder:text-[#91a5ab] enabled:bg-white enabled:focus:border-teal enabled:focus:ring-4 enabled:focus:ring-[#dff5f1] disabled:cursor-default" /></label>
            ))}
          </div>
          <div className="mt-8 border-t border-line pt-6"><p className="font-semibold text-ink">Limites do protótipo</p><p className="mt-1 text-sm leading-6 text-[#66808a]">Nesta versão, a edição serve para demonstrar o fluxo de atualização de perfil.</p><p className="mt-5 flex gap-2 rounded-xl bg-fog p-3 text-xs leading-5 text-[#66808a]"><CircleHelp className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" />As alterações ficam somente neste navegador. Uma versão real precisaria de login, banco de dados e controles adequados para guardar informações de saúde.</p></div>
        </Surface>
      </div>
      <AnimatePresence>{saved && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }} role="status" className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl bg-ocean p-4 text-sm text-white shadow-soft sm:bottom-6 sm:w-[calc(100%-3rem)]"><CircleCheck className="h-5 w-5 shrink-0 text-[#a6f0df]" aria-hidden="true" /><span className="min-w-0 flex-1">Dados atualizados nesta demonstração.</span></motion.div>}</AnimatePresence>
    </main>
  )
}

function App() {
  const [active, setActive] = useState('inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = JSON.parse(window.localStorage.getItem('medconnect-profile'))
      return savedProfile ? { ...defaultProfile, ...savedProfile } : defaultProfile
    } catch {
      return defaultProfile
    }
  })
  const shortName = profile.name.trim().split(' ')[0] || 'Paciente'

  useEffect(() => {
    window.localStorage.setItem('medconnect-profile', JSON.stringify(profile))
  }, [profile])

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
    atendimento: <AppointmentPage profile={profile} />,
    registros: <RecordsPage />,
    perfil: <ProfilePage profile={profile} setProfile={setProfile} />,
  }[active]

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup id="medconnect-shell">
      <header className="sticky top-0 z-50 border-b border-[#e5eeec]/80 bg-white/84 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-6 lg:px-8">
          <button onClick={() => goTo('inicio')} aria-label="Ir para a página inicial" className="rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"><Brand /></button>
          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => goTo(id)} className={`relative inline-flex min-h-10 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal ${active === id ? 'text-ocean' : 'text-[#64808a] hover:text-ocean'}`}>
                {active === id && <motion.span layoutId="navigation-indicator" className="absolute inset-0 rounded-xl bg-[#e7f5f3]" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
                <Icon className="relative h-4 w-4" aria-hidden="true" /><span className="relative">{label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <button aria-label="Notificações" className="relative hidden h-10 w-10 place-items-center rounded-xl text-[#5e7981] transition-colors hover:bg-fog hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal sm:grid"><Bell className="h-[18px] w-[18px]" aria-hidden="true" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal" /></button>
            <div className="relative hidden sm:block">
              <button onClick={() => setProfileOpen((current) => !current)} aria-expanded={profileOpen} aria-label="Abrir menu do perfil" className="flex items-center gap-2.5 rounded-2xl p-1.5 pr-2.5 transition-colors hover:bg-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt={profile.name} className="h-9 w-9 rounded-xl object-cover" /><span className="text-left"><span className="block text-sm font-bold leading-4 text-ink">{shortName}</span><span className="block text-[0.69rem] leading-4 text-[#789099]">Paciente</span></span></button>
              <AnimatePresence>
                {profileOpen && <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.18 }} className="absolute right-0 top-[calc(100%+12px)] w-56 rounded-2xl border border-line bg-white p-2 shadow-lift"><button onClick={() => goTo('perfil')} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-ink transition-colors hover:bg-fog"><UserRound className="h-4 w-4 text-teal" aria-hidden="true" />Meu perfil</button><button onClick={() => setProfileOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#6e858d] transition-colors hover:bg-fog"><LogOut className="h-4 w-4" aria-hidden="true" />Sair da conta</button></motion.div>}
              </AnimatePresence>
            </div>
            <button onClick={() => setMobileOpen((current) => !current)} className="grid h-10 w-10 place-items-center rounded-xl text-ocean transition-colors hover:bg-fog focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal lg:hidden" aria-label={mobileOpen ? 'Fechar navegação' : 'Abrir navegação'} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden border-t border-line bg-white lg:hidden" aria-label="Navegação móvel"><div className="grid gap-1 px-4 py-4 sm:px-6">{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => goTo(id)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold ${active === id ? 'bg-[#e7f5f3] text-ocean' : 'text-[#64808a]'}`}><Icon className="h-4 w-4" aria-hidden="true" />{label}</button>)}<button onClick={() => goTo('perfil')} className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#64808a]"><UserRound className="h-4 w-4" aria-hidden="true" />Meu perfil</button></div></motion.nav>}
        </AnimatePresence>
      </header>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: 'easeOut' }}>{page}</motion.div>
      </AnimatePresence>
      <footer className="border-t border-line bg-white px-4 py-8 sm:px-6 sm:py-9 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-center text-sm text-[#70888f] sm:flex-row sm:items-center sm:justify-between sm:text-left"><div className="self-center sm:self-auto"><Brand /></div><p>© 2026 MedConnect · Projeto acadêmico de TCC.</p><div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal sm:justify-start"><ShieldCheck className="h-4 w-4" aria-hidden="true" />Protótipo acadêmico</div></div></footer>
      </LayoutGroup>
    </MotionConfig>
  )
}

export default App
