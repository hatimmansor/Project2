//select the first 10 names in our data and insert it to the drop dwon object

d3.csv("static/data/states.csv").then((data1) => {

var options = data1;
state_data=data1;
options.forEach(function(d,i){
    d3.select("#selDataset")
      .append("option")
      .attr("value",d.State)
      .attr("href",'http://127.0.0.1:5000/'+d.State_full)
      .text(d.State_full);
      
  });
});
