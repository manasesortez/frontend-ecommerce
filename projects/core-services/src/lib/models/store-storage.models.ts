// Response Interfaces
export interface StorageUsageResponse {
    msg?: string;
    planLimits?: StorageLimits;
    currentUsage?: CurrentUsage;
    lastCalculated?: string | Date;
    usage?: StorageUsageWithRelations;
    usages?: StorageUsageWithRelations[];
    error?: string;
}

export interface StorageLimits {
    maxStorageMB: number;
    maxFiles: number;
}

export interface CurrentUsage {
    storageUsedMB: number | string;
    imagesCount: number;
    avgImageSizeMB: number | string;
    storageRemainingMB: number | string;
}

export interface StorageUsageWithRelations extends StorageUsage {
    store?: {
        id_store: number;
        name_store?: string;
        user?: {
            id_user: number;
            name_user?: string;
            email_user?: string;
            subscription_plan?: {
                id_plan: number;
                name_plan?: string;
                max_storage_mb?: number;
            };
        };
    };
}

// Request Interfaces
export interface GetUsageParams {
    storeId: string;
}

export interface GetUsageByIdParams {
    id: string;
}

export interface UpdateStorageParams {
    storeId: number;
    fileSizeMB: number;
    action: 'add' | 'subtract';
}

// Model Interface
export interface StorageUsage {
    id_usage: number;
    store_id: number;
    storage_used_mb: number;
    images_count: number;
    last_calculated: string | Date | null;
    date_created?: string | Date;
    date_updated?: string | Date;
}

// For internal usage
export interface UpdateStorageResponse {
    success: boolean;
    storage_used_mb: number;
    images_count: number;
}

// Error Response
export interface StorageErrorResponse {
    success: false;
    msg: string;
    error?: any;
}