import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const [resError, setResError] = useState(false);
    const [resData, setResData] = useState({});
    const navigate = useNavigate();
    const data = {
        username: "",
        firstName: "",
        lastName: "",
        password: ""
    }

    const handleSubmit = async () => {

        const response = await axios.post("http://localhost:3000/api/v1/user/signup", data).catch((error) => {
            setResError(true);
            setResData(error.response.data);
        })
        setResData(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");

    }

    return resError ? (
        <div className='h-screen w-screen flex items-center justify-center bg-gray-400'>
            <div className='bg-white p-4 rounded-2xl'>
                <div className="p-2 flex flex-col items-center justify-center gap-1">
                    <h1 className="font-bold text-xl">Signup unsuccesful</h1>
                    <h3 className="text-gray-500 text-sm">{resData.message}</h3>
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
                        <input onChange={(e) => data.firstName = e.target.value} required className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="text" name="firstname" placeholder="John" />
                    </div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold" >Last name</h3>
                        <input onChange={(e) => data.lastName = e.target.value} className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="text" name="lastname" placeholder="Doe" />
                    </div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold">Email</h3>
                        <input onChange={(e) => data.username = e.target.value} required className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="email" name="username" id="" placeholder="jhondoe@example.com" />
                    </div>
                    <div className="p-2 m-2">
                        <h3 className="font-semibold">Password</h3>
                        <input onChange={(e) => data.password = e.target.value} className="border border-gray-300 rounded-md px-2 py-1 my-2 w-full" type="password" name="password" id="" />
                    </div>
                </div>
                <div className="p-2 m-2 flex flex-col items-center justify-center gap-4">
                    <button onClick={handleSubmit} className="bg-black text-white items-center w-full py-3 rounded-md hover:cursor-pointer hover:scale-[1.02] transition ">Sign up</button>
                    <h3 className="text-sm">Already have an account? <a className="underline" href="/signin">Login</a></h3>
                </div>
            </div>
        </div>
    )
};
export default Signup;