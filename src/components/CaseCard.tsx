import { Link } from 'react-router-dom';
import { Heart, Eye, Calendar, DollarSign } from 'lucide-react';
import { Case } from '../types';
import Card from './common/Card';
import Badge from './common/Badge';
import { formatCurrency, formatNumber, calculateLifespan } from '../utils/formatters';
import { useFavoriteStore } from '../stores/favoriteStore';

interface CaseCardProps {
  caseData: Case;
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const isFav = isFavorite(caseData.id);

  return (
    <Link to={`/cases/${caseData.id}`}>
      <Card hover className="overflow-hidden h-full">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#e94560] transition-colors">
                {caseData.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary" size="sm">{caseData.industry}</Badge>
                <Badge variant="default" size="sm">{caseData.region}</Badge>
                <Badge variant="default" size="sm">{caseData.stage}</Badge>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(caseData.id);
              }}
              className={`p-2 rounded-full transition-all ${
                isFav
                  ? 'text-[#e94560] bg-[#e94560]/10'
                  : 'text-gray-400 hover:text-[#e94560] hover:bg-[#e94560]/10'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{caseData.foundedYear} - {caseData.closedYear}</span>
              <span className="mx-2">·</span>
              <span className="text-[#4ecca3]">存活{calculateLifespan(caseData.foundedYear, caseData.closedYear)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>融资 {formatCurrency(caseData.fundingAmount)}</span>
            </div>
          </div>

          <div className="border-t border-[#16213e] pt-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {formatNumber(caseData.stats.views)}
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {formatNumber(caseData.stats.favorites)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
