const getQRbtn =  document.getElementById('get-qr');
const QRDisplay =  document.getElementById('qr-display');
const number = document.getElementById('number');
const msg = document.getElementById('msg');
const date = document.getElementById('Date');
const timeDOM = document.getElementById('Time');
const sunToggle = document.querySelector('#sun-toggle');
const moonToggle = document.querySelector('#moon-toggle');
const toDark = document.querySelectorAll('.to-dark');
const removeOnDark = document.querySelector('.remove-on-dark');
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



// getQRbtn.addEventListener('click', getQR);

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
    removeOnDark.classList.add('hide-icon');
    pageGrid.classList.add('dark-theam');
    toDark.forEach(e=>{
        e.classList.add('dark-theam');
    })
    isDark == false
});

sunToggle.addEventListener('click', ()=>{
    moonToggle.classList.remove('hide-icon');
    sunToggle.classList.add('hide-icon');
    removeOnDark.classList.remove('hide-icon');
    pageGrid.classList.remove('dark-theam');
    toDark.forEach(e=>{
        e.classList.remove('dark-theam');
    })
    isDark == true
});

// validation code 
function SentMessage(){
    $(".number").css("border", "1px solid green");
    $("#helpId").css("color", "green");
    $(".help-text").html("Sent");
    $(".padding-bottom--15").html("Sent Successfully");
    getQR();
   
}

$("#get-qr").click(function (e) { 
    e.preventDefault();
   
    const Number_regular_expression =/[0-9]/g ;
        let numbers = $("#number").val();

        let msg = $(".help-text-message").val()
      
        let checker = () => {
           
            if(numbers.match(Number_regular_expression) && (numbers.length==10)){
                $("#helpId").show("");
                $(".number").css("border", "1px solid green");
                $(".number").removeAttr("class");
                $(".help-text").html("valid");
                $("#helpId").css("color", "green");
                setTimeout(SentMessage, 5000)
                //called the getquery function on valid validation
               }else if((numbers === "") && numbers!=Number_regular_expression){
                $("#helpId").show("");
                $(".number").css("border", "1px solid red");
                $("#helpId").css("color", "red");
                $(".help-text").html("This field cannot be empty");
                  
               }
               else{
                console.log("not-matched");
                $("#helpId").show("");
                $("#helpId").css("color", "red");
                $(".number").css("border", "1px solid red");
                $(".help-text").html("Invalid Receipient-Number/ Too Short");
               }
        }
        checker()
});
