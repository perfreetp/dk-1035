import { BookOpen, Github, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f0f23] border-t border-[#16213e] mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#4ecca3] rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">创业尸体库</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              记录创业失败案例，分析失败原因，为创业者和投资人提供有价值的参考。
              从失败中学习，避免重蹈覆辙。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/cases" className="text-gray-400 hover:text-white transition-colors">
                案例库
              </Link>
              <Link to="/topics" className="text-gray-400 hover:text-white transition-colors">
                专题看板
              </Link>
              <Link to="/submit" className="text-gray-400 hover:text-white transition-colors">
                提交案例
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">联系方式</h3>
            <div className="flex flex-col space-y-2">
              <a href="mailto:contact@example.com" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>contact@example.com</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#16213e] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © 2024 创业尸体库. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center space-x-1 mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-[#e94560] fill-current" />
            <span>for entrepreneurs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
