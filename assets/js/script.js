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

// getQRbtn.addEventListener('click', getQR);
// https://whatssend.adaptable.app/whatsapp-api


// form validation code by contributor ;
$("#get-qr").click(function (e) { 
    e.preventDefault();
   
    const Number_regular_expression =/[1-9]/g ;
        let numbers = $("#number").val();

        let msg = $(".help-text-message").val()
      
        let checker = () => {
           
            if(numbers.match(Number_regular_expression) && (numbers.length>=6)){
                $("#helpId").show("");
                $(".number").css("border", "1px solid green");
                $(".number").removeAttr("class");
                $(".help-text").html("Valid");
                $("#helpId").css("color", "green");
                // success
                getQR();
                console.log("success");
                
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
                $(".help-text").html("Invalid Receipient-Number");
               }
        }
        checker()
});
// end of validation
