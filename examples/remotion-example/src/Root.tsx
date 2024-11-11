import './tailwind.css';
import { Composition } from 'remotion';
import { Composition as helloWorld } from './compositions/helloWorld';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="helloWorld"
        component={helloWorld}
        durationInFrames={160}
        fps={60}
        width={1080}
        height={1080}
      />
    </>
  );
};
