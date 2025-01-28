import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google/login';
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">ClipSynth.AI</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                size="sm"
                onClick={handleGoogleLogin}
                className="gap-2"
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-4 h-4"
                />
                Sign in with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}