import { Video, staticFile } from 'remotion';

export interface BgProps {
  video: string;
}

export function Bg(props: BgProps): JSX.Element {
  return (
    <>
      <Video
        src={staticFile(props.video)}
        style={{
          height: 1080,
        }}
      />
    </>
  );
}
