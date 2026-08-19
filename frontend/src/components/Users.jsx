import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedQuery}`,)
            .then(response => {
                setUsers(response.data.user || []);
            })
            .catch(error => {
                console.log(error);
            });
    }, [debouncedQuery]);

    return (
        <div className="p-6">
            <h1 className="text-xl">Users</h1>
            <div className="flex flex-col gap-6 p-3">
                <input value={query} onChange={(e) => setQuery(e.target.value)} className="border p-2 border-gray-400 rounded-md w-96" type="text" placeholder="Search users..." />
                {users?.map((user, index) => (
                    <User key={user._id || index} firstName={user.firstName} lastName={user.lastName} />
                ))}
            </div>
        </div>
    );
};

const User = ({ firstName, lastName }) => {
    return (
        <>
            <div className="w-1/2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="bg-gray-300 rounded-full flex items-center justify-center w-10 h-10">U</span>
                    <h2 className="text-md ">{firstName} {lastName}</h2>
                </div>
                <button className="bg-black text-white px-6 text-sm  flex items-center justify-center w-fit py-2 rounded-md hover:cursor-pointer">Send money</button>
            </div>
        </>
    )
}

export default Users;