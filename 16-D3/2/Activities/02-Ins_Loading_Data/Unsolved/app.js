d3.csv("./hours-of-tv-watched.csv").then(function(tvData){
    console.log(tvData);

    var names = tvData.map(data => data.name);
    console.log("names", names);
    
    tvData.forEach(function(data){
        data.hours = +data.hours;
        console.log("Name:", data.name);
        console.log("Hours:", data.hours);
    });
}).catch(function(error){
    console.log(error);
});