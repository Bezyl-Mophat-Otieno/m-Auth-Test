import axios from "axios";
import { generateToken , sendMail } from "m-auth-lib";


const createUsers = async (name,email,password)=>{

   const result = await axios.post('http://localhost:3000/users', {name,email,password},
    {
        headers:{
            'Content-Type':'application/json',
        }
    }
    )
    const data = await result.data
    return data
}

const loginUser = async (email,password)=>{
    const response = await axios.get('http://localhost:3000/users')
    const users = await response.data
    console.log(users)
    const user = users.find(user=>user.email===email)
    console.log(user)
    if(!user) throw new Error("User not found")
    if(user.password!==password) throw new Error("Invalid password")
    const token = generateToken({email,password})
    return token
}

const resetUserPassword = async (email)=>{
    const response = await axios.get('http://localhost:3000/users')
    const users = await response.data
    const user = users.find(user=>user.email===email)
    if(!user) throw new Error("User not found")

    const mailOptions = {
        from: process.env.SYS_ADMIN_EMAIL,
        to: email,
        subject: 'Password Reset',
        text: 'Your password has been reset',
        html: '<p>Your password has been reset</p>',
        attachments: [
            {
                filename: 'file.txt',
                content: 'Hello world!'
            }
        ]
    }

    await sendMail(mailOptions)
}

export {createUsers, loginUser, resetUserPassword}

