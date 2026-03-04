import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '@/components/layout/Sidebar/Sidebar';

const UserPageTemplate = ({ children, pageType }) => (
  <>
    
    <Sidebar pageType={pageType} />
    {children}
  </>
);

UserPageTemplate.propTypes = {
  // Zmienione na node, bo children to często więcej niż 1 element
  children: PropTypes.node.isRequired,
  // Zmienione na liczbę mnogą, żeby pasowało do reszty aplikacji i theme.js
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

UserPageTemplate.defaultProps = {
  pageType: 'notes',
};

export default UserPageTemplate;
