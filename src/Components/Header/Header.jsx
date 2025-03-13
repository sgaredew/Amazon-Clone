import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { TfiLocationPin } from "react-icons/tfi";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import style from "./Header.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/Firebase"

const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = Array.isArray (basket) ? basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0):0;
  return (
    <section className={style.fixed}>
      <section>
        <div className={style.header_container}>
          <div className={style.logo_container}>
            <Link to="/">
              <img
                src="https://dx35vtwkllhj9.cloudfront.net/images/regions/us/home_ent/amazondvdwhite.png"
                alt="AmazonLogo"
              />
            </Link>
            <div className={style.delivery}>
              <span>
                <TfiLocationPin />
              </span>

              <div>
                <p>Deliver to</p>
                <span>57108</span>
              </div>
            </div>
          </div>

          <div className={style.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>
          <div className={style.order_container}>
            <Link to="" className={style.language}>
              <img
                src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
                alt=""
              />

              <select name="" id="">
                <option value="">En</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello{user?.email.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign in</p>

                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>Returns</p>
              <span> & Orders</span>
            </Link>
            <Link to="/Cart" className={style.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
