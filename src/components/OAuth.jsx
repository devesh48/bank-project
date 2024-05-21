import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {

    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('http://localhost:3002/api/auth/google', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
        } catch(err) {
            console.log("could not login with google");
        }
    }
  return (
    //specifying type as button additionally make sure that this button do not submit the form on sigin and signup page.
    <button type='button' onClick={handleGoogleClick} className='bg-red-500 text-white rounded-full p-3 uppercase hover:opacity-90'>Continue with Google</button>
  )
}
