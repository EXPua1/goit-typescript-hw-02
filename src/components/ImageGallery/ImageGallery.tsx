import { FC } from "react";
import { Image } from "../../services/unsplash-api.types";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { SelectedImage } from "../../App";

// В компоненте ImageGallery (GalleryList)
interface GalleryListProps {
  data: Image[];
  onImageClick: (selectedImage: SelectedImage) => void; // Принимает объект SelectedImage
}

const GalleryList: FC<GalleryListProps> = ({ data, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {data.map((item) => (
        <li className={css.item} key={item.id}>
          <ImageCard
            data={item}
            onClick={() =>
              onImageClick({
                imageUrl: item.urls?.regular || "",
                altText: item.alt_description || "",
                description: item.likes.toString(),
              })
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
