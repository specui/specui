import '../styles/tailwind.css';
import { FC } from 'react';
import { SpecEditorNav } from './SpecEditorNav';
import { SpecEditorContent } from './SpecEditorContent';

export const SpecEditor: FC = () => {
  return (
    <div className="flex max-h-full min-h-full">
      <div className="w-1/3 max-h-full overflow-auto">
        <SpecEditorNav />
      </div>
      <div className="w-2/3 max-h-full overflow-auto">
        <SpecEditorContent />
      </div>
    </div>
  );
};
