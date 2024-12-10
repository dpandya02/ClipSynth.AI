import { Button } from '@/components/ui/button';
import { Video, Wand2 } from 'lucide-react';

export function HomePage() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Create Engaging Content with AI-Powered Video Synthesis
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Transform your content into attention-grabbing videos. Overlay text on gameplay footage,
            generate AI content, and export professional-quality videos in minutes.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              <Video className="h-5 w-5" />
              Create Video
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Wand2 className="h-5 w-5" />
              Try AI Generator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}