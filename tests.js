const css = document.createElement('style')
css.innerHTML = `
    .myContainer {
      display: flex;
      flex-direction: column;
      max-width: 300px;
      justify-content: center;
      align-items: center;
      padding: 15px;
      margin: 15px;
      width: 300px;
      direction: ltr;
    }
    
    .cards-contaier {
      display: flex;
      flex-wrap: wrap;
    }

    .cards-container img{
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
    .myContainer > img {
        width: 50px;
        padding: 0.75rem;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        border-radius: 100%;
    }
    .form-control{
      line-height:0;
    }
    
    #app{
        justify-content:center;
    }
    img.cg-my-1 {
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        border-radius: 100%;
        
    }
    .cg-container{
        border : unset;

    }
    .cg-widget.cg-py-2 {
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        border-radius: 15px;
    }

    img.cg-my-1 {
        width: 50px;
        padding: 0.75rem;
        background : white;
    }
    
    .cg-container.cg-flex.cg-flex-column.cg-relative.large {
        border: unset;
    }
    
    a.cg-bold.cg-medium {
        color: black;
    }
    
    

    @media screen and (max-width: 600px) {
        .cg-widget.cg-py-2 {
            flex-direction: column;
        }
      }

`
const bootstrap = document.createElement('link')
bootstrap.href = `https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css`
bootstrap.rel = 'stylesheet'
bootstrap.integrity = `sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC`
bootstrap.crossOrigin = `anonymous`

document.head.appendChild(bootstrap)
document.head.appendChild(css)

const getCoin = async (coinId) => { 
  return await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
  .then(response => response.json())
  .then(data => data);
}

Element.prototype.appendBefore = function (element) {
  element.parentNode.insertBefore(this, element);
},false;

let usdToIls   

const getAllCoins = async () => {
  fetch(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
  .then(response => response.json())
  .then(data => {
    let x = 0
    // data.
    Object.values(data).map(currency => {
      x++
      if (x < 10) {
        buildCard(currency.id , 'app')
      }
    })
  });
}

const getManyCoins = (listOfIds , elementToInsert) => {
  listOfIds.map(id => {
    buildCard( id , elementToInsert)
  })
}


// getAllCoins()
class Card{
  constructor(coinData , elementToInsert){
    console.log(coinData);
    !elementToInsert 
    ? alert('חייב לבחור אלמנט אליו תרצה להכניס את הכרטיס (לא לשקוח לקרוא לאלמנת בשם בתוך הקוד)') 
    : !document.getElementById(elementToInsert).classList.contains('cards-contaier') 
    ? document.getElementById(elementToInsert).classList.add('cards-contaier')
    : undefined
    this.coinName = coinData?.name, 
    this.coinSymbol = coinData?.symbol
    this.coinPrice = coinData?.market_data?.current_price.usd * usdToIls
    setMarketCap(this.coinPrice)

    this.ils = 100
    this.maxDollars = 10000
    this.usdBox = this.ils
    this.symbolBox = this.coinPrice / this.ils
    //set image
    this.symbolHtml = document.createElement('span').innerHTML = this.coinSymbol.toUpperCase()
    //set image
    this.img = document.createElement('img')
    this.setImage(coinData?.image?.small)
    // set slider
    this.slider = document.createElement('input')
    this.setSlider()
    // set sliderOffer
    this.ilsToCoin = document.createElement('span')
    this.setSliderOffer()
    //set Usd Input
    this.ilsInput = document.createElement('input')
    this.setilsInput()
    //set Usd Input
    this.symbolInput = document.createElement('input')
    this.setSymbolInput()
    
    this.coinDollarsHtml = document.createElement('span')
    this.coinDollarsHtml.innerHTML =  `1 ${this.coinSymbol} = ${(this.coinPrice).toFixed(5)}₪`    
    this.html = document.createElement('div')
    this.html.className = "myContainer p-3 mb-5 bg-white rounded"

    this.html.append(  this.img ,  this.symbolHtml , this.coinDollarsHtml , this.slider , this.ilsToCoin , this.ilsInputContainer , this.symbolInputContainer )

    document.getElementById(elementToInsert).appendChild(this.html)
  }

  
  setImage(imgSrc){
    this.img.src = imgSrc
    this.img.style.maxWidth = 100
  }

  setSlider(){
    this.slider.type = 'range'
    this.slider.max = 10000
    this.slider.min = 0
    this.slider.value = this.ils
    this.slider.oninput = this.handleSliderChange
  }

  setilsInput(){
    this.ilsInput.type = 'text'
    this.ilsInput.className = 'form-control'
    this.ilsInput.value = this.ils
    this.ilsInput.oninput = this.handleilsInputChange
    this.ilsInput.onclick = (event) => event.target.select()
    this.ilsInputContainer = document.createElement('div')
    this.ilsInputContainer.className = "input-group mb-3 mt-3"
    this.ilsInputContainer.innerHTML = 
    `
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">ILS</span>
        </div>
    `
    this.ilsInputContainer.append(this.ilsInput)
  }

  setSymbolInput(){
    this.symbolInput.type = 'text'
    this.symbolInput.className = 'form-control'
    this.symbolInput.value = (this.ils / this.coinPrice ).toFixed(5) 
    this.symbolInput.oninput = this.handleSymbolInputChange
    this.symbolInput.onclick = (event) => event.target.select()
    this.symbolInputContainer = document.createElement('div')
    this.symbolInputContainer.className = "input-group mb-3"
    this.symbolInputContainer.innerHTML = 
    `
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">${this.coinSymbol}</span>
        </div>
    `
    this.symbolInputContainer.append(this.symbolInput)
  }


  handleSliderChange = (event) => {
    let value = event.target.value
    this.setSliderOffer(value)
    this.ils = value 
    this.ilsInput.value = this.ils
    this.symbolInput.value = value / this.coinPrice
  }

  handleilsInputChange = (event) => {
    let value = event.target.value
    this.setSliderOffer(value)
    this.slider.max = value * 5
    this.slider.value = value
    this.ils = value 
    this.ilsInput.value = value
    this.symbolInput.value = value / this.coinPrice
  }

  handleSymbolInputChange = (event) => {
    let value = event.target.value
    this.setSliderOffer( value * this.coinPrice )
    this.slider.max = value * this.coinPrice * 5
    this.slider.value = value * this.coinPrice
    this.ils = value * this.coinPrice
    this.ilsInput.value = value * this.coinPrice
    this.symbolInput.value = value 
  }


  setSliderOffer(amountOfIls){
    this.ilsToCoin.innerHTML = amountOfIls 
    ? `${(amountOfIls / this.coinPrice).toFixed(2)} ${this.coinSymbol} -  ${amountOfIls}₪` 
    : `${(this.ils / this.coinPrice).toFixed(2)} ${this.coinSymbol} - ${this.ils}₪`
  }


}


const buildCard = async (coinId , elementToInsert) => {
  test = new Card(await getCoin(coinId ) , elementToInsert)
}

window.onload = () =>{
  fetch(`https://v6.exchangerate-api.com/v6/99d738723e503e6a4cc0b6c9/latest/USD`)
  .then(response => response.json())
  .then(data => {
    usdToIls = data.conversion_rates.ILS;
    getManyCoins(['ziticoin'] , 'app')
  });

}
console.log(2);

const setMarketCap = (price) => {
    console.log(price);
    let marketCap = document.querySelector('.cg-flex.cg-flex-row.cg-justify-between.cg-py-1.cg-ticker-item:nth-child(3) > span:last-child')
    console.log(marketCap);
    marketCap.innerHTML = '$' + (price * 500000000000).toFixed(2)
}
