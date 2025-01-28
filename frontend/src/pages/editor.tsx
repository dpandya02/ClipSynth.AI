import { Timeline } from '@/components/editor/timeline';
import { Preview } from '@/components/editor/preview';
import { Toolbar } from '@/components/editor/toolbar';

export function EditorPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <Toolbar />
      <div className="flex-1 grid grid-cols-3 gap-4 p-4 bg-gray-100">
        <div className="col-span-2">
          <Preview />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="font-semibold mb-4">Properties</h2>
          <p className="text-gray-500 text-sm">Select an element to edit its properties</p>
        </div>
      </div>
      <Timeline />
    </div>
  );
}