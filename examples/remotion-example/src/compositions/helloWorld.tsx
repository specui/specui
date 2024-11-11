import { AbsoluteFill, Sequence } from 'remotion';
import { Title } from '../components/title';

export const Composition = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={40}>
        <Title bgColor="black" color="white" text="Hello" />
      </Sequence>

      <Sequence durationInFrames={40} from={40}>
        <Title bgColor="black" color="white" text="World" />
      </Sequence>

      <Sequence durationInFrames={20} from={80}>
        <Title bgColor="orange" color="black" text="How" />
      </Sequence>

      <Sequence durationInFrames={20} from={100}>
        <Title bgColor="orange" color="black" text="Are" />
      </Sequence>

      <Sequence durationInFrames={20} from={120}>
        <Title bgColor="orange" color="black" text="You" />
      </Sequence>

      <Sequence durationInFrames={20} from={140}>
        <Title bgColor="orange" color="black" text="Today?" />
      </Sequence>
    </AbsoluteFill>
  );
};
