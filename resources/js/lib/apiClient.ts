interface ApiClientInterface {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: Record<string, unknown>): Promise<T>;
    put<T>(url: string, data: Record<string, unknown>): Promise<T>;
    delete<T>(url: string): Promise<T>;
    patch<T>(url: string, data: Record<string, unknown>): Promise<T>;
}

// how to implement generic API client
export class ApiClient implements ApiClientInterface {
    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async post<T>(url: string, data: Record<string, unknown>): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async put<T>(url: string, data: Record<string, unknown>): Promise<T> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async delete<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async patch<T>(url: string, data: Record<string, unknown>): Promise<T> {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}