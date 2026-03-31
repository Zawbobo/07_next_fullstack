import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

// GET /api/attractions => list all attractions
export async function GET(request) {
    const promisePool = mysqlPool.promise();
    const [rows, fields] = await promisePool.query("SELECT * FROM attractions");
    return NextResponse.json(rows);
}

// POST /api/attractions => create a new attraction
export async function POST(request) {
    try {
        const body = await request.json();
        // return NextResponse.json(body);
        const { name, detail, coverimage, latitude, longitude } = body;

        const promisePool = mysqlPool.promise();
        const [result] = await promisePool.query(
            `INSERT INTO attractions (name, detail, coverimage, latitude, longitude) 
            VALUES (?, ?, ?, ?, ?)`,
            [name, detail, coverimage, latitude, longitude]
        );

        const [rows] = await promisePool.query(
            `SELECT * FROM attractions WHERE id = ?`,
            [result.insertId]
        );
        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}