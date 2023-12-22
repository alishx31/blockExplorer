import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BlockPage from './block';
import TransactionPage from './transaction';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState("loading . . .");

  useEffect(() => {
    // console.log('here', 123);
    async function getBlockNumber() {
      const a = await alchemy.core.getBlockNumber();
      console.log(a)
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <Router>
      <div className="App"> Block Number:
        <Link to="/block"> {blockNumber} </Link>


        <hr />
        <Route path="/block" component={BlockPage} />
        <Route path="/transaction/:tHash" component={TransactionPage} />
      </div>
    </Router>
  );

}

export default App;
