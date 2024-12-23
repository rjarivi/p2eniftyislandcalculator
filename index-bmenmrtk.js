import React from 'react';
import ReactDOM from 'react-dom';
import './index-btzprycf.css';

function App() {
  return (
    <div>
      <section id="earnings-section">
        <h2>Estimate Earnings</h2>
        <div id="projected-yearly-gains">
          <h3>Projected Yearly Gains</h3>
          <p id="yearly-gains-value">0</p>
        </div>
      </section>
      
      <section id="palm-section">
        <h2>Palm NFTs</h2>
        <p>Each Palm NFT you own increases your maximum ISLAND gains per cycle.</p>
        <div id="palm-dropdown-container">
          <label for="palm-dropdown">Select Palm NFT:</label>
          <select id="palm-dropdown">
            <option value="Iron">Iron Palm</option>
            <option value="Bronze">Bronze Palm</option>
            <option value="Silver">Silver Palm</option>
            <option value="Gold">Gold Palm</option>
            <option value="Neon">Neon Palm</option>
            <option value="Ultra">Ultra Palm</option>
          </select>
          <div id="selected-palms"></div>
        </div>
        <p>Total palms NFT: 1,506<br>
          Iron Palm - 973<br>
          Bronze Palm - 271<br>
          Silver Palm - 143<br>
          Gold Palm - 106<br>
          Neon Palm - 9<br>
          Ultra Palm - 4
        </p>
      </section>

      <section id="staking-section">
        <h2>Staking</h2>
        <p>Staking ISLAND increases your conversion rate from Blooms to ISLAND. Set your initial staked amount and how much of your ISLAND gains you wish to stake after each cycle.</p>
        <table>
          <thead>
            <tr>
              <th>Initial</th>
              <th>Compound</th>
              <th>Island / Bloom</th>
              <th>Island / kBloom</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="number" id="initial-stake" value="0" /></td>
              <td><input type="number" id="compound-percentage" value="100" /></td>
              <td id="island-bloom-value">0.00100</td>
              <td id="island-kbloom-value">1.00</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
