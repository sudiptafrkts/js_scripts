var fs = require('fs');
var directory = 'truck_data';
var filename = directory+'.json';
var outfilename = filename.replace('data','data_out');
fs.readFile(directory + '/' + filename, 'utf8', function(err, contents) {
    if (err){
        console.log(err);
    }else{
        console.log("\n"+parseAndConvert(contents) + " Entries\n");
    }
});

function parseAndConvert(data){
    data = JSON.parse(data);
    var count = 0;
    var outData ={};
    data.forEach(function(element){
        count ++;
        let sample_key = element.truck_number;
        outData[sample_key] = element;
    });
    
    // console.log(outData);
    fs.writeFileSync(directory + '/'+outfilename,JSON.stringify(outData),'utf8',(e)=>{
        if(e){
            console.log(e);
        }
    });
    return count;
}