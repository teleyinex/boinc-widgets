<?php 
require_once("../inc/boinc_db.inc");
require_once("../inc/forum_db.inc");


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

if ($_GET['data'] == 'users')
	$obj =  new BoincUser();

if ($_GET['data'] == 'hosts')
	$obj = new BoincHost();

if ($_GET['data'] == 'posts')
	$obj = new BoincPost();

date_default_timezone_set('UTC');

$today = mktime(0,0,0,date("m"),date("d"),date("y"));

$json = array();

// By default 7 days, unless http://domain/user_stats.php?days=X passed

$i = 7; 


if ($_GET['days']) $i = $_GET['days'];

$from =  strtotime($_GET['from']);
$to = strtotime($_GET['to']);
$i = ($to - $from)/86400;

for ($i; $i >= 0; $i--)
{
    $t0 = $to - ( $i * 24 * 60 * 60);
    $t1 = $t0 + 24*60*60;
    $key = date("y-m-d",$t0);
    if ( $_GET["data"] != "posts" ) {
    	if ( $_GET["type"] == "total" )
    	  {
    	     $value = $obj->count("create_time < $t1");
    	     $json[$_GET["data"]][$key] = $value;
    	  }
    	if ( $_GET["type"] == "with_credit" )
    	  {
    	     $value = $obj->count("create_time < $t1 and total_credit > 0");
    	     $json[$_GET["data"]][$key] = $value;
    	  }
    	if ( $_GET["type"] == "new" ){
    	     $value = $obj->count("create_time >= $t0 and create_time < $t1");
    	     $json[$_GET["data"]][$key] = $value;
    	}
    }
    else {
	if ( $_GET["type"] == "total" ) {
	     $value = $obj->count("timestamp < $t1");
    	     $json[$_GET["data"]][$key] = $value;
	}
    	if ( $_GET["type"] == "new" ){
    	     $value = $obj->count("timestamp >= $t0 and timestamp < $t1");
    	     $json[$_GET["data"]][$key] = $value;
    	}

    }
}

to_json($json);

?>
