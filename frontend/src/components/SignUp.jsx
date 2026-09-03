import { useState } from "react";

function SignUp() {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        conPassword: "",
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

        if (!inputs.email.trim()) {
            validationErrors.email = "Email is required.";
            isValid = false;
        } else if (!inputs.email.includes("@") && !inputs.email.includes(".")) {
            validationErrors.email = "Email must contain an '@' and a '.' symbol.";
            isValid = false;
        }

        if (!inputs.password) {
            validationErrors.password = "Password is required.";
            isValid = false;
        } else if (inputs.password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters.";
            isValid = false;
        }

        if (inputs.conPassword !== inputs.password) {
            validationErrors.conPassword = "Passwords do not match.";
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
            const response = await fetch("http://localhost:1337/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: inputs.username,
                    email: inputs.email,
                    password: inputs.password
                })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                navigate("/home");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div>
                <label htmlFor="sign-up-username">Username</label>
                <input type="text" required id="sign-up-username" name="username" value={inputs.username} onChange={handleChange} />
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="sign-up-email">Email</label>
                <input type="email" required autoComplete="email" id="sign-up-email" name="email" value={inputs.email} onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="sign-up-password">New Password</label>
                <input type="password" required minLength={8} id="sign-up-password" name="password" value={inputs.password} onChange={handleChange} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <label htmlFor="sign-up-conPassword">Confirm Password</label>
                <input type="password" required minLength={8} id="sign-up-conPassword" name="conPassword" value={inputs.conPassword} onChange={handleChange} />
                {errors.conPassword && <p>{errors.conPassword}</p>}
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;