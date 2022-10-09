declare module 'react-stars' {
  interface ReactStarsProps {
    count?: number;
    value?: number;
    onChange?: (value: number) => void;
    size?: number;
    color2: string;
    edit?: boolean;
  }

  const ReactStars = React.Component<ReactStarsProps>;
  
  export default ReactStars;
}