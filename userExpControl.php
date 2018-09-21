<?php

session_write_close();
ignore_user_abort(false);
set_time_limit(0);
function connectMySQL(){
    $link = mysqli_connect("localhost", "DF18", "SFDF2018!", "IL");
  //  $link = mysqli_connect("localhost", "se_webuser", "breath2018!", "IL");
  return $link;
}
$link=connectMySQL();
if ($result = mysqli_fetch_assoc(mysqli_query($link, "Select * from status"))) {
      $pushEmail2=$result['pushEmail2'];
      $pushSMS=$result['pushSMS'];
      $pushAd=$result['pushAd'];
      $pushEnd=$result['pushEnd'];
      if($pushEnd=="1"){
        echo "end";
        exit;
      }
      elseif($pushAd=="1"){
        echo "ad";
        exit;
      }
      elseif($pushSMS=="1"){
        echo "sms";
        exit;
      }
      elseif($pushEmail2=="1"){
        echo "email";
        exit;
      }
      else{
        echo json_encode("stay");
        exit;
      }
	}

?>
