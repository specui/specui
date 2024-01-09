import { FC, useEffect, useRef, useState } from 'react';

interface Props {
  children?: string;
  className?: string;
  title?: string;
}

export const CodeSnippet: FC<Props> = ({ children, className, title }) => {
  const titleRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(48);

  const handleResize = () => {
    setHeight(titleRef.current ? titleRef.current.clientHeight : 48);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`border border-gray-800 rounded-md text-white ${className}`}>
      <div
        className="border-b border-gray-900 flex gap-2 items-center justify-center p-3"
        ref={titleRef}
      >
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="border border-gray-600 rounded-full w-3 h-3" />
        <div className="flex-grow text-center text-gray-500">{title}</div>
        <div className="w-12" />
      </div>
      <pre className={`overflow-auto p-3 text-xs w-full h-[calc(100%-${height}px)]`}>
        {children?.trim()}
      </pre>
    </div>
  );
};
