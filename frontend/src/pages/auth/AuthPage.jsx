import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/Authapi";
import { createUser } from "../../api/userApi";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const roleRoutes = {
  ADMIN: "/admin",
  FARMER: "/farmer",
  QUALITY_INSPECTOR: "/inspector",
  PROCUREMENT_OFFICER: "/procurement",
};

const roles = [
  { value: "ADMIN", label: "Admin" },
  { value: "FARMER", label: "Farmer" },
  { value: "QUALITY_INSPECTOR", label: "Inspector" },
  { value: "PROCUREMENT_OFFICER", label: "Procurement Officer" },
];

export default function AuthPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      navigate(roleRoutes[role]);
    } catch {
      alert("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    try {
      await createUser({ name, email, password, phoneNumber, role });
      alert("Signup successful! Please login.");
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setName("");
      setPhoneNumber("");
    } catch {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <h2 style={{ marginBottom: 8, fontWeight: 700, letterSpacing: 1 }}>Farm Grade</h2>
        {isLogin ? (
          <>
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select value={role} onChange={e => setRole(e.target.value)}>
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <button onClick={handleLogin}>Login</button>
            <div style={{ marginTop: 16, fontSize: "1rem" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#3182ce", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </div>
          </>
        ) : (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select value={role} onChange={e => setRole(e.target.value)}>
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <button onClick={handleSignup}>Sign Up</button>
            <div style={{ marginTop: 16, fontSize: "1rem" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#3182ce", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}