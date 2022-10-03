import React, {useState} from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  openLogin: false,
  openLogout: false,
  //Dummy functions to help with autocomplete in Visual studio
  onLogout: () => {},
  onLogin: () => {},
  closeLogoutMessage: () => {},
  closeLoginMessage: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    
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
          closeLoginMessage: closeLoginMessage
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;