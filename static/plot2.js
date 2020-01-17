// Initializes the page with a default plot
function init() {
  
    newPlotly();
  };

function newPlotly() {
     // Function called by DOM changes
     var SelectedOption = d3.select("#selDataset").property("value");
     // Assign the value of the dropdown menu option to a variable
     console.log('SelectedOption ',SelectedOption );
 
 
     // access the json data from the FLASK route
     d3.json("/trafficdata").then(function(data){
           // cut to error function if problem comes up in code
 
           // set the option variable
           if (SelectedOption == "race"){
             var option = "Race";
            console.log("Race selected")
           } else if (SelectedOption =="gender"){
             var option = "Gender";
            console.log("Gender selected")
           } else if (SelectedOption =="DriverSearched"){
             var option = "DriverSearched";
            console.log("Driver searched selected")
           } else if (SelectedOption =="VehicleSearched"){
             var option ="VehicleSearched";
            console.log("Vehicle searched selected")
           }
 
           // create arrays for the plots
 
           // filter data by "Equipment Violation"-----------------------------------------------------------
         let Equipement = data.filter(it => it.Reason.includes('Equipment Violation'));
         // console.log(Equipement);
 
         // count of Equipment Violoation by filter
         var EquipementGroupby = Equipement.reduce((p, c) => {
             var filter = c[option];
             var reason = c.Reason;
             if (!p.hasOwnProperty(filter)) {
               p[filter] = 0;
               p[filter][reason]=0;
             }
             p[filter]++;
             p[filter][reason]++;
             return p;
           }, {});
           
         // filter data by "Investigative Stop"-----------------------------------------------------------
         let Investigate = data.filter(it => it.Reason.includes('Investigative Stop'));
 
         // count race of Investigative Stop 
         var InvestigateGroupby = Investigate.reduce((p, c) => {
             var filter = c[option];
             var reason = c.Reason;
             if (!p.hasOwnProperty(filter)) {
               p[filter] = 0;
               p[filter][reason]=0;
             }
             p[filter]++;
             p[filter][reason]++;
             return p;
           }, {});
 
         // filter data by "Moving Violation"-----------------------------------------------------------
         let Moving = data.filter(it => it.Reason.includes('Moving Violation'));
 
         // count race of "Moving Violation" 
         var MovingGroupby = Moving.reduce((p, c) => {
             var filter = c[option];
             var reason = c.Reason;
             if (!p.hasOwnProperty(filter)) {
               p[filter] = 0;
               p[filter][reason]=0;
             }
             p[filter]++;
             p[filter][reason]++;
             return p;
           }, {});
 
         // filter data by 911 Call-----------------------------------------------------------
         let Call = data.filter(it => it.Reason.includes('911 Call / Citizen Reported'));
 
         // count race of 911 Call 
         var CallGroupby = Call.reduce((p, c) => {
             var filter = c[option];
             var reason = c.Reason;
             if (!p.hasOwnProperty(filter)) {
               p[filter] = 0;
               p[filter][reason]=0;
             }
             p[filter]++;
             p[filter][reason]++;
             return p;
           }, {});
         
 
           // reformat Groupby's into arrays for Bar Chart inputs
           categories = Object.keys(EquipementGroupby);
           EquipmentArray = Object.values(EquipementGroupby);
           console.log(categories);
           console.log('equip', EquipmentArray);
 
           InvestigateArray = Object.values(InvestigateGroupby);
           MovingArray = Object.values(MovingGroupby);
           CallArray = Object.values(CallGroupby);
 
           console.log('Inv', InvestigateArray); 
           console.log('Moving', MovingArray);
           console.log('Call', CallArray);
           
           //set up plotly
           var trace1 ={
             x: categories,
             y: EquipmentArray,
             name: 'Equipment Violation',
             type: 'bar'
             };
         var trace2 = {
             x: categories,
             y: InvestigateArray,
             name: 'Investigative Stop',
             type: 'bar'
             };
 
         var trace3 = {
             x: categories,
             y: MovingArray,
             name: 'Moving Violation',
             type: 'bar'
             };

         var trace4 = {
             x: categories,
             y: CallArray,
             name: '911 Call / Citizen Reported',
             type: 'bar'
             };
         var data =[trace1, trace2, trace3, trace4];
 
         var layout = {
                 height: 600,
                 width: 800,
                 barmode: 'stack'
             };
 
             // Call function to update the chart
         Plotly.newPlot("plot", data, layout);
 
     });
   
  };


d3.select("#selDataset").on("change", updatePlotly);
function updatePlotly() {

    // Function called by DOM changes
    var SelectedOption = d3.select("#selDataset").property("value");
    // Assign the value of the dropdown menu option to a variable
    console.log('SelectedOption ',SelectedOption );


    // access the json data from the FLASK route
    d3.json("/trafficdata").then(function(data){
          // cut to error function if problem comes up in code

          // set the option variable
          if (SelectedOption == "race"){
            var option = "Race";
           console.log("Race selected")
          } else if (SelectedOption =="gender"){
            var option = "Gender";
           console.log("Gender selected")
          } else if (SelectedOption =="DriverSearched"){
            var option = "DriverSearched";
           console.log("Driver searched selected")
          } else if (SelectedOption =="VehicleSearched"){
            var option ="VehicleSearched";
           console.log("Vehicle searched selected")
          }

          // create arrays for the plots

          // filter data by "Equipment Violation"-----------------------------------------------------------
        let Equipement = data.filter(it => it.Reason.includes('Equipment Violation'));
        // console.log(Equipement);

        // count of Equipment Violoation by filter
        var EquipementGroupby = Equipement.reduce((p, c) => {
            var filter = c[option];
            var reason = c.Reason;
            if (!p.hasOwnProperty(filter)) {
              p[filter] = 0;
              p[filter][reason]=0;
            }
            p[filter]++;
            p[filter][reason]++;
            return p;
          }, {});
          
        // filter data by "Investigative Stop"-----------------------------------------------------------
        let Investigate = data.filter(it => it.Reason.includes('Investigative Stop'));

        // count race of Investigative Stop 
        var InvestigateGroupby = Investigate.reduce((p, c) => {
            var filter = c[option];
            var reason = c.Reason;
            if (!p.hasOwnProperty(filter)) {
              p[filter] = 0;
              p[filter][reason]=0;
            }
            p[filter]++;
            p[filter][reason]++;
            return p;
          }, {});

        // filter data by "Moving Violation"-----------------------------------------------------------
        let Moving = data.filter(it => it.Reason.includes('Moving Violation'));

        // count race of "Moving Violation" 
        var MovingGroupby = Moving.reduce((p, c) => {
            var filter = c[option];
            var reason = c.Reason;
            if (!p.hasOwnProperty(filter)) {
              p[filter] = 0;
              p[filter][reason]=0;
            }
            p[filter]++;
            p[filter][reason]++;
            return p;
          }, {});

        // filter data by 911 Call-----------------------------------------------------------
        let Call = data.filter(it => it.Reason.includes('911 Call / Citizen Reported'));

        // count race of 911 Call 
        var CallGroupby = Call.reduce((p, c) => {
            var filter = c[option];
            var reason = c.Reason;
            if (!p.hasOwnProperty(filter)) {
              p[filter] = 0;
              p[filter][reason]=0;
            }
            p[filter]++;
            p[filter][reason]++;
            return p;
          }, {});
        

          // reformat Groupby's into arrays for Bar Chart inputs
          categories = Object.keys(EquipementGroupby);
          EquipmentArray = Object.values(EquipementGroupby);
          console.log(categories);
          console.log('equip', EquipmentArray);

          InvestigateArray = Object.values(InvestigateGroupby);
          MovingArray = Object.values(MovingGroupby);
          CallArray = Object.values(CallGroupby);

          console.log('Inv', InvestigateArray); 
          console.log('Moving', MovingArray);
          console.log('Call', CallArray);

           //set up plotly
           var trace1 ={
            x: categories,
            y: EquipmentArray,
            name: 'Equipment Violation',
            type: 'bar'
            };
        var trace2 = {
            x: categories,
            y: InvestigateArray,
            name: 'Investigative Stop',
            type: 'bar'
            };

        var trace3 = {
            x: categories,
            y: MovingArray,
            name: 'Moving Violation',
            type: 'bar'
            };

        var trace4 = {
            x: categories,
            y: CallArray,
            name: '911 Call / Citizen Reported',
            type: 'bar'
            };
        var data =[trace1, trace2, trace3, trace4];

        var layout = {
                height: 600,
                width: 800,
                barmode: 'stack'
            };

            // Call function to update the chart
        Plotly.newPlot("plot", data,layout);

    });
  };
  
init();
