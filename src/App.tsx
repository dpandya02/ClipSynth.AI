import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { HomePage } from '@/pages/home';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;