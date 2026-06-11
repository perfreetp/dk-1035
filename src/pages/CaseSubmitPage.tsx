import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, AlertTriangle, FileText, DollarSign, Users } from 'lucide-react';
import { useCaseStore } from '../stores/caseStore';
import { useUserStore } from '../stores/userStore';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const industries = ['出行交通', '电子商务', '社交网络', '医疗健康', '企业服务', '教育培训', '旅游出行', '物流运输', '文化娱乐', '本地生活'];
const regions = ['华北', '华东', '华南', '华中和西南', '海外'];
const stages = ['种子轮', 'A轮', 'B轮', 'C轮', 'IPO前'];
const failureCategories = ['资金管理', '市场竞争', '运营问题', '产品问题', '团队问题', '政策风险', '战略失误', '商业模式'];

export default function CaseSubmitPage() {
  const navigate = useNavigate();
  const { submitCase } = useCaseStore();
  const { isAuthenticated } = useUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    region: '',
    foundedYear: 2020,
    closedYear: 2024,
    stage: '',
    fundingAmount: 0,
    productName: '',
    productDescription: '',
    productFeatures: '',
    productTarget: '',
    failureReasons: [] as string[],
    failureDescription: '',
    lessons: '',
    references: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-8 max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-[#e94560] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">请先登录</h2>
          <p className="text-gray-400 mb-6">提交案例需要先登录账号</p>
          <Button onClick={() => navigate('/login')}>前往登录</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    const caseData = {
      name: formData.name,
      industry: formData.industry,
      region: formData.region,
      foundedYear: formData.foundedYear,
      closedYear: formData.closedYear,
      stage: formData.stage,
      fundingAmount: formData.fundingAmount,
      products: [{
        id: '1',
        name: formData.productName,
        description: formData.productDescription,
        features: formData.productFeatures.split(',').map(f => f.trim()).filter(Boolean),
        targetUsers: formData.productTarget
      }],
      failureReasons: formData.failureReasons.map(category => ({
        category,
        description: formData.failureDescription,
        severity: 3
      })),
      lessons: formData.lessons.split('\n').map(l => l.trim()).filter(Boolean),
      references: formData.references.split('\n').map(r => {
        const [title, url] = r.split(',').map(s => s.trim());
        return { title: title || '', url: url || '', source: '用户提交' };
      }).filter(r => r.title && r.url)
    };

    submitCase(caseData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-[#4ecca3]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#4ecca3]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">提交成功！</h2>
          <p className="text-gray-400 mb-6">感谢您的提交，案例将在审核后展示</p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/cases')} className="w-full">
              浏览案例库
            </Button>
            <Button variant="secondary" onClick={() => navigate('/profile')} className="w-full">
              查看我的提交
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">提交案例</h1>
            <p className="text-gray-400">分享您的失败经验，帮助更多创业者</p>
          </div>

          <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-8 mb-6">
            <div className="flex items-center justify-between mb-8">
              {[
                { step: 1, label: '基本信息', icon: FileText },
                { step: 2, label: '详细信息', icon: DollarSign },
                { step: 3, label: '提交', icon: Users }
              ].map(({ step, label, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep >= step
                          ? 'bg-[#e94560] text-white'
                          : 'bg-[#16213e] text-gray-400'
                      }`}
                    >
                      {currentStep > step ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={`ml-3 font-medium ${currentStep >= step ? 'text-white' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                  {step < 3 && (
                    <ChevronRight className="w-5 h-5 text-gray-600 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    项目名称 <span className="text-[#e94560]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    placeholder="请输入项目名称"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      所属行业 <span className="text-[#e94560]">*</span>
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    >
                      <option value="">请选择行业</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      所在地区 <span className="text-[#e94560]">*</span>
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    >
                      <option value="">请选择地区</option>
                      {regions.map(reg => (
                        <option key={reg} value={reg}>{reg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      成立年份
                    </label>
                    <input
                      type="number"
                      value={formData.foundedYear}
                      onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                      min="2000"
                      max="2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      关闭年份
                    </label>
                    <input
                      type="number"
                      value={formData.closedYear}
                      onChange={(e) => setFormData({ ...formData, closedYear: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                      min="2000"
                      max="2025"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      融资阶段
                    </label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    >
                      <option value="">请选择阶段</option>
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      融资总额（万元）
                    </label>
                    <input
                      type="number"
                      value={formData.fundingAmount}
                      onChange={(e) => setFormData({ ...formData, fundingAmount: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} disabled={!formData.name || !formData.industry || !formData.region}>
                    下一步 <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    产品名称
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    placeholder="请输入产品名称"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    产品描述
                  </label>
                  <textarea
                    value={formData.productDescription}
                    onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560] h-24"
                    placeholder="请描述产品的核心功能"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    核心功能（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    value={formData.productFeatures}
                    onChange={(e) => setFormData({ ...formData, productFeatures: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    placeholder="例如：用户管理, 数据分析, 支付功能"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    目标用户
                  </label>
                  <input
                    type="text"
                    value={formData.productTarget}
                    onChange={(e) => setFormData({ ...formData, productTarget: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
                    placeholder="请描述目标用户群体"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    失败原因分类 <span className="text-[#e94560]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {failureCategories.map(category => (
                      <label key={category} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.failureReasons.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                failureReasons: [...formData.failureReasons, category]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                failureReasons: formData.failureReasons.filter(r => r !== category)
                              });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#16213e] text-[#e94560] focus:ring-[#e94560]"
                        />
                        <span className="text-sm text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    失败原因详细描述
                  </label>
                  <textarea
                    value={formData.failureDescription}
                    onChange={(e) => setFormData({ ...formData, failureDescription: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560] h-32"
                    placeholder="请详细描述项目失败的原因和过程"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    可借鉴经验（每行一条）
                  </label>
                  <textarea
                    value={formData.lessons}
                    onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560] h-32"
                    placeholder="请列出从失败中可以学习到的经验"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    参考资料（每行一条，格式：标题,链接）
                  </label>
                  <textarea
                    value={formData.references}
                    onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560] h-24"
                    placeholder="例如：小蓝单车倒闭始末,https://news.example.com/article"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={() => setCurrentStep(1)}>
                    上一步
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} disabled={formData.failureReasons.length === 0}>
                    下一步 <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-[#0f0f23] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">提交预览</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">项目名称</div>
                      <div className="text-white font-medium">{formData.name}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">{formData.industry}</Badge>
                      <Badge variant="default">{formData.region}</Badge>
                      {formData.stage && <Badge variant="success">{formData.stage}</Badge>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">存活时间</div>
                        <div className="text-white">{formData.foundedYear} - {formData.closedYear}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">融资总额</div>
                        <div className="text-white">{formData.fundingAmount}万元</div>
                      </div>
                    </div>

                    {formData.failureReasons.length > 0 && (
                      <div>
                        <div className="text-sm text-gray-400 mb-2">失败原因</div>
                        <div className="flex flex-wrap gap-2">
                          {formData.failureReasons.map(reason => (
                            <Badge key={reason} variant="danger">{reason}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#e94560]/10 border border-[#e94560]/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-[#e94560] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">注意事项</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• 请确保提交的信息真实可靠</li>
                        <li>• 所有提交将经过审核后展示</li>
                        <li>• 请勿提交涉及商业机密的信息</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={() => setCurrentStep(2)}>
                    上一步
                  </Button>
                  <Button onClick={handleSubmit}>
                    提交案例
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
