import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import style from "./Header.module.css"
function LowerHeader() {
  return (
    <div className={style.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />

          <p></p>
        </li>
        <li> Today's Deal</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader
