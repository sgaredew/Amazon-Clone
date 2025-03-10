
import React from "react";
import { Link } from "react-router-dom";
import style from "./Category.module.css";

function CategoryCard({data}) {
  return (
    <div className={style.category}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt={data?.name} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
