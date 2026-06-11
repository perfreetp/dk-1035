import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, AlertCircle } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import Button from '../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('请填写所有字段');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('邮箱或密码错误（测试账号：admin@example.com / password123）');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#e94560] to-[#4ecca3] rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">创业尸体库</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">欢迎回来</h1>
          <p className="text-gray-400">登录您的账号</p>
        </div>

        <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-4 bg-[#e94560]/10 border border-[#e94560]/30 rounded-lg text-[#e94560]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              还没有账号？{' '}
              <Link to="/register" className="text-[#e94560] hover:underline">
                注册账号
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-[#16213e]">
            <p className="text-sm text-gray-500 text-center">
              测试账号：admin@example.com / password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
