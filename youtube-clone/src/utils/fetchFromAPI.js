const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}&key=${import.meta.env.VITE_RAPID_API_KEY}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { items: [] }; // prevent app crash
  }
};