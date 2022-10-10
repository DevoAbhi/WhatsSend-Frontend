const getQRbtn =  document.getElementById('get-qr');
const QRDisplay =  document.getElementById('qr-display');
const number = document.getElementById('number');
const msg = document.getElementById('msg');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const hour = document.getElementById('hour');
const min = document.getElementById('min');

const getQR = () => {
    const time = {};
    time.day = day.value;
    time.month = month.value-1;
    time.year = year.value;
    time.hour = hour.value;
    time.min = min.value;
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