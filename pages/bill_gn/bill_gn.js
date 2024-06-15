window.onload = (event) => {
    // GET INFO DATABASE
    let storedata=localStorage.getItem('user_details');
    let recived_data=JSON.parse(storedata);
    // console.log(recived_data);
    // console.log(recived_data.consumer_id);
    // {consumer_id:recived_data.consumer_id}
    getbill('http://localhost:80/mecl/generate_history')
       .then((res)=>{
           if(res['status']!=200){
            //    let xValues = [];
            //    let yValues = [];


                let count_paid=0;
                let count_pending=0;

               // GRAPH VALUE INSERTING OF X-axis
                res.bill_info.map((x)=>{
                    // console.log("DATE",x.date);
                    // xValues.push(x.bill_date);
                    // yValues.push(x.units);
                    // console.log("UNITS",x.units);
                })


                    function insertDataIntoTable(data) {
                        var table = document.getElementById("table");
                        // Clear existing rows
                        table.getElementsByTagName('tbody')[0].innerHTML = '';
                        // Loop through the array data
                        data.forEach(function(item) {
                       // Create a new row
                       var row = table.insertRow();
                       // Insert data into cells of the row
                       var consumer_id = row.insertCell(0);
                       var net_amount = row.insertCell(1);
                       var date = row.insertCell(2);
                       var due_date = row.insertCell(3);
                       var payment_status=row.insertCell(4);
                       var units=row.insertCell(5);
               
                       // Set the data for each cell
                      consumer_id.textContent=item.consumer_id;
                      net_amount.textContent=item.total_bill;
                      date.textContent=item.date;
                      // Payment status
                      if(item.status==1){
                        payment_status.textContent="Done";
                        count_paid+=1;
                      }else{
                        payment_status.textContent="Pending";
                        count_pending+=1;
                      }
                      //Due date
                      const originalDate = item.date;
                      // Split the date string by space to get only the date part
                      const dateParts = originalDate.split(' ');
                      // Extract the date part (the first part)
                      const dateOnly = dateParts[0];
                      console.log(dateOnly); // Output: 2024-03-27

                    // Actual date
                    var actualDate = new Date(dateOnly);
                    // Add 15 days to the actual date
                    var dueDate = new Date(actualDate);
                    dueDate.setDate(actualDate.getDate() + 15);
                    console.log("Due date:", dueDate.toISOString().split('T')[0]);
                    //seting the value of due date in table
                    due_date.textContent=dueDate.toISOString().split('T')[0];

                    units.textContent=item.units;
                   });
         
                   //consoling pending and paid 
                   console.log("count_paid",count_paid);
                   console.log("count_pending",count_pending);

                   // GRAPH  
                   var xValues = ["Paid", "Pending",];
                   var yValues = [count_paid,count_pending];
                   var barColors = [
                     "#b91d47",
                     "#00aba9",
                   ];

                   new Chart("myChart", {
                     type: "pie",
                     data: {
                       labels: xValues,
                       datasets: [{
                         backgroundColor: barColors,
                         data: yValues
                       }]
                     },
                     options: {
                       title: {
                         display: false,
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
