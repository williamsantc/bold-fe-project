import { Dashboard } from "@/lib/type/Dashboard";

export const getDashboard = async (): Promise<Dashboard[]> => {
    const response = await fetch('https://bold-fe-api.vercel.app/api');
    const payload = await response.json() as { data: Dashboard[]; };
    return payload.data;
}
