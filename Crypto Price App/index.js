Url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=usd&include_24hr_change=true'


async function cryptoPrice() {

  try{
    const response = await fetch(Url);
    const data = await response.json();
    const container = document.querySelector('.container');
    const coins = Object.keys(data);
    for(let coin of coins){
      const coinInfo = data[`${coin}`];
      const price = coinInfo.usd;
      const change = coinInfo.usd_24h_change.toFixed(5);
      container.innerHTML = container.innerHTML + `
      <div class="coin ${change < 0 ? "falling" : "rising"}">
        <div class="coin-logo">
          <img src = "images/${coin}.png" alt = "${coin}" />
        </div>

        <div class="coin-name">
          <h1>${coin}</h1>
          <span>USD</span>
        </div>

        <div class="coin-price">
          <span class="price">$${price}</span>
          <span class="change">${change}</span>
        </div>
      </div>`
    }
  }catch(error){
    console.error('Error:', error);
  }

}

cryptoPrice();
