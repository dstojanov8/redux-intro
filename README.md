# Project Overview

Simple app for learning and showcasing Redux store and global UI state. In this project we will organize our code into features, in this case the _account_ and the _customer_. Our copmonents will also be organized following this principle, **All feature related code and files will be in the same directory**

In file `store-v1.js` there is an example where all of the logic and code is in one place. This is an example file where we also print the dispatch function results. It is a good step towards learning redux.

A more modern approach is used in `store-v2.js` and `store.js`. We devided our store into multiple slices, so a slice is basically the initial state, reducer and the action creators. In `store-v2.js` we implemented _Redux_ without the toolkit. This is not recommended and is only shown for learning purposes. Instead the most modern and recommended implementation is done in `store.js`.

There are now two versions of `accountSlice.js` and `customerSlice.js`. The `-v1` dosn't use **createSlice** function but rather action creators, a reducer with switch statement and non mutating code. This is also not recommended as a simpler way is accessible. To use **createSlice** function we need to use Redux Toolkit. The _used versions_ are the Redux Toolkit way of doing things.

**CHECK `accountSlice.js`, `accountSlice-v1.js`, `customerSlice.js` and `store.js`, `store-v1.js`, `store-v2.js` to see the implementations.**

The two main libraries that are used here:

1. redux: gives us functions such as `createStore`/`configureStore` and `combineReducers`
2. react-redux: gives us `Provider` component, `useSelector`, `useDispatch`

With `useSelector` we are supscribing to the store to retreive the data from the global object _store_. With `useDispatch` we can call action creator functions to update the state.

**There is an example of how Redux was used before we had hooks like useSelector and useDispatch. Check `BalanceDisplay` component**

## Middleware explanation

In Redux Middleware is a functions that sits between the dispatching and the store. This means that Middleware allows the developers to run some code after dispatching an action but before that action reaches the reducer in the store. Usually after we dispatch the action immediately reaches the reducer and the state is updated, but with a Middleware we can do something with the action before that action gets into the reducer. **Perfect place for async API calls, timers, logging to the console...**

We can write _Middleware_ functions ourselves but usually we use third party packages. Most popular **Redux Thunk**. Before dispatching, an action gets to the **Thunk**. Then we can start fetching some data inside the thunk. As soon as the data arrives we place it into the actions payload and then we finally dispatch the action to the store. **Thunk** allows _Redux_ to wait before dispatching.

Three steps:

1. We install the Middleware package `npm install redux-thunk`
2. We apply that middleware to our store.js
3. We use our middleware in action creator functions (in this case in `accountSlice.js`)

## Redux DevTools

1. Install Chrome extension: `Redux DevTools`
2. Install npm package: `npm install redux-devtools-extension`
3. import { composeWithDevTools } from '@redux-devtools/extension'; in `store.js`

# Redux Tookit

Allows us to write less code to achieve the same result. It sets _Middleware_ and the _DeveloperTools_ out of the box. Gives us 3 main things:

1. We can write code that **mutates** state inside the reducers (with the help of _Immer_ library).
2. Automatically cretes _action creators_ from out reducers.
3. Automatically sets uo **Thunk Middleware** and **DevTools**.

To install we run: `npm install @reduxjs/toolkit`

In our **Slices** we will be using `createSlice` function that gives us three big benefits. It automatically creates _action creator funcitions_ from our reducers. It makes writing reducers a lot easier, we no longer need _switch_ statement and the default case is automatically handled. We can now mutate our state inside reducers.

**Check accountSlice as it goes over the `prepare` method which is usefull when sending multiple values to dispatch function**
