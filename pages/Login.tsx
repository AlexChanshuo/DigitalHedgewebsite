// pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  onSuccess: () => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onBack }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      if (result.mustChangePassword) {
        setShowChangePassword(true);
      } else {
        onSuccess();
      }
    } else {
      setError(result.error || '登入失敗');
    }

    setIsLoading(false);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('密碼不一致');
      return;
    }

    if (newPassword.length < 8) {
      setError('密碼至少需要 8 個字元');
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError('密碼需包含至少一個大寫字母');
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setError('密碼需包含至少一個小寫字母');
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setError('密碼需包含至少一個數字');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://api.digitalhedge.ai/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          currentPassword: password,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.message || '密碼更改失敗');
      }
    } catch (e) {
      setError('網路錯誤');
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4A373]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4A373]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-[#2C2420]/60 hover:text-[#D4A373] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">返回首頁</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E0E0E0] p-10">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 border-2 border-[#2C2420] rounded-xl flex items-center justify-center text-[#2C2420] font-serif font-bold text-lg">
              DH
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-[#2C2420] font-serif mb-2">
            {showChangePassword ? '更改密碼' : '管理員登入'}
          </h1>
          <p className="text-center text-[#2C2420]/60 text-sm mb-8">
            {showChangePassword ? '首次登入請更改預設密碼' : 'Digital Hedge 後台管理系統'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          {!showChangePassword ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2C2420] mb-2">
                  電子郵件
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-5 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2420] mb-2">
                  密碼
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-5 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2C2420] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4A373] transition-all text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '登入中...' : '登入'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2C2420] mb-2">
                  新密碼
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="至少 8 字元，含大小寫及數字"
                  required
                  className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-5 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2C2420] mb-2">
                  確認新密碼
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次輸入新密碼"
                  required
                  className="w-full bg-[#FAF9F6] border border-[#E0E0E0] px-5 py-4 rounded-xl outline-none focus:border-[#D4A373] focus:bg-white transition-all text-sm text-[#2C2420]"
                />
              </div>

              <div className="text-xs text-[#2C2420]/50 space-y-1">
                <p>密碼要求：</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>至少 8 個字元</li>
                  <li>至少一個大寫字母 (A-Z)</li>
                  <li>至少一個小寫字母 (a-z)</li>
                  <li>至少一個數字 (0-9)</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#2C2420] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#D4A373] transition-all text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '更新中...' : '更新密碼'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[#2C2420]/40 text-xs mt-8">
          © 2026 Digital Hedge. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
