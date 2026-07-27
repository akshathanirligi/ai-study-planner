import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        // Auth submission placeholder
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>{isSignup ? "Signup" : "Login"}</h1>
                {isSignup && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    {isSignup ? "Signup" : "Login"}
                </button>
                <p onClick={() => setIsSignup(!isSignup)} style={{ cursor: "pointer" }}>
                    {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
                </p>
            </div>
        </div>
    );
}

export default Login;
