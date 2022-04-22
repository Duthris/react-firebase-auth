import './App.css';
import React, { useState, useEffect } from "react";
import fire from './fire';
import Login from './Login';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }


  const handlelogin = (e) => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password).then(() => {
        window.alert("Logged in!")
        window.location.reload()
      })
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  const handleSignup = (e) => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password).then(() => {
        window.alert("Signed up!");
        window.location.reload();
      })
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      })
  }

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, [])


  return (
    <div className="App">
      <Login email={email} 
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword} 
      handlelogin={handlelogin}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      />
    </div>
  );
}

export default App;
