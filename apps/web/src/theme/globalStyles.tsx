import { Global, useTheme } from '@emotion/react';
import { reset } from './reset';
import { globalStyles } from './global';

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <>
      <Global styles={reset} />
      <Global styles={globalStyles(theme)} />
    </>
  );
};

export default GlobalStyles;
