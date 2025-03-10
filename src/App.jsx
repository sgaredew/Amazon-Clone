import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/Firebase";
// import { useContext } from "react";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          User: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          User: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}
export default App;
