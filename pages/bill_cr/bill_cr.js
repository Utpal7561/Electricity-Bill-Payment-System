// FORM 1
let consumer_number=document.getElementById('consumer_number');
let current_reading=document.getElementById('current_reading');
let button_next=document.getElementById('next');
// FORM
let form1=document.getElementById('form_1');
let form2=document.getElementById('form_2');
// FORM 2
let prev_reading=document.getElementById('prev_reading');
let energy_charge=document.getElementById('energy_charge');
let fix_charge=document.getElementById('fix_charge');
let elect_charge=document.getElementById('elect_charge');
let generate=document.getElementById('generate');
// CALCULATION
let total_bill_generated=document.getElementById('total_bill_generated');
let generate_today=document.getElementById('generate_today');

let final_reading=0;
let energy_consume=0;

window.onload=(e)=>{

    load_prev_reading('http://localhost:80/mecl/load_bill_data')
    .then((res)=>{
        console.log(res);
        if(res['status']==200){
        total_bill_generated.innerHTML=res['count'];
            
        // Get today's date in the format YYYY-MM-DD
        var today = new Date();
        var formattedToday = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Filter bills generated today
        let today_total=0;
        var billsGeneratedToday = res.bill_data.filter(function(x) {
            today_total+=1;
            return x.date.startsWith(formattedToday);
        });
        console.log("TODAY TOTAL",today_total);
        generate_today.innerHTML=today_total;
        // Calculate total bill amount generated today
        var totalAmountGeneratedToday = billsGeneratedToday.reduce(function(total, bill) {
            return total + bill.total_bill;
        }, 0);

        //NOT USE OF THIS TWO LINE OF CODE
        console.log("Bills generated today:",billsGeneratedToday);
        console.log("Total amount generated today:", totalAmountGeneratedToday);
        }
    })
    async function load_prev_reading(url,data){
        const response=await fetch(url,{
            method:'GET',
            mode:'cors',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        });
        return response.json();
    }
}

button_next.addEventListener('click', function(e){
    e.preventDefault();
    let data={
        consumer_number,
        current_reading,
    }

    if(validation_1(data)){
        get_prev_reading('http://localhost:80/mecl/get_prev_reading',{consumer_number:consumer_number.value})
        .then((res)=>{
            console.log("RES",res);
            if(res['status']==200){
                // CHECKING ERROR MSG
                // console.log("PREV",res.prev_reading);
                // console.log("CRR VALE",data.current_reading.value);
                // console.log(valid_units());

                //CHECK UNITS VALIDAETION IT SHOULD BE GREATER THEN PREV VALUE
                function valid_units(){
                    isValid=true;
                    if(data.current_reading.value >= res.prev_reading){
                        isValid=true;
                    }if(data.current_reading.value <= parseInt(res.prev_reading)){
                        isValid=false;
                    }
                    return isValid;
                }
                //END FUNTION VALID_UNITS
                if(valid_units())
                    {
                    function redirect(consumer_id,prev_reading){
                        //  LOCAL STORAGE
                        const data_prev_reading={consumer_id:consumer_id,prev_reading:prev_reading}
                        sessionStorage.setItem('prev_reading',JSON.stringify(data_prev_reading));
                        // window.location.href='/pages/dashboard/dashboard.html';
                        }
                        setTimeout(redirect(res.consumer_id,res.prev_reading),2000);
                        // FORM VISIABLE
                        form1.style.display="none";
                        form2.style.display="block";
                        // SETTING PREV_VALUE
                        if(res.prev_reading==0 && res.current_reading==0){
                            prev_reading.value=0;
                            prev_reading.placeholder=0;

                            // FINAL CONSUME
                            final_reading=current_reading.value;
                            console.log("FINAL CONSUME 1",final_reading);

                            //ENERGY CONSUME
                            if(final_reading<100){
                                energy_consume=4.5*current_reading.value;
                            }else{
                                energy_consume=5*current_reading.value;
                            }
                            energy_charge.placeholder=energy_consume;
                            energy_charge.value=energy_consume;
                            console.log("ENERGY CONSUME 1",energy_consume);
                        }
                        if(res.prev_reading==0 && res.current_reading!=0){
                            prev_reading.value=parseInt(res.current_reading);
                            prev_reading.placeholder=parseInt(res.current_reading);

                            //FINAL READING
                            final_reading=current_reading.value-parseInt(res.current_reading);
                            console.log("FINAL CONSUME 2",final_reading);

                            //ENERGY CONSUME
                            if(final_reading<100){
                                energy_consume=4.5*final_reading;
                            }else{
                                energy_consume=5*final_reading;
                            }
                            energy_charge.placeholder=energy_consume;
                            energy_charge.value=energy_consume;
                            console.log("ENERGY CONSUME 2",energy_consume);
                        }
                        if(res.prev_reading!=0 && res.current_reading!=0){
                            prev_reading.value=parseInt(res.current_reading);
                            prev_reading.placeholder=parseInt(res.current_reading);

                            console.log("PREV RED 3",prev_reading.value);
                            console.log("CURR RED 3",current_reading.value);

                            // FINAL CONSUME
                            if(current_reading.value > parseInt(res.current_reading)){
                                console.log("L",prev_reading.value);
                                final_reading=current_reading.value-parseInt(res.current_reading);
                            }else{
                                final_reading=parseInt(res.current_reading)-current_reading.value;
                            }
                            console.log("FINAL CONSUME 3",final_reading);

                            // ENEGRY CONSUME
                            if(final_reading<100){
                                energy_consume=4.5*final_reading;
                            }else{
                                energy_consume=5*final_reading;
                            }
                            energy_charge.placeholder=energy_consume;
                            energy_charge.value=energy_consume;
                            console.log("ENERGY CONSUME 3",energy_consume);
                        }        
                }else{   
                    document.getElementById('error').innerHTML="Invalid consumer units"
                    console.log("Invalid Consumer units");
                }  
            }
            else{
                alert("Invalid consumer Id");
            }
        })
    }


    async function get_prev_reading(url,data){
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

})


generate.addEventListener('click', function(){
    let data={
        consumer_number:consumer_number.value,
        current_reading:current_reading.value,
        prev_reading:prev_reading.value,
        energy_charge:energy_charge.value,
        fix_charge:fix_charge.value,
        elect_charge:elect_charge.value,
        units:final_reading,
        total_bill:parseInt(energy_consume)+parseInt(fix_charge.value)+parseInt(elect_charge.value)
    }
    console.log(data);


    post_generate_bill('http://localhost:80/mecl/post_generate_bill',{data:data})
        .then((res)=>{
            if(res['status']==200){
                alert('Generated successfully');
                if(confirm("Do u want to generate again?")) {
                    window.location.href = "/pages/bill_cr/bill_cr.html";
                }
            }else{
                alert('Something went wrong');
            }
        })


    async function post_generate_bill(url,data){
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

});


function validation_1(data){
    isValid=true;
        if(data.consumer_number.value===""){
            text="consumer number required !"
            data.consumer_number.placeholder=text;
            isValid=false;
        }
        if(data.current_reading.value===""){
            text="current reading required !"
            data.current_reading.placeholder=text;
            isValid=false;
        }else{
            console.log("Validation is done");
        }
    return isValid;
    }