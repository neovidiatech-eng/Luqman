import api from "@/lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

/** ما بيرجعه الـ GET/PUT من السيرفر (كامل) */
export interface SettingsApiResponse {
  id: string;
  whatsappNumber: string | null;
  phoneNumber: string | null;
  email: string | null;
  officeLocation: string | null;
  workingHours: string | null;
  googleAnalyticsId: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string[] | null;
  cities: string[];
  propertyFeatures: string[];
  createdAt: string;
  updatedAt: string;
}

/** الـ fields المسموح بيها في الـ PUT — بالضبط زي ما السيرفر بياخد */
export interface UpdateSettingsPayload {
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  officeLocation: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export interface GetSettingsResponse {
  success: boolean;
  message: string;
  data: { settings: SettingsApiResponse };
}

export interface UpdateSettingsResponse {
  success: boolean;
  message: string;
  data: { settings: SettingsApiResponse };
}

export interface CitiesResponse {
  success: boolean;
  message: string;
  data: { cities: string[] };
}

export interface FeaturesResponse {
  success: boolean;
  message: string;
  data: { features: string[] };
}

// ─── Allowed keys for PUT ─────────────────────────────────────────────────────
const ALLOWED_KEYS: (keyof UpdateSettingsPayload)[] = [
  "whatsappNumber",
  "phoneNumber",
  "email",
  "officeLocation",
  "facebookUrl",
  "instagramUrl",
  "twitterUrl",
  "linkedinUrl",
  "seoTitle",
  "seoDescription",
];

function pickPayload(form: UpdateSettingsPayload): UpdateSettingsPayload {
  return ALLOWED_KEYS.reduce((acc, key) => {
    acc[key] = form[key] ?? "";
    return acc;
  }, {} as UpdateSettingsPayload);
}

// ─── Settings ─────────────────────────────────────────────────────────────────

/** GET /api/v1/settings */
export const getSettings = async (): Promise<GetSettingsResponse> => {
  const response = await api.get<GetSettingsResponse>("/api/v1/settings");
  return response.data;
};

/** PUT /api/v1/settings */
export const updateSettings = async (
  form: UpdateSettingsPayload,
): Promise<UpdateSettingsResponse> => {
  const response = await api.put<UpdateSettingsResponse>(
    "/api/v1/settings",
    pickPayload(form),
  );
  return response.data;
};

// ─── Cities ───────────────────────────────────────────────────────────────────

/** POST /api/v1/settings/cities */
export const addCity = async (name: string): Promise<CitiesResponse> => {
  const response = await api.post<CitiesResponse>("/api/v1/settings/cities", {
    name,
  });
  return response.data;
};

/** DELETE /api/v1/settings/cities/:name */
export const deleteCity = async (name: string): Promise<CitiesResponse> => {
  const response = await api.delete<CitiesResponse>(
    `/api/v1/settings/cities/${encodeURIComponent(name)}`,
  );
  return response.data;
};

// ─── Features ─────────────────────────────────────────────────────────────────

/** POST /api/v1/settings/features */
export const addFeature = async (name: string): Promise<FeaturesResponse> => {
  const response = await api.post<FeaturesResponse>(
    "/api/v1/settings/features",
    { name },
  );
  return response.data;
};

/** DELETE /api/v1/settings/features/:name */
export const deleteFeature = async (
  name: string,
): Promise<FeaturesResponse> => {
  const response = await api.delete<FeaturesResponse>(
    `/api/v1/settings/features/${encodeURIComponent(name)}`,
  );
  return response.data;
};
