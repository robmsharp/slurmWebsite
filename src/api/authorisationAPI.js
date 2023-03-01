import React, {useState} from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext({
  isLoggedIn: false,
  openLogin: false,
  openLogout: false,
  //Dummy functions to help with autocomplete in Visual studio
  onLogout: () => {},
  onLogin: () => {},
  closeLogoutMessage: () => {},
  closeLoginMessage: () => {},
  checkLoggedin: () => {}
});



export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    

    //Does not work since doesn't persist
    const checkLoggedin = () => {

      /*const auth = getAuth();
      const user = auth.currentUser;
      console.log("getting user");
      console.log(user);
      
    if (user != null) {
      loginHandler();
    }*/
    }

    const logoutHandler = () => {
      
      setIsLoggedIn(false);
      setOpenLogout(true);
    };
  
    const loginHandler = () => {
      
      setIsLoggedIn(true);
      setOpenLogin(true);

    };

    const closeLoginMessage =() => {
        setOpenLogin(false);
    }
  
    const closeLogoutMessage =() => {
        setOpenLogout(false);
    }

    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          openLogin: openLogin,
          openLogout: openLogout,
          onLogout: logoutHandler,
          onLogin: loginHandler,
          closeLogoutMessage: closeLogoutMessage,
          closeLoginMessage: closeLoginMessage,
          checkLoggedin: checkLoggedin
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;