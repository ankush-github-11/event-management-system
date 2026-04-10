// app/api/user/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import User from "@/database/user.model";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";

interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

  const user = await User.findById(decoded.id)
    .select("-password")
    .populate("eventsCreated eventsParticipated");

  return NextResponse.json(user);
}