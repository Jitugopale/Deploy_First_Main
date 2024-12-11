import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import {validationResult} from 'express-validator';
import jwt from "jsonwebtoken"
import User from "../models/userSchema.js"
import axios from 'axios';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const SendOTP= process.env.SendOTP;
const VerifyOTP=process.env.VerifyOTP;
const Agent = process.env.Agent;


export const createUserController =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        fname: req.body.fname,
        Lname: req.body.Lname,
        Address: req.body.Address,
        PhoneNo: req.body.PhoneNo,
        email: req.body.email,
        password: secPass,
        City: req.body.City,
      });

      const data = { id: user.id };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }

export const loginController =  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log("Password Comparison:", passwordCompare); // Should print true if matching

      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const data = { id: user.id };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      console.log(JWT_SECRET);
    } catch (error) {
      console.log(JWT_SECRET);
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
}

export const getuserController =  async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user); // Return the user details without the password
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
}

// Controller to handle Aadhaar OTP
// Controller to handle Aadhaar OTP
export const aadhaarOtpController = async (req, res) => {
  const { aadharNumber } = req.body;

  if (!aadharNumber) {
    return res.status(400).json({ message: "Aadhar number is required" });
  }

  try {
    // Generate Token using the helper function
    const token = createToken();
    console.log(token)

    // Send OTP request to Aadhaar verification API
    const otpResponse = await axios.post(
      SendOTP,
      { id_number: aadharNumber },
      {
        headers: {
          'Token': token,
          // 'Authorization': `Bearer ${token}` ,
          'User-Agent': Agent,
        }
      }
    );

    if (otpResponse.status === 200) {
      // If OTP generation is successful, create JWT token
      const otpToken = jwt.sign(
        { client_id: otpResponse.data.data.client_id },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.json({
        message: "OTP sent successfully.",
        token: otpToken,  // Return the JWT token
        client_id: otpResponse.data.data.client_id,
      });
    } else {
      return res.status(500).json({ message: "Failed to generate OTP" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.response?.data?.message || "Error generating OTP. Please try again."
    });
  }
};

// Helper function to create a token for Aadhaar OTP
function createToken() {
  const secretKey = process.env.secretKey;
  const symmetricKey = Buffer.from(secretKey, 'utf8');
  const unixTimeStamp = Math.floor(Date.now() / 1000);

  // Creating JWT token
  const token = jwt.sign(
    { timestamp: unixTimeStamp, partnerId: Agent, reqid: '1111' },
    symmetricKey,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
  return token;
}



export const verifyAadhaarOtpController = async (req, res) => {
  const { clientId, OTP } = req.body;

  if (!clientId || !OTP) {
    return res.status(400).json({ message: "Client ID and OTP are required" });
  }

  try {
    // Get token from headers or request body
    const token = createToken();
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify the token using the same secret used during signing
    const secretKey = process.env.secretKey; // Ensure this is the same secret key
    jwt.verify(token, Buffer.from(secretKey, 'utf8'), (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Signature verification failed" });
      }
      
      // Proceed with OTP verification if token is valid
      verifyOtp(clientId, OTP, token, res);
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.response?.data?.message || "Error verifying OTP. Please try again."
    });
  }
};

// Function to handle OTP verification request
async function verifyOtp(clientId, OTP, token, res) {
  try {
    const otpVerifyResponse = await axios.post(
      VerifyOTP,
      { client_id: clientId, otp: OTP },
      {
        headers: {
          'Token': token,  // The same token is sent here for verification
          'User-Agent': Agent
        }
      }
    );
    console.log('OTP Verification Response:', otpVerifyResponse.data);


    if (otpVerifyResponse.data.statuscode === 200 && otpVerifyResponse.data.status === true) {
      // OTP verified successfully, now load Aadhaar data
      const aadhaarData = otpVerifyResponse.data;
      return res.json({
        message: "Aadhaar verification successful.",
        aadhaarData,
      });
    } else {
      return res.status(400).json({ message: "OTP verification failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.response?.data?.message || "Error verifying OTP. Please try again."
    });
  }
}

// Controller to verify PAN card
export const verifyPanCardController = async (req, res) => {
  const { pannumber } = req.body;

  // Validate input
  if (!pannumber) {
    return res.status(400).json({ 
      status: 'error', 
      message: "PAN number is required" 
    });
  }

  try {
    // Generate token for verification API
    const token = createToken();
    if (!token) {
      return res.status(400).json({ 
        status: 'error', 
        message: "Unable to generate token for verification" 
      });
    }

    // Send request to the PAN card verification API
    const response = await axios.post(
      'https://api.verifya2z.com/api/v1/verification/pan_verify',
      { pannumber: pannumber },
      {
        headers: {
          'Token': token,
          'User-Agent': 'CORP0000363',
        },
      }
    );

    // Check the response for successful verification
    if (response.data.statuscode === 200 && response.data.status === true) {
      const { name, pannumber } = response.data.data;

      // Pass verification data to req.body to be used by another controller or middleware
      req.body.verifiedData = { name, pannumber };  // Add the verified data to req.body

      // Return success message with PAN number and verified data
      return res.json({
        status: 'success',
        message: 'PAN Card verified successfully.',
        verifiedData: { name, pannumber },  // Return the name and PAN number
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: "PAN verification failed. Invalid or unverified details."
      });
    }
  } catch (error) {
    console.error("PAN Verification Error:", error);
    return res.status(500).json({
      status: 'error',
      message: error.response?.data?.message || "An error occurred during PAN verification.",
    });
  }
};