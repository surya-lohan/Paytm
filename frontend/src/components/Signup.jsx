import axios from 'axios'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {

    const [resError, setResError] = useState(false);
    const [resData, setResData] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            setResData(response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            setResError(true);
            setResData(error.response?.data || { message: "We're having trouble. Please try again!" });
        } finally {
            setLoading(false);
        }

    }

    return resError ? (
        <div className='h-screen w-screen flex items-center justify-center bg-gray-400'>
            <div className='bg-white p-6 rounded-2xl max-w-sm w-full mx-4'>
                <div className="p-2 flex flex-col items-center justify-center gap-1">
                    <h1 className="font-bold text-xl">Signup unsuccesful</h1>
                    <h3 className="text-gray-500 text-sm text-center wrap-break-word w-full">{resData?.message || "We're having trouble creating your account. Please try again!"}</h3>
                    <button onClick={() => {
                        window.location.reload();
                    }} className='bg-black text-white items-center w-full py-3 rounded-md hover:cursor-pointer hover:scale-[1.02] transition mt-8' >Try again</button>
                </div>
            </div>
        </div>
    ) : (
        <div className=" h-screen w-screen flex items-center justify-center bg-gray-400">
            <div className="bg-white p-4 rounded-2xl">
                <div className="p-2 flex flex-col items-center justify-center gap-2">
                    <h1 className="font-bold text-3xl">Sign up</h1>
                    <h3 className="text-gray-500">Enter your information to create an account</h3>
                </div>
                <div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold">First name</h3>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="text" name="firstname" placeholder="John" />
                    </div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold" >Last name</h3>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="text" name="lastname" placeholder="Doe" />
                    </div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold">Email</h3>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} required className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="email" name="username" id="" placeholder="jhondoe@example.com" />
                    </div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold">Password</h3>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="password" name="password" id="" />
                    </div>
                </div>
                <div className="p-2 m-2 flex flex-col items-center justify-center gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-black text-white flex items-center justify-center w-full py-3 rounded-md hover:cursor-pointer hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing up...
                            </span>
                        ) : (
                            "Sign up"
                        )}
                    </button>
                    <h3 className="text-sm">Already have an account? <Link className="underline" to="/signin">Login</Link></h3>
                </div>
            </div>
        </div>
    )
};
export default Signup;