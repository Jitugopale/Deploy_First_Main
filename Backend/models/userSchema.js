import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    PhoneNo: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/, // Ensure it's a 10-digit number
      },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // Use `Date.now` without `Date.Now` (the latter is incorrect)
    },
    clientId: {
        type: String,
        required: false, // You can make it optional depending on the use case
    },
    OTP: {
        type: Number,
        required: false, // If you want to store OTP temporarily, this is an optional field
    },
    mobile_number: {
        type: String,
        required: false, // Same for mobile number if you want to store it
    },
    aadharNumber: {
        type: Number,
        required: false, // Optional Aadhar number field
        unique: true, // Ensures Aadhar is unique for each user
        sparse:true
    },
  refid: {
        type: String, // You can use String as the type for unique reference IDs
        required: false, // Make it optional if not always provided
        unique: true, // Ensures refid is unique
        sparse: true // Allows multiple null values
    },
    id_number: {
        type: String, // You can use String or Number depending on the format of the ID
        required: false, // Optional, can be updated based on your requirements
        unique: true, // Ensures id_number is unique
        sparse: true, // Allows multiple null values
    }
 
});

const userSchema = mongoose.model("user", UserSchema);
export default userSchema;
