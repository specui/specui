export interface TitleProps {
  color?: string;
  text?: string;
}

export function Title(props: TitleProps): JSX.Element {
  return (
    <>
      <div
        style={{
          alignItems: 'center',
          color: props.color,
          display: 'flex',
          fontFamily: 'Geist Mono',
          fontSize: '16rem',
          height: 1080,
          justifyContent: 'center',
          position: 'fixed',
          width: 1080,
        }}
      >
        {props.text}
      </div>
    </>
  );
}
