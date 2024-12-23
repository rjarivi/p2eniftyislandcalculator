(function() {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList" && o.addedNodes) for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = () => {
      l.rel === "modulepreload" && s(l);
    };
    l.addEventListener("load", o), l.addEventListener("error", o);
  }
  function s(l) {
    if (l.href.indexOf(location.origin) === 0 || l.crossOrigin) return;
    l.crossOrigin = "anonymous";
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  // Update the earnings section
  const earningsSection = document.getElementById('earnings-section');
  if (earningsSection) {
    const projectedYearlyGains = document.createElement('div');
    projectedYearlyGains.id = 'projected-yearly-gains';
    projectedYearlyGains.innerHTML = `
      <h3>Projected Yearly Gains</h3>
      <p id="yearly-gains-value">0</p>
    `;
    earningsSection.appendChild(projectedYearlyGains);
  }

  // Update the Palm NFT section
  const palmSection = document.getElementById('palm-section');
  if (palmSection) {
    const subtext = document.createElement('p');
    subtext.innerText = 'Each Palm NFT you own increases your maximum ISLAND gains per cycle.';
    palmSection.appendChild(subtext);

    const totalPalms = document.createElement('p');
    totalPalms.innerHTML = `
      Total palms NFT: 1,506<br>
      Iron Palm - 973<br>
      Bronze Palm - 271<br>
      Silver Palm - 143<br>
      Gold Palm - 106<br>
      Neon Palm - 9<br>
      Ultra Palm - 4
    `;
    palmSection.appendChild(totalPalms);
  }

  // Add staking section
  const stakingSection = document.createElement('div');
  stakingSection.id = 'staking-section';
  stakingSection.innerHTML = `
    <h3>Staking</h3>
    <p>Staking ISLAND increases your conversion rate from Blooms to ISLAND. Set your initial staked amount and how much of your ISLAND gains you wish to stake after each cycle.</p>
    <table>
      <tr>
        <th>Initial</th>
        <th>Compound</th>
        <th>Island / Bloom</th>
        <th>Island / kBloom</th>
      </tr>
      <tr>
        <td><input type="number" id="initial-stake" value="0"></td>
        <td><input type="number" id="compound-percentage" value="100"></td>
        <td id="island-bloom-value">0.00100</td>
        <td id="island-kbloom-value">1.00</td>
      </tr>
    </table>
  `;
  document.body.appendChild(stakingSection);

  // Add functionality for Palm NFT dropdown
  const palmDropdown = document.getElementById('palm-dropdown');
  if (palmDropdown) {
    palmDropdown.addEventListener('change', function() {
      const selectedPalms = document.getElementById('selected-palms');
      const selectedPalm = palmDropdown.value;
      const palmItem = document.createElement('div');
      palmItem.className = 'palm-item';
      palmItem.innerHTML = `${selectedPalm} <span class="remove-palm">x</span>`;
      selectedPalms.appendChild(palmItem);

      palmItem.querySelector('.remove-palm').addEventListener('click', function() {
        selectedPalms.removeChild(palmItem);
      });
    });
  }
});
