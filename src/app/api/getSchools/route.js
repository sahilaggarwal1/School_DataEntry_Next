import { db } from "@/app/_lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, address, city, image FROM schools"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err);  // 👈 log full error
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
