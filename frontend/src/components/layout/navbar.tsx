import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


const GOOGLE_CLIENT_ID = "444479912471-tkd613ec2gft8ghjj66l0q5qaapkg3u5.apps.googleusercontent.com" //import.meta.env.VITE_GOOGLE_CLIENT_ID; // Access env variable

console.log("All ENV Variables:", import.meta.env);

declare global {
  interface Window {
    google: any; // This tells TypeScript that `google` exists
  }
}

export function Navbar() {
  const { isAuthenticated, user, login, logout } = useAuth();

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID, // Use the environment variable
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  function handleCredentialResponse(response: google.accounts.id.CredentialResponse) {
    console.log("Google ID Token:", response.credential);
    login(response.credential);
  }

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
                  Welcome, {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </>
            ) : (
              <div id="google-signin-btn"></div> // GIS Button
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
