import { connect } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

function mapStateToProps(state) {
  //* We accept state as a parameter so we can extract a piece
  return {
    balance: state.account.balance, //* Here we define the name of the prop out component will receive
  };
}

//* Here we are mapping a piece of state to to props, therefore we can
//* use 'balance' as a prop in BalanceDisplay instead of using useSelector
export default connect(mapStateToProps)(BalanceDisplay);
