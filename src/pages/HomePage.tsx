import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, DollarSign, Users, Flame, RefreshCw, UserX, Swords, Scale, UsersRound, ArrowRight, Search } from 'lucide-react';
import { useCaseStore } from '../stores/caseStore';
import { mockTopics } from '../data/mockData';
import CaseCard from '../components/CaseCard';
import { formatNumber, formatCurrency } from '../utils/formatters';

export default function HomePage() {
  const { cases, fetchCases, getFilteredCases } = useCaseStore();
  const [stats, setStats] = useState({ total: 0, funding: 0, industries: 0 });

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  useEffect(() => {
    const approvedCases = getFilteredCases();
    if (approvedCases.length > 0) {
      const totalFunding = approvedCases.reduce((sum, c) => sum + c.fundingAmount, 0);
      const uniqueIndustries = new Set(approvedCases.map(c => c.industry)).size;
      setStats({
        total: approvedCases.length,
        funding: totalFunding,
        industries: uniqueIndustries
      });
    }
  }, [cases, getFilteredCases]);

  const featuredCases = getFilteredCases().slice(0, 6);
  const recentCases = [...getFilteredCases()].sort((a, b) => b.closedYear - a.closedYear).slice(0, 5);

  const topicIcons: Record<string, any> = {
    'flame': Flame,
    'refresh-cw': RefreshCw,
    'user-x': UserX,
    'swords': Swords,
    'scale': Scale,
    'users': UsersRound
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-[#e94560]/10 border border-[#e94560]/30 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-[#e94560]" />
              <span className="text-sm text-[#e94560]">记录失败，学习教训</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              创业尸体库
              <br />
              <span className="bg-gradient-to-r from-[#e94560] to-[#4ecca3] bg-clip-text text-transparent">
                Startup Graveyard
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              记录和分析创业失败案例，为创业者、投资人和研究人员提供深度洞察。
              从失败中学习，避免重蹈覆辙。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/cases"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#e94560] text-white rounded-lg hover:bg-[#d63651] transition-all shadow-lg shadow-[#e94560]/30 hover:shadow-[#e94560]/50"
              >
                <Search className="w-5 h-5" />
                <span className="font-semibold">浏览案例库</span>
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#16213e] text-white rounded-lg hover:bg-[#1a1a2e] transition-all border border-[#16213e] hover:border-[#e94560]"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">提交案例</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="bg-[#1a1a2e]/50 backdrop-blur rounded-xl p-6 border border-[#16213e]">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-[#e94560]/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#e94560]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.total}</div>
                  <div className="text-sm text-gray-400">失败案例</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e]/50 backdrop-blur rounded-xl p-6 border border-[#16213e]">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-[#4ecca3]/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#4ecca3]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(stats.funding)}
                  </div>
                  <div className="text-sm text-gray-400">累计融资</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e]/50 backdrop-blur rounded-xl p-6 border border-[#16213e]">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-[#45b7d1]/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#45b7d1]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.industries}</div>
                  <div className="text-sm text-gray-400">覆盖行业</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">精选案例</h2>
              <p className="text-gray-400">深度分析的典型失败案例</p>
            </div>
            <Link to="/cases" className="inline-flex items-center space-x-2 text-[#e94560] hover:text-[#d63651] transition-colors">
              <span>查看更多</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCases.map(caseItem => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">专题看板</h2>
              <p className="text-gray-400">按失败原因分类的案例集合</p>
            </div>
            <Link to="/topics" className="inline-flex items-center space-x-2 text-[#e94560] hover:text-[#d63651] transition-colors">
              <span>查看全部</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockTopics.map(topic => {
              const Icon = topicIcons[topic.icon] || BookOpen;
              return (
                <Link
                  key={topic.id}
                  to={`/topics/${topic.id}`}
                  className="bg-[#1a1a2e] rounded-xl p-4 border border-[#16213e] hover:border-[#e94560] hover:-translate-y-1 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#e94560]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#e94560]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#e94560]" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{topic.name}</h3>
                  <p className="text-sm text-gray-400">{topic.caseCount}个案例</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">近期关闭</h2>
              <p className="text-gray-400">最新关闭的创业项目</p>
            </div>
            <Link to="/cases" className="inline-flex items-center space-x-2 text-[#e94560] hover:text-[#d63651] transition-colors">
              <span>查看全部</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] overflow-hidden">
            <div className="divide-y divide-[#16213e]">
              {recentCases.map((caseItem, index) => (
                <Link
                  key={caseItem.id}
                  to={`/cases/${caseItem.id}`}
                  className="flex items-center justify-between p-4 hover:bg-[#16213e]/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#e94560] to-[#4ecca3] rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{caseItem.name}</div>
                      <div className="text-sm text-gray-400">
                        {caseItem.industry} · {caseItem.closedYear}年关闭
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-gray-400">
                      <span className="text-[#4ecca3]">{caseItem.stage}</span>
                    </div>
                    <div className="text-gray-400">
                      <Users className="w-4 h-4 inline mr-1" />
                      {formatNumber(caseItem.stats.views)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
