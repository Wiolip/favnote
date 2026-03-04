import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import UserPageTemplate from '@/template/UserPageTemplate';
import Heading from '@/components/atoms/Heading/Heading';
import Paragraph from '@/components/atoms/Paragraph/Paragraph';
import Button from '@/components/atoms/Button/Button';


import { removeNoteAction } from '@/reducer/notesReducer';
import { removeTwitterAction } from '@/reducer/twittersReducer';
import { removeArticleAction } from '@/reducer/articlesReducer';

const StyledWrapper = styled.div`
  padding: 25px 150px 25px 70px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledHeading = styled(Heading)`
  margin: 25px 0 10px 0;
  display: block;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 100px;
`;

const StyledImage = styled.img`
  position: absolute;
  right: -80px;
  top: 50px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
`;

const StyledLinkButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  line-height: 47px;
  margin-bottom: 10px;
`;


const DetailsTemplate = ({
  _id,
  pageType,
  title,
  created,
  content,
  articleUrl,
  twitterName,
 
}) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = () => {
    console.log('ID do usunięcia:', _id);
    console.log('Typ strony:', pageType);

    if (pageType === 'notes') dispatch(removeNoteAction(_id));
    if (pageType === 'twitters') dispatch(removeTwitterAction(_id));
    if (pageType === 'articles') dispatch(removeArticleAction(_id));

    // Po usunięciu wracamy do listy głównej
    navigate(`/${pageType}`);
  };

  return (
      <UserPageTemplate pageType={pageType}>
    <StyledWrapper>
      <StyledPageHeader>
        <StyledHeading $big as="h1">
          {title}
        </StyledHeading>
        <StyledParagraph>CREATED - {created} ago</StyledParagraph>
      </StyledPageHeader>
      <Paragraph>{content}</Paragraph>

      {pageType === 'articles' && (
        <StyledLink href={articleUrl} target="_blank" rel="noopener noreferrer">
          Open this article
        </StyledLink>
      )}

      {pageType === 'twitters' && (
        <StyledLink href={`https://x.com/${twitterName}`} target="_blank">
          OPEN THIS X (TWITTER)
        </StyledLink>
      )}

      {pageType === 'twitters' && (
        <StyledImage alt={title} src={`https://unavatar.io/x/${twitterName}`} />
      )}

      <ButtonWrapper>
        <StyledLinkButton as={Link} to={`/${pageType}`} $activeColor={pageType}>
          SAVE / CLOSE
        </StyledLinkButton>

        <Button $subtle onClick={handleRemove}>REMOVE ITEM</Button>
      </ButtonWrapper>
    </StyledWrapper>
  </UserPageTemplate>
  )

};

DetailsTemplate.propTypes = {
  _id: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  title: PropTypes.string,
  created: PropTypes.string,
  content: PropTypes.string,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default DetailsTemplate;
