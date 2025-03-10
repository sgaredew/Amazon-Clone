
import React from "react";
import infos from "./CategoryFullInfo";
import style from "../Category/Category.module.css";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <section className={style.category_container}>
      {infos.map((info) => (
        <CategoryCard key={info.id} data={info} />
      ))}
    </section>
  );
}

export default Category;
