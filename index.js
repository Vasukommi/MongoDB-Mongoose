import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect('mongodb+srv://vasukommi:ucedtOewMd69Q8Cj@vasukommi.umthlgt.mongodb.net/?retryWrites=true&w=majority&appName=vasukommi');

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});