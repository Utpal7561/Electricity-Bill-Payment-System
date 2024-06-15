

window.onload = (event) => {
     // GET INFO DATABASE
     let storedata=localStorage.getItem('user_details');
     let recived_data=JSON.parse(storedata);
     let reading_data=[];
     console.log("TOTAL UNITS",reading_data);
     // console.log(recived_data);
     // console.log(recived_data.consumer_id);
     getbill('http://localhost:80/mecl/pay_history',{consumer_id:recived_data.consumer_id})
        .then((res)=>{
            console.log(res);
            if(res['status']!=200){
                let xValues = [];
                let yValues = [];

                // GRAPH VALUE INSERTING OF X-axis
                res.bill_info.map((x)=>{
                    // BILL DATE RAW
                    console.log("BILL DATE",x.date);
                    //BILL DATE 
                    var dateString = x.date;
                    var datePortion = dateString.split(" ")[0];
                    console.log("SPLIT DATE",datePortion);
                    //BILL DATE DISPLAY
                    // bill_date.textContent=datePortion;
                    xValues.push(datePortion);

                    yValues.push(x.units);
                    console.log("UNITS",x.units);
                })

                //TOTAL AMOUNT  AND TOTAL UNITS
                let total_amount=document.getElementById('total_amount');
                let total_units=document.getElementById('total_units');
                let temp_preading=0;
                let temp_creading=0;
                
                  
                //TOTAL UNITS
                res.bill_info.map((x)=>{
                temp_preading+=parseInt(x.previous_reading);
                temp_creading+=parseInt(x.current_reading);
                })
                total_units.innerHTML=temp_creading-temp_preading;
                   
                //TOTAL AMOUNT
                // let temp_total;
                // res.bill_info.map((x)=>{
                //   temp_total+=x.total_bill;
                // })
                // total_amount.innerHTML=temp_total;

                function insertDataIntoTable(data) {
                    var table = document.getElementById("table");
                    // Clear existing rows
                    table.getElementsByTagName('tbody')[0].innerHTML = '';
                    //TOTAL BILL
                    let grand_total=0;

                    // Loop through the array data
                    data.forEach(function(item) {
                        // Create a new row
                        var row = table.insertRow();
                        // Insert data into cells of the row
                        var bill_date = row.insertCell(0);
                        var bill_amount = row.insertCell(1);
                        var bill_status = row.insertCell(2);
                        var bill_unit = row.insertCell(3);
                        //BILL DATE 
                        var dateString = item.date;
                        var datePortion = dateString.split(" ")[0];
                        console.log("SPLIT DATE",datePortion);
                        bill_date.textContent=datePortion;
                        //TOTAL AMOUNT
                        bill_amount.textContent =item.total_bill;
                        //BIll STATUS 
                        if(item.status==0){
                            bill_status.textContent = "Pending";
                        }else{
                            bill_status.textContent = "Payed";
                        }
                        // BILL UNITS
                        bill_unit.textContent=item.units;
                        // GRAPH DATA PUSH
                        reading_data.push(item.units);
                        //GRAND TOTAL
                        grand_total=grand_total+parseInt(item.total_bill);
                        
                    });

                    //TOTAL BILL DISPLAY
                    total_amount.innerHTML=grand_total;
                    console.log('Grand Total', grand_total)

                    // GRAPH  
                    new Chart("myChart", {
                        type: "line",
                        data: {
                            labels: xValues,
                            datasets: [{
                            fill: false,
                            lineTension: 0,
                            backgroundColor: "rgba(0,0,255,1.0)",
                            borderColor: "rgba(0,0,255,0.1)",
                            data: yValues
                            }]
                        },
                        options: {
                            legend: {display: false},
                            scales: {
                            yAxes: [{ticks: {min: 10, max:100}}],
                            }
                        }
                        });

                }
            
                insertDataIntoTable(res.bill_info);
            }else{
                console.log("Fetch faill !");
            }



        }).catch(err => {
            console.log('error', err);
        })

        async function getbill(url,data){
            const response=await fetch(url,{
                method:'POST',
                mode:'cors',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(data)
            })
            return new Promise((resolve, reject) => {
                resolve(response.json())
            })
            
        }

//Last Index of windows Onload
}


// GETING THE VALUE FROM LOCAL STORAGE
let user=document.getElementById('user');
const user_details=localStorage.getItem('user_details');
const recv_user_details=JSON.parse(user_details);

//SETTING THE VALUE
user.innerHTML=recv_user_details.name;

