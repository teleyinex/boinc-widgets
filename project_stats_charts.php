<?php
// This file is part of BOINC.
// http://boinc.berkeley.edu
// Copyright (C) 2008 University of California
//
// BOINC is free software; you can redistribute it and/or modify it
// under the terms of the GNU Lesser General Public License
// as published by the Free Software Foundation,
// either version 3 of the License, or (at your option) any later version.
//
// BOINC is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// See the GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with BOINC.  If not, see <http://www.gnu.org/licenses/>.

require_once('../inc/util.inc');

echo '<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/redmond/jquery-ui.css" type="text/css" media="all"/>
<link rel="stylesheet" href="main.css" type="text/css"/>
<link rel="stylesheet" href="white.css" type="text/css"/>
<link rel="stylesheet" href="custom.css" type="text/css"/>
<link rel="stylesheet" href="throbber/jquery.throbber.css"/>
<script src="http://code.jquery.com/jquery-1.6.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.js"></script>
<script type="text/javascript" src="project_stats.js"></script>
<script type="text/javascript" src="throbber/jquery.throbber.js"></script>
';
page_head();

echo '<div id="widget">
        <div>Type of chart:
           	<input type="radio" name="data" id="1" value="users" checked/>Users
           	<input type="radio" name="data" id="2" value="hosts"/>Hosts
        </div>
        <div>Days to show from today: <span id="amount">7</span></div>
	<div id="slider-range"></div>
	<div id="charts">
		<div id="total"></div>
		<div id="new"></div>
		<div id="with_credit"></div>
 	</div>
</div>
';

page_tail();
?>
