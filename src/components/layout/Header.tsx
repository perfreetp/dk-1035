import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Library, PlusCircle, LayoutGrid, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useUserStore } from '../../stores/userStore';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useUserStore();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/cases', label: '案例库', icon: Library },
    { path: '/topics', label: '专题看板', icon: LayoutGrid },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#1a1a2e] border-b border-[#16213e] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#4ecca3] rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">创业尸体库</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-[#e94560] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#16213e]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#e94560] text-white rounded-lg hover:bg-[#d63651] transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>提交案例</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-[#16213e] rounded-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-300 hover:text-white hover:bg-[#16213e] rounded-lg transition-all"
                  title="退出登录"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#4ecca3] text-white rounded-lg hover:bg-[#3db892] transition-colors"
                >
                  注册
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#16213e]">
            <nav className="flex flex-col space-y-2">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-[#e94560] text-white'
                        : 'text-gray-300 hover:text-white hover:bg-[#16213e]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/submit"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 bg-[#e94560] text-white rounded-lg"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>提交案例</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#16213e] rounded-lg"
                  >
                    <User className="w-5 h-5" />
                    <span>个人中心</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#16213e] rounded-lg w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>退出登录</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-[#16213e] rounded-lg"
                  >
                    <span>登录</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 bg-[#4ecca3] text-white rounded-lg"
                  >
                    <span>注册</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
