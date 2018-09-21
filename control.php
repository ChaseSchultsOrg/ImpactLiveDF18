
<?php
date_default_timezone_set('America/New_York');
function connectMySQL(){
    //$link = mysqli_connect("localhost", "DF18", "SFDF2018!", "IL");
    $link = mysqli_connect("localhost", "se_webuser", "breath2018!", "IL");
  return $link;
}
$link=connectMySQL();
if ($result = mysqli_fetch_assoc(mysqli_query($link, "Select * from status"))) {
  $pushEmail2=$result['pushEmail2'];
  $pushSMS=$result['pushSMS'];
  $pushAd=$result['pushAd'];
  $pushEnd=$result['pushEnd'];
}
$checkEmail2='';
$checkSMS='';
$checkAd='';
$checkEnd='';

$emailDataOffStatus='disabled';
$emailDataOnStatus='enabled';

$smsDataOffStatus='disabled';
$smsDataOnStatus='enabled';

$adDataOffStatus='disabled';
$adDataOnStatus='enabled';

$endDataOffStatus='disabled';
$endDataOnStatus='enabled';

if($pushEmail2){
  $checkEmail2='checked';
  $emailDataOffStatus='disabled';
  $emailDataOnStatus='enabled';
}
if($pushSMS){
  $checkSMS='checked';
  $smsDataOffStatus='disabled';
  $smsDataOnStatus='enabled';
}
if($pushAd){
  $checkAd='checked';
  $adDataOffStatus='disabled';
  $adDataOnStatus='enabled';
}
if($pushEnd){
  $checkEnd='checked';
  $endDataOffStatus='disabled';
  $endDataOnStatus='enabled';
}
?>
<html>
    <head>
        <title>Welcome To Impact Live</title>
        <link rel="stylesheet" href="css/style.css">
        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script type="text/javascript"     src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
        <script type="text/javascript">window.jQuery || document.write('<script src="classes/commons/jquery/jquery-1.7.1.min.js"><\/script>')</script>
        <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
        <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
        <script src="http://malsup.github.com/jquery.form.js"></script>
    </head>
 <body class="register">
    <div>
    <img src="images/ticket.png" alt="IL Admin" width="300" height="159"/>
    <h1>Control Center</h1>
    <form id="myForm" name="myForm" action="updateDB.php" method="post">
        <label>Push Email 2</label><br />
        <input type="checkbox" name="toggleStart" id="toggleStart" data-toggle="toggle" data-off="<?php echo $emailDataOffStatus;?>" data-on="<?php echo $emailDataOnStatus;?>" <?php echo $checkEmail2;?>>
        <br />
        <label>Push SMS</label><br />
        <input type="checkbox" name="toggleSMS" id="toggleSMS" data-toggle="toggle"  data-off="<?php echo $smsDataOffStatus;?>" data-on="<?php echo $smsDataOnStatus;?>" <?php echo $checkSMS;?>>
        <br />
        <label>Push Ad</label><br />
        <input type="checkbox" name="toggleAd" id="toggleAd" data-toggle="toggle" data-off="<?php echo $adDataOffStatus;?>" data-on="<?php echo $adDataOnStatus;?>" <?php echo $checkAd;?>>
        <br />
        <label>Push End</label><br />
        <input type="checkbox" name="toggleEnd" id="toggleEnd" data-toggle="toggle" data-off="<?php echo $endDataOffStatus;?>" data-on="<?php echo $endDataOnStatus;?>" <?php echo $checkEnd;?>>

    </form>
  </div>
    <script>
      $('#toggleStart').change(function(){
        var start= $(this).prop('checked');
        $.ajax({
          type:'GET',
          cache:false,
          dataType:'JSON',
          url:'controlAction.php',
          data:'StartEmail='+start,
          success:function(data)
          {
            var data=eval(data);
          },
          error:function(request,status,error){
             console.log(request.responseText);
          }

        });
      });

  $('#toggleSMS').change(function(){
        var SMS= $(this).prop('checked');
        $.ajax({
          type:'GET',
          cache:false,
          dataType:'JSON',
          url:'controlAction.php',
          data:'SMS='+SMS,
          success:function(data)
          {
            var data=eval(data);
          },
          error:function(request,status,error){
            console.log(request.responseText);
          }

        });
      });


        $('#toggleAd').change(function(){
              var AD= $(this).prop('checked');
              $.ajax({
                type:'GET',
                cache:false,
                dataType:'JSON',
                url:'controlAction.php',
                data:'AD='+AD,
                success:function(data)
                {
                  var data=eval(data);
                },
                error:function(request,status,error){
                  console.log(request.responseText);
                }

              });
            });
            $('#toggleEnd').change(function(){
                    var End= $(this).prop('checked');
                    $.ajax({
                      type:'GET',
                      cache:false,
                      dataType:'JSON',
                      url:'controlAction.php',
                      data:'End='+End,
                      success:function(data)
                      {
                        var data=eval(data);
                      },
                      error:function(request,status,error){
                        console.log(request.responseText);
                      }

                    });
                  });

    </script>
    </div>
  </body>
  </html>
