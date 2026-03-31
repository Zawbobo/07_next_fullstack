import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request, { params }) {
    const {id} = await params;
    const promisePool = mysqlPool.promise();
    const [rows, fields] = await promisePool.query(
        'select * from attractions where id = ?;',
        [id]
    );
    if (rows.length === 0) {
        return NextResponse.json(
            {message : `Attraction with id ${id} not found.`},
            {status: 404}
        );
    }
    return NextResponse.json(rows[0]);
}

// PUT /api/attractions/:id => update an attraction
export async function PUT(request, { params }) {
    try {
        const {id} = await params;
        const body = await request.json();
        const { name, detail, coverimage, latitude, longitude } = body;

        const promisePool = mysqlPool.promise();
        const [exist] = await promisePool.query(
            `SELECT * FROM attractions WHERE id = ?`,
            [id]
        );
        if (exist.length === 0) {
            return NextResponse.json(
                {message : `Attraction with id ${id} not found.`},
                {status: 404}
            );
        }

        await promisePool.query(
            `UPDATE attractions SET name = ?, detail = ?, coverimage = ?, latitude = ?, longitude = ? WHERE id = ?`,
            [name, detail ??"", coverimage, latitude?? null, longitude ?? null, id]
        );

        const [rows] = await promisePool.query(
            `SELECT * FROM attractions WHERE id = ?`,
            [id]
        );
        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}

// DELETE /api/attractions/:id => delete an attraction
export async function DELETE(request, { params }) {
    try {
        const {id} = await params;

        const promisePool = mysqlPool.promise();
        const [exist] = await promisePool.query(
            `SELECT * FROM attractions WHERE id = ?`,
            [id]
        );
        if (exist.length === 0) {
            return NextResponse.json(
                {message : `Attraction with id ${id} not found.`},
                {status: 404}
            );
        }

        await promisePool.query(
            `DELETE FROM attractions WHERE id = ?`,
            [id]
        );

        return NextResponse.json({message: `Attraction with id ${id} deleted.`});
    } catch (error) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}