export interface Transaction {
    id: string
    description: string
    amount: number
    type: 'income' | 'expense'
    user_email: string
    created_at: string
}

export interface Post {
    id: string
    title: string
    content: string
    user_email: string
    status: 'draft' | 'published'
    created_at: string
}

export interface Link {
    id: string
    original_url: string
    short_code: string
    clicks: number
    user_email: string | null
    created_at: string
}

export interface Message {
    id: string
    text: string
    user_email: string
    user_name: string
    created_at: string
}

export interface Task {
    id: string
    title: string
    status: 'todo' | 'doing' | 'done'
    priority?: 'low' | 'medium' | 'high'
    created_at: string
}

export interface WishlistItem {
    id: number
    title: string
    price?: number
    is_completed: boolean
    created_at: string
}

export interface User {
    id: string
    name: string
    email: string
    password: string
    created_at: string
}
