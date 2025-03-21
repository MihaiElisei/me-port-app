import api from "../api";

export async function get_articles(page = 1) {
  try {
    const { data } = await api.get(`/articles`, { params: { page } });
    return data;
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch articles");
  }
}

export async function get_article_detail(slug) {
  try {
    const response = await api.get(`articles/${slug}/`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}