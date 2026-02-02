export const APP_CONFIG = {
    name: 'LAB.CONTROL',
    version: 'v2.0',
    description: 'Sistema Operacional Web de Alta Performance',
    author: 'Adam Gabriel',
} as const

export const ROUTES = {
    home: '/',
    login: '/login',
    register: '/registro',
    hub: '/lab/hub',
    chat: '/lab/chat',
    finance: '/lab/financas',
    shortener: '/lab/encurtador',
    cms: '/lab/cms',
    kanban: '/lab/kanban',
    quotes: '/lab/citacoes',
    crypto: '/lab/crypto',
    portfolio: '/lab/projetos',
    wishlist: '/lab/wishlist',
} as const

export const API_ENDPOINTS = {
    auth: '/api/auth',
} as const

export const STORAGE_KEYS = {
    theme: 'theme',
    user: 'user',
} as const

export const QUERY_KEYS = {
    transactions: 'transactions',
    posts: 'posts',
    links: 'links',
    messages: 'messages',
    tasks: 'tasks',
    wishlist: 'wishlist',
} as const
