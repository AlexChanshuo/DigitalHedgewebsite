// src/utils/password.ts
import bcrypt from 'bcryptjs';
import { config } from '../config';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, config.password.saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < config.password.minLength) {
    errors.push(`密碼至少需要 ${config.password.minLength} 個字元`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('密碼需包含至少一個大寫字母');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('密碼需包含至少一個小寫字母');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('密碼需包含至少一個數字');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
