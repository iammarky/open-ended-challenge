import { NextResponse } from 'next/server';

// In-memory session store
const sessions: Record<string, { username: string }> = {};

// User credentials for simulation (Replace with actual authentication in a real app)
const validCredentials = {
  username: 'testuser',
  password: 'testpassword',
};

// Function to handle user login
export async function loginUser(data: { username: string; password: string }) {
  const { username, password } = data;

  if (
    username !== validCredentials.username ||
    password !== validCredentials.password
  ) {
    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 },
    );
  }

  // Generate a simple session token (for simulation purposes)
  const sessionToken = `${username}-session-${Date.now()}`;
  sessions[sessionToken] = { username };

  return NextResponse.json({ message: 'Login successful', sessionToken });
}

// Function to handle session validation
export function validateSession(token: string) {
  if (sessions[token]) {
    return NextResponse.json({ valid: true, user: sessions[token] });
  } else {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
