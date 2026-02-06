import mongoose from 'mongoose';

const connectDB= async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/Bazaar`)
        console.log('MONGODB connection successfully')

    }catch(error){
        console.log('MongoDB connection failed : ', error);
    }
}

export default connectDB