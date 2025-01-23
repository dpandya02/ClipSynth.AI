import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { HomePage } from '@/pages/home';
import { EditorPage } from '@/pages/editor';
import CounterButton from '@/pages/counterButton';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/increment-counter" element={<CounterButton />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;