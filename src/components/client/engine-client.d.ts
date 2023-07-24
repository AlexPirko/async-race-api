export declare class EngineClient {
    private baseUrl;
    private engine;
    constructor();
    startCarEngine(id: number): Promise<any>;
    stopCarEngine(id: number): Promise<any>;
    driveCarEngine(id: number): Promise<{
        success: boolean;
        id: number;
    } | undefined>;
}
