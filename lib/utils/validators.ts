export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function validateUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export function validateShortCode(code: string): boolean {
    const codeRegex = /^[a-z0-9-]+$/
    return codeRegex.test(code) && code.length >= 3 && code.length <= 20
}

export function sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '')
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(new Date(date))
}
