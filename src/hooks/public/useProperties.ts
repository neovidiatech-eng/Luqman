import { useQuery } from "@tanstack/react-query";
import { getHomeData, getProperties, getPropertyById, GetPropertiesParams } from "@/services/public/PropertiesService";

export const useHomeData = () => {
    return useQuery({
        queryKey: ['home-data'],
        queryFn: getHomeData
    });
};

export const useGetProperties = (params: GetPropertiesParams = {}) => {
    return useQuery({
        queryKey: ['properties', params],
        queryFn: () => getProperties(params),
    });
};

export const useGetProperty = (id: string) => {
    return useQuery({
        queryKey: ['property', id],
        queryFn: () => getPropertyById(id),
        enabled: !!id,
    });
};