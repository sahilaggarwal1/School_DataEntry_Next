import { db } from "@/app/_lib/db";
import { NextResponse } from "next/server";
import fs from "fs";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const address = formData.get("address");
        const city = formData.get("city");
        const state = formData.get("state");
        const contact = formData.get("contact");
        const email_id = formData.get("email_id");

        // Save image
        const file = formData.get("image");
        let fileName = null;
        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            fileName = Date.now() + "-" + file.name;
            fs.writeFileSync(`public/schoolImages/${fileName}`, buffer);
        }

        // Insert into DB
        await db.query(
            "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?,?,?,?,?,?,?)",
            [name, address, city, state, contact, fileName, email_id]
        );

        return NextResponse.json({ message: "School added successfully!" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
