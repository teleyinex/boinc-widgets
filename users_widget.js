/* 
Copyright 2011 Daniel Lombraña González

This file is part of BOINC Widgets.

BOINC Widgets is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

BOINC Widgets is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with BOINC Widgets.  If not, see <http://www.gnu.org/licenses/>.
*/

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(init);

function drawChart(days) {

    if ( days == null ) days = 7;
    var options = { 'days': days, total: 1, with_credit: 1 };

    $.getJSON('user_stats.php', options, function(data) {
      var d = new google.visualization.DataTable();
      d.addColumn('string', 'Date');
      d.addColumn('number', 'New');
      d.addColumn('number', 'Total');
      d.addColumn('number', 'With Credit');
      d.addRows(days + 1);

      var x = 0;
      $.each(data["reg_users"][0], function(key, val) {
        d.setValue(x,0,key);
        d.setValue(x,1,val);
        x = x + 1;
      });

      var x = 0;
      $.each(data["total"][0], function(key, val) {
        d.setValue(x,2,val);
        x = x + 1;
      });

      var x = 0;
      $.each(data["with_credit"][0], function(key, val) {
        d.setValue(x,3,val);
        x = x + 1;
      });

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(d, {width: 600, height: 440, title: 'Number of registered users of Test4Theory'});
    });

}

function init() {

  drawChart();

  $("#slider-range").slider({
  	range: "min",
     value: 7,
     min:7,
     max:60,
     slide: function (event, ui) {
        $("#amount").val( ui.value );
     
     },
     stop: function (event, ui) {
        drawChart( ui.value );
     }
  });

  $( "#amount" ).val( $( "#slider-range" ).slider( "value" )); 

}
