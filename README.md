# 🩺 MedConnect

### Plataforma web para organização do atendimento remoto

Projeto acadêmico desenvolvido para organizar etapas remotas da jornada do paciente em uma única interface. A MedConnect reúne descoberta de profissionais, agendamento, fila, atendimento por chat, compartilhamento de link externo e acesso a documentos vinculados à consulta.

🔗 **Acesso público:** [medconnect-telemedicina-phi.vercel.app](https://medconnect-telemedicina-phi.vercel.app)

> [!IMPORTANT]
> A MedConnect utiliza exclusivamente contas, profissionais, horários, mensagens e arquivos fictícios. Não é uma clínica, não realiza teleconsultas e não deve receber CPF, endereço, informações de saúde ou documentos reais.

## ✨ Funcionalidades

- **Acesso e perfis:** cadastro, confirmação por e-mail, login e perfis com papéis de paciente ou profissional.
- **Catálogo e agendamento:** profissionais fictícios, horários disponíveis e reserva persistida com prevenção de conflito.
- **Sala de espera:** fila associada à consulta e visível somente à conta participante.
- **Atendimento:** chat privado por consulta e convite HTTPS para uma plataforma externa de vídeo.
- **Documentos:** envio, acesso e download autorizado de PDFs, imagens JPEG e PNG fictícios.
- **Meus registros:** documentos da consulta disponíveis em uma área própria para o paciente.
- **Responsividade:** interface adaptada para telas menores e maiores.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
| --- | --- |
| React + Vite | Interface web e ambiente de desenvolvimento |
| Tailwind CSS | Estilização responsiva |
| Framer Motion | Transições e feedback visual |
| Lucide React | Ícones da interface |
| Supabase Auth | Cadastro e autenticação |
| PostgreSQL + RLS | Persistência e regras de acesso por registro |
| Supabase Storage | Arquivos privados vinculados às consultas |
| Vercel | Publicação da aplicação |

## ▶️ Como executar localmente

### Pré-requisitos

- Node.js LTS
- Um projeto Supabase configurado para o ambiente acadêmico

### 1. Baixe o projeto

```powershell
git clone https://github.com/Grigato/medconnect-telemedicina.git
cd medconnect-telemedicina
```

### 2. Configure as variáveis de ambiente

```powershell
Copy-Item .env.example .env.local
```

Preencha o arquivo `.env.local` com a URL e a chave **publishable** do projeto Supabase:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICA
```

Nunca use uma chave `service_role` ou administrativa no front-end, nem envie `.env.local` ao GitHub.

### 3. Instale e inicie

```powershell
npm.cmd ci
npm.cmd run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## 🗃️ Banco de dados

Os scripts SQL versionados estão em [`supabase/`](supabase/). Eles registram as tabelas e políticas aplicadas durante a evolução do projeto:

- perfis e autenticação;
- horários e consultas;
- fila;
- mensagens privadas;
- associação de conta profissional;
- documentos privados.

Execute apenas scripts que ainda não foram aplicados ao projeto Supabase. A tabela base `professionals`, contendo o catálogo fictício, deve existir antes das demais etapas.

## 📁 Estrutura do projeto

```text
medconnect-telemedicina/
├── src/
│   ├── App.jsx                 # Interface e fluxos da aplicação
│   └── lib/supabaseClient.js   # Cliente do Supabase
├── supabase/                   # Scripts SQL e políticas RLS
├── .env.example                # Modelo de variáveis de ambiente
└── package.json                # Dependências e comandos
```

## ✅ Verificação de produção

```powershell
npm.cmd run build
```

Após enviar alterações para a branch `main`, a Vercel cria uma nova publicação automaticamente.

## 🔒 Escopo acadêmico

O projeto demonstra a viabilidade técnica de organizar um fluxo remoto com dados fictícios. Estão fora do escopo: prontuário clínico, videochamada hospedada, prescrição digital válida, pagamentos, dados reais, testes de desempenho, validação de segurança abrangente e estudo de usabilidade com participantes.

## 👥 Equipe

- Davi Grigato Escano Rodrigues
- Gustavo Queiroz Lacerda
- Rafael Teixeira dos Santos

Trabalho de Conclusão de Curso em Sistemas de Informação — UGB/FERP.
