/* 
Copyright 2011 Daniel Lombraña González

Users_Widget.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Users_Widget.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with Users_Widget.js.  If not, see <http://www.gnu.org/licenses/>.
*/

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(init);

function drawChart(options) {

    console.log("Drawing charts for " + options.data);
    console.log("From: " + options.from + " to: " + options.to);

    $.throbber.show({overlay: false});
    //if ( options.days == null ) options.days = 7;
    if ( options.type == null) options.type = 'total';
    // options = { 'days': days, total: 1, with_credit: 1 };

    $.getJSON('project_stats.php', options, function(data) {
      var d = new google.visualization.DataTable();
      d.addColumn('string', 'Date');
      if (options.type == 'with_credit')
	      d.addColumn('number', 'With credit');
      if (options.type == 'total')
	      d.addColumn('number', 'Total');
      if (options.type == 'new')
	      d.addColumn('number', 'New');
 
      var x = 0;
      $.each(data[options.data][0], function(key, val) {
	d.addRow();
        d.setValue(x,0,key);
        d.setValue(x,1,val);
        x = x + 1;
      });


      var chart = new google.visualization.LineChart(document.getElementById(options.div));
      chart.draw(d, {width: 600, height: 440, colors: options.color, labelPosition: 'right', legend: {'position': 'none'}, title: options.description});
      $.throbber.hide();
    });

}

function default_charts() {

  var data = $("input[@name=data]:checked").val();
  var from = $("#from").val();
  var to = $("#to").val();

  // New Users or Hosts
  drawChart({ 'from' : from, 
	      'to': to,
 	      'data': data,
	      'type': 'new', 
 	      'div': 'new',  	
	      'description': 
	      'New', 
	      'color': ['red']});

  // Total registered users or hosts
  drawChart({ 'from' : from, 
	      'to': to,
 	      'data': data,
	      'type': 'total', 
	      'div': 'total', 
 	      'description': 
	      'Total', 
	      'color': ['blue']});

  // Users or hosts with credit
  drawChart({ 'from' : from,
	      'to': to,
 	      'data': data,
	      'type': 'with_credit', 
 	      'div': 'with_credit', 
	      'description': 'With credit', 
	      'color': ['green']});

}

function init() {


  $("input[name='data']").bind("click", default_charts);

  $("button").button();

  var dates = $( "#from, #to" ).datepicker({
  	defaultDate: "-1w",
  	changeMonth: true,
	changeYear: true,
	minDate: new Date(2010,10,01),
	maxDate: new Date(),
	dateFormat: 'yy-mm-dd',
  	numberOfMonths: 1,
  	onSelect: function( selectedDate ) {
  		var option = this.id == "from" ? "minDate" : "maxDate",
  			instance = $( this ).data( "datepicker" ),
  			date = $.datepicker.parseDate(
  				instance.settings.dateFormat ||
  				$.datepicker._defaults.dateFormat,
  				selectedDate, instance.settings );
  		dates.not( this ).datepicker( "option", option, date );
  	}
  });

  $("#from").datepicker("setDate","-1w");
  $("#to").datepicker("setDate", new Date());
 
  $("button").click( function() {
	var data = $("input[@name=data]:checked").val();

        drawChart({'from': $("#from").val(),'to': $("#to").val(), 'data': data, 'type': 'new', 'div': 'new', 'description': 'New', 'color': ['red']});
        drawChart({'from': $("#from").val(),'to': $("#to").val(), 'data': data, 'type': 'total', 'div': 'total', 'description': 'Total', 'color': ['blue']});
        if (data != "posts") drawChart({'from': $("#from").val(),'to': $("#to").val(), 'data': data, 'type': 'with_credit', 'div': 'with_credit', 'description': 'With credit', 'color': ['green']});

  });


  default_charts();

}
