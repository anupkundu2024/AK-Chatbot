const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
// Configure CORS
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"], // Allow these origins
  methods: ["GET", "POST"], // Allow these methods
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    // Use environment variable for MongoDB URI or use a default local connection
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/chatbot";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Define routes
app.get("/", (req, res) => {
  res.send("Welcome to the Chatbot API");
});

// Use Routes
app.use("/api/messages", require("./routes/api/messages"));
app.use("/api/chat", require("./routes/api/chat"));
app.use("/api/logs", require("./routes/api/logs"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
