import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CaseLibraryPage from './pages/CaseLibraryPage';
import CaseDetailPage from './pages/CaseDetailPage';
import CaseSubmitPage from './pages/CaseSubmitPage';
import TopicBoardPage from './pages/TopicBoardPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cases" element={<CaseLibraryPage />} />
          <Route path="cases/:id" element={<CaseDetailPage />} />
          <Route path="submit" element={<CaseSubmitPage />} />
          <Route path="topics" element={<TopicBoardPage />} />
          <Route path="topics/:topicId" element={<TopicBoardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
