// http://localhost:80/adbuAPI/resendOTP
// http://localhost:80/adbuAPI/emailOTP

let otp=document.getElementById('otp');
let myDivName=document.getElementById('name');
let buttonSubmit=document.getElementById('button');
let myDivEmail=document.getElementById('emaildisplay');
let MyDivEmailResMsg=document.getElementById('emailMessage');
let buttonResend=document.getElementById('buttonResend');
//showing the name that was transefer

const queryString=window.location.search;
const urlParams=new URLSearchParams(queryString);
const receivedData=Object.fromEntries(urlParams.entries());
// JSON.stringify(receivedData.name)
myDivName.innerHTML=receivedData.name==undefined?null:receivedData.name;
let email=receivedData.email==undefined?null:receivedData.email;
myDivEmail.innerHTML=email;

buttonSubmit.addEventListener('click', function(e){
    e.preventDefault();
    console.log("Click Submit Button")
    let data={
       otp,
    }
  
    if(validation(data)){
        checkOTP("http://localhost:80/mecl/emailOTP",{otp:otp.value,email:email})
        .then((response)=>{
             let res=JSON.parse(response);
            if(res['status']==400){
                MyDivEmailResMsg.innerHTML=res['msg'];
                window.location = "sign-in.html";
            }else{
                console.log(res['msg']);
            }
        })
    }

    async function checkOTP(url,data){
        const response=await fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data),
        });
        return response.text();
    }
// last brecket of buttonSubmit function 
})


buttonResend.addEventListener('click', function(e){
    e.preventDefault();
    console.log("click Resend Button");

    resendOTP('http://localhost:80/adbuAPI/resendOTP',{otp:otp.value,email:email})
    .then((response)=>{
        console.log(response)
        const myArray = response.split("<br>");
        let lastElement = myArray[myArray.length - 1];

        let responseObject = JSON.parse(lastElement);
        let statusCode = responseObject.status;
        let msg=responseObject.msg;
        console.log('Status Code:', statusCode);
        console.log("Message:",msg);

        // redirect to sign-in page.
        function redirect(){
            MyDivEmailResMsg.innerHTML=msg;
        }
        setTimeout(redirect,2000);
        
    })


    async function resendOTP(url,data){
        const response= await fetch(url,{
         method:'POST',
         mode:'cors',
         headers:{
            "Content-Type":"application/json",
         },
         body:JSON.stringify(data),
        });
        return response.text();
    }
//last breacket of buttonResend function
})


function validation(data){
    isValidate=true;

    if(data.otp.value==""){
        text="Please enter the OTP";
        data.otp.placeholder=text;
        isValidate=false;
    }
    return isValidate;
}