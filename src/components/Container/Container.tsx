import style from "./Container.module.css";
import React, { FC } from "react";

const Container: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
