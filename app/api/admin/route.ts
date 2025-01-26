import { NextRequest, NextResponse } from 'next/server';
import pool from '../../lib/dockerpostgresql'
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Hash the password for security
    const passwordHash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO admins (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at;
    `;
    const values = [name, email, passwordHash];

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
