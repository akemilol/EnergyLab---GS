// route.ts

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

interface ApiResponse {
    message?: string;
    error?: string;
}

export const cadastrarUsuario = async (dadosCadastro: CadastroUsuario): Promise<Response> => {
    try {
        const response = await fetch("http://localhost:8080/WebProjetoEnergyLab/api/usuarios/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosCadastro),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response;
        
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error instanceof Error ? error.message : 'Erro desconhecido');
        throw error;
    }
};

export const loginUsuario = async (dadosLogin: LoginUsuario): Promise<ApiResponse> => {
    try {
        const response = await fetch("http://localhost:8080/WebProjetoEnergyLab/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosLogin),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao fazer login');
        }

        return response.json();
        
    } catch (error) {
        console.error("Erro ao fazer login:", error instanceof Error ? error.message : 'Erro desconhecido');
        throw error;
    }
};

// Função para atualizar usuário
export const atualizarUsuario = async (email: string, dadosUsuario: Partial<CadastroUsuario>): Promise<Response> => {
    try {
        const response = await fetch(`http://localhost:8080/WebProjetoEnergyLab/api/usuarios/${email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosUsuario),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response;
        
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error instanceof Error ? error.message : 'Erro desconhecido');
        throw error;
    }
};

// Função para deletar usuário
export const deletarUsuario = async (email: string): Promise<Response> => {
    try {
        const response = await fetch(`http://localhost:8080/WebProjetoEnergyLab/api/usuarios/${email}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response;
        
    } catch (error) {
        console.error("Erro ao deletar usuário:", error instanceof Error ? error.message : 'Erro desconhecido');
        throw error;
    }
};

// Função para buscar usuário por email (exemplo de GET)
export const buscarUsuarioPorEmail = async (email: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`http://localhost:8080/WebProjetoEnergyLab/api/usuarios/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        return response.json();
        
    } catch (error) {
        console.error("Erro ao buscar usuário:", error instanceof Error ? error.message : 'Erro desconhecido');
        throw error;
    }
};