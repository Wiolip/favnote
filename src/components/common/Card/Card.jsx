import React, { useState } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { removeNoteAction } from '@/store/notesReducer';
import { removeArticleAction } from '@/store/articlesReducer';
import { removeTwitterAction } from '@/store/twittersReducer';

import Paragraph from '@/components/ui/Paragraph/Paragraph';
import Heading from '@/components/ui/Heading/Heading';
import Button from '@/components/ui/Button/Button';
import LinkIcon from '@/assets/icons/link.svg';

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

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  /* Używamy $activeColor z dolarem i sprawdzamy theme */
  background-color: ${({ $activeColor, theme }) =>
    theme[$activeColor] || 'white'};

  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 110px;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
  height: 2.4em;
`;

const StyledParagraph = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledAvatarWrapper = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.twitters};
  overflow: hidden;
  position: absolute;
  right: 25px;
  top: 45px;
  z-index: 2;
`;

const StyledAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StyledLinkWrapper = styled.a`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid green;
  background: white;
  position: absolute;
  right: 25px;
  top: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const StyledLinkIcon = styled.img`
  width: 50%;
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
  _id,
  id,
  title,
  created,
  content,
  twitterName,
  articleUrl,
}) => {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Samodzielne rozpoznawanie typu strony
  const getPageType = () => {
    if (pathname.includes('notes')) return 'notes';
    if (pathname.includes('twitters')) return 'twitters';
    if (pathname.includes('articles')) return 'articles';
    return 'notes';
  };

  const pageType = getPageType();
  const itemId = _id || id;

  const handleCardClick = () => setRedirect(true);

  const handleRemove = (e) => {
    e.stopPropagation();
    if (pageType === 'notes') dispatch(removeNoteAction(itemId));
    if (pageType === 'twitters') dispatch(removeTwitterAction(itemId));
    if (pageType === 'articles') dispatch(removeArticleAction(itemId));
  };

  if (redirect) return <Navigate to={`/${pageType}/details/${itemId}`} />;

  return (
    <StyledWrapper onClick={handleCardClick}>
      <InnerWrapper $activeColor={pageType}>
        <StyledHeading>{title}</StyledHeading>
        <DateInfo>{created}</DateInfo>

        {pageType === 'twitters' && (
          <StyledAvatarWrapper>
            <StyledAvatar
              src={`https://unavatar.io/x/${twitterName}`}
              alt={twitterName}
            />
          </StyledAvatarWrapper>
        )}

        {pageType === 'articles' && (
          <StyledLinkWrapper
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <StyledLinkIcon src={LinkIcon} />
          </StyledLinkWrapper>
        )}
      </InnerWrapper>

      <InnerWrapper flex>
        <div>
          <StyledParagraph>{content}</StyledParagraph>
          {pageType === 'twitters' && (
            <StyledLink
              as="a"
              href={`https://x.com/${twitterName}`}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
            >
              view on x
            </StyledLink>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <StyledLink as={Link} to={`/${pageType}/details/${itemId}`}>
            read more
          </StyledLink>
          <Button $secondary onClick={handleRemove}>
            REMOVE
          </Button>
        </div>
      </InnerWrapper>
    </StyledWrapper>
  );
};

Card.propTypes = {
  _id: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
};


export default Card;
