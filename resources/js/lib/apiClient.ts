interface ApiClientInterface {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, data: Record<string, unknown>): Promise<T>;
    put<T>(url: string, data: Record<string, unknown>): Promise<T>;
    delete<T>(url: string): Promise<T>;
    patch<T>(url: string, data: Record<string, unknown>): Promise<T>;
}

// how to implement generic API client
export class APIClient implements ApiClientInterface {
    headers: Record<string, string>;
    data: Record<string, unknown>;

    constructor(headers: Record<string, string> = {}, data: Record<string, unknown> = {}) {
        this.headers = headers;
        this.data = data;
    }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async post<T>(url: string, data: Record<string, unknown>): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...this.headers,
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
                ...this.headers,
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
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            }
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
                ...this.headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}