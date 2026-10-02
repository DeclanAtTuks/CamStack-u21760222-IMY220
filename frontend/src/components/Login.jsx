import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    function validation() {
        const validationErrors = {};
        let isValid = true;
        if (!inputs.username.trim()) {
            validationErrors.username = "Username is required.";
            isValid = false;
        }
        if (!inputs.password) {
            validationErrors.password = "Password is required.";
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (!validation()) {
            return;
        }
        try {
            const response = await fetch("http://localhost:1337/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputs.username,
                    password: inputs.password
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/home");
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label htmlFor="login-username">Username</label>
                <input type="text" required id="login-username" name="username" value={inputs.username} onChange={handleChange} />
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="login-password">Password</label>
                <input type="password" required minLength={8} id="login-password" name="password" value={inputs.password} onChange={handleChange} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;