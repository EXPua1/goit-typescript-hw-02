export interface Image {
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
export interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}
