var bvpline, bvparr;
var bvplinegraph;

var bvplinemap = {
    'bvp': {
        'normal': 'rgba(157, 11, 21, 1)',
        'fade': 'rgba(157, 11, 21, 0.4)',
        'description': 'Heart Rate Variability'
    }
}

function addBvpLine(graph, line, linetype) {
    graph.addTimeSeries(line, {
        lineWidth: 3,
        strokeStyle: bvplinemap[linetype]['normal']
    });
    return line;
}

function removeBvpLine(graph, line) {
    graph.removeTimeSeries(line);
}

function toggleFadeBvp(line, linetype, fade) {
    var bvpSmoothie = bvplinegraph;
    var seriesOptions;
    for (var i = 0; i < bvpSmoothie.seriesSet.length; i++) {
        if (bvpSmoothie.seriesSet[i].timeSeries === line) {
            seriesOptions = bvpSmoothie.seriesSet[i].options;
            break;
        }
    }
    seriesOptions.strokeStyle = bvplinemap[linetype][fade];
}

// function addAllLines() {
//     toggleFade(bvpline, 'bvp', 'normal');
// }
// 
// function removeAllButOneLine(lineToStay) {
//     console.log(lineToStay);
//     if (lineToStay != 'bvp') {
//         toggleFade(bvpline, 'bvp', 'fade')
//         $('#bvp').animate({ opacity: 0.6 });
//     }
// }

$('#bvp-graph-container ul li:not(.active)')
    .css({ opacity: 0.5 })
    // now bind to anon non-active items
    .hover(function() {
        $(this).animate({ opacity: 1 });
        var graphid = $(this).attr('id');
        $('#bvp-graph-description').text(bvplinemap[graphid]['description']).css('color', bvplinemap[graphid]['normal']);
    }, function() {
        $(this).animate({ opacity: 0.5 });
        $('#bvp-graph-description').text('');
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