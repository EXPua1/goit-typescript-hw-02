import css from "./ImageCard.module.css";
import { Image } from "../../services/unsplash-api.types";
import { FC } from "react";

const ImageCard: FC<{ data: Image; onClick: () => void }> = ({
  data,
  onClick,
}) => {
  return (
    <div className={css.card} onClick={onClick}>
      <div>
        <img
          src={data.urls?.small || ""}
          alt={data.alt_description || "Image"}
        />
      </div>

      <div>
        <p className={css.description}>
          {data.description
            ? data.description.length > 25
              ? `${data.description.slice(0, 25)}...`
              : data.description
            : "Without description"}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
