import axios from "axios";
const API_KEY = "PuuHKel0RduuGBJYJERxtCJe3fEBPcbKypb_-oMyvGg";

axios.defaults.baseURL = "https://api.unsplash.com/";
interface Image {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  user?: {
    name: string;
    portfolio_url: string | null;
  };
}
interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}

export const fetchImages = async (
  query: string,
  page: number
): Promise<FetchImagesResponse> => {
  const options = {
    params: {
      query: query,
      page: page,
      per_page: 12, // Количество изображений на страницу
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`, // Передача API ключа в заголовке
    },
  };

  const response = await axios.get<{
    results: Image[];
    total_pages: number;
  }>(`/search/photos`, options);

  // Возвращаем результаты и total_pages
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
