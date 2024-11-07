import { clsx } from 'clsx';

export interface HeroProps {
  text?: string;
}

export default function Hero(props: HeroProps) {
  return (
    <>
      <h1 className="bg-red-400 flex items-center justify-center py-24 text-center text-8xl">
        {props.title}
      </h1>
    </>
  );
}
