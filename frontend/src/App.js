import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Articles from './components/Articles';
import Footer from './components/Footer';
import FormNews from './components/FormNews';
import Header from './components/Header'
import Home from './components/Home';
import Profile from './components/Profile';
import ViewArticle from './components/ViewArticle';
function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Articles />} />
        <Route path='/news' element={<Articles />} />
        <Route path='/news/:id' element={<ViewArticle />} />
        <Route path='/add-article' element={<FormNews />} />
        <Route path='/edit-article/:id' element={<FormNews />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
