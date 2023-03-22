import './App.css';
import CurrencyInput from './components/CurrencyInput/CurrencyInput';
import {useState, useEffect} from "react";
import axios from "axios";
import Header from './components/CurrencyInput/Header';

function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);
  const [currencyUSD, setCurrencyUSD] = useState();
  const [currencyEUR, setCurrencyEUR] = useState();

  useEffect(() => {
    axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20200302&json')
      .then(res => {
        const updateData = res.data.map(obj => ({'cc': obj.cc , 'rate':obj.rate}));
        setRates(updateData);
        setCurrencyUSD(format(updateData.filter(rate => rate.cc == 'USD')[0].rate));
        setCurrencyEUR(format(updateData.filter(rate => rate.cc == 'EUR')[0].rate));
      })
  }, []);

  useEffect(() => {
    if(rates.length > 0) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function format(number) {
    return number.toFixed(2);
  }

//  ---- function to sort Array of Objects Alphabetically ----
//  ----
//   function sortRates (array) {
//     return array.sort((a, b) => b.cc.localeCompare(a.cc))
//   }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates.filter(rate => rate.cc === currency1)[0].rate / rates.filter(rate => rate.cc === currency2)[0].rate));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates.filter(rate => rate.cc === currency1)[0].rate / rates.filter(rate => rate.cc === currency2)[0].rate));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates.filter(rate => rate.cc === currency2)[0].rate / rates.filter(rate => rate.cc === currency1)[0].rate));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates.filter(rate => rate.cc === currency2)[0].rate / rates.filter(rate => rate.cc === currency1)[0].rate));
    setCurrency2(currency2);
  }

  return (
    <div>
      <Header currencyUSD={currencyUSD} currencyEUR={currencyEUR}/>
      <CurrencyInput item={1} currencies={rates} amount={+amount1} currency={currency1} onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change}/>
      <CurrencyInput item={2} currencies={rates} amount={+amount2} currency={currency2} onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change}/>
    </div>
  );
}

export default App;
