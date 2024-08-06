import { apiClient } from "@/utils/api/api";
import { cache } from "react";

export const getTeamsByUserId = cache(async (userId : string): Promise<getTeamsResponse> => {
  const res = await apiClient.get(`/auth/users/${userId}/teams`);
  return res;
}
);