
// http://localhost:80/adbuAPI/login
let signInButton=document.getElementById('loginButton');
let email=document.getElementById('email');
let password=document.getElementById('password');
let myDivMsg=document.getElementById('msg');


signInButton.addEventListener('click',function(e){
    e.preventDefault();
    let data={
        email,
        password,
    }
    console.log("Clicking SignIn Button");
    validation(data);
    if(validation(data)){
        login('http://localhost:80/mecl/login',{email:email.value,password:password.value})
        .then((res)=>{
            if(res['status']==400){
                myDivMsg.innerHTML=res['msg']

                //redirect to jobpage
                function redirect(username,useremail,consumer_id){
                 //local storage
                const datatoStore={name:username,email:useremail,consumer_id:consumer_id}
                localStorage.setItem('user_details',JSON.stringify(datatoStore));
                window.location.href='/pages/dashboard/dashboard.html';
                }
                setTimeout(redirect(res['name'],res['email'],res['consumer_id']),2000);
            }else{
                myDivMsg.innerHTML="Login details invalid !"
            }
        })
    }else{
    console.log("Validation has been fail !");
    }

    async function login(url,data){
        const response=await fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        });
        return response.json();
    }
//last breacket of signInButton 
})

function validation(data){
    isValidation=true;

    if(data.email.value==""){
        text="Enter the email";
        data.email.placeholder=text;
        isValidation=false;
    }
    if(data.password.value==""){
        text="Enter the password";
        data.password.placeholder=text;
        isValidation=false;
    }

    return isValidation;
}

