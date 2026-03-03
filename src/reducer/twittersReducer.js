import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        title: 'Dan Abramov',
        twitterName: 'dan_abramov',
        created: '1 day',
        content: 'Co-author of Redux and Create React App, Dan has been a central figure in the React team for years. He is famous for his ability to explain complex concepts like Hot Reloading, Time Travel Debugging, and the inner workings of React Fiber. ',
    },
    {
        id: 2,
        title: 'Kent C. Dodds',
        twitterName: 'kentcdodds',
        created: '1 day',
        content: 'A world-renowned educator and the creator of EpicReact.dev and Testing JavaScript. Kent is a huge advocate for "shipping software with confidence." He created the Testing Library family of tools, which shifted the industry focus from testing implementation details to testing user behavior... ',
    },
    {
        id: 3,
        title: 'Sarah Drasner',
        twitterName: 'sarah_edo',
        created: '5 days',
        content: 'An absolute authority on web animations and CSS. Sarah is known for her incredible work with SVG animations and her role as an engineering leader at places like Google and Netlify. She is the author of "SVG Animations" and a frequent speaker at major tech conferences... ',
    },
    {
        id: 4,
        title: 'Michael Jackson',
        twitterName: 'mjackson',
        created: '10 days',
        content: 'The co-creator of React Router, the most popular routing library in the React ecosystem. Michael has been instrumental in shaping how we think about navigation and URL-driven state in single-page applications... ',
    },
    {
        id: 5,
        title: 'Lee Robinson',
        twitterName: 'leeerob',
        created: '12 days',
        content: 'Vice President of Product at Vercel and a leading voice in the Next.js community. Lee is the go-to person for learning about the latest advancements in React Server Components, App Router, and the Vercel deployment platform. His content is highly practical, focusing on performance...',
    },
]


const twitters = createSlice({
    name: 'twitters',
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

export const { removeItem, addItem } = twitters.actions;
export default twitters.reducer;