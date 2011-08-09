<?php
# Copyright 2011 Daniel Lombraña González
# 
# This file is part of BOINC Widgets.
#
# BOINC Widgets is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# BOINC Widgets is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
# 
# You should have received a copy of the GNU Affero General Public License
# along with BOINC Widgets.  If not, see <http://www.gnu.org/licenses/>.

require_once('../inc/util.inc');

echo '<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/redmond/jquery-ui.css" type="text/css" media="all"/>
<link rel="stylesheet" href="custom.css" type="text/css"/>
<script src="http://code.jquery.com/jquery-1.6.2.min.js" type="text/javascript"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.js"></script>
<script type="text/javascript" src="users_widget.js"></script>
';
page_head();

echo '<div id="widget">
  <p>
     <label for="amount">Days to show from today:</label>
     <input type="text" id="amount"/>
  </p>
	<div id="slider-range"></div>
	<div id="chart_div"></div>
</div>
';

page_tail();
?>
