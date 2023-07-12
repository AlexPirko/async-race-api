export class EngineClient {
    private baseUrl: string;

    private engine: string;

    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000';

        this.engine = `${this.baseUrl}/engine`;
    }

    async startCarEngine(id: number) {
        const response = fetch(`${this.engine}/?id=${id}&status=started`, {
            method: 'PATCH',
        });
        const start = await (await response).json();

        return start;
    }

    async stopCarEngine(id: number) {
        const response = fetch(`${this.engine}/?id=${id}&status=stopped`, {
            method: 'PATCH',
        });
        const stop = await (await response).json();

        return stop;
    }

    async driveCarEngine(id: number) {
        const response = await fetch(`${this.engine}?id=${id}&status=drive`, {
            method: 'PATCH',
        });

        if (response.status === 200) {
            return { success: true, id: id };
        } else if (response.status === 500) {
            {
                return { success: false, id: id };
            }
        } else {
            {
                return;
            }
        }
    }
}
