import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, FileText, Send, AlertCircle, User, Edit2, Trash2, Save, CheckCircle, XCircle, Shield, AlertTriangle, ExternalLink } from 'lucide-react';
import { useUserStore } from '../stores/userStore';
import { useFavoriteStore } from '../stores/favoriteStore';
import { useNoteStore } from '../stores/noteStore';
import { useCaseStore } from '../stores/caseStore';
import { useCorrectionStore } from '../stores/correctionStore';
import CaseCard from '../components/CaseCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { formatCurrency } from '../utils/formatters';

type TabType = 'favorites' | 'notes' | 'submissions' | 'admin';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore();
  const { favorites, removeFavorite } = useFavoriteStore();
  const { notes, addNote, updateNote, deleteNote } = useNoteStore();
  const { cases, fetchCases, getPendingCases, approveCase, rejectCase } = useCaseStore();
  const { corrections, getPendingCorrections, approveCorrection, rejectCorrection } = useCorrectionStore();
  
  const [activeTab, setActiveTab] = useState<TabType>('favorites');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    fetchCases();
  }, [isAuthenticated, navigate, fetchCases]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const favoriteCases = cases.filter(c => favorites.includes(c.id));
  const userNotes = notes.filter(n => n.userId === user.id);
  const mySubmissions = cases.filter(c => c.submittedBy === user.id);
  const pendingCases = getPendingCases();
  const pendingCorrections = getPendingCorrections();

  const handleSaveNote = (caseId: string) => {
    if (editingNote) {
      updateNote(editingNote, noteContent);
      setEditingNote(null);
    } else {
      addNote(caseId, user.id, noteContent);
      setSelectedCaseId(null);
    }
    setNoteContent('');
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('确定要删除这条笔记吗？')) {
      deleteNote(noteId);
    }
  };

  const startEditNote = (noteId: string, content: string) => {
    setEditingNote(noteId);
    setNoteContent(content);
  };

  const handleApproveCase = (caseId: string) => {
    if (confirm('确定通过此案例吗？通过后将在案例库中展示')) {
      approveCase(caseId);
    }
  };

  const handleRejectCase = (caseId: string) => {
    if (confirm('确定驳回此案例吗？')) {
      rejectCase(caseId);
    }
  };

  const handleApproveCorrection = (correctionId: string) => {
    if (confirm('确定通过此纠错吗？')) {
      approveCorrection(correctionId);
    }
  };

  const handleRejectCorrection = (correctionId: string) => {
    if (confirm('确定驳回此纠错吗？')) {
      rejectCorrection(correctionId);
    }
  };

  const correctionTypeLabels: Record<string, string> = {
    'basic': '基础信息',
    'timeline': '时间线',
    'team': '团队信息',
    'funding': '融资信息',
    'reason': '失败原因'
  };

  const tabs = [
    { id: 'favorites', label: '我的收藏', icon: Heart, count: favoriteCases.length },
    { id: 'notes', label: '我的笔记', icon: FileText, count: userNotes.length },
    { id: 'submissions', label: '提交记录', icon: Send, count: mySubmissions.length }
  ];

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-[#0f0f23]">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1a1a2e] rounded-xl border border-[#16213e] mb-6">
          <div className="p-6 border-b border-[#16213e]">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#e94560] to-[#4ecca3] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                <Badge variant={user.role === 'admin' ? 'danger' : 'success'} size="sm" className="mt-2">
                  {user.role === 'admin' ? '管理员' : '普通用户'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex border-b border-[#16213e] overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-6 py-4 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#e94560]/10 text-[#e94560] border-b-2 border-[#e94560]'
                      : 'text-gray-400 hover:text-white hover:bg-[#16213e]/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <Badge variant="default" size="sm">{tab.count}</Badge>
                </button>
              );
            })}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 px-6 py-4 transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-[#e94560]/10 text-[#e94560] border-b-2 border-[#e94560]'
                    : 'text-gray-400 hover:text-white hover:bg-[#16213e]/50'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>管理后台</span>
                <Badge variant="danger" size="sm">{pendingCases.length + pendingCorrections.length}</Badge>
              </button>
            )}
          </div>

          <div className="p-6">
            {activeTab === 'favorites' && (
              <div>
                {favoriteCases.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">还没有收藏任何案例</p>
                    <Link to="/cases">
                      <Button>浏览案例库</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteCases.map(caseItem => (
                      <div key={caseItem.id} className="relative">
                        <CaseCard caseData={caseItem} />
                        <button
                          onClick={() => removeFavorite(caseItem.id)}
                          className="absolute top-2 right-2 p-2 bg-[#0f0f23]/80 rounded-full text-gray-400 hover:text-[#e94560] hover:bg-[#0f0f23] transition-colors"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                {userNotes.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">还没有撰写任何笔记</p>
                    <Link to="/cases">
                      <Button>去案例库写笔记</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userNotes.map(note => {
                      const relatedCase = cases.find(c => c.id === note.caseId);
                      return (
                        <div key={note.id} className="bg-[#0f0f23] rounded-lg p-4 border border-[#16213e]">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              {relatedCase ? (
                                <Link to={`/cases/${note.caseId}`} className="text-[#e94560] hover:underline font-semibold">
                                  {relatedCase.name}
                                </Link>
                              ) : (
                                <span className="text-gray-400">案例已删除</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => startEditNote(note.id, note.content)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-[#16213e] rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteNote(note.id)}
                                className="p-2 text-gray-400 hover:text-[#e94560] hover:bg-[#16213e] rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
                          <div className="text-sm text-gray-500 mt-3">
                            创建于 {new Date(note.createdAt).toLocaleDateString('zh-CN')}
                            {note.updatedAt !== note.createdAt && (
                              <span> · 更新于 {new Date(note.updatedAt).toLocaleDateString('zh-CN')}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">为案例写笔记</h3>
                  <select
                    value={selectedCaseId || ''}
                    onChange={(e) => setSelectedCaseId(e.target.value || null)}
                    className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white mb-4"
                  >
                    <option value="">选择案例</option>
                    {favoriteCases.map(caseItem => (
                      <option key={caseItem.id} value={caseItem.id}>{caseItem.name}</option>
                    ))}
                  </select>
                  {selectedCaseId && (
                    <>
                      <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder="在这里写下你的笔记..."
                        className="w-full px-4 py-3 bg-[#0f0f23] border border-[#16213e] rounded-lg text-white h-40 mb-4"
                      />
                      <Button onClick={() => {
                        if (noteContent.trim()) {
                          handleSaveNote(selectedCaseId);
                        }
                      }}>
                        <Save className="w-4 h-4 mr-2" />
                        保存笔记
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div>
                {mySubmissions.length === 0 ? (
                  <div className="text-center py-12">
                    <Send className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-4">还没有提交过案例</p>
                    <Link to="/submit">
                      <Button>提交案例</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mySubmissions.map(submission => (
                      <div key={submission.id} className="bg-[#0f0f23] rounded-lg p-4 border border-[#16213e]">
                        <div className="flex items-center justify-between mb-3">
                          <Link to={`/cases/${submission.id}`} className="text-lg font-semibold text-white hover:text-[#e94560]">
                            {submission.name}
                          </Link>
                          <Badge variant={submission.status === 'pending' ? 'warning' : submission.status === 'approved' ? 'success' : 'danger'}>
                            {submission.status === 'pending' ? '待审核' : submission.status === 'approved' ? '已通过' : '已驳回'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="default" size="sm">{submission.industry}</Badge>
                          <Badge variant="default" size="sm">{submission.region}</Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          提交于 {new Date(submission.createdAt).toLocaleDateString('zh-CN')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'admin' && isAdmin && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-[#e94560]" />
                    待审核投稿 ({pendingCases.length})
                  </h3>
                  {pendingCases.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      暂无待审核投稿
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingCases.map(pendingCase => (
                        <div key={pendingCase.id} className="bg-[#0f0f23] rounded-lg p-6 border border-[#16213e]">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">{pendingCase.name}</h4>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="default">{pendingCase.industry}</Badge>
                                <Badge variant="default">{pendingCase.region}</Badge>
                                <Badge variant="default">{pendingCase.stage}</Badge>
                                <Badge variant="success">{formatCurrency(pendingCase.fundingAmount)}</Badge>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button onClick={() => handleApproveCase(pendingCase.id)} className="bg-[#4ecca3] hover:bg-[#3db892]">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                通过
                              </Button>
                              <Button variant="danger" onClick={() => handleRejectCase(pendingCase.id)}>
                                <XCircle className="w-4 h-4 mr-2" />
                                驳回
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            提交于 {new Date(pendingCase.createdAt).toLocaleDateString('zh-CN')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <AlertCircle className="w-6 h-6 mr-2 text-[#e94560]" />
                    待处理纠错 ({pendingCorrections.length})
                  </h3>
                  {pendingCorrections.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      暂无待处理纠错
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingCorrections.map(correction => {
                        const relatedCase = [...cases, ...mySubmissions].find(c => c.id === correction.caseId);
                        return (
                          <div key={correction.id} className="bg-[#0f0f23] rounded-lg p-6 border border-[#16213e]">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="primary">{correctionTypeLabels[correction.type]}</Badge>
                                  {relatedCase && (
                                    <Link to={`/cases/${correction.caseId}`} className="text-[#e94560] hover:underline">
                                      {relatedCase.name}
                                    </Link>
                                  )}
                                </div>
                                <p className="text-gray-300 mb-2">{correction.description}</p>
                                {correction.link && (
                                  <a
                                    href={correction.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-400 hover:underline flex items-center"
                                  >
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    {correction.link}
                                  </a>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <Button onClick={() => handleApproveCorrection(correction.id)} className="bg-[#4ecca3] hover:bg-[#3db892]">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  通过
                                </Button>
                                <Button variant="danger" onClick={() => handleRejectCorrection(correction.id)}>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  驳回
                                </Button>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400">
                              提交于 {new Date(correction.createdAt).toLocaleDateString('zh-CN')}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
