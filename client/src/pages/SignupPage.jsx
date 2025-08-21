import { assets } from '../assets/assets';
import { PictureInPicture2 } from "lucide-react";
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

function SignupPage() {
  // TODO: connect back-end and front-end sign up section

  const { axios, setUser } = useAppContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [check, setCheck] = useState(false);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      let formError = {};

      if (!fullName) formError.fullName = "required";
      if (!email) formError.email = "required";
      if (password.length < 6) formError.password = "Password must be at least 6 characters long";
      if (!check) formError.check = "agree privacy policy";

      setError(formError);

      if (Object.keys(formError).length === 0) {
        console.log(fullName, email, password)

        const response = await axios.post('auth/create', {
          fullname: fullName,
          email,
          password
        });

        console.log(response);

        if (response.status == 200) {
          console.log('This is a test console inside')
          setFullName("");
          setEmail("");
          setPassword("");

          toast.success("Account created successfully")
          setUser(response.data.data.data);
        }
      }
    } catch (error) {
      if (error.response.data.success == false) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-screen px-4'>
      <div className='md:w-3/4 lg:w-2/3 border rounded-xl shadow-2xl flex border-green-950/50 w-full'>
        <div className='left md:w-1/2 w-full h-full md:px-8 p-4'>
          <div className='header justify-center flex items-center md:justify-start gap-2 md:pt-6 pt-4'>
            <PictureInPicture2 className='lg:w-10 lg:h-10 w-8 h-8 text-green-800/80' strokeWidth={1} />
            <h1 className=' text-600 font-bold text-green-800/80'>Streamify</h1>
          </div>
          <div className="hidden md:divider opacity-20" />

          <div className='md:px-4 px-2 text-center md:text-left py-2 lg:py-0 lg:pb-4 pb-2'>
            <h1 className='text-600 font-medium'>Create an Account</h1>
            <p className='text-300 font-light text-white/25'>
              Join Streamify and start your language adventure!
            </p>
          </div>
          <div className='input-section px-4'>

            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-400">Full Name</legend>
                <input type="text" onChange={(e) => setFullName(e.target.value)} className="input w-full input-neutral" placeholder="John Doe" />
                {error.fullName ? (<p className='label text-300 text-red-400'>{error.fullName}</p>) : (<p className="label text-300 text-white/25">required</p>)
                }
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-400">Email</legend>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="input w-full input-neutral" placeholder="johndoe@example.com" />
                {error.email ? (<p className='label text-300 text-red-400'>{error.email}</p>) : (<p className="label text-300 text-white/25">required</p>)
                }
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-400">Password</legend>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="input w-full input-neutral" placeholder="********" />
                {error.password ? (<p className='label text-300 text-red-400'>{error.password}</p>) : (<p className="label text-300 text-white/25">Password must be at least 6 characters long</p>
                )}
              </fieldset>

              <div className='flex items-center gap-2 py-2'>
                <input type="checkbox" onClick={() => setCheck(true)} className="checkbox checkbox-xs" />
                <p className={`text-300 ${error.password ? "text-red-400" : "text-white/25"}`}>
                  I agree to the <span className='text-green-700/80'> terms of service

                  </span> and <span className='text-green-700/80'>privacy policy</span>
                </p>
              </div>

              <button type='submit' className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-green-700/80 mt-4 w-full text-400 md:p-4 p-5">
                Create an Account
              </button>

              <div className='w-full text-center pt-4'>
                <p className='text-400 text-white/75'>
                  Already have an account?
                  <span className='text-green-700/80 underline'> Sign in</span>
                </p>
              </div>
            </form>

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
      </div >
    </div >
  );
}

export default SignupPage;
