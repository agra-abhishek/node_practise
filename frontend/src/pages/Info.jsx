import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/info");
        setUser(res.data.data);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>DOB: {new Date(user.dateOfBirth).toDateString()}</p>
    </div>
  );
}
