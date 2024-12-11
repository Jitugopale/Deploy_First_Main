import mongoose from "mongoose";

const panVerificationSchema = new mongoose.Schema({
  pannumber: { type: String, required: true },
  status: { type: String, required: true },
  verifiedData: {
    name: { type: String },
    pannumber: { type: String }
  }
});

const PanVerification = mongoose.model('PanVerification', panVerificationSchema);

export default PanVerification;
