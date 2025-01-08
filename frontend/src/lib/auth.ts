import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function decrypt(token: string): Promise<any> {
  try {
    return (await jwtVerify(token, secret)).payload;
  } catch (err) {
    return null;
  }
}

export async function login(formData: FormData) {
  // Validate the formData
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!result.success) {
    return { error: 'Invalid credentials' };
  }

  // Here you would verify against your database
  // For now, we'll just create a token
  const token = await encrypt({ email: result.data.email });

  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true };
}

export async function logout() {
  cookies().delete('token');
  return { success: true };
}

export async function getSession() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  return await decrypt(token);
}