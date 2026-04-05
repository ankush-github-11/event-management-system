import connectDB from "@/lib/mongodb";
import { registerUserSchema } from "@/lib/validators/user.schema";
import bcrypt from "bcryptjs";
import User from "@/database/user.model";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validate
    const parsed = registerUserSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(parsed.error, { status: 400 });
    }

    const { name, username, email, password } = parsed.data;

    await connectDB();

    // ✅ Check existing user
    const existing = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user (Mongoose way)
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return Response.json({ message: "User created" });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
