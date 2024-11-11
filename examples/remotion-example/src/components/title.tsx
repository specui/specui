export interface TitleProps {
  bgColor?: string;
  color?: string;
  text?: string;
}

export function Title(props: TitleProps): JSX.Element {
  return (
    <>
      <div
        style={{
          alignItems: 'center',
          background: props.bgColor,
          color: props.color,
          display: 'flex',
          fontFamily: 'Arial',
          fontSize: '24rem',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {props.text}
      </div>
    </>
  );
}
