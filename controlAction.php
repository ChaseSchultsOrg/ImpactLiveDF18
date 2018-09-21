<?php

function connectMySQL(){
    //$link = mysqli_connect("localhost", "DF18", "SFDF2018!", "IL");
    $link = mysqli_connect("localhost", "se_webuser", "breath2018!", "IL");
  return $link;
}
$link=connectMySQL();

/* Admin Toggle Section*/
if(isset($_GET['StartEmail'])){
  if($_GET['StartEmail']=="false"){
    $SQL="Update status SET pushEmail2=0";
    mysqli_query($link,$SQL);
    echo json_encode("false");
  }
  else{
    $SQL="Update status SET pushEmail2=1";
    mysqli_query($link,$SQL);
    echo json_encode("true");
  }
}
if(isset($_GET['SMS'])){
  if($_GET['SMS']=="false"){
    $SQL="Update status SET pushSMS=0";
    mysqli_query($link,$SQL);
    echo json_encode("false");
  }
  else{
    $SQL="Update status SET pushSMS=1";
    mysqli_query($link,$SQL);
    echo json_encode("true");
  }
}
if(isset($_GET['AD'])){
  if($_GET['AD']=="false"){
    $SQL="Update status SET pushAd=0";
    mysqli_query($link,$SQL);
    echo json_encode($SQL);
  }
  else{
    $SQL="Update status SET pushAd=1";
    mysqli_query($link,$SQL);
    echo json_encode("true");
  }
}
if(isset($_GET['End'])){
  if($_GET['End']=="false"){
    $SQL="Update status SET pushEnd=0";
    mysqli_query($link,$SQL);
    echo json_encode("false");
  }
  else{
    $SQL="Update status SET pushEnd=1";
    mysqli_query($link,$SQL);
    echo json_encode("true");
  }
}
/*End Admin Toggle*/



?>
