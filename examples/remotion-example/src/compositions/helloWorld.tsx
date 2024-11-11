import { AbsoluteFill, Sequence } from 'remotion';
import { Title } from '../components/title';

export const Composition = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={80}>
        <Title bgColor="black" color="white" text="Hello" />
      </Sequence>

      <Sequence durationInFrames={80} from={80}>
        <Title bgColor="#333" color="black" text="World" />
      </Sequence>
    </AbsoluteFill>
  );
};
