// let button = document.createElement('button');
window.onload = (event) => {

    // GET INFO DATABASE
    let storedata=localStorage.getItem('user_details');
    let recived_data=JSON.parse(storedata);

    //USERNAME DISPLAY
    // let user_name=document.getElementById('user_name');
    // user_name.innerHTML="/"+" "+ recived_data.name.toUpperCase();

    // console.log(recived_data);
    // console.log(recived_data.consumer_id);
    getinfo('http://localhost:80/mecl/getprofile',{consumer_id:recived_data.consumer_id})
        .then((res)=>{
            if(res['status']!=200){
                // myDivMsg.innerHTML=res['msg']
                //STORE IN LOCALSTROAGE
                let datatostore={
                    address:res.profile_user[0]['address'],
                    category:res.profile_user[0]['category'],
                    consumer_id:res.profile_user[0]['consumer_id'],
                    house_no:res.profile_user[0]['house_no'],
                    loadKW:res.profile_user[0]['loadKW'],
                    meter_no:res.profile_user[0]['meter_no'],
                    units:res.profile_user[0]['units'],
                }
                localStorage.setItem('consumer_info',JSON.stringify(datatostore));

            }else{
                console.log("Fetch faill !");
            }
        })

    getbill('http://localhost:80/mecl/pay',{consumer_id:recived_data.consumer_id})
        .then((res)=>{
            console.log(res);
            console.log(res.bill_data[0]);
            if(res['status']==200){
                //converting the json data to normal json data 
                // let d=JSON.parse(data)
                function insertDataIntoTable(data) {
                    var table = document.getElementById("table");
                    // Clear existing rows
                    table.getElementsByTagName('tbody')[0].innerHTML = '';
                    // Loop through the array data
                    data.forEach(function(item) {
                        // Create a new row
                        var row = table.insertRow();
                        // Insert data into cells of the row
                        var bill_date = row.insertCell(0);
                        var bill_amount = row.insertCell(1);
                        var bill_status = row.insertCell(2);
                        var bill_pay = row.insertCell(3);
                
                        //STHE FOR EACH CELL
                        //BILL DATE 
                        var dateString = item.date;
                        var datePortion = dateString.split(" ")[0];
                        bill_date.textContent=datePortion;
                        console.log(datePortion);
                        //Total bill
                        bill_amount.textContent=item.total_bill;
                        //TOTAL BILL
                        bill_amount.textContent =item.total_bill; 
                        //DUE DATE
                        var currentDate = new Date(datePortion);
                        currentDate.setDate(currentDate.getDate() + 15);
                        var dueDate = currentDate.toISOString().split('T')[0];
                        console.log(dueDate);
                        //STATUS CODE 0 ITS PENDING
                        if(item.status==0){
                            bill_status.textContent = "Pending";
                            // Create a button element
                            let button = document.createElement('button');
                            button.textContent = 'Pay Now';
                            button.setAttribute("id","button");
                            bill_pay.appendChild(button);

                            button.addEventListener('click', function(data) {
                                console.log("CLICK PAY NOW");
                                // console.log(item);
                                // bill_no:item.bill_no,
                                // category:item.category,
                                // address:item.address,
                                // house_no:item.house_no,
                                // meter_no:item.meter_no,
                                // loadKW:item.loadKW,
                                const pay_data={
                                        consumer_id:item.consumer_id,
                                        date:datePortion,
                                        status:item.status,
                                        previous_reading:item.previous_reading,
                                        current_reading:item.current_reading,
                                        due_date:dueDate,
                                        units:item.units,
                                        total_bill:item.total_bill,
                                        bill_no:item.bill_no,
                                        fixed_price:item.fixed_price,
                                        electricity_duty:item.electricity_duty,
                                        energy_charge:item.energy_charge,
                                }
                                localStorage.setItem('pay_now',JSON.stringify(pay_data));

                                function redirect(){
                                    window.location.href='/pages/card/card.html';
                                }
                                setTimeout(redirect(),2000);
                            });
                        }else{
                            bill_status.textContent = "Paid";
                            let button = document.createElement('button');
                            button.textContent = 'Download';
                            button.setAttribute("id","button");
                            bill_pay.appendChild(button);

                            button.addEventListener('click', function(data) {
                                console.log("CLICK PAY NOW");
                                // console.log(item);

                                const pay_data={
                                    consumer_id:item.consumer_id,
                                    date:datePortion,
                                    status:item.status,
                                    previous_reading:item.previous_reading,
                                    current_reading:item.current_reading,
                                    due_date:dueDate,
                                    units:item.units,
                                    total_bill:item.total_bill,
                                    bill_no:item.bill_no,
                                    fixed_price:item.fixed_price,
                                    electricity_duty:item.electricity_duty,
                                    energy_charge:item.energy_charge,
                                }
                                localStorage.setItem('pay_now',JSON.stringify(pay_data));

                                function redirect(){
                                    window.location.href='/pages/bill/bill.html';
                                }
                                setTimeout(redirect(),2000);
                            });
                        }
                    });
                }
                insertDataIntoTable(res.bill_data);
            }else{
                console.log("Fetch faill !");
            }
        })
    
    async function getinfo(url,data){
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

    async function getbill(url,data){
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

  };

  //GETING THE VALUE FROM LOCAL STORAGE
  let user=document.getElementById('user');
  let consumer_id=document.getElementById('consumer_id');
  let category=document.getElementById('category');
  let meter_no=document.getElementById('meter_no');
  let loadKW=document.getElementById('loadKW');
  let email=document.getElementById('email');

  const user_info=localStorage.getItem('consumer_info');
  const recv_user_info=JSON.parse(user_info);

  const user_details=localStorage.getItem('user_details');
  const recv_user_details=JSON.parse(user_details);

  //SETTING THE VALUE
  user.innerHTML=recv_user_details.name;
  consumer_id.innerHTML=recv_user_info.consumer_id;
  category.innerHTML=recv_user_info.category;
  meter_no.innerHTML=recv_user_info.meter_no;
  loadKW.innerHTML=recv_user_info.loadKW;
  email.innerHTML=recv_user_details.email;