export interface Image {
  id: string;
  alt_description: string | null;
  description?: string | null;
  likes: number;
  urls?: {
    regular: string;
    small: string;
    thumb: string;
  };
  user?: {
    name: string;
    portfolio_url: string | null;
  };
}

export interface FetchImagesResponse {
  results: Image[]; // Массив изображений
  total_pages: number; // Количество страниц
}
