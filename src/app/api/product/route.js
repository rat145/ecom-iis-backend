import product from './product.json'
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(product);
}