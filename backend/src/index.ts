import express from "express";
import cors from "cors";
//routes
import authRoutes from "./routes/authRoutes.ts";
import userRoutes from "./routes/userRoutes.ts"

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 5000}`
  );
});
