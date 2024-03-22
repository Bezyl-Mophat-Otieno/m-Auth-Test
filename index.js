import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import  {createUsers , loginUser , resetUserPassword}  from './scripts.js'; // Import the body-parser package
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const user = await createUsers(name, email, password);
    return res.json(user);
});

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const token = await loginUser(email,password);
    return res.json(token);
})

app.post("/reset-password",async(req,res)=>{
    const {email} = req.body;
    const user = await resetUserPassword(email);
    return res.json(user);
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

