import { db } from "@/app/_lib/db";
import { NextResponse } from "next/server";
import fs from "fs";

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

        // Get image filename first to delete from public/schoolImages
        const [rows] = await db.query("SELECT image FROM schools WHERE id = ?", [id]);
        if (rows.length > 0 && rows[0].image) {
            const imagePath = `public/schoolImages/${rows[0].image}`;
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath); // delete image file
        }

        // Delete from DB
        await db.query("DELETE FROM schools WHERE id = ?", [id]);

        return NextResponse.json({ message: "School deleted successfully" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
