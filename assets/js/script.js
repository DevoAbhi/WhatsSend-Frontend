const getQRbtn =  document.getElementById('get-qr');
const QRDisplay =  document.getElementById('qr-display');
const number = document.getElementById('number');
const msg = document.getElementById('msg');
const date = document.getElementById('Date');
const timeDOM = document.getElementById('Time');

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