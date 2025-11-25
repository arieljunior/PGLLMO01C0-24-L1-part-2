export interface LoginCredentials {
    email: string;
    password: string;
}

export const simulateLogin = ({email, password}: LoginCredentials): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'admin@admin.com' && password === '123') {
                resolve('meu-token-123');
            } else {
                reject(new Error('Credenciais inválidas'));
            }
        }, 3000);
    });
};