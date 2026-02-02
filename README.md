# 🌌 LAB.CONTROL — Web Operation System v2.0

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer-motion&logoColor=white)

> **LAB.CONTROL** é um ecossistema de micro-aplicações (Dashboards) de alta performance. Diferente de um portfólio comum, ele opera como um monorepo modular onde cada utilitário — de finanças a chats em tempo real — compartilha o mesmo núcleo de autenticação e design system.

**✨ Melhorias Recentes:** Middleware de autenticação, sistema de notificações Toast, tipagem TypeScript completa, error handling robusto e muito mais! Veja [IMPROVEMENTS.md](./IMPROVEMENTS.md) para detalhes.

---

## ⚡ Módulos de Operação (Core Modules)

O sistema é composto por **9 células de processamento** independentes:

| Módulo | Funcionalidade | Stack Específica |
| :--- | :--- | :--- |
| **📊 Finance** | Gestão de fluxo de caixa e balanço patrimonial. | Supabase RPC |
| **💬 Chat** | Comunicação instantânea via WebSocket. | Supabase Realtime |
| **📋 Kanban** | Orquestração de tarefas e pipeline de produtividade. | Framer Motion Drag |
| **🔗 Shortener** | Encurtador de URLs com rastreamento. | API Routes |
| **📰 CMS** | Engine de escrita técnica com suporte a Rich Text. | Tiptap Editor |
| **📂 Portfolio** | Documentação dinâmica gerada via arquivos físicos. | MDX / Gray-matter |
| **🪙 Crypto** | Monitoramento de ativos digitais em tempo real. | CoinGecko API |
| **💖 Wishlist** | Curadoria de metas e objetivos de consumo. | Postgres Logic |
| **📜 Quotes** | Gerador de insights via APIs externas. | Fetch/Cache |

---

## 🏗 Arquitetura Dinâmica (The Bridge)

O diferencial técnico do LAB está na sua **Roteação Inteligente**. Utilizamos um padrão de `catch-all routes` para isolar a lógica de negócios da estrutura do framework:

### Estrutura de Diretórios
- **`/app/lab/[[...slug]]`**: O Roteador Mestre. Ele intercepta a URL e injeta o projeto correspondente sem recarregar o layout base.
- **`/projects`**: Onde reside a "inteligência". Cada pasta possui suas próprias `actions.ts` (Server Actions), componentes locais e tipagem, evitando poluição global.
- **`/components/ui`**: Design System atômico baseado em princípios de **Glassmorphism** e **Neobrutalismo**.

---

## 🛠 Tech Stack Detalhada

- **Core:** Next.js 16 (App Router) & React 19.
- **Data:** Supabase (PostgreSQL) com políticas de RLS (Row Level Security).
- **Security:** Auth.js v5 (NextAuth) com proteção de rotas via Middleware.
- **UI/UX:** Tailwind CSS com variáveis CSS para Dark Mode dinâmico.
- **Animations:** Framer Motion para transições de página (AnimatePresence) e Staggered Grids.
- **Content:** MDX para artigos que suportam componentes React vivos dentro do texto.

---

## 🚀 Deployment & Setup

### Variáveis de Ambiente
Renomeie o arquivo `.env.example` para `.env.local` e configure:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Auth.js Configuration
AUTH_SECRET="your-secret-here" # Gere com: npx auth secret

```

### Inicialização

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

```

---

## 📱 Design System: Mobile-First Strategy

O LAB.CONTROL foi desenhado para ser uma **PWA (Progressive Web App)** nativa:

* **Haptic Feedback Visual:** Botões com escala ativa e feedback de carregamento (spinners/loaders).
* **Sidebar Adaptive:** Sistema de gaveta (Drawer) para navegação intuitiva em uma mão.
* **Layout Fluido:** Grids que se adaptam de 3 colunas (4K) para 1 coluna (Mobile) sem perda de contexto.

---

## 🛠 Comandos de Manutenção

| Comando | Descrição |
| --- | --- |
| `npm run build` | Compila o projeto com otimização de imagens e rotas estáticas. |
| `npm run lint` | Analisa o código em busca de problemas de tipagem ou padrões. |
| `npm run type-check` | Executa o compilador TypeScript para validar a integridade do sistema. |

---

<p align="center">
Desenvolvido com foco em performance e escalabilidade por <strong>Adam Gabriel</strong>.




"Onde o código encontra o design de interface de alta precisão."
</p>
