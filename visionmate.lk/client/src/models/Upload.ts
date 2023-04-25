
export interface Upload {
    user?: string;
    type: string;
    path?: string;
    originalName?: string;
    name?: string;
    extension?: string;
    isUrl?: boolean;
    notes?: string;
    fileSize?: number;
    url: string;
}
