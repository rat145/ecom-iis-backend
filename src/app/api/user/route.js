import user from './user.json'
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(user);
}