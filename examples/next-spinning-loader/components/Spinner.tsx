import { clsx } from 'clsx';
import { Loader } from 'lucide-react';

export interface SpinnerProps {
  text?: string;
}

export default function Spinner(props: SpinnerProps) {
  return (
    <>
      <div className="flex h-dvh gap-2 items-center justify-center">
        <div>{props.text}</div>
        <Loader className="animate-spin" />
      </div>
    </>
  );
}
