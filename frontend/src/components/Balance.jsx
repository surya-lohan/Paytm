import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {

    const [balance, setBalance] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setBalance(response.data.balance);
            })
            .catch(error => {
                console.error("Error fetching balance:", error);
            });
    }, []);

    return (
        <div className="p-4">
            <h3 className="text-2xl font-semibold">Your balance is Rs {balance}</h3>
        </div>
    );
};
export default Balance;