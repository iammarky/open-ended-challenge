import { loginUser, validateSession } from '@/lib/server-actions';

export async function POST(req: Request) {
  const data = await req.json();
  return await loginUser(data);
}

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  return validateSession(token);
}
