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

require_once("../inc/boinc_db.inc");

function to_json($data)
{
 $output = "{ ";
   $i = 1;
   foreach ($data as $key => $value)
	{
           if ( is_array($value) )
	      { 
	        $output = $output . '"' . $key . '": [ {';
		$j = 1;
	        foreach ( $value as $k => $v ) 
		{
	          if (count($value) != $j) $output = $output . '"'. $k . '":' . $v . ', ';
                  else $output = $output . '"' . $k . '":' . $v . '}';
		  $j++;
		}

                if ( count($data) != $i ) $output = $output . '], ';
		else $output = $output . ']';
		$i++;

	      }
	}
 $output = $output . "}";

 echo $output;
}

$user =  new BoincUser();

date_default_timezone_set('UTC');

$today = mktime(0,0,0,date("m"),date("d"),date("y"));

$json = array();

$json["reg_users"] = array();

if ( $_GET["total"] ) $json["total"] = array();
if ( $_GET["with_credit"] ) $json["with_credit"] = array();

// By default 7 days, unless http://domain/user_stats.php?days=X passed

$i = 7; 

if ($_GET['days']) $i = $_GET['days'];


for ($i; $i >= 0; $i--)
{
    $t0 = $today - ( $i * 24 * 60 * 60);
    $t1 = $t0 + 24*60*60;
    $key = date("y-m-d",$t0);
    if ( $_GET["total"] )
      {
         $value = $user->count("create_time < $t1");
         $json["total"][$key] = $value;
      }
    if ( $_GET["with_credit"] )
      {
         $value = $user->count("create_time < $t1 and total_credit > 0");
         $json["with_credit"][$key] = $value;
      }
    $value = $user->count("create_time >= $t0 and create_time < $t1");
    $json["reg_users"][$key] = $value;
}

to_json($json);

?>
