import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector(state => state.user)
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    }, (error) => {
      setImageError(true)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then ((downloadURL) => {
        setFormData({...formData, profilePicture: downloadURL});
      });
    }
  )};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' >
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <img src={formData.profilePicture || currentUser.profilePicture} alt='profilePicture' className='mx-auto w-24 rounded-full object-cover self-center cursor-pointer' onClick={() => fileRef.current.click()}></img>
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>Error Uploading Image to the server!!!</span>)
          : imagePercent>0 && imagePercent <100 ? (<span className='text-orange-500'>{`Uploading Image.....${imagePercent}%`}</span>) : imagePercent === 100 ? (<span className='text-green-600 font-bold'>Image Uploaded SuccessFully!!</span>) : ''}
        </p>
        <input type='text' placeholder='User Name' id='username' className='bg-slate-100 p-3 rounded-lg' defaultValue={currentUser.username} />
        <input type='text' placeholder='Email Address' id='email' className='bg-slate-100 p-3 rounded-lg' defaultValue={currentUser.email} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-4 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-full uppercase hover:opacity-90 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-800 cursor-pointer'>Delete Account</span>
        <span className='text-red-800 cursor-pointer'>Sign-out</span>
      </div>
    </div>
  )
}
