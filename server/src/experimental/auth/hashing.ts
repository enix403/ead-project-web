import bcrypt from 'bcrypt';

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(plainTextPassword: string): Promise<string> {
  return bcrypt.hashSync(plainTextPassword, 10);
}
