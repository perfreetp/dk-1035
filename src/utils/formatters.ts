export const formatCurrency = (amount: number): string => {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(1)}亿`;
  } else if (amount >= 10000) {
    return `${(amount / 10000).toFixed(0)}万`;
  }
  return `${amount}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return String(num);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const formatYearMonth = (year: number, month: number): string => {
  return `${year}年${month}月`;
};

export const calculateLifespan = (foundedYear: number, closedYear: number): string => {
  const years = closedYear - foundedYear;
  if (years === 0) {
    return '不到1年';
  }
  return `${years}年`;
};

export const getIndustryIcon = (industry: string): string => {
  const icons: Record<string, string> = {
    '出行交通': 'car',
    '电子商务': 'shopping-bag',
    '社交网络': 'users',
    '医疗健康': 'heart-pulse',
    '企业服务': 'briefcase',
    '教育培训': 'graduation-cap',
    '旅游出行': 'plane',
    '物流运输': 'truck',
    '文化娱乐': 'music',
    '本地生活': 'home'
  };
  return icons[industry] || 'box';
};

export const getStageLabel = (stage: string): string => {
  return stage;
};

export const getRegionLabel = (region: string): string => {
  return region;
};
