import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '@/components/atoms/Input/Input';
import Button from '@/components/atoms/Button/Button';
import WithContext from '@/hoc/withContext';
import Heading from '@/components/atoms/Heading/Heading';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';


// Importujemy konkretne akcje asynchroniczne z Twoich plików
import { addNoteAction as addNote } from '@/reducer/notesReducer';
import { addTwitterAction as addTwitter } from '@/reducer/twittersReducer';
import { addArticleAction as addArticle } from '@/reducer/articlesReducer';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, $activeColor }) => theme[$activeColor]};
  z-index: 99;
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
  font-size: ${({ theme }) =>
    theme.fontSize.s};
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
  width: 300px;
`;


const NewItemBar = ({ pageContext, isVisible, handleClose }) => {
  const dispatch = useDispatch();

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
          const newItem = {
            // created: new Date().toLocaleDateString(),
            ...values,
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
              type='text'
              name='title'
              placeholder='title'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {pageContext === 'twitters' && (
              <StyledInput
                placeholder='X Account Name (e.g. reactjs)'
                name='twitterName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.twitterName}
              />
            )}
            {pageContext === 'articles' && (
              <StyledInput
                placeholder='link'
                name='articleUrl'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.articleUrl}
              />
            )}
            <StyledTextArea
              name='content'
              as='textarea'
              placeholder='description'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
            />
            <Button type='submit' $activeColor={pageContext}>
              Add {pageContext === 'notes' ? 'Note' : pageContext.slice(0, -1)}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
  );
};

NewItemBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  isVisible: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

const NewItem = WithContext(NewItemBar);
export default NewItem;
