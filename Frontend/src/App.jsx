import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Import Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import AchievementsPage from './pages/AchievementsPage';
import PublicationsPage from './pages/PublicationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Header appears on every page */}
        <Header />

        {/* The main content area where routes will be rendered */}
        <main className="content-wrap">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* This is the protected route for the admin dashboard.
              The <PrivateRoute> component will check for an authenticated 'officer' user.
              If authenticated, it will render the <AdminDashboard />.
              If not, it will redirect the user to the /login page.
            */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Catch-all route for any undefined paths */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer appears on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

