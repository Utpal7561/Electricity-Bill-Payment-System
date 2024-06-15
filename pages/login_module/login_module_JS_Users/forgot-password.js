
// http://localhost:80/adbuAPI/forgetpassword
let submitButton =document.getElementById('button');
let email=document.getElementById('email');
let myDivMsg=document.getElementById('msg');


submitButton.addEventListener('click', function(e){
    e.preventDefault();
    console.log("Submit button is clicked");

    let data={
        email,
    }
    if(validation(data)){
        checkmail('http://localhost:80/mecl/forgetpassword',{email:email.value})
        .then((response)=>{
            // console.log(response);
            const myArray = response.split("<br>");
            let lastElement = myArray[myArray.length - 1];
    
            let responseObject = JSON.parse(lastElement);
            let statusCode = responseObject.status;
            let msg=responseObject.msg;
            console.log('Status Code:', statusCode);
            console.log("Message:",msg);

            //displaying the  return message 
            myDivMsg.innerHTML=msg;
    
        })
    }else{
        console.log("Validation Fail !");
    }

    async function checkmail(url,data){
    const response= await fetch(url,{
        method:'POST',
        mode:'cors',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    })
    return response.text();
    }
  
})


function validation(data){
    isValidate=true;

    if(data.email.value==""){
        text="Please enter the email";
        data.email.placeholder=text;
        isValidate=false;
    }
    return isValidate;
}