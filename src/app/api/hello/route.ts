import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  await new Promise((r) => setTimeout(r, 1));
  return NextResponse.json({
    message: "Hello, World!",
  });
}
