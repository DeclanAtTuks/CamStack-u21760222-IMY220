import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { connectDB, getDB } from "./db.js";
//image uploads
import multer from "multer";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 1337;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//tells multer to create some storage for the files that we are going to be uploading
//cb stands for callback
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "frontend/public/assets/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
//multer middleware instance
const uploadImage = multer({ storage: storage })

//check its wokring
app.get("/", (req, res) => {
    res.send("Its finally alright champ your backend is up.");
});

//login
app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password is required." });
        }
        const db = getDB();
        const collection = db.collection("users");
        const user = await collection.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: "Invalid username." });
        }
        if (password !== user.password) {
            return res.status(401).json({ error: "invalid password" });
        }
        res.status(200).json({
            message: "Login successful.", _id: user._id, username: user.username, bio: user.bio,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to login in user", details: error.message })
    }
});

//signup
app.post("/api/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: "Username, Email and Password is required" });
        }
        const db = getDB();
        const collection = db.collection("users");
        const existing = await collection.findOne({ username });
        if (existing) {
            return res.status(405).json({ error: "Username already in use." });
        }
        const newUser = {
            username,//: username,
            email,//: email,
            password: password,
            bio: "",
            profilePicture: "",
            friends: [],
            createdAt: new Date(),
        };
        const result = await collection.insertOne(newUser);
        res.status(201).json({ message: "SignUp Successful", _id: result.insertedId, username, email });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Failed to signup user", details: error.message })
    }
})

//getposts
app.get("/api/posts", async (req, res) => {
    try {
        const db = getDB();
        const collection = db.collection("posts");
        const posts = await collection.find().toArray();
        res.json(posts);
    } catch (error) {
        console.error("Error retrieving posts:", error);
        res.status(500).json({ error: "Failed to retrieve posts." });
    }

});

//add post
app.post("/api/posts", async (req, res) => {
    try {
        const { author, username, caption, image, hashtags } = req.body;
        if (!username || !username.trim() || !caption || !caption.trim()) {
            return res.status(400).json({ error: "Username and caption are required." });
        }
        const db = getDB();
        const collection = db.collection("posts");
        const newPost = {
            author: new ObjectId(author),
            username,
            caption,
            image,
            likes: [],
            hashtags: hashtags,
            createdAt: new Date,
            updatedAt: new Date,
        };
        const result = await collection.insertOne(newPost);
        res.status(201).json({
            _id: result.insertedId,
            ...newPost
        });
    } catch (error) {
        console.error("Error adding post:", error);
        res.status(500).json({ error: "Failed to add post." });
    }

});

//Get All Albums
app.get("/api/albums", async (req, res) => {
    try {
        const { author } = req.query;
        const filter = {};
        if (author) {
            filter.author = new ObjectId(author);
        }
        const db = getDB();
        const collection = db.collection("albums");
        const albums = await collection.find(filter).toArray();
        res.json(albums);
    } catch (error) {
        console.error("Error retrieving albums:", error);
        res.status(500).json({ error: "Failed to retrieve albums." });
    }
});

//Create album
app.post("/api/albums", async (req, res) => {
    try {
        const { author, username, albumName, description } = req.body;
        if (!username || !username.trim() || !albumName || !albumName.trim()) {
            return res.status(400).json({ error: "Username and album name are required." });
        }
        const db = getDB();
        const collection = db.collection("albums");
        const newAlbum = {
            author: new ObjectId(author),
            username,
            albumName,
            description,
            posts: [],
            createdAt: new Date,
            updatedAt: new Date,
        };
        const result = await collection.insertOne(newAlbum);
        res.status(201).json({ _id: result.insertedId, ...newAlbum });
    } catch (error) {
        console.error("Error adding album:", error);
        res.status(500).json({ error: "Failed to create album." });
    }

});

//Adding a post to album
app.post("/api/albums/add-post", async (req, res) => {
    try {
        const { author, albumName } = req.body;
        if (!username || !username.trim() || !albumName || !albumName.trim()) {
            return res.status(400).json({ error: "Username and album name are required." });
        }
        const db = getDB();
        const collection = db.collection("albums");

        const result = await collection.insertOne(newAlbum);
        res.status(201).json({
            _id: result.insertedId,
            ...newAlbum
        });
    } catch (error) {
        console.error("Error adding post to album:", error);
        res.status(500).json({ error: "Failed to add post to album." });
    }

});

//Getting a profile
app.get("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDB();
        const collection = db.collection("users");
        const user = await collection.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ ...user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get user" })
    }
})

//edit prof
app.put("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, profilePicture } = req.body;
        const updates = {};
        if (bio !== undefined) updates.bio = String(bio).trim();
        if (profilePicture !== undefined) updates.profilePicture = String(profilePicture).trim();
        const db = getDB();
        const collection = db.collection("users");
        if (Object.keys(updates).length === 0) return res.json("Nothing to update");
        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
        const user = await collection.findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update Profile." })
    }
})

//search users
app.get("/api/users", async (req, res) => {
    try {
        const search = (req.query.search || "").trim();
        const filter = search ? { username: { $regex: search, $options: "i" } } : {};
        const db = getDB();
        const collection = db.collection("users");
        const users = await collection.find(filter, { projection: { username: 1, bio: 1, profilePicture: 1 } }).toArray();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No instance found of search" })
    }
})

//onepost
app.get("/api/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDB();
        const collection = db.collection("posts");
        const post = await collection.findOne({ _id: new ObjectId(id) });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get post" })
    }
})

//posts under one user
app.get("/api/users/:id/posts", async (req, res) => {
    try {
        const { id } = req.params;
        const db = getDB();
        const collection = db.collection("posts");
        const posts = await collection.aggregate([{ $match: { author: new ObjectId(id) } }]).toArray();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get users posts" });
    }
})

//localfeed
app.get("/api/feed/local", async (req, res) => {
    try {
        const { userId } = req.query;
        const db = getDB();
        const userCollection = db.collection("users");
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "no friends" })
        }
        const myAcc = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!myAcc) {
            return res.status(404).json({ error: "User not found" });

        }
        const friendlys = [myAcc._id, ...(myAcc.friends || [])];
        const postCollection = db.collection("posts");
        const posts = await postCollection.aggregate([{ $match: { author: { $in: friendlys } } }]).toArray();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get local feed" });
    }
})

//edit own posts
app.put("/api/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, caption, hashtags } = req.body;
        if (!caption || !caption.trim()) {
            return res.status(400).json({ error: "caption is required." });
        }
        const db = getDB();
        const collection = db.collection("posts");
        const post = await collection.findOne({ _id: new ObjectId(id) });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: "You can only edit your own posts." });
        }
        await collection.updateOne({ _id: post._id }, { $set: { caption: caption, hashtags: hashtags, updatedAt: new Date() } });
        res.status(200).json({ message: "post updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to get local feed" });
    }
})

app.delete("/api/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;
        const db = getDB();
        const postCollection = db.collection("posts");
        const post = await postCollection.findOne({ _id: new ObjectId(id) });
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }
        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: "You can only delete your own posts." });
        }
        const postCollection2 = db.collection("posts");
        await postCollection2.deleteOne({ _id: post._id });
        const albumCollection = db.collection("albums");
        await albumCollection.updateMany({}, { $pull: { posts: post._id } });
        //const commentsCollection = db.collection("comments");
        //await commentsCollection.deleteMany({ post: post._id });
        res.json({ message: "Post deleted." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete post" });
    }
})

//comments off a post
app.get("api/posts/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to load comments" });
    }
})

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });