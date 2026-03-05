import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import UserPageTemplate from '@/template/UserPageTemplate';
import Heading from '@/components/ui/Heading/Heading';
import Paragraph from '@/components/ui/Paragraph/Paragraph';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';

import { removeNoteAction, updateNoteAction } from '@/store/notesReducer';
import {
  removeTwitterAction,
  updateTwitterAction,
} from '@/store/twittersReducer';
import {
  removeArticleAction,
  updateArticleAction,
} from '@/store/articlesReducer';

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

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  padding: 30px;
  border-radius: 20px;
  height: 30vh;
  resize: none;
  display: block;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.s};
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
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: fit-content;
`;

const SecondaryButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
`;

const StyledLinkButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
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

  const [isEditMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState({
    title,
    content,
    articleUrl,
    twitterName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (pageType === 'notes')
      dispatch(updateNoteAction({ _id, ...editedItem }));
    if (pageType === 'twitters')
      dispatch(updateTwitterAction({ _id, ...editedItem }));
    if (pageType === 'articles')
      dispatch(updateArticleAction({ _id, ...editedItem }));
    setEditMode(false);
  };

  const handleRemove = () => {
    navigate(`/${pageType}`);
    if (pageType === 'notes') dispatch(removeNoteAction(_id));
    if (pageType === 'twitters') dispatch(removeTwitterAction(_id));
    if (pageType === 'articles') dispatch(removeArticleAction(_id));
  };

  return (
    <UserPageTemplate pageType={pageType}>
      <StyledWrapper>
        <StyledPageHeader>
          {isEditMode ? (
            <Input
              name="title"
              value={editedItem.title}
              onChange={handleInputChange}
            />
          ) : (
            <StyledHeading $big as="h1">
              {title}
            </StyledHeading>
          )}
          <StyledParagraph>CREATED - {created}</StyledParagraph>
        </StyledPageHeader>

        {isEditMode ? (
          <>

            {pageType === 'articles' && (
              <Input
                name="articleUrl"
                value={editedItem.articleUrl}
                onChange={handleInputChange}
                placeholder="Article URL"
                style={{ marginBottom: '20px' }} // Szybki odstęp
              />
            )}

            
            {pageType === 'twitters' && (
              <Input
                name="twitterName"
                value={editedItem.twitterName}
                onChange={handleInputChange}
                placeholder="X Account Name"
                style={{ marginBottom: '20px' }}
              />
            )}

            <StyledTextArea
              as="textarea"
              name="content"
              value={editedItem.content}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <Paragraph>{content}</Paragraph>
        )}

        {/* Sekcja dla linków - ukrywamy w trybie edycji dla czystości widoku lub dodaj inputy */}
        {!isEditMode && pageType === 'articles' && (
          <StyledLink
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open this article
          </StyledLink>
        )}

        {!isEditMode && pageType === 'twitters' && (
          <>
            <StyledLink
              href={`https://twitter.com/${twitterName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              OPEN THIS X (TWITTER)
            </StyledLink>
            <StyledImage
              alt={title}
              src={`https://unavatar.io/twitter/${twitterName}`}
            />
          </>
        )}

        <ButtonWrapper>
          {/* GŁÓWNY DUŻY PRZYCISK */}
          {isEditMode ? (
            <Button $activeColor={pageType} onClick={handleUpdate}>
              SAVE CHANGES
            </Button>
          ) : (
            <StyledLinkButton
              as={Link}
              to={`/${pageType}`}
              $activeColor={pageType}
            >
              Back to all
            </StyledLinkButton>
          )}

          {/* MNIEJSZE PRZYCISKI POD SPODEM */}
          <SecondaryButtonsWrapper>
            {!isEditMode ? (
              <Button $subtle onClick={() => setEditMode(true)}>
                EDIT
              </Button>
            ) : (
              <Button $subtle onClick={() => setEditMode(false)}>
                CANCEL
              </Button>
            )}

            {!isEditMode && (
              <Button $subtle onClick={handleRemove}>
                REMOVE
              </Button>
            )}
          </SecondaryButtonsWrapper>
        </ButtonWrapper>
      </StyledWrapper>
    </UserPageTemplate>
  );
};

DetailsTemplate.propTypes = {
  _id: PropTypes.string,
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  title: PropTypes.string,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.string,
  articleUrl: PropTypes.string,
  twitterName: PropTypes.string,
};

DetailsTemplate.defaultProps = {
  _id: '',
  title: '',
  created: '',
  content: '',
  articleUrl: '',
  twitterName: '',
};

export default DetailsTemplate;
