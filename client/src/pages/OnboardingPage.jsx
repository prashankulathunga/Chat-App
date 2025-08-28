import { useAppContext } from "../context/AppContext";
import { PaintbrushVertical } from "lucide-react";

function OnboardingPage() {
    const { user } = useAppContext();

    const dpHandle = async (dp) => {
        await dp;

        return <img src={dp} alt="pp" />;
    };

    return (
        <div className="h-screen flex items-center justify-center md:px-32 px-8">
            <div className="flex flex-col justify-center w-full items-center gap-4 min-w-[380px]">
                <h1 className="font-bold text-600">Complete Your Profile</h1>

                {user.profilePic ? (
                    dpHandle(user.profilePic)
                ) : (
                    <div>
                        <div className="avatar avatar-placeholder">
                            <div className="bg-neutral text-neutral-content w-24 rounded-full">
                                <span className="text-3xl">
                                    {user.fullname
                                        ? user.fullname.slice(0, 1)
                                        : "U"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <button
                        type="button"
                        className="btn btn-neutral flex justify-center items-center"
                    >
                        <PaintbrushVertical className="size-4 md:size-5" />
                        Generate Random Avatar
                    </button>
                </div>

                {/* Input Section */}
                <div className="ob-input p-4 w-[380px] md:w-[760px] mt-8">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">fullname</legend>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="John Doe"
                        />
                    </fieldset>

                    <fieldset className="fieldset mt-2">
                        <legend className="fieldset-legend">Bio</legend>
                        <textarea
                            placeholder="type something"
                            className="textarea w-full rounded-3xl"
                        />
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default OnboardingPage;
