import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import Button from '../components/common/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useUserStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少6位');
      return;
    }

    const result = register(email, password, name);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setError('该邮箱已被注册');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#4ecca3]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#4ecca3]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">注册成功！</h2>
          <p className="text-gray-400">正在跳转...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-white mb-2">创建账号</h1>
          <p className="text-gray-400">加入我们，记录和学习创业失败</p>
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
                用户名
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                  placeholder="您的用户名"
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              注册
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              已有账号？{' '}
              <Link to="/login" className="text-[#e94560] hover:underline">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
