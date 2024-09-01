import { PropagateLoader } from 'react-spinners';

const ButtonLoadingIndicator = () => {
  return (
    <PropagateLoader
      color='#fff'
      cssOverride={{
        display: 'flex',
        margin: '0 auto',
        height: '24px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
};

export default ButtonLoadingIndicator;
