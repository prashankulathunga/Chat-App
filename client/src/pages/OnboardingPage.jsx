import { useAppContext } from "../context/AppContext";
import { PaintbrushVertical, MapPinCheck, Globe } from "lucide-react";

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
                <div className="ob-input p-4 w-[380px] md:w-[760px] mt-8 text-white/30">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-white/50">
                            fullname
                        </legend>
                        <input
                            type="text"
                            className="input w-full border-gray-700/16 bg-black/16"
                            placeholder="John Doe"
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-white/50">
                            Bio
                        </legend>
                        <textarea
                            placeholder="Tell others about your self and your language learning goals"
                            className="textarea w-full rounded-3xl border-gray-700/16 bg-black/16 p-4"
                        />
                    </fieldset>

                    <div className="w-full flex items-center gap-4 mt-2">
                        <fieldset className="fieldset w-1/2">
                            <legend className="fieldset-legend text-white/50">
                                Native Language
                            </legend>
                            <select
                                defaultValue="Pick a browser "
                                className="select w-full bg-black/16 border-gray-700/16"
                            >
                                <option disabled={true}>
                                    Select your Native Language
                                </option>
                                <option>English</option>
                                <option>French</option>
                                <option>Arabic</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset w-1/2">
                            <legend className="fieldset-legend text-white/50">
                                Learning Language
                            </legend>
                            <select
                                defaultValue="Pick a browser"
                                className="select w-full border-gray-700/16 bg-black/16"
                            >
                                <option disabled={true}>
                                    Select your learning language
                                </option>
                                <option>English</option>
                                <option>French</option>
                                <option>Arabic</option>
                            </select>
                        </fieldset>
                    </div>

                    <fieldset className="fieldset w-full mt-2">
                        <legend className="fieldset-legend text-white/50">
                            Learning Language
                        </legend>

                        <label className="input w-full bg-black/16 border-gray-700/16">
                            <MapPinCheck className="size-4" />
                            <input
                                type="text"
                                required
                                placeholder="location"
                            />
                        </label>
                    </fieldset>

                    <div>
                        <button className="btn w-full btn-success mt-8">
                          <Globe className="size-5"/>
                            Complete Onboarding
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingPage;
