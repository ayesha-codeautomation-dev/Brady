export const SupComponent = props => <sup>{props.children}</sup>;

export const CenterTextComponent = ({ children }) => {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%'
  };

  return <div style={centerStyle}>{children}</div>;
};
