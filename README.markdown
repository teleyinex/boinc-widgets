This is a small widget for any BOINC project that shows a line chart, using Google Charts, with the total number of
registered users or hosts, new registered users or hosts and users or hosts with credit per day.

The widget has a slider that allows you to see the line chart over the last year and a radio button to select which type of charts you want to show: Users or Hosts.

You can try it in the [LHC@Home 2.0 CERN project](http://lhcathome2.cern.ch/test4theory/project_stats_charts.php).

## Installation

Download all the files, copy them to the **html/user** folder and include a link to the **project_stats_charts.php** in the
**stats.php** file if you want to make it public. Otherwise, visit: http://domain/project/project_stats_charts.php

**NOTE** if you want to see the host charts, you will need to modify one BOINC file: **html/inc/boinc_db.inc** and add the following method to the BoincHost class:

```php
static function count($clause) {
    $db = BoincDb::get();
    return $db->count('host', $clause);
}
```


