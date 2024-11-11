import { AbsoluteFill, Sequence } from 'remotion';
import { Bg } from '../components/bg';
import { Title } from '../components/title';

export const Composition = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={81}>
        <Bg video="videos/planet.mp4" />
      </Sequence>

      <Sequence durationInFrames={81} from={80}>
        <Bg video="videos/city.mp4" />
      </Sequence>

      <Sequence durationInFrames={40}>
        <Title color="white" text="Hello" />
      </Sequence>

      <Sequence durationInFrames={40} from={40}>
        <Title color="white" text="World" />
      </Sequence>

      <Sequence durationInFrames={20} from={80}>
        <Title color="white" text="How" />
      </Sequence>

      <Sequence durationInFrames={20} from={100}>
        <Title color="white" text="Are" />
      </Sequence>

      <Sequence durationInFrames={20} from={120}>
        <Title color="white" text="You" />
      </Sequence>

      <Sequence durationInFrames={20} from={140}>
        <Title color="white" text="Today?" />
      </Sequence>
    </AbsoluteFill>
  );
};
