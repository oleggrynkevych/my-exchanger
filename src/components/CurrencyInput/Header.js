import './Header.css';

function Header (props) {
    return(
        <div className="header">
            <h1>EXCHANCHER</h1>
            <div>
                <span>USD: </span>
                <span>{props.currencyUSD}</span>
            </div>
            <div>
                <span>EUR: </span>
                <span>{props.currencyEUR}</span>
            </div>
        </div>
    )
}

export default Header;