
import mongoose from "mongoose"

export const dbconnection = (url: string) => {
     mongoose.connect(url)
     .then(() => console.log('Database connected successfully'))
     .catch((err) => console.log(err))
}