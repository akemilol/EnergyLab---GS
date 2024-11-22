// Dados necessários para o cadastro de um usuário
interface CadastroUsuario {
    nomeCompleto: string;
    dataNascimento: string;
    email: string;
    numeroTelefone: string;
    senha: string;
    confirmarSenha: string;
    genero: string;
}

// Dados necessários para o login de um usuário
interface LoginUsuario {
    email: string;
    senha: string;
}

// Resposta da API
interface ApiResponse<T = unknown> {
    data?: T;
    message?: string;
    error?: string;
    statusCode: number;
}

// Classe para lidar com erros da API
class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Lida com a resposta da API e trata erros
const handleApiResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
    // Verifica se a resposta está no formato JSON
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    // Lança erro se a resposta não for bem-sucedida
    if (!response.ok) {
        const errorMessage = isJson 
            ? (await response.json()).message 
            : await response.text();
        throw new ApiError(response.status, errorMessage);
    }

    // Retorna dados no formato JSON, se disponíveis
    if (isJson) {
        const data = await response.json();
        return {
            data,
            statusCode: response.status,
            message: 'Operação realizada com sucesso'
        };
    }

    // Retorna mensagem padrão se não for JSON
    return {
        statusCode: response.status,
        message: 'Operação realizada com sucesso'
    };
};

// Cadastra um novo usuário na API
export const cadastrarUsuario = async (dadosCadastro: CadastroUsuario): Promise<ApiResponse<unknown>> => {
    try {
        // Requisição POST para cadastrar usuário
        const response = await fetch("/api/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosCadastro),
        });

        // Lida com a resposta da API
        return handleApiResponse(response);
        
    } catch (error) {
        // Trata erros da API ou erros internos
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

// Realiza login do usuário na API
export const loginUsuario = async (dadosLogin: LoginUsuario): Promise<ApiResponse<unknown>> => {
    try {
        // Requisição POST para login do usuário
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosLogin),
        });

        // Lida com a resposta da API
        return handleApiResponse(response);
        
    } catch (error) {
        // Trata erros da API ou falhas de autenticação
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

// Atualiza dados de um usuário na API
export const atualizarUsuario = async (email: string, dadosUsuario: Partial<CadastroUsuario>): Promise<ApiResponse<unknown>> => {
    try {
        // Requisição PUT para atualizar usuário
        const response = await fetch(`/api/usuarios/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(dadosUsuario),
        });

        // Lida com a resposta da API
        return handleApiResponse(response);
        
    } catch (error) {
        // Trata erros da API ou erros ao atualizar usuário
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

// Deleta um usuário na API
export const deletarUsuario = async (email: string): Promise<ApiResponse<unknown>> => {
    try {
        // Requisição DELETE para remover usuário
        const response = await fetch(`/api/usuarios/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        // Lida com a resposta da API
        return handleApiResponse(response);
        
    } catch (error) {
        // Trata erros da API ou erros ao deletar usuário
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

// Busca um usuário pelo email na API
export const buscarUsuarioPorEmail = async (email: string): Promise<ApiResponse<unknown>> => {
    try {
        // Requisição GET para obter usuário
        const response = await fetch(`/api/usuarios/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        // Lida com a resposta da API
        return handleApiResponse(response);
        
    } catch (error) {
        // Trata erros da API ou erros ao buscar usuário
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
