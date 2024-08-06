import { apiClient } from "@/utils/api/api";
import { cache } from "react";

export const getUser = cache(async (): Promise<getUserResponse> => {
  const res = await apiClient.get(`/auth/users/me`);
  return res;
}
);