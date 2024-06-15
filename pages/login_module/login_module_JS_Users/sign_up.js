    // http://localhost:80/adbuAPI/register
    // http://localhost:80/adbuAPI/checkemail

    let namee=document.getElementById('name');
    let phone=document.getElementById('phone');
    let consumer_no=document.getElementById('consumer_no');
    let email=document.getElementById('email');
    let password=document.getElementById('password');
    let confirm_password=document.getElementById('confirm_password');
    let myDiv = document.getElementById('alter');
    let buttonSubmit=document.getElementById('button');

    function generateUniqueID() {
        const timestamp = new Date().getTime();
        const randomNum = Math.floor(Math.random() * 1000);
        const uniqueID = (timestamp * 1000 + randomNum) % 1000000;
        const paddedID = uniqueID.toString().padStart(6, '0');
        return paddedID;
      }

    buttonSubmit.addEventListener('click', function(e){
        e.preventDefault();
        console.log("click submit")
        let data={
                    namee,
                    phone,
                    consumer_no,
                    email,
                    password,
                    confirm_password,
                    myDiv,
                }
        //  console.log(data);

        let orginaData={
            name:namee.value,
            phone:phone.value,
            consumer_no:consumer_no.value,
            email:email.value,
            password:password.value,
            uuid:generateUniqueID()
            // confirm_password:confirm_password.value,
        }


        if(validation(data)){
        checkEmail('http://localhost:80/mecl/checkemail',{email:email.value})
        .then((res)=>{
            console.log(res);
            if(res['status']==400){
                //Checking email already present or not
                myDiv.innerHTML=res['msg'];
            }
            else{
                postData('http://localhost:80/mecl/index', orginaData)
                .then((res)=>{
                // Success Register msg
                
                console.log(res);
                const myArray = res.split("<br>");
                let lastElement = myArray[myArray.length - 1];

                let responseObject = JSON.parse(lastElement);
                let statusCode = responseObject.status;
                let msg=responseObject.msg;
                console.log('Status Code:', statusCode);
                console.log("Message:",msg);
                myDiv.innerHTML=msg;

                //name transfering to Otp_verification page
                function redirect(){
                const datatosend={name:namee.value,email:email.value}
                const queryString=new URLSearchParams(datatosend).toString();
                window.location.href='Otp-verification.html?'+queryString;
                }
                
                setTimeout(redirect,2000);

                })
                .then((data)=>console.log(data));
                
            }
        })
        console.log(orginaData);
        }else{
            console.log("Not Validated")
        }
    });
    
    
  
    

    async function postData(url, data) {
        const response = await fetch(url, {
          method: "POST", 
           mode: "cors", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        });
        return response.text();
      }

      async function checkEmail(url,data){
        const response=await fetch(url,{
        method:"POST",
        mode:'cors',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(data)
        });
        return response.json();
      }

  
function validation(data){
    isValidate=true;
    let errorMessage=[];
    // console.log("Error Msg",errorMessage);
    
    function checkPhone(){
        if(data.phone.value.length<10){
           text="Phone number is invalid !";
           data.phone.style.borderColor="red";
           errorMessage.push(text);
           isValidate=false;
        }else{
           data.phone.style.borderColor="green";
        }
       }
    
    function checkEmail(){
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.value))){
            text="Enter a valid email !";
            errorMessage.push(text);
            data.email.style.borderColor="red";
            isValidate=false;
        }else{
            data.email.style.borderColor="green";
        }
    }

    function checkPassword(){
        if(data.password.value.length<8){
        text="Password should be minimum 8 digits !";
        data.password.style.borderColor="red";
        errorMessage.push(text);
        isValidate=false;
        }else{
        data.password.style.borderColor="green";
        }
    }

    function checkConfirmPassword(){
        if(data.confirm_password.value!==data.password.value){
            text="Password does not match";
            data.confirm_password.style.borderColor="red";
            errorMessage.push(text);
            isValidate=false;
        }else{
            data.confirm_password.style.borderColor="green";  
        }
    }

   if(data.namee.value===""){
        text="Enter the name";
        data.namee.placeholder=text;
        data.namee.style.borderColor="red";
        isValidate=false;
    }
    if(data.phone.value===""){
        text="Enter the phone number";
        data.phone.placeholder=text;
        data.phone.style.borderColor="red";
        isValidate=false; 
    }
    // if(data.phone.value.length<10){
    //     text="Phone number is invalid !";
    //     data.phone.style.borderColor="red";
    //     errorMessage.push(text);
    //     isValidate=false;
    // }
    if(data.consumer_no.value===""){
        text="Enter the consumer no";
        data.consumer_no.placeholder=text;
        data.consumer_no.style.borderColor="red";
        isValidate=false;
    }
    if(data.email.value===""){
        text="Enter the email";
        data.email.placeholder=text;
        data.email.style.borderColor="red";
        isValidate=false;
    }
    // if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.value))){
    //     text="Enter a valid email !";
    //     errorMessage.push(text);
    //     data.email.style.borderColor="red";
    //     isValidate=false;
    // }
    if(data.password.value===""){
        text="Enter the password";
        data.password.placeholder=text;
        data.password.style.borderColor="red";
        isValidate=false;
    }
    // if(data.password.value.length<8){
    //     text="Password should be minimum 8 digits !";
    //     data.password.style.borderColor="red";
    //     errorMessage.push(text);
    //     isValidate=false;
    // }
    if(data.confirm_password.value===""){
        text="Enter the confirm password";
        data.confirm_password.placeholder=text;
        data.confirm_password.style.borderColor="red";
        isValidate=false;
    }
    // if(data.confirm_password.value!==data.password.value){
    //     text="Password does not match";
    //     data.confirm_password.style.borderColor="red";
    //     errorMessage.push(text);
    //     isValidate=false;
    // }
   
    

    // CHECKING
    if(data.namee.value!=""){
        data.namee.style.borderColor="green";
    }
    if(data.phone.value!=""){
        checkPhone();
    }
    if(data.consumer_no.value!=""){
        data.consumer_no.style.borderColor="green";
    }
    if(data.email.value!=""){
        checkEmail();
    }
    if(data.password.value!=""){
        checkPassword();
    }
    if(data.confirm_password.value!=""){
        checkConfirmPassword();
    }
    if(errorMessage.length>0){
        myDiv.innerHTML=errorMessage[0];
    }
    else{
        myDiv.innerHTML="or use email"
    }
    
    return isValidate;
}



