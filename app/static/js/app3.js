
console.log("hello worls");
var colorscale= [["0","rgb(31,31,255)"],
  ["0.1","rgb(31,31,255)"],
  ["0.2","rgb(31,31,255)"], 
  ["0.3","rgb(31,31,255)"], 
  ["0.4","rgb(31,31,255)"], 
  ["0.5","rgb(31,31,255)"], 
  ["0.6","rgb(31,31,255)"], 
  ["0.7","rgb(31,31,255)"], 
  ["0.8","rgb(31,31,255)"], 
  ["0.9","rgb(31,31,255)"], 
  ["1","rgb(31,31,255)"]];
  
d3.csv("static/data/Median Price.csv").then((data1) => {
  function draw_bar(data,col1,col2) {
    
    var X1 = [],
    Y1 = [];
    var name1=data.columns[0];
    var name2=data.columns[col1];

    data.map(function(d) {
    X1.push(d[name1]);
    Y1.push(d[name2]*1000);
    
    });


    var trace1 = {

       x: X1,
       y: Y1,
   
      //  text:data.samples[otu_index].otu_labels.slice(0,10),
        mode: "lines+markers",
        // text:[''],
 
       name: "Mean House Price",
       line: {shape: 'spline'},
       type: 'scatter',
       showscale: false,
       yaxis:'y1'
    
      
      // boxpoints: "all"
     };
   
     var Y2 = [];
     
     var name2=data.columns[col2];
     data.map(function(d) {
     Y2.push(d[name2]*1000);
     
     });
 
  
     var trace2 = {

        x: X1,
        y: Y2,
    
       //  text:data.samples[otu_index].otu_labels.slice(0,10),
         mode: "lines+markers",
         // text:[''],
  
        name: "Number of Houses",
        line: {shape: 'spline'},
        type: 'scatter',
        showscale: false,
        yaxis:'y2',
        color:'red'
     
       
       // boxpoints: "all"
      };
     // Create the data array for the plot
     var data = [trace1,trace2];
   
     // Define the plot layout
     var layout = {
       title: "House Value VS number of Houses",
       xaxis: { title: "Date" },
       yaxis: { title: "Mean house Price",        
        titlefont: {color: 'rgb(0, 0, 189)'},
        tickfont: {color: 'rgb(0, 0, 189)'}, },
       yaxis2: {
        title: 'Number of Houses',
        titlefont: {color: 'red'},
        tickfont: {color: 'red'},
        overlaying: 'y',
        side: 'right'}
    
     };
   


     // Plot the chart to a div tag with id "plot"
     Plotly.newPlot("bar",data,layout);
    }


    function demographics(data,col){
      //select the proper data to display
      name2=data.columns[col]
      var display_data={[key:'tttttt',value:data.columns[col]]};
      console.log('sssssssssssssssssssssssssssssssss',display_data);
      d3.selectAll(".temp").remove();
      Object.entries(display_data).forEach(([key, value])=>{
        var display_text=` ${key}: ${value}`;
        d3.select("#sample-metadata")
          
          .append("p")
          .classed("temp",true)
          .attr("font-weight",150)
          .text(display_text);
      });
  
  
  
    }
  





  // This function is called when a dropdown menu item is selected
  function  optionChanged() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var selected_index = dropdownMenu.property("value");
   
    draw_bar(data1,31+parseInt(selected_index),40+parseInt(selected_index));
    transaction(parseInt(selected_index));
    demographics(data1,parseInt(selected_index));
    // Challenge(data1,selected_index);
    // draw_bubble(data1,selected_index);
  }

  optionChanged();



// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);


//select the first 10 names in our data and insert it to the drop dwon object
// var options = data1.names.slice(0,10);

// options.forEach(function(d,i){
//     d3.select("#selDataset")
//       .append("option")
//       .attr("value",i)
//       .text(d);
//   })

  console.log(JSON.stringify(data1));
  Challenge(data1,0);

});
