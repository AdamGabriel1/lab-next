# 🚀 LAB.NEXT v2.0 Beta

**LAB.NEXT** é um ecossistema pessoal de micro-aplicações (Dashboards) construído com as tecnologias mais modernas do ecossistema React. Ele funciona como um monossistema onde cada funcionalidade (Kanban, Finanças, CMS, Crypto) é tratada como um módulo independente dentro de uma arquitetura plugável.

---

## 🛠 Tech Stack

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS (Dark Mode nativo)
* **Autenticação:** NextAuth.js (Auth.js v5 Beta)
* **Banco de Dados:** Supabase (PostgreSQL)
* **Renderização MDX:** `next-mdx-remote`
* **Ícones:** Lucide React
* **Animações:** Framer Motion

---

## 🏗 Arquitetura do Projeto

O projeto utiliza uma arquitetura personalizada para isolar a complexidade dos módulos da estrutura de rotas do Next.js:

* **`app/`**: Contém apenas o "esqueleto" do sistema. O roteador mestre em `app/lab/[[...slug]]` faz a ponte dinâmica para os projetos.
* **`projects/`**: O coração do laboratório. Cada subpasta é um aplicativo independente com suas próprias `actions.ts`, componentes e lógica.
* **`components/`**: Componentes globais e compartilhados (Sidebar, ThemeToggle, MobileNav).
* **`content/`**: Repositório de arquivos `.mdx` consumidos pelo módulo de portfólio.

---

## 📦 Módulos Integrados

1. **📊 Finanças:** Controle de gastos e receitas com integração ao banco.
2. **📋 Kanban:** Gestão de tarefas com colunas interativas e persistência.
3. **💬 Chat Real-time:** Comunicação instantânea (WebSockets/Supabase Realtime).
4. **🔗 Encurtador de Links:** Gerador de URLs curtas com painel administrativo.
5. **📰 CMS Blog:** Sistema de gerenciamento de conteúdo para artigos.
6. **🪙 Crypto Tracker:** Monitoramento de preços de criptomoedas em tempo real.
7. **📂 Portfólio MDX:** Renderização dinâmica de documentação técnica via Markdown.
8. **💖 Wishlist:** Lista de desejos e metas de consumo.

---

## 🚀 Como Executar

### 1. Clonar o repositório

```bash
git clone https://github.com/AdamGabriel1/lab-next.git
cd lab-next

```

### 2. Configurar as variáveis de ambiente (`.env.local`)

Crie um arquivo na raiz e preencha com suas credenciais:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_key

# NextAuth
AUTH_SECRET=seu_segredo_gerado
```

### 3. Instalar dependências e rodar

```bash
npm install
npm run dev

```

---

## 📱 Experiência Mobile

O LAB.NEXT foi projetado com uma abordagem **Mobile-First**.

* **Sidebar Adaptativa:** No desktop é fixa; no mobile, torna-se um menu lateral deslizante (Drawer).
* **Snap Scroll:** O Kanban utiliza rolagem horizontal nativa em dispositivos móveis.
* **Toque Otimizado:** Botões e links com área de clique expandida (mínimo 44px).

---

## 🛠 Comandos Úteis

* `npm run dev`: Inicia o servidor de desenvolvimento.
* `npm run build`: Gera a build de produção otimizada.
* `npm run lint`: Executa a verificação de erros no código.

---

**Desenvolvido com ☕ e TypeScript por Adam.**
