import { auth, GoogleProvider } from "../config/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

import "../components/auth.css";

export const Auth = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // console.log(auth?.currentUser?.displayName)

   const signInWithGoogle = async () => {
        try{ 
            await signInWithPopup(auth, GoogleProvider) 
        } catch (err) {
            console.error(err)
        }
   }
   
   const signIn = async () => {
       try{ 
           await createUserWithEmailAndPassword(auth, email, password) 
        } catch (err) {
            console.error(err)
        }      
   };


   const logOut = async () => {
    try{ 
        await signOut(auth) 
     } catch (err) {
         console.error(err)
     }      
};

    return (
        <div  className="column">
            <input 
                className="inputs-1"
                type="text" 
                placeholder="Email..." 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                className="inputs-1"
                type="password" 
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign in With Google</button>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}

export default Auth;