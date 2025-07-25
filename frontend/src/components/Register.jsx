import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div
      className="container mx-auto max-w-md mt-10 p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md outline-none"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--input-text)",
              borderColor: "var(--accent)",
            }}
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md outline-none"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--input-text)",
              borderColor: "var(--accent)",
            }}
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md outline-none"
            style={{
              backgroundColor: "var(--input-bg)",
              color: "var(--input-text)",
              borderColor: "var(--accent)",
            }}
            required
          />
        </div>
        <button
          className="w-full py-2 rounded-md"
          style={{
            background: "linear-gradient(90deg, var(--accent), var(--accent-secondary))",
            color: "var(--bg)",
            boxShadow: "0 0 8px var(--accent)",
            border: "none",
          }}
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="hover:underline"
          style={{ color: "var(--accent-secondary)" }}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
