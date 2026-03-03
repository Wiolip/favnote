import React from 'react';
import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import WithContext from '@/hoc/WithContext';
import { useDispatch } from 'react-redux';

import { removeItem as removeNote } from '@/reducer/notesReducer';
import { removeItem as removeTwitter } from '@/reducer/twittersReducer';
import { removeItem as removeArticle } from '@/reducer/articlesReducer';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Paragraph from '@/components/atoms/Paragraph/Paragraph';
import Heading from '@/components/atoms/Heading/Heading';
import Button from '@/components/atoms/Button/Button';
import LinkIcon from '@/assets/icons/link.svg?url';

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
  cursor: pointer;
`;

const InnerWrapper = styled('div').withConfig({
  shouldForwardProp: (prop) => prop !== 'activeColor' && prop !== 'flex',
})`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ activeColor, theme }) =>
    activeColor ? theme[activeColor] : 'white'};

  :first-of-type {
    z-index: 9;
  }

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;

`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledAvatarWrapper = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.twitter};
  overflow: hidden;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StyledLinkWrapper = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  position: absolute;
  right: 25px;
  top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  z-index: 10;
`;

const StyledLinkIcon = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
`;

const StyledLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
  text-decoration: underline;
  margin: 10px 0;
`;


const Card = ({
  id,
  pageContext,
  title,
  created,
  content,
  twitterName,
  articleUrl,
}) => {
 const [redirect, setRedirect] = useState(false);
 const dispatch = useDispatch();

 const handleCardClick = () => setRedirect(true);


 const handleRemove = (e) => {
   e.stopPropagation();

   if (pageContext === 'notes') dispatch(removeNote({ id }));
   if (pageContext === 'twitters') dispatch(removeTwitter({ id }));
   if (pageContext === 'articles') dispatch(removeArticle({ id }));
 };

 if (redirect) return <Navigate to={`/${pageContext}/details/${id}`} />;

  return (
    <StyledWrapper onClick={handleCardClick}>
      <InnerWrapper activeColor={pageContext}>
        <StyledHeading>{title}</StyledHeading>
        <DateInfo>{created}</DateInfo>

        {pageContext === 'twitters' && twitterName && (
          <StyledAvatarWrapper>
            <StyledAvatar
              src={`https://i.pravatar.cc/300/${twitterName}`}
              alt={twitterName}
            />
          </StyledAvatarWrapper>
        )}

        {pageContext === 'articles' && articleUrl && (
          <StyledLinkWrapper
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <StyledLinkIcon src={LinkIcon} alt="Article icon" />
          </StyledLinkWrapper>
        )}
      </InnerWrapper>

      <InnerWrapper flex>
        <ContentWrapper>
          <Paragraph>{content}</Paragraph>
          <StyledLink as={Link} to={`/${pageContext}/details/${id}`}>
            read more
          </StyledLink>
        </ContentWrapper>

        <Button $secondary onClick={handleRemove}>
          REMOVE
        </Button>
      </InnerWrapper>
    </StyledWrapper>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
};

Card.defaultProps = {
  pageContext: 'notes',
  twitterName: null,
  articleUrl: null,
};

const CardWithContext = WithContext(Card);
export default CardWithContext;