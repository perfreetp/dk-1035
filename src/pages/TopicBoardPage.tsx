import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Flame, RefreshCw, UserX, Swords, Scale, UsersRound, ArrowLeft, TrendingUp } from 'lucide-react';
import { useCaseStore } from '../stores/caseStore';
import { mockTopics } from '../data/mockData';
import CaseCard from '../components/CaseCard';
import { formatNumber } from '../utils/formatters';

export default function TopicBoardPage() {
  const { topicId } = useParams<{ topicId?: string }>();
  const { cases, fetchCases, getFilteredCases } = useCaseStore();
  const [selectedTopic, setSelectedTopic] = useState(topicId || '');
  const [topicCases, setTopicCases] = useState<typeof cases>([]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  useEffect(() => {
    if (topicId) {
      setSelectedTopic(topicId);
    }
  }, [topicId]);

  useEffect(() => {
    if (selectedTopic) {
      const filtered = cases.filter(c => c.topics.includes(selectedTopic));
      setTopicCases(filtered);
    } else {
      setTopicCases([]);
    }
  }, [selectedTopic, cases]);

  const topicIcons: Record<string, any> = {
    'flame': Flame,
    'refresh-cw': RefreshCw,
    'user-x': UserX,
    'swords': Swords,
    'scale': Scale,
    'users': UsersRound
  };

  const currentTopic = mockTopics.find(t => t.id === selectedTopic);

  const getTopicStats = (topicId: string) => {
    const topicCasesData = cases.filter(c => c.topics.includes(topicId));
    const totalFunding = topicCasesData.reduce((sum, c) => sum + c.fundingAmount, 0);
    const avgFunding = topicCasesData.length > 0 ? totalFunding / topicCasesData.length : 0;
    return {
      count: topicCasesData.length,
      avgFunding
    };
  };

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="container mx-auto px-4 py-8">
        {!topicId && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">专题看板</h1>
            <p className="text-gray-400">按失败原因分类的案例集合，深入分析特定类型的失败模式</p>
          </div>
        )}

        {topicId && (
          <Link to="/topics" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>返回专题看板</span>
          </Link>
        )}

        {!topicId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockTopics.map(topic => {
              const Icon = topicIcons[topic.icon] || Flame;
              const stats = getTopicStats(topic.id);
              
              return (
                <Link
                  key={topic.id}
                  to={`/topics/${topic.id}`}
                  className="bg-[#1a1a2e] rounded-xl border border-[#16213e] overflow-hidden hover:border-[#e94560] transition-all group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-[#e94560]/10 rounded-xl flex items-center justify-center group-hover:bg-[#e94560]/20 transition-colors">
                        <Icon className="w-8 h-8 text-[#e94560]" />
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {stats.count}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{topic.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{topic.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-[#16213e] rounded text-xs text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {topicId && currentTopic && (
          <>
            <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-xl border border-[#16213e] p-8 mb-8">
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-[#e94560]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = topicIcons[currentTopic.icon] || Flame;
                    return <Icon className="w-10 h-10 text-[#e94560]" />;
                  })()}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-3">{currentTopic.name}</h1>
                  <p className="text-gray-300 mb-4">{currentTopic.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentTopic.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[#16213e] rounded-full text-sm text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#16213e]">
                <div className="bg-[#0f0f23] rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">案例数量</div>
                  <div className="text-2xl font-bold text-white">{topicCases.length}</div>
                </div>
                <div className="bg-[#0f0f23] rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">累计融资</div>
                  <div className="text-2xl font-bold text-[#4ecca3]">
                    {topicCases.reduce((sum, c) => sum + c.fundingAmount, 0) >= 100000000
                      ? `${(topicCases.reduce((sum, c) => sum + c.fundingAmount, 0) / 100000000).toFixed(1)}亿`
                      : `${(topicCases.reduce((sum, c) => sum + c.fundingAmount, 0) / 10000).toFixed(0)}万`}
                  </div>
                </div>
                <div className="bg-[#0f0f23] rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">平均融资</div>
                  <div className="text-2xl font-bold text-[#45b7d1]">
                    {topicCases.length > 0
                      ? topicCases.reduce((sum, c) => sum + c.fundingAmount, 0) / topicCases.length >= 100000000
                        ? `${(topicCases.reduce((sum, c) => sum + c.fundingAmount, 0) / topicCases.length / 100000000).toFixed(1)}亿`
                        : `${(topicCases.reduce((sum, c) => sum + c.fundingAmount, 0) / topicCases.length / 10000).toFixed(0)}万`
                      : '0'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">相关案例</h2>
            </div>

            {topicCases.length === 0 ? (
              <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-12 text-center">
                <div className="text-gray-400">该专题暂无案例</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicCases.map(caseItem => (
                  <CaseCard key={caseItem.id} caseData={caseItem} />
                ))}
              </div>
            )}
          </>
        )}

        {!topicId && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-[#e94560]" />
                热门案例
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...cases].sort((a, b) => b.stats.views - a.stats.views).slice(0, 6).map(caseItem => (
                <CaseCard key={caseItem.id} caseData={caseItem} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
