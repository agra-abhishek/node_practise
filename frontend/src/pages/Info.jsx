import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const [user, setUser] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/info", { withCredentials: true });
        setUser(res.data.data);
        setTimeout(() => setMessageVisible(true), 400); // delay for transition
      } catch (err) {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!user)
    return (
      <p className="text-center mt-10 text-xl text-gray-700 animate-pulse">
        Loading...
      </p>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 p-4">
      <div
        className={`bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all duration-800 ${
          messageVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90"
        }`}
      >
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4 drop-shadow-md">
          Hey there, {user.name}! 🎉
        </h1>
        <p className="text-2xl text-gray-800 mb-4">
          Wow, {user.age} years young and already a superstar! 🌟
        </p>
        <p className="text-xl text-pink-500 font-semibold italic mb-6">
          Friendships are like stars ✨ — shining brighter with you,{" "}
          {user.name}! Keep glowing at {user.age} years!
        </p>
       
      </div>
    </div>
  );
}
