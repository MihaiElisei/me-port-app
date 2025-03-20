/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./ui_components/AppLayout";
import AboutPage from "./pages/AboutPage";
import PortfolioPage from "./pages/PortfolioPage";
import ArticlesPage from "./pages/ArticlesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import ProjectDetail from "./pages/ProjectDetail";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
