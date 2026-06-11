import { useEffect, useState } from 'react';
import { Search, Filter, Grid, List, X, ChevronDown } from 'lucide-react';
import { useCaseStore } from '../stores/caseStore';
import CaseCard from '../components/CaseCard';
import Badge from '../components/common/Badge';

const industries = ['出行交通', '电子商务', '社交网络', '医疗健康', '企业服务', '教育培训', '旅游出行', '物流运输', '文化娱乐', '本地生活'];
const regions = ['华北', '华东', '华南', '华中和西南', '海外'];
const stages = ['种子轮', 'A轮', 'B轮', 'C轮', 'IPO前'];
const fundingRanges = ['0-100万', '100-500万', '500-2000万', '2000万以上'];
const yearRanges = ['2015-2017', '2018-2020', '2021-2023', '2024-2025'];

export default function CaseLibraryPage() {
  const {
    fetchCases,
    getFilteredCases,
    filters,
    setFilters,
    clearFilters,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy
  } = useCaseStore();

  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  const filteredCases = getFilteredCases();

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setFilters({ search: value });
  };

  const activeFilterCount = [
    filters.industry.length > 0,
    filters.region.length > 0,
    filters.stage.length > 0,
    filters.fundingRange.length > 0,
    filters.yearRange.length > 0
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0 || filters.search;

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">案例库</h1>
          <p className="text-gray-400">浏览和筛选创业失败案例</p>
        </div>

        <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索案例名称、行业或失败原因..."
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#e94560] transition-colors"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  showFilters || hasActiveFilters
                    ? 'bg-[#e94560] text-white'
                    : 'bg-[#0f0f23] text-gray-300 hover:bg-[#16213e]'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>筛选</span>
                {activeFilterCount > 0 && (
                  <Badge variant="primary" size="sm">{activeFilterCount}</Badge>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white focus:outline-none focus:border-[#e94560]"
              >
                <option value="time">按关闭时间</option>
                <option value="funding">按融资规模</option>
                <option value="hot">按热度</option>
              </select>

              <div className="flex items-center bg-[#0f0f23] border border-[#16213e] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-[#e94560] text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-[#16213e]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">行业</h3>
                  <div className="space-y-2">
                    {industries.map(industry => (
                      <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.industry.includes(industry)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ industry: [...filters.industry, industry] });
                            } else {
                              setFilters({ industry: filters.industry.filter(i => i !== industry) });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#16213e] text-[#e94560] focus:ring-[#e94560]"
                        />
                        <span className="text-sm text-gray-300">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">地区</h3>
                  <div className="space-y-2">
                    {regions.map(region => (
                      <label key={region} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.region.includes(region)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ region: [...filters.region, region] });
                            } else {
                              setFilters({ region: filters.region.filter(r => r !== region) });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#16213e] text-[#e94560] focus:ring-[#e94560]"
                        />
                        <span className="text-sm text-gray-300">{region}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">融资阶段</h3>
                  <div className="space-y-2">
                    {stages.map(stage => (
                      <label key={stage} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.stage.includes(stage)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ stage: [...filters.stage, stage] });
                            } else {
                              setFilters({ stage: filters.stage.filter(s => s !== stage) });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#16213e] text-[#e94560] focus:ring-[#e94560]"
                        />
                        <span className="text-sm text-gray-300">{stage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">融资规模</h3>
                  <div className="space-y-2">
                    {fundingRanges.map(range => (
                      <label key={range} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.fundingRange.includes(range)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ fundingRange: [...filters.fundingRange, range] });
                            } else {
                              setFilters({ fundingRange: filters.fundingRange.filter(r => r !== range) });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#16213e] text-[#e94560] focus:ring-[#e94560]"
                        />
                        <span className="text-sm text-gray-300">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">关闭年份</h3>
                  <div className="space-y-2">
                    {yearRanges.map(range => (
                      <label key={range} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.yearRange.includes(range)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ yearRange: [...filters.yearRange, range] });
                            } else {
                              setFilters({ yearRange: filters.yearRange.filter(r => r !== range) });
                            }
                          }}
                          className="w-4 h-4 rounded border-[#16213e] text-[#e94560] focus:ring-[#e94560]"
                        />
                        <span className="text-sm text-gray-300">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>当前筛选：</span>
                    {filters.search && (
                      <Badge variant="primary" size="sm">
                        搜索: {filters.search}
                      </Badge>
                    )}
                    {filters.industry.map(i => (
                      <Badge key={i} variant="default" size="sm">{i}</Badge>
                    ))}
                    {filters.region.map(r => (
                      <Badge key={r} variant="default" size="sm">{r}</Badge>
                    ))}
                    {filters.stage.map(s => (
                      <Badge key={s} variant="default" size="sm">{s}</Badge>
                    ))}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-2 text-sm text-[#e94560] hover:text-[#d63651] transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>清除所有筛选</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-gray-400">
            共找到 <span className="text-white font-semibold">{filteredCases.length}</span> 个案例
          </p>
        </div>

        {filteredCases.length === 0 ? (
          <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] p-12 text-center">
            <div className="text-gray-400 mb-4">未找到符合条件的案例</div>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-[#e94560] text-white rounded-lg hover:bg-[#d63651] transition-colors"
            >
              清除筛选
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredCases.map(caseItem => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
