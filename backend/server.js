import express from "express";
import cors from "cors";

// CREATE APP
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Its finally alright champ your backend is up.");
});

//STUBS
app.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password is required." });
        }
        res.status(200).json({
            message: "Login successful.",
            username: username,
            id: Date.now()
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to login in user", details: error.message })
    }
});
app.post("/signup", (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, Email and Password is required" });
        }
        res.status(201).json({
            message: "Sign Up successful.",
            username: username,
            id: Date.now()
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to signup user", details: error.message })
    }
})
// PORT
app.listen(1337, () => {
    console.log("Listening on localhost:1337");
});