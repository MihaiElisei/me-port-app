import api from "@/api";

export async function registerUser(data) {
  try {
    const response = await api.post("register/", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw new Error("An unexpected error occurred.");
  }
}
