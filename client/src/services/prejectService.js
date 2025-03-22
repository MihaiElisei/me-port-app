import api from "../api";

export async function get_projects(page = 1) {
  try {
    const { data } = await api.get(`/projects`, { params: { page } });
    return data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch projects");
  }
}

export async function get_project_detail(slug) {
    try {
      const response = await api.get(`projects/${slug}/`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }