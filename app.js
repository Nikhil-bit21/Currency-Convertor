const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg")

window.addEventListener("load",()=>{
    updateExchangeRate();
});

// for (code in countryList){
//     console.log(code,countryList[code]);
// }


for(let select of dropdowns){
    for (code in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = code;
        newOpt.value = code;
        if(select.name === "from" && code === "USD"){
            newOpt.selected = true;
        }else if(select.name === "to" && code === "INR"){
            newOpt.selected = true;
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if(amtValue === "" || amtValue < 0){
        amtValue = 1;
        amount.value = `${amtValue}`;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);

    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = rate*amtValue;

    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

