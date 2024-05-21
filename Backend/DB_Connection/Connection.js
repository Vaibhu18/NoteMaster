import mongoose from "mongoose"

export const dbConnection = () =>{
    mongoose.connect("mongodb://localhost:27017/Todo_practice").then(()=>{
        console.log("database is connected")
    }).catch((err)=>{
        console.log(err)
    })
}