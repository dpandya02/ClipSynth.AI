import { Button } from '@/components/ui/button';
import { Video, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
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
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}