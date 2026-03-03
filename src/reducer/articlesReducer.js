import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        title: 'React on my mind',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci.',
        articleUrl: 'https://react.dev',
        created: '1 day',
    },
    {
        id: 2,
        title: 'Wish you React',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci.',
        articleUrl: 'https://react.dev',
        created: '1 day',
    },
    {
        id: 3,
        title: 'You gave React a bad name',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci.',
        articleUrl: 'https://react.dev',
        created: '5 days',
    },
    {
        id: 4,
        title: 'Is it React you looking for?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci.',
        articleUrl: 'https://react.dev',
        created: '10 days',
    },
    {
        id: 5,
        title: 'React me maybe',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, tempora quibusdam natus modi tempore esse adipisci.',
        articleUrl: 'https://react.dev',
        created: '12 days',
    },
    
];

const articles = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        removeItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        addItem: {
            reducer: (state, action) => {
                state.push(action.payload.item);
            },
            prepare: (itemContent) => ({
                payload: {
                    item: {
                        id: `_${Math.random().toString(36).substr(2, 9)}`,
                        ...itemContent,
                    },
                },
            }),
        },
    },
});

export const { removeItem, addItem } = articles.actions;
export default articles.reducer;