import mongoose, { Schema, Document, models, model } from "mongoose";
import bcrypt from "bcryptjs";

/*
User Interface
*/

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;

  avatar?: string;
  bio?: string;
  lastLogin?: Date;

  eventsCreated: mongoose.Types.ObjectId[];
  eventsParticipated: mongoose.Types.ObjectId[];

  role: "user" | "admin";
  isVerified: boolean;

  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
}

/*
User Schema
*/

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },

    lastLogin: {
      type: Date,
    },

    refreshToken: {
      type: String,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },

    emailVerificationToken: {
      type: String,
    },

    eventsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    eventsParticipated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*
Indexes
*/

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

/*
Hash password before saving
*/

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/*
Compare password for login
*/

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

/*
Prevent model overwrite in Next.js hot reload
*/

const User = models.User || model<IUser>("User", UserSchema);

export default User;