import React, { useState, useEffect } from "react";
import "modern-normalize";
import "./index.css";
import {
  Container,
  SearchBar,
  Section,
  ImageGallery,
  LoadMoreBtn,
  ImageModal,
  Loader,
  ErrorMessage,
} from "./components";
import { fetchImages } from "./services/unsplash-api";
import { Image } from "./services/unsplash-api.types";

export interface SelectedImage {
  imageUrl: string;
  altText: string;
  description: string;
}

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    imageUrl: "",
    altText: "",
    description: "",
  });
  const [areImagesLoaded, setAreImagesLoaded] = useState<boolean>(false);
  const [noImagesFound, setNoImagesFound] = useState<boolean>(false);

  // Виклик API коли query і page змінюються
  useEffect(() => {
    if (!query) return;
    const fetchImageData = async () => {
      setLoader(true);
      setError(null);

      try {
        const responseData = await fetchImages(query, page);
        console.log(responseData);

        if (page === 1) {
          setImages(responseData.results); // Якщо новий пошук, скидаємо попередні зображення
        } else {
          setImages((prevImages) => [...prevImages, ...responseData.results]); // Додаємо нові зображення до існуючих
        }
        setNoImagesFound(responseData.results.length === 0);
        setTotalPages(responseData.total_pages); // Встановлюємо загальну кількість сторінок
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetchImageData();
  }, [query, page]);

  const searchImage = (newQuery: string) => {
    setPage(1); // Скидаємо сторінку при новому запиті
    setQuery(newQuery); // Змінюємо запит
    setAreImagesLoaded(false);
    setNoImagesFound(false);
  };

  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1); // Завантажуємо наступну сторінку
      setAreImagesLoaded(true);
    }
  };

  const openModal = ({ imageUrl, altText, description }: SelectedImage) => {
    if (isModalOpen) {
      return;
    }
    setSelectedImage({ imageUrl, altText, description });
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage({ imageUrl: "", altText: "", description: "" });
  };

  useEffect(() => {
    if (images.length > 0 && !loader) {
      window.scrollTo({
        top: window.scrollY + 750, // Прокрутка страницы вниз
        behavior: "smooth",
      });
    }
  }, [images, loader]);

  return (
    <Section>
      <Container>
        <SearchBar onSearch={searchImage} />
        {images.length > 0 && (
          <ImageGallery data={images} onImageClick={openModal} />
        )}
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {images.length > 0 && page < totalPages && (
          <LoadMoreBtn onLoadMore={loadMoreImages} />
        )}
        {isModalOpen && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeModal}
            imageUrl={selectedImage.imageUrl}
            altText={selectedImage.altText}
            description={selectedImage.description}
          />
        )}
        {noImagesFound && <div>No images found for your query.</div>}
      </Container>
    </Section>
  );
};

export default App;
