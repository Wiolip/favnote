import React from 'react';
import PageContext from '@/context/PageContext';

const WithContext = (component) => {
    const Component = component
  const WithContextComponent = (props) => (
    <PageContext.Consumer>
      {(context) => <Component {...props} pageContext={context} />}
    </PageContext.Consumer>
  );

  return WithContextComponent;
};

export default WithContext;