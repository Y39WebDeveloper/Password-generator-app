const range = document.getElementById("range");
const lenghtIndicator = document.getElementById("lenghtIndicator");
const result = document.getElementById("result");
const btn = document.getElementById("btn");
const level = document.getElementById("level");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const copiedTxt = document.getElementById("copiedTxt");
const copy = document.getElementById("copy");
const indexs = document.querySelectorAll(".indexs li");

lenghtIndicator.innerHTML = range.value;

const progress = (e) => {
    const min = e.target.min;
    const max = e.target.max;
    const currentValue = e.target.value;

    e.target.style.backgroundSize = ((currentValue - min)/(max-min))*100 + "% 100%";
    lenghtIndicator.innerHTML = e.target.value;
}

const copyPassword = () => {
    copiedTxt.classList.add("active");
    setTimeout(()=>{
        copiedTxt.classList.remove("active")
    },2000)
    navigator.clipboard.writeText(result.value)
}

range.addEventListener("input", progress)
copy.addEventListener("click", copyPassword)

const smallChars = "abcdefghigklmnopqrstuvwxyz";
const capitalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbol = "@#.-_;:/&é($)<>";
const nums = "0123456789";
const multiSelect = []

function preparPassword(){
    if(uppercase.checked){
        multiSelect.push(capitalChars);
    }
    if(lowercase.checked){
        multiSelect.push(smallChars);
    }
    if(numbers.checked){
        multiSelect.push(nums);
    }
    if(symbols.checked){
        multiSelect.push(symbol);
    }
    if(!uppercase.checked && !lowercase.checked && !symbols.checked && !numbers.checked){
        multiSelect.push(smallChars)
    }
}

function generatePassword(){
    preparPassword()
    let res = "";
    for(let i=0; i<range.value; i++){
        let rng = Math.floor(Math.random()*(multiSelect.length));
        let lnth = multiSelect[rng].length
        res += multiSelect[rng][Math.floor(Math.random()*lnth)]
    }
    testing(res);
    console.log(res);
    result.value = res
}
function testinOnkeyUp(){
    preparPassword()
    let res = result.value;
    testing(res);
    console.log(res);
    result.value = res
}


const testing = (password) => {
    let pow = 0;
    let levelTxt = "";
    indexs.forEach(index => index.classList.remove("active-green", "active-yellow","active-orange","active-red"))
    for(let i = 0; i < password.length; i++){
        if(symbol.includes(password[i])){
            pow++;
            break;
        }
    }
    for(let i = 0; i < password.length; i++){
        if(smallChars.includes(password[i])){
            pow++;
            break;
        }
    }
    for(let i = 0; i < password.length; i++){
        if(capitalChars.includes(password[i])){
            pow++;
            break;
        }
    }
    for(let i = 0; i < password.length; i++){
        if(nums.includes(password[i])){
            pow++;
            break;
        }
    }
    if(password.length >= 10){
        pow++;
    }
    if(password.length >= 8){
        pow++;
    }
    if(password.length >= 6){
        pow++;
    }
    if(password.length <= 4){
        pow--;
    }
    if(password.length <= 0){
        pow = 0;
    }
    if(pow>=7){
        levelTxt = "STRONG";
        for(let i = 0; i < 4; i++){
            indexs[i].classList.add("active-green")
        }
    }
    if(pow<7 && pow>=5){
        levelTxt = "MEDIUM";
        for(let i = 0; i < 3; i++){
            indexs[i].classList.add("active-yellow")
        }
    }
    if(pow<5 && pow>=3){
        levelTxt = "WEAK";
        for(let i = 0; i < 2; i++){
            indexs[i].classList.add("active-orange")
        }
    }
    if(pow<3 && pow>=1){
        levelTxt = "TOO WEAK!";
        for(let i = 0; i < 1; i++){
            indexs[i].classList.add("active-red")
        }
    }
    if(pow<=0){
        levelTxt = "hahaha";
    }
    level.innerHTML = levelTxt;
}

btn.addEventListener("click",generatePassword)
result.addEventListener("keyup",testinOnkeyUp)