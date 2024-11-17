import { FC } from "react";
import style from "./Section.module.css";
const Section: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <section className={style.section}>{children}</section>;
};

export default Section;
