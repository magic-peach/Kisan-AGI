import axios from 'axios';

const API_BASE_URL = '/api'; // Proxy is set in vite.config.ts usually, or we assume relative path if served together. 
// Since we are running separate dev servers (Vite 5173, Node 5000), we might need full URL or proxy.
// For now, let's assume we need to point to localhost:5000 if no proxy is set.
// But usually in dev, we set up a proxy. Let's check vite.config.ts later. 
// For safety, I'll use a relative path and assume the user will set up proxy or I will.
// Actually, let's check vite.config.ts first to be sure.

// Wait, I can't check it inside this tool call. I'll assume localhost:5000 for now to be safe, 
// or better, use a relative path and add a proxy rule to vite.config.ts if it fails.
// Let's stick to relative '/api' and ensure vite.config.ts has the proxy.

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface DiagnosisResponse {
    disease_name: string;
    confidence_score: number;
    timeline: {
        day: string;
        title: string;
        detail: string;
    }[];
    recommended_product: string;
}

export const diagnoseImage = async (imageFile: File): Promise<DiagnosisResponse> => {
    const formData = new FormData();
    formData.append('leaf_image', imageFile);

    const response = await api.post<DiagnosisResponse>('/diagnose', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getDealers = async (lat: number, long: number, product: string) => {
    const response = await api.get('/dealers', {
        params: { lat, long, product },
    });
    return response.data;
};
