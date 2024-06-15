// GETING THE VALUE FROM LOCAL STORAGE
let user=document.getElementById('user');
const user_details=localStorage.getItem('user_details');
const recv_user_details=JSON.parse(user_details);


//SETTING THE VALUE
user.innerHTML=recv_user_details.name;

let print_bill=document.getElementById('print');

window.onload=()=>{
    const user_bill=localStorage.getItem('pay_now');
    const user_bill_data=JSON.parse(user_bill);

    const user_info=localStorage.getItem('consumer_info');
    const user_info_data=JSON.parse(user_info);

    let bill_no=document.getElementById('bill_no');
    let bill_date=document.getElementById('bill_date');
    let address=document.getElementById('address');
    let house_no=document.getElementById('house_no');
    let meter_no=document.getElementById('meter_no');
    let consumer_id=document.getElementById('consumer_id');
    let email=document.getElementById('email');
    let loadKW=document.getElementById('loadKW');
    

    let current_reading=document.getElementById('current_reading');
    let prev_reading=document.getElementById('prev_reading');
    let total_units=document.getElementById('total_units');
    let total_units_per=document.getElementById('total_units_per');
    let total_bill=document.getElementById('total_bill');
    let elet_duty=document.getElementById('elet_duty');
    let subsidy=document.getElementById('subsidy');

    bill_no.innerHTML=user_bill_data.bill_no;
    bill_date.innerHTML=user_bill_data.date;

    address.innerHTML=user_info_data.address;
    house_no.innerHTML=user_info_data.house_no;
    meter_no.innerHTML=user_info_data.meter_no;
    loadKW.innerHTML=user_info_data.loadKW;

    consumer_id.innerHTML=recv_user_details.consumer_id;
    email.innerHTML=recv_user_details.email;
   

    current_reading.innerHTML=user_bill_data.current_reading;
    prev_reading.innerHTML=user_bill_data.previous_reading;

    elet_duty.innerHTML="+"+user_bill_data.electricity_duty;
    subsidy.innerHTML="-"+1;
    let units1=user_bill_data.current_reading-user_bill_data.previous_reading;
    total_units.innerHTML=units1;

    let units=user_bill_data.current_reading-user_bill_data.previous_reading;
    total_units_per.innerHTML=units;

    total_bill.innerHTML=user_bill_data.total_bill;

}

print_bill.addEventListener('click',function(){
    let invoice_box=document.getElementById('invoice_box').innerHTML;
    // var printContents = document.getElementById(divId).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = invoice_box;
     window.print();

     document.body.innerHTML = originalContents;
     document.body.style.backgroundColor="#112233";
})