const getQRbtn =  document.getElementById('get-qr');
const QRDisplay =  document.getElementById('qr-display');
const number = document.getElementById('number');
const msg = document.getElementById('msg');
const date = document.getElementById('Date');
const timeDOM = document.getElementById('Time');
const sunToggle = document.querySelector('#sun-toggle');
const moonToggle = document.querySelector('#moon-toggle');
const toDark = document.querySelectorAll('.to-dark');
const pageGrid = document.querySelector('.pagebackground-gridContainer');



const getQR = () => {
    const time = {};
    [time.year, time.month, time.day] = String(date.value).split("-");
    time.year = Number(time.year);
    time.month = Number(time.month) - 1;
    time.day = Number(time.day);
    
    
    [time.hour, time.min] = String(timeDOM.value).split(":");
    time.hour = Number(time.hour);
    time.min = Number(time.min);
    
    const payload = {};
    payload.number = number.value;
    payload.msg = msg.value;
    axios.post("http://127.0.0.1:3000/whatsapp-api", {payload, time}).then(response => {
        console.log(response.data.qr);
        var qrcode = new QRCode(QRDisplay, {
            text: response.data.qr,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    }).catch(err => {
        console.log(err);
    })


}



getQRbtn.addEventListener('click', getQR);

// https://whatssend.adaptable.app/whatsapp-api


// dark and light mode toggle

let isDark = false

if(isDark == false){
    moonToggle.classList.remove('hide-icon')
    sunToggle.classList.add('hide-icon')
}

moonToggle.addEventListener('click', ()=> {
    moonToggle.classList.add('hide-icon');
    sunToggle.classList.remove('hide-icon');
    pageGrid.classList.add('hide-icon');
    toDark.forEach(e=>{
        e.classList.add('dark-theam');
    })
    isDark == false
});

sunToggle.addEventListener('click', ()=>{
    moonToggle.classList.remove('hide-icon');
    sunToggle.classList.add('hide-icon');
    pageGrid.classList.remove('hide-icon');
    toDark.forEach(e=>{
        e.classList.remove('dark-theam');
    })
    isDark == true
});


