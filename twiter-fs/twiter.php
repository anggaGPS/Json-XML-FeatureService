
<?php



$param=$_GET['param'];
//echo $param;
$data=file_get_contents('http://analytics.mediakernels.com/api/getgeotwitterusersentiment/project_id/'.$param);
$obj = json_decode($data);
/* echo '<pre>';
print_r ($obj);
	echo '</pre>';
 */
//$json=json_encode($obj);

//echo $json;


$arr = array();


//

foreach($obj->locality->rows as $markers)

	{
	//$latitude=$markers->location->x;
			//$longitude=$markers->location->y;
			$name=$markers->name;
			//$nama=$markers->city;
			@$latitude=$markers->latitude;
			@$longitude=$markers->longitude;
			@$localities=$markers->localities;
			//@$length=$markers->length;
			@$count=$markers->count;
			@$neg=$markers->neg; 
			@$pos=$markers->pos;
			$net=$markers->net;
		//$temps = array("paths" => @$liness);
			
			

			//@$line=$markers->line;
			
		/* 	foreach($markers->line as $lines){
					$x=$lines->x;
			$y=$lines->y;
			
		
			$geo = array(
  
				"x" => $x,
				"y" => $y );
	
	echo '<pre>';
//print_r ($geo);
	echo '</pre>';
	} */
	
	

			
			
			
 
			//@$delay=$markers->delay; 
			//@$street=$markers->street; 
			
			//$pubMillis=$markers->pubMillis; 
			
			//$pubMillis->format('Y-m-d H:i:s');
		//$pubMillis= date('Y-m-d H:i:s', $pubMillis/1000);
			
			$temp = array(
  
	"name" => @$name,
	"latitude" => @$latitude,
	"longitude" => @$longitude,
	"count" => @$count,
	"neg" => @$neg,
	"pos" => @$pos,
	"net" => @$net,
	"localities" => @$localities);
	array_push($arr, $temp);
	
}  


$data = json_encode($arr);
echo $data;
?>

