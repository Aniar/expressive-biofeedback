var i = 0;
var gsrarr = [];
var timer;
var timerBvp;
var csv = require('fast-csv');
      		
function createGraphEmpatica() {       
    startGraphingGsr();
    startGraphingBvp(); 
}

function startGraphingGsr(){

	var gsrSmoothie = new SmoothieChart({
        maxValue: 10,
        minValue: 0,
        grid: {
            fillStyle:'rgba(0,0,0,0)',
            strokeStyle:'rgba(170,170,170,0.85)',
            verticalSections: 10
        }
    });
    gsrSmoothie.streamTo(document.getElementById('eda-graph'), 1000);

    $('.eda-graph-labels').css('display', 'inline-block');

    
    var gsrline = new TimeSeries();
    addGsrLine(gsrSmoothie, gsrline, 'gsr');
    
    //graph data every second
    timer = setInterval(function() {
		
      	$.get("text/gsrData.txt", function(data) {
      		gsrarr = data.split(",");
      		$('#stage').html('<p> GSR Data: ' + gsrarr[i] + '</p>');
      	});
		gsrline.append(new Date().getTime(), gsrarr[i]);
		i++;
        	
      }, 1000);

    return gsrSmoothie;
}

function startGraphingBvp(){

	var bvpSmoothie = new SmoothieChart({
        maxValue: 100,
        minValue: 0,
        grid: {
            fillStyle:'rgba(0,0,0,0)',
            strokeStyle:'rgba(170,170,170,0.85)',
            verticalSections: 10
        }
    });
    bvpSmoothie.streamTo(document.getElementById('bvp-graph'), 1000);

    $('.bvp-graph-labels').css('display', 'inline-block');

    
    var bvpline = new TimeSeries();
    addBvpLine(bvpSmoothie, bvpline, 'bvp');
    
    //graph data every second
    timerBvp = setInterval(function() {
		
      	$.get("text/bvpData.txt", function(data) {
      		bvparr = data.split(",");
      		$('#stage').html('<p> BVP Data: ' + bvparr[i] + '</p>');
      	});
		bvpline.append(new Date().getTime(), bvparr[i]);
		i++;
        	
      }, 1000);

    return bvpSmoothie;
}


//stop polling data and save data to csv file
function disconnectFromEmpatica(){

	if (timer && timerBvp) {
        clearInterval(timer);
        clearInterval(timerBvp);
        timer = 0;
        timerBvp = 0;
    }
    i = 0;
	// downloadData(gsrarr, 'gsr');
// 	downloadData(bvparr, 'bvp');
}

function downloadData(data, filename) {
    csv
       .writeToPath(filename + ".csv", data, {headers: true})
       .on("finish", function(){
           console.log("done!");
       });
}
