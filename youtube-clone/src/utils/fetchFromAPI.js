import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "youtube138.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  console.log("🌐 Fetching from RapidAPI:", url);

  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log("✅ API response received");
    return data;
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message;

    console.error("❌ API Error:", status, message);

    if (status === 429 || message?.toLowerCase().includes("quota")) {
      throw new Error("Quota limit reached. Please try again later.");
    }

    throw new Error(message || "Failed to fetch data from API.");
  }
};
