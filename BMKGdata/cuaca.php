<?php

$city=$_GET['city'];
@$parameter=$_GET['param'];

$list_cuaca = new SimpleXMLElement('http://webdata.bmkg.go.id/datamkg/MEWS/DigitalForecast/DigitalForecast-'.$city.'.xml', null, true);

 /*  $tanggal = $list_cuaca->forecast->issue->timestamp;
  
   $tanggal;
  echo "<pre>";
print_r ($list_cuaca);
echo "</pre>";   */

$arr = array();
  foreach($list_cuaca->forecast->area as $row) {
	  
	  $id= $row['id'];
	  
	  $latitude= $row['latitude'];
	  $longitude= $row['longitude'];
	  @$region= $row['region'];
	  @$level= $row['level'];
	  $description= $row['description'];
	  $domain= $row['domain'];
	  
	
	switch ($parameter) {
		case "hu":
	  $parameter1= $row->parameter[0];
	
	  $temps1 = array($parameter1);
	   break;
	  case "humax":
	  $parameter1= $row->parameter[1];
	   $temps1 = array(@$parameter1);
	    break;
	   case "tmax":
	  $parameter1= $row->parameter[2];
	  $temps1 = array(@$parameter1);
	   break;
	  case "humin":
      $parameter1= $row->parameter[3];
	  $temps1 = array(@$parameter1);
	   break;
	  case "tmin":
	  $parameter1= $row->parameter[4];
	   $temps1 = array(@$parameter1);
	    break;
	   case "t":
	  $parameter1= $row->parameter[5];
	  	  $temps1 = array(@$parameter1);
		   break;
		  case "weather":
	  $parameter1= $row->parameter[6];
	  $temps1 = array(@$parameter1);
	   break;
	  case "wd":
	  $parameter1= $row->parameter[7];
	  $temps1 = array(@$parameter1);
	   break;
	  case "ws":
	  $parameter1= $row->parameter[8];
	  $temps1 = array(@$parameter1);
	   break;
	   default:
	  $parameter1= $row->parameter[0];
	  $temps1 = array(@$parameter1);
	  $parameter2= $row->parameter[1];
	  $temps2 = array(@$parameter2);
	  $parameter3= $row->parameter[2];
	  $temps3 = array(@$parameter3);
      $parameter4= $row->parameter[3];
	  $temps4 = array(@$parameter4);
	  $parameter5= $row->parameter[4];
	  $temps5 = array(@$parameter5);
	  $parameter6= $row->parameter[5];
	  $temps6 = array(@$parameter6);
	  $parameter7= $row->parameter[6];
	  $temps7 = array(@$parameter7);
	  $parameter8= $row->parameter[7];
	  $temps8 = array(@$parameter8);
	  $parameter9= $row->parameter[8];
	  $temps9 = array(@$parameter9);
	}
	  
	  
	 

	  
	  
	
	  
	  $temp = array(
  
	"id" => @$id,
	"latitude" => @$latitude,
	"longitude" => @$longitude,
	"region" => @$region,
	"description" => @$description,
	"level" => @$level,
	"parameter" =>$temps1
);
	array_push($arr, $temp);
	
  }






  //$q = explode("0",$arr);
//$tes=array_filter($q);
//print_r ($tes);

function is_not_null ($var) { return !is_null($var); }
$filtered = array_filter($arr, 'is_not_null');

//print_r($filtered);
  $data = json_encode($filtered);
$null= str_replace('null','{"@attributes":{"id":"weather","description":"Weather","type":"hourly"},"timerange":[{"@attributes":{"type":"hourly","h":"0","datetime":"201705120000"},"value":"102"},{"@attributes":{"type":"hourly","h":"6","datetime":"201705120600"},"value":"95"},{"@attributes":{"type":"hourly","h":"12","datetime":"201705121200"},"value":"80"},{"@attributes":{"type":"hourly","h":"18","datetime":"201705121800"},"value":"103"},{"@attributes":{"type":"hourly","h":"24","datetime":"201705130000"},"value":"80"},{"@attributes":{"type":"hourly","h":"30","datetime":"201705130600"},"value":"95"},{"@attributes":{"type":"hourly","h":"36","datetime":"201705131200"},"value":"5"},{"@attributes":{"type":"hourly","h":"42","datetime":"201705131800"},"value":"5"},{"@attributes":{"type":"hourly","h":"48","datetime":"201705140000"},"value":"102"},{"@attributes":{"type":"hourly","h":"54","datetime":"201705140600"},"value":"80"},{"@attributes":{"type":"hourly","h":"60","datetime":"201705141200"},"value":"103"},{"@attributes":{"type":"hourly","h":"66","datetime":"201705141800"},"value":"80"}]}',$data);
echo str_replace('@attributes','data',$null)

  /*  echo "<pre>";
print_r ($arr);
echo "</pre>";  */
?>

