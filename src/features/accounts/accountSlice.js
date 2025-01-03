import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: (state, action) => {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload;
    },
    //* Here we have an example where we have to accept multiple values in our reducer.
    //* We need an 'amount' and a 'purpose'. In order to do this we do need to modify our reducer.
    //* For this we use a prepare method.
    //? Alternatively, we could pass an object to dispatch(requestLoan({10000, "To buy a car"}))
    // requestLoan: (state, action) => {
    //   if (state.loan > 0) return;
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose;
    //   state.balance += action.payload.amount;
    // },
    requestLoan: {
      prepare: (amount, purpose) => ({
        payload: { amount, purpose },
      }),
      reducer: (state, action) => {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan: (state) => {
      state.balance -= state.loan; //* First we need to subtract the amount
      state.loan = 0; //* Then set to 0
      state.loanPurpose = "";
    },
    convertingCurrency: (state) => {
      state.isLoading = true;
    },
  },
});

//* If we don't use Tunks we export all 4 reducer functions
// export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

//* Since we want to use deposit with Thunk Middleware we can add it below
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export const deposit = (amount, currency) => {
  //* We need to pay attention to the name and the type (in this case "account/deposit")
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //* When we need to make an API call we return a function which has dispatch as a parameter
  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    // API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // return action
    dispatch({ type: "account/deposit", payload: converted });
  };
};

export default accountSlice.reducer;
