  /*nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
                  .margin({right: 100})
                  .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                  .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                  .showControls(false)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true);
                  
    chart.xAxis.tickFormat(function(d) { 
          return d3.time.format('%x')(new Date(d)) 
    });

    chart.yAxis.tickFormat(d3.format(',.2f'));
    d3.select('#chart svg').datum(cfdData).call(chart);
    nv.utils.windowResize(chart.update);

    function disableAreaClick() {
      chart.stacked.dispatch.on("areaClick", null);
      chart.stacked.dispatch.on("areaClick.toggle", null);
  
      chart.stacked.scatter.dispatch.on("elementClick", null);
      
      chart.interactiveLayer.dispatch.on("elementMousemove", null);
      chart.stacked.scatter.dispatch.on("elementClick.area", null);
  
      chart.legend.dispatch.on("legendClick", null);
      chart.legend.dispatch.on("legendDblclick", null);
      chart.legend.dispatch.on("stateChange", null);
  
      if (chart.update) {  
        var originalUpdate = chart.update; 
        chart.update = function(){
            originalUpdate();
            disableAreaClick();
        }
      }
    } 
  
    disableAreaClick();
    
    chart.interactiveLayer.dispatch.on("elementClick", function(e) {
       console.log(e);
       chart.clearHighlights();
       
       var that = this;
       var singlePoint
       var pointIndex;
       var pointXLocation;
       
       cfdData.filter(function(series, i) {
            series.seriesIndex = i;
            return !series.disabled;
        }).forEach(function(series,i) {
            pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
            var point = series.values[pointIndex];
            var pointYValue = chart.y()(point, pointIndex);
            
            if (pointYValue != null) {
                chart.highlightPoint(i, pointIndex, true); // Highlight for each series..
            }
            
            if (typeof point === 'undefined') 
              return;
              
            if (typeof singlePoint === 'undefined') 
              singlePoint = point;
              
            if (typeof pointXLocation === 'undefined') 
              pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
        });

        chart.interactiveLayer.renderGuideLine(pointXLocation);
        console.log("Selected date: " + chart.xAxis.tickFormat()(chart.x()(singlePoint, pointIndex)));
    });

    return chart;
  });*/
  
  