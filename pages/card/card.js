// GETING THE VALUE FROM LOCAL STORAGE
let user=document.getElementById('user');
const user_details=localStorage.getItem('user_details');
const recv_user_details=JSON.parse(user_details);

let storedata=localStorage.getItem('pay_now');
let recived_data=JSON.parse(storedata);

//INPUT ID AND BUTTON ID
let OTP_INPUT=document.getElementById('OTP_INPUT');
let OTP_BUTTON=document.getElementById('OTP_BUTTON');
let Proceed=document.getElementById('Proceed');
let form_body=document.getElementById('form_body');
let card_number=document.getElementById('card_number');
let cvv=document.getElementById('cvv');
let bill_amount=document.getElementById('bill_amount');
//SETTING THE VALUE
user.innerHTML=recv_user_details.name;

window.onload=(e)=>{
    
    let consumer_id=document.getElementById('consumer_id');
    consumer_id.innerHTML="Consumer No." + recived_data.consumer_id;

    let bill_amount=document.getElementById('bill_amount');
    bill_amount.placeholder="₹" +recived_data.total_bill;

}

Proceed.addEventListener('click', function(){

    function generateUniqueID() {
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000);
        const uniqueID = (timestamp * 1000 + randomNum) % 1000000;
        const paddedID = uniqueID.toString().padStart(6, '0');
        return paddedID;
      }

      if(cardValidation()){
        console.log("OTP CLICK");
        OTP_INPUT.style.display="block";
        OTP_BUTTON.style.display="block";
        form_body.style.height="450px";
        Proceed.innerText="Send";
        OTP_send('http://localhost:80/mecl/OTP_send',{email:recv_user_details.email,OTP:generateUniqueID(),bill_no:recived_data.bill_no,total_bill:recived_data.total_bill})
        .then((res)=>{
            if(res['status']==200){
                console.log(res);
            }else{
                console.log("Fetch faill !");
            }
        })
      }

    async function OTP_send(url,data){
        const response=await fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        return response.json();
    }

    function cardValidation(){
        let isValid=true;
        if(card_number.value==""){
            card_number.placeholder="Provide card number";
            isValid=false;
        }if(cvv.value==""){
            cvv.placeholder="Provide CVV";
            isValid=false;
        }
        return isValid;
    }
});

OTP_BUTTON.addEventListener('click',function(){
function validation(){
    isValid=true;
    if(OTP_INPUT.value==""){
        OTP_INPUT.placeholder="Enter the OTP";
        isValid=false;
    }
    return isValid;
}

if(validation()){
    check_otp('http://localhost:80/mecl/check_otp',{bill_no:recived_data.bill_no,otp:OTP_INPUT.value})
    .then((res)=>{
        if(res['status']==200){
            OTP_BUTTON.innerHTML="Verified";
            function redirect(){
                window.location.href='/pages/bill/bill.html';
            }
            setTimeout(redirect(),3000);

        }else{
            console.log("Fetch faill !");
        }
    })
}
    
    async function check_otp(url,data){
        const response=await fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        return response.json();
    }
})