import { useAppContext } from "../context/AppContext";

function OnboardingPage() {

  const { user } = useAppContext();

  console.log(user?.profilePic);

  return (
    <div className="h-screen flex items-center justify-center md:px-32 px-8">
      <div className="flex flex-col justify-center w-full items-center border">

        <h1 className="font-bold text-600">
          Complete Your Profile
        </h1>

        {
          user.profilePic ? (<img src={user?.profilePic} alt="pp" />) : (
            <div>

              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-24 rounded-full">
                  <span className="text-3xl">{user ? user.fullname.slice(0, 1) : "U"}</span>
                </div>
              </div>

            </div>
          )
        }
        <div>
          <button type="button" className="btn btn-neutral">
            Generate Random Avatar
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage