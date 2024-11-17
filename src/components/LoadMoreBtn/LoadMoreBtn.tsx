import { FC } from "react";
import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn: FC<{ onLoadMore: () => void }> = ({ onLoadMore }) => {
  return (
    <div className={css.loadMoreBtn}>
      <button className={css.btn} onClick={onLoadMore} type="button">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
