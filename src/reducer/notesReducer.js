import { createSlice } from '@reduxjs/toolkit';


const initialState = [
  {
    id: 1,
    title: 'React Router Data APIs',
    content: 'React Router v6.4 introduced a massive shift in how we handle data fetching with the introduction of Loaders and Actions. Instead of fetching data inside useEffect after the component mounts, we can now fetch it parallel to rendering. This architectural change eliminates the common "waterfall" problem...',
    created: '1 day'
  },
  {
    id: 2,
    title: 'Modern State Management',
    content: 'While Redux remains the industry standard for large-scale applications, the ecosystem has evolved significantly. Redux Toolkit (RTK) has solved the "boilerplate" issue that developers complained about for years. However, for many projects, React Context API combined with useReducer is more than enough...',
    created: '1 day',
  },
  {
    id: 3,
    title: 'The Power of Custom Hooks',
    content: 'The real magic of React lies in Custom Hooks. They allow you to extract component logic into reusable functions. Imagine a complex form handling logic or a media query listener that you need in five different places. Instead of duplicating code, you wrap it in a hook like useForm or useWindowSize...',
    created: '5 days',
  },
  {
    id: 4,
    title: 'Performance Optimization',
    content: 'React is fast by default, but complex UIs can still suffer from performance lags. Understanding memoization is crucial here. The React.memo higher-order component prevents a component from re-rendering if its props haven\'t changed. Inside components, useMemo is used to cache expensive calculations..',
    created: '10 days',
  },
  
];

const notes = createSlice({
  name: 'notes',
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
            ...itemContent
          },
        },
      }),
    },
  },
});

export const { removeItem, addItem } = notes.actions;
export default notes.reducer;