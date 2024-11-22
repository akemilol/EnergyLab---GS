
interface CadastroUsuario {
    nomeCompleto: string;
    dataNascimento: string;
    email: string;
    numeroTelefone: string;
    senha: string;
    confirmarSenha: string;
    genero: string;
}

interface LoginUsuario {
    email: string;
    senha: string;
}

interface ApiResponse<T = unknown> {
    data?: T;
    message?: string;
    error?: string;
    statusCode: number;
}

class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
        const errorMessage = isJson 
            ? (await response.json()).message 
            : await response.text();
        throw new ApiError(response.status, errorMessage);
    }

    if (isJson) {
        const data = await response.json();
        return {
            data,
            statusCode: response.status,
            message: 'Operação realizada com sucesso'
        };
    }

    return {
        statusCode: response.status,
        message: 'Operação realizada com sucesso'
    };
};

export const cadastrarUsuario = async (dadosCadastro: CadastroUsuario): Promise<ApiResponse<unknown>> => {
    try {
        const response = await fetch("/api/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosCadastro),
        });

        return handleApiResponse(response);
        
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                error: error.message,
                statusCode: error.statusCode
            };
        }
        return {
            error: 'Erro interno do servidor',
            statusCode: 500
        };
    }
};

export const loginUsuario = async (dadosLogin: LoginUsuario): Promise<ApiResponse<unknown>> => {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosLogin),
        });

        return handleApiResponse(response);
        
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                error: error.message,
                statusCode: error.statusCode || 401
            };
        }
        return {
            error: 'Falha na autenticação',
            statusCode: 401
        };
    }
};

export const atualizarUsuario = async (email: string, dadosUsuario: Partial<CadastroUsuario>): Promise<ApiResponse<unknown>> => {
    try {
        const response = await fetch(`/api/usuarios/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dadosUsuario),
        });

        return handleApiResponse(response);
        
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                error: error.message,
                statusCode: error.statusCode
            };
        }
        return {
            error: 'Erro ao atualizar usuário',
            statusCode: 500
        };
    }
};

export const deletarUsuario = async (email: string): Promise<ApiResponse<unknown>> => {
    try {
        const response = await fetch(`/api/usuarios/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        return handleApiResponse(response);
        
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                error: error.message,
                statusCode: error.statusCode
            };
        }
        return {
            error: 'Erro ao deletar usuário',
            statusCode: 500
        };
    }
};

export const buscarUsuarioPorEmail = async (email: string): Promise<ApiResponse<unknown>> => {
    try {
        const response = await fetch(`/api/usuarios/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        return handleApiResponse(response);
        
    } catch (error) {
        if (error instanceof ApiError) {
            return {
                error: error.message,
                statusCode: error.statusCode
            };
        }
        return {
            error: 'Erro ao buscar usuário',
            statusCode: 500
        };
    }
};
