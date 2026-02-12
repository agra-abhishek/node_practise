import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-gray-800 p-4 text-white flex justify-center gap-6">
      <Link to="/">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/info">Info</Link>
    </div>
  );
}
