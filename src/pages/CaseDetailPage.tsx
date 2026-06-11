import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Calendar, MapPin, TrendingUp, DollarSign, ExternalLink, Eye, AlertTriangle, Lightbulb, Users, Package, Send, X } from 'lucide-react';
import { useCaseStore } from '../stores/caseStore';
import { useFavoriteStore } from '../stores/favoriteStore';
import { useUserStore } from '../stores/userStore';
import { useCorrectionStore } from '../stores/correctionStore';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { formatCurrency, calculateLifespan, formatYearMonth } from '../utils/formatters';

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchCaseById, currentCase } = useCaseStore();
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const { isAuthenticated } = useUserStore();
  const { addCorrection } = useCorrectionStore();
  
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [correctionType, setCorrectionType] = useState<string>('basic');
  const [correctionDescription, setCorrectionDescription] = useState('');
  const [correctionLink, setCorrectionLink] = useState('');

  useEffect(() => {
    if (id) {
      fetchCaseById(id);
    }
  }, [id, fetchCaseById]);

  if (!currentCase) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">加载中...</div>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(currentCase.id);

  const correctionTypes = [
    { value: 'basic', label: '基础信息错误' },
    { value: 'timeline', label: '时间线错误' },
    { value: 'team', label: '团队信息错误' },
    { value: 'funding', label: '融资信息错误' },
    { value: 'reason', label: '失败原因不准确' }
  ];

  const handleSubmitCorrection = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!correctionDescription.trim()) {
      alert('请填写纠错说明');
      return;
    }

    addCorrection({
      caseId: currentCase.id,
      userId: 'anonymous',
      type: correctionType as any,
      description: correctionDescription,
      link: correctionLink || undefined
    });

    setShowCorrectionModal(false);
    setCorrectionDescription('');
    setCorrectionLink('');
    alert('纠错已提交，感谢您的反馈！');
  };

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="container mx-auto px-4 py-8">
        <Link to="/cases" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>返回案例库</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-4">{currentCase.name}</h1>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">{currentCase.industry}</Badge>
                      <Badge variant="default">{currentCase.region}</Badge>
                      <Badge variant="success">{currentCase.stage}</Badge>
                      <Badge variant="danger">已关闭 {currentCase.closedYear}年</Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentCase.id)}
                    className={`p-3 rounded-full transition-all ${
                      isFav
                        ? 'bg-[#e94560] text-white'
                        : 'bg-[#16213e] text-gray-400 hover:text-[#e94560]'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#0f0f23] rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">存活时间</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {currentCase.foundedYear} - {currentCase.closedYear}
                    </div>
                    <div className="text-sm text-[#4ecca3]">
                      {calculateLifespan(currentCase.foundedYear, currentCase.closedYear)}
                    </div>
                  </div>

                  <div className="bg-[#0f0f23] rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-400 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">融资总额</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(currentCase.fundingAmount)}
                    </div>
                    <div className="text-sm text-gray-400">万元</div>
                  </div>

                  <div className="bg-[#0f0f23] rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-400 mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">浏览量</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {currentCase.stats.views}
                    </div>
                    <div className="text-sm text-gray-400">次</div>
                  </div>

                  <div className="bg-[#0f0f23] rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-400 mb-2">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">收藏数</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {currentCase.stats.favorites}
                    </div>
                    <div className="text-sm text-gray-400">次</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Package className="w-5 h-5 mr-2 text-[#e94560]" />
                核心产品
              </h2>
              <div className="space-y-4">
                {currentCase.products.map(product => (
                  <div key={product.id} className="bg-[#0f0f23] rounded-lg p-4">
                    <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 mb-4">{product.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-2">目标用户</div>
                        <div className="text-white">{product.targetUsers}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-2">核心功能</div>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, idx) => (
                            <Badge key={idx} variant="default" size="sm">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#e94560]" />
                项目时间线
              </h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#16213e]" />
                <div className="space-y-6">
                  {currentCase.timeline.map((event, index) => (
                    <div key={index} className="relative pl-12">
                      <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[#e94560] border-4 border-[#1a1a2e]" />
                      <div className="bg-[#0f0f23] rounded-lg p-4">
                        <div className="text-sm text-[#e94560] mb-1">
                          {formatYearMonth(event.year, event.month)}
                        </div>
                        <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-400">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-[#e94560]" />
                团队变化
              </h2>
              <div className="space-y-4">
                {currentCase.team.map(member => (
                  <div key={member.id} className="bg-[#0f0f23] rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#e94560] to-[#4ecca3] rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.role}</div>
                      </div>
                    </div>
                    <Badge variant="danger">{member.change}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-[#4ecca3]" />
                融资记录
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#16213e]">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">轮次</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">金额</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">投资方</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">年份</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCase.fundingRecords.map((record, index) => (
                      <tr key={index} className="border-b border-[#16213e]/50 hover:bg-[#16213e]/30">
                        <td className="py-3 px-4 text-white">{record.round}</td>
                        <td className="py-3 px-4 text-[#4ecca3] font-semibold">{formatCurrency(record.amount)}</td>
                        <td className="py-3 px-4 text-gray-300">{record.investors}</td>
                        <td className="py-3 px-4 text-gray-400">{record.year}年</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-[#e94560]" />
                失败原因拆解
              </h2>
              <div className="space-y-4">
                {currentCase.failureReasons.map((reason, index) => (
                  <div key={index} className="bg-[#0f0f23] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="danger">{reason.category}</Badge>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < reason.severity ? 'bg-[#e94560]' : 'bg-[#16213e]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-[#4ecca3]" />
                可借鉴经验
              </h2>
              <div className="space-y-3">
                {currentCase.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#4ecca3]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#4ecca3] text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{lesson}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-[#e94560]" />
                参考资料
              </h2>
              <div className="space-y-3">
                {currentCase.references.map((ref, index) => (
                  <a
                    key={index}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-[#0f0f23] rounded-lg p-4 hover:bg-[#16213e] transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-[#e94560] transition-colors mb-1">
                          {ref.title}
                        </h3>
                        <p className="text-sm text-gray-400">{ref.source}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#e94560]" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">相关操作</h3>
              <div className="space-y-3">
                <button
                  onClick={() => toggleFavorite(currentCase.id)}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-colors ${
                    isFav
                      ? 'bg-[#e94560] text-white'
                      : 'bg-[#16213e] text-gray-300 hover:bg-[#e94560] hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                  <span>{isFav ? '已收藏' : '收藏案例'}</span>
                </button>
                <button
                  onClick={() => setShowCorrectionModal(true)}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-[#16213e] text-gray-300 hover:bg-[#16213e]/80 rounded-lg transition-colors"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span>提交纠错</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-[#16213e]">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">统计数据</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">浏览量</span>
                    <span className="text-white">{currentCase.stats.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">收藏数</span>
                    <span className="text-white">{currentCase.stats.favorites}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">纠错数</span>
                    <span className="text-white">{currentCase.stats.corrections}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showCorrectionModal} onClose={() => setShowCorrectionModal(false)} title="提交纠错" size="lg">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              纠错类型 <span className="text-[#e94560]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {correctionTypes.map(type => (
                <label
                  key={type.value}
                  className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    correctionType === type.value
                      ? 'border-[#e94560] bg-[#e94560]/10'
                      : 'border-[#16213e] hover:border-[#e94560]'
                  }`}
                >
                  <input
                    type="radio"
                    name="correctionType"
                    value={type.value}
                    checked={correctionType === type.value}
                    onChange={(e) => setCorrectionType(e.target.value)}
                    className="w-4 h-4 text-[#e94560] focus:ring-[#e94560]"
                  />
                  <span className="text-sm text-gray-300">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              纠错说明 <span className="text-[#e94560]">*</span>
            </label>
            <textarea
              value={correctionDescription}
              onChange={(e) => setCorrectionDescription(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560] h-32"
              placeholder="请详细描述您发现的错误或需要更正的信息..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              公开来源链接（可选）
            </label>
            <input
              type="url"
              value={correctionLink}
              onChange={(e) => setCorrectionLink(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-2">提供相关的新闻报道、官方公告等来源链接，帮助管理员核实信息</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-[#16213e]">
            <Button variant="secondary" onClick={() => setShowCorrectionModal(false)}>
              取消
            </Button>
            <Button onClick={handleSubmitCorrection}>
              <Send className="w-4 h-4 mr-2" />
              提交纠错
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
