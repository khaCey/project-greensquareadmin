import React from 'react';
import { LoaderWrapper, Spinner } from './StyledComponents'; // import the relevant styled components

export const LoadingSpinner = () => {
  return (
    <LoaderWrapper>
      <Spinner />
    </LoaderWrapper>
  );
};
