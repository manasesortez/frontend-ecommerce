// Response Interfaces
export interface StoreStatsResponse {
    success: boolean;
    data: StoreStats;
    error?: string;
}

export interface StoreStatsErrorResponse {
    success: false;
    error: string;
}

// Request Interfaces
export interface GetStoreStatsParams {
    id: string;
}

export interface GetStoreStatsQuery {
    recalculate?: 'true' | 'false';
}

// Model Interface
export interface StoreStats {
    id_stat: number;
    id_store: number;
    avg_response_time: number | null;
    response_rate: number | null;
    last_calculated: string | Date;
}

// Extended interfaces for specific operations
export interface CalculateStatsResponse {
    data: StoreStats;
}

export interface GetStatsRes {
    data: StoreStats | null;
}

export interface StoreStatsResponse {
    msg: string;
    stats: {
        id_stat: number;
        id_store: number;
        avg_response_time: number;
        response_rate: number;
        last_calculated: string; // or Date if you'll parse it
    };
}

// For controller method parameters
export interface StatsControllerParams {
    id: string;
}

export interface StatsControllerQuery {
    recalculate?: string;
}