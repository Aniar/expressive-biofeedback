var gsrline, gsrarr;
var gsrlinegraph;

var gsrlinemap = {
    'gsr': {
        'normal': 'rgba(224,195,66,1)',
        'fade': 'rgba(224,195,66,0.4)',
        'description': 'Skin Conductance'
    }
}

function addGsrLine(graph, line, linetype) {
    graph.addTimeSeries(line, {
        lineWidth: 3,
        strokeStyle: gsrlinemap[linetype]['normal']
    });
    return line;
}

function removeGsrLine(graph, line) {
    graph.removeTimeSeries(line);
}

function toggleFadeGsr(line, linetype, fade) {
    var gsrSmoothie = gsrlinegraph;
    var seriesOptions;
    for (var i = 0; i < gsrSmoothie.seriesSet.length; i++) {
        if (gsrSmoothie.seriesSet[i].timeSeries === line) {
            seriesOptions = gsrSmoothie.seriesSet[i].options;
            break;
        }
    }
    seriesOptions.strokeStyle = gsrlinemap[linetype][fade];
}

// function addAllLines() {
//     toggleFade(gsrline, 'gsr', 'normal');
// }
// 
// function removeAllButOneLine(lineToStay) {
//     console.log(lineToStay);
//     if (lineToStay != 'gsr') {
//         toggleFade(gsrline, 'gsr', 'fade')
//         $('#gsr').animate({ opacity: 0.6 });
//     }
// }

$('#eda-graph-container ul li:not(.active)')
    .css({ opacity: 0.5 })
    // now bind to anon non-active items
    .hover(function() {
        $(this).animate({ opacity: 1 });
        var graphid = $(this).attr('id');
        $('#eda-graph-description').text(gsrlinemap[graphid]['description']).css('color', gsrlinemap[graphid]['normal']);
    }, function() {
        $(this).animate({ opacity: 0.5 });
        $('#eda-graph-description').text('');
    });

$('li').hover(function() {
    $(this).toggleClass('active');
    // remove the lines for everything that is not active
    var i = $(this).attr('id');
    removeAllButOneLine(i);
  }, function() {
    // add back all the lines!
    addAllLines();
  });