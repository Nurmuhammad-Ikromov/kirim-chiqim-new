import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    last_name: {
      type: String,
      required: true, // Majburiy maydon
    },
    first_name: {
      type: String,
      required: true, // Majburiy maydon
    },
    email: {
      type: String,
      required: true,
      unique: true, // Unikal bo'lishi kerak
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email formatini tekshiradi
        },
        message: (props) => `${props.value} to'g'ri email emas!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0, // Yoshi musbat bo'lishi kerak
    },
  },
  {
    timestamps: true, // createdAt va updatedAt qo'shiladi
    paranoid: true, // deletedAt qo'shilishi uchun custom maydon ishlatilishi mumkin
  }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
