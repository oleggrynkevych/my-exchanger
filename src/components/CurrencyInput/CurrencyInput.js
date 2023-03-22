import PropTypes from "prop-types";
import './CurrencyInput.css';

function CurrencyInput (props) {
    return(
        <div className='group'>
            <input 
                type="number"
                value={Number(props.amount).toString()}
                max={12}
                step={0.01}
                onChange={event => props.onAmountChange(event.target.value)}
                onInput={
                    (event) => {if(event.target.value.length > event.target.max) {
                        event.target.value = props.amount
                    }}
                }/>
            <select value={props.currency} onChange={event => props.onCurrencyChange(event.target.value)}>
                {props.currencies.map((currency => (
                    <option key = {props.item + '_' + currency.cc} value={currency.cc}>{currency.cc}</option>
                )))}
            </select>
        </div>
    )
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func
};

export default CurrencyInput;