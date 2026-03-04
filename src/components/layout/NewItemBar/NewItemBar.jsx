import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; // Zamiennik dla Contextu
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Heading from '@/components/ui/Heading/Heading';

import { addNoteAction as addNote } from '@/store/notesReducer';
import { addTwitterAction as addTwitter } from '@/store/twittersReducer';
import { addArticleAction as addArticle } from '@/store/articlesReducer';

const StyledWrapper = styled.div`
  border-left: 10px solid
    ${({ theme, $activeColor }) => theme[$activeColor] || theme.notes};
  z-index: 999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  /* Zmienione na $isVisible z dolarem */
  transform: translate(${({ $isVisible }) => ($isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
  resize: none;
  padding: 20px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
  width: 300px;
`;

// Usuwamy pageContext z argumentów, bo wyciągniemy go z hooka
const NewItemBar = ({ isVisible, handleClose }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // USTALAMY KONTEKST NA PODSTAWIE URL (tak samo jak w DetailsPage)
  const pageContext = pathname.includes('twitters')
    ? 'twitters'
    : pathname.includes('articles')
      ? 'articles'
      : 'notes';

  return (
    <StyledWrapper $isVisible={isVisible} $activeColor={pageContext}>
      <Heading $big>Create new {pageContext}</Heading>
      <Formik
        initialValues={{
          title: '',
          content: '',
          articleUrl: '',
          twitterName: '',
        }}
        onSubmit={(values, { resetForm }) => {
          // TUTAJ NAPRAWIAMY DATĘ!
          const newItem = {
            ...values,
            created: new Date().toLocaleDateString(), // To pole teraz zawsze będzie istnieć
          };

          if (pageContext === 'notes') dispatch(addNote(newItem));
          if (pageContext === 'twitters') dispatch(addTwitter(newItem));
          if (pageContext === 'articles') dispatch(addArticle(newItem));

          resetForm();
          handleClose();
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <StyledForm>
            <StyledInput
              type="text"
              name="title"
              placeholder="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              required
            />
            {pageContext === 'twitters' && (
              <StyledInput
                placeholder="X Account Name"
                name="twitterName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.twitterName}
              />
            )}
            {pageContext === 'articles' && (
              <StyledInput
                placeholder="link"
                name="articleUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.articleUrl}
                type="url"
              />
            )}
            <StyledTextArea
              name="content"
              as="textarea"
              placeholder="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              required
            />
            <Button type="submit" $activeColor={pageContext}>
              Add {pageContext === 'notes' ? 'Note' : pageContext.slice(0, -1)}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

NewItemBar.propTypes = {
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

NewItemBar.defaultProps = {
  isVisible: false,
};


export default NewItemBar;
