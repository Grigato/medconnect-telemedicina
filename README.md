# MedConnect

Projeto acadêmico de uma plataforma web para organizar agendamentos e teleatendimentos. A aplicação utiliza somente contas, profissionais, horários, mensagens e arquivos fictícios para fins de desenvolvimento e apresentação do TCC.

## Tecnologias

- React
- Tailwind CSS
- Framer Motion
- Lucide React
- Vite
- Supabase Auth
- PostgreSQL e Storage do Supabase

## Requisitos

- Node.js LTS
- Git, apenas para baixar e sincronizar o projeto pelo GitHub

## Abrir em outro computador

No terminal, escolha uma pasta e execute:

```bash
git clone https://github.com/Grigato/medconnect-telemedicina.git
cd medconnect-telemedicina
npm.cmd install
npm.cmd run dev
```

Depois, abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

Antes de iniciar, crie um arquivo `.env.local` na raiz a partir de `.env.example` e informe a URL e a chave pública do projeto Supabase. Essas variáveis também devem ser cadastradas na plataforma de hospedagem. Nunca use uma chave administrativa `service_role` no front-end.

## Gerar versão de produção

```bash
npm.cmd run build
```

## Escopo atual

As entregas implementadas até agora são:

- Cadastro, confirmação de e-mail, entrada e saída de contas de paciente.
- Perfis com papéis de paciente ou profissional e políticas RLS no Supabase.
- Catálogo de profissionais, horários e agendamento persistido, com prevenção de reserva duplicada.
- Fila vinculada à consulta agendada.
- Chat privado por consulta e convite HTTPS para uma sala de vídeo externa.
- Área profissional restrita às consultas atribuídas à conta autenticada.
- Anexos privados por consulta: profissional pode incluir prescrições e solicitações; paciente pode incluir resultados de exames e imagens. Os arquivos são armazenados no bucket privado `appointment-documents` e liberados somente aos participantes da consulta.

Não há videochamada hospedada pela MedConnect, prontuário clínico real, pagamentos, nem permissão para usar informações pessoais, dados de saúde ou documentos reais.

## Banco de dados e migrações

Os scripts SQL ficam em [`supabase/`](supabase). Eles devem ser executados na ordem numérica no SQL Editor do projeto Supabase. Eles registram a estrutura e as políticas de segurança aplicadas a cada etapa; não execute novamente um script já aplicado sem primeiro conferir o estado do banco.

Após uma alteração no código, envie-a ao GitHub. A hospedagem na Vercel gera uma nova publicação automaticamente a partir da branch `main`.
