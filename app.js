const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document .querySelector("form button"); // step - 03

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")





for (let select of dropdown){
for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
    // console.log(select);
}


select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });

}// step - 01

const updateFlag = (element) => {
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}; // step - 02

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () =>{




    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
                           //<div class="amount">
                          //    <p>Enter Amount</p>
                          //    <input value="100" type="number">
                          // </div> for referance

    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    // console.log(amtVal);

    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   const data = await response.json();
   const exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
   console.log(exchangeRate);
//    console.log(response);
//    console.log(data);
   
   let finalAmount = amtVal * exchangeRate;
   console.log(finalAmount);
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};



window.addEventListener("load", () => {
    updateExchangeRate();
})
