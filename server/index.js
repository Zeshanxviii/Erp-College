import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import handler from "./corshandler.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import { addDummyAdmin } from "./controller/adminController.js";
const app = express();
app.options('*', cors());

app.use(cors({
  origin: 'https://collegeerpfrontend.vercel.app', // Add your frontend URL here
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you're using credentials (cookies, authentication headers)
}));
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

const PORT = process.env.PORT || 5001;

// app.get("/", handler); 
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>{
    console.log('MongoDB connected successfully')
    addDummyAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
  })
  .catch((error) =>
    console.log("Mongo Error", error.message)
  )