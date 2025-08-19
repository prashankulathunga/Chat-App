import React from 'react';
import { assets } from '../assets/assets';
import { Video } from "lucide-react";

function SignupPage() {
  // TODO: need to implement sign-up page
  return (
    <div className='flex justify-center items-center h-screen px-2'>
      <div className='md:w-3/4 lg:w-2/3 border rounded-xl shadow-2xl flex border-green-950/50 w-full'>
        <div className='left md:w-1/2 w-full h-full md:px-8 p-2'>
          <div className='header flex items-center gap-2'>
            <Video className='lg:w-10 lg:h-10 w-8 h-8 text-green-700/80' />
            <h1 className='text-600 font-extrabold text-green-700/80'>Streamify</h1>
          </div>
          <div className='p-4'>
            <h1 className='text-500 font-medium'>Create an Account</h1>
            <p className='text-300 font-light text-white/50'>Join Streamify and start your language adventure!</p>
          </div>
          <div className='input-section p-4'>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-400">Full Name</legend>
              <input type="text" className="input w-full input-neutral" placeholder="ex: John Doe" />
              <p className="label text-300 text-white/25">required</p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-400">Email</legend>
              <input type="text" className="input w-full input-neutral" placeholder="ex: johndoe@example.com" />
              <p className="label text-300 text-white/25">required</p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-400">Password</legend>
              <input type="text" className="input w-full input-neutral" placeholder="ex: ********" />
              <p className="label text-300 text-white/25">Password must be at least 6 characters long</p>
            </fieldset>

            <div className='flex items-center gap-2 py-2'>
              <input type="checkbox" defaultChecked className="checkbox checkbox-xs" />
              <p className='text-300 text-white/25'>I agree to the <span className='text-green-700/80'>terms of service </span>and <span className='text-green-700/80'>privacy policy</span></p>
            </div>

            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-green-700/80 mt-4 w-full text-400 md:p-4 p-5">Create an Account</button>

            <div className='w-full text-center pt-4'>
              <p className='text-400 text-white/75'>Already have an account? <span className='text-green-700/80'>Sign in</span></p>
            </div>

          </div>
        </div>

        <div className=' right w-1/2 py-12 md:flex hidden rounded-r-xl bg-[#1b261a] items-center'>
          <div className='flex flex-col items-center'>
            <img src={assets.signupIMG} alt='signup-image' className='md:w-2/3 lg:w-3/4' />
            <div className='lg:px-6 px-3'>
              <h1 className='font-bold text-center text-500'>
                Connect with language partners worldwide
              </h1>
              <p className='text-center mt-2  text-gray-400 text-300'>
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
