import { useState } from "react";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/users/post", form);
    alert("User Registered");
  };

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {["name", "email", "password", "dateOfBirth"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full border p-2 mb-3 rounded"
          />
        ))}

        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
