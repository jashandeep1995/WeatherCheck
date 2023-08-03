import firebase from './Firebase';
import './Show.css';
import { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';
import Currentweather from './Currentweather';


import {GoogleAuthProvider,getAuth,signInWithPopup,signOut} from "firebase/auth";
const Home=()=>{

  const[data,setData]=useState({name:"",email:"",isLogged:false});

  const handleLogin=()=>{

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
      'login_hint': 'username@gmail.com'
    });

    const auth = getAuth();

    signInWithPopup(auth, provider)
  .then((result) => {
   
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
   
    const user = result.user;
   
    setData({name:user.displayName,email:user.email,isLogged:true});
  }).catch((error) => {
   
    const errorCode = error.code;
    const errorMessage = error.message;
   
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });

   
  } 

  const handleLogout=()=>
  {
    const auth = getAuth();
    signOut(auth).then(() => {

     setData({name:"",email:"",isLogged:false});
  
}).catch((error) => {
 
});
  }
   
    return(
     <div className='backdesign'>
     {
       data.isLogged?
       <>
           <h2 className="user">Hello, {data.name}</h2>
           <input type="button" value="Logout" onClick={handleLogout} className="logout" />
           <Weather name={data.name} email={data.email}/>
          
       </>
       :
       <div className="home">
             
             <div className="logininfo">
                  <h2>
                   Discover the Weather in your city
                  </h2>
                 <input type="button" className="buttondesign" value="Login" onClick={handleLogin} />
              </div>

              <div className="currentweather">
                <h2>Today's Report</h2>
                <Currentweather/>
              </div>

       </div>
     }
    
     </div>
      
    );
}

export default Home;



