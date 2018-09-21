/* Valerie M
Create Date: 9-11-18
Last Modified: 9-18-18
Disclaimer: Coded Fast & Furiously
*/
$('document').ready(function() {

	var data;
	function success(data){
		if(data=="ad" && section!="ad"){
			$(".container").empty();
			showAd(questions[1].value);
		}
		if(data=="sms" && section !="sms"){
			$(".container").empty();
			showSMS();
		}
		if(data=="email" && section !="email"){
			$(".container").empty();
			show75Email();
		}
		if(data=="end" && section !="end"){
			$(".container").empty();
			showEnd();
		}
		setTimeout(
				waitForUpdate, /* Request next message */
				3000
		);
	}
	function waitForUpdate(){
	        $.ajax({
	            type: "GET",
	            url: "/il/userExpControl.php",
	            async: true,
	            cache: false,
	            timeout:50000, /* Timeout in ms */
	            success: function(data){
								console.log(data);
								success(data);
							},
	            error: function(XMLHttpRequest, textStatus, errorThrown){
	                console.log("error", textStatus + " (" + errorThrown + ")");
	                setTimeout(
	                    waitForUpdate, /* Try again after.. */
	                    15000); /* milliseconds (15seconds) */
	            }
	        });
	    }
  waitForUpdate();

  /*preload images*/
  $.preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
      $("<img />").attr("src", "/il/images/"+arguments[i]);
    }
  }
$.preloadImages("acs.png","blueHaveMail.png","blueJourney.png","check.png","fb.png","fbSelect.png","firstNameBG.png","journeyStarting.png","ticket.png","twitter.png","twitterSelect.png","email.png","tileBBQ.png","tileGala.png","tileRelay.png","finish.png","sforg.png");

	/* globals*/
	var section = "name";
	var selected = false;

	/* recenters */
	jQuery.fn.center = function() {
		this.css("position", "absolute");
		this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
		this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		return this;
	}
  $("#register").center();

	var metaViewport = document.querySelector('meta[name=viewport]');
	metaViewport.setAttribute('width', '380');
	window.addEventListener("orientationchange", function() {
		if (window.orientation != 0) {
			alert('This experience is best viewed on a moble device in portrait mode.')
		}
	}, false);
	var pc = false;
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		alert('This experience is best viewed on a moble device in portrait mode.')
		pc = true;
	}

	/* Intro section */
	function showIntro() {

		$('#ticket').hide().delay(300).css({
			visibility: "visible"
		}).fadeIn(3000);
		$('.fadeInIntro').hide().delay(1000).css({
			visibility: "visible"
		}).fadeIn(3000);
		$('#ticket').delay(2000).queue(function(nxt) {
      $(".sliding-background").animate({
         'background-position-x': '-600px'
      }, 500, 'linear');

			$("#ticket").stop().animate({
				marginLeft: '-340px'
			});
			$("#acsLogo").parent().css({
				position: 'relative'
			});
			acsPosition = $("#acsLogo").position();
			$("#acsLogo").css({
				top: acsPosition.top,
				left: acsPosition.left,
				position: 'absolute'
			});
			$("h4.fadeInIntro").hide('fast');
			tPosition = $("#ticket").position();
			tWidth = $("#ticket").width() - 160;
			$("#acsLogo").animate({
				'margin-left': (tWidth) + 'px',
				'top': tPosition.top
			});

			nxt();
		});
		$('#register').delay(6000).queue(function(nxt3) {
			$('#register').fadeIn({
				queue: false,
				duration: 'slow'
			});
			nxt3();
		});
	}
	$("body").on("click", "#fb", function() {
    selected = "Facebook";
    validate();
	});
	$("body").on("click", "#twitter", function() {
    	selected = "Twitter";
      validate();
	});
  $("body").on("click",'#emailJourney',function() {
		  showInviteEmail();
	});
  $("body").on("click",'#newMail',function() {
		  showInviteEmail();
	});
  $("body").on("click",'#adminPush',function() {
		  show75Email();
	});
  $("body").on("click",'#adminPushSMS',function() {
      showSMS();
  });
  $("body").on("click",'#adminPushAd',function() {
      showAd(questions[1].value);
  });
	$("body").on("click",'.nextEmail',function() {
		$("#main").empty();
		$("#inviteEmail").hide();
		 startJourney(2);
	});
  function showAd(platform){
		section='ad';
    $('#showSMS').hide();
    $('#adminPushAd').hide();
    $('#smsImage').hide();
    if(platform=="Facebook"){
      socialAdSrc='/il/images/fbAd.png';
      sWidth=350;
      sHeight=514;
    }
    else{
      socialAdSrc='/il/images/twitterAd.png';
      sWidth=350;
      sHeight=404;
    }
    $("<img src=\""+socialAdSrc+"\" alt=\"Social!\" width=\""+sWidth+"\" height=\""+sHeight+"\" style=\"margin-top:45px;\">").appendTo(".container").hide().fadeIn(1500);
  }
  function showSMS(){
		section="sms";
    $('#show75Email').hide();
    $('#adminPushSMS').hide();
      $("<img src=\"/il/images/sms.png\" alt=\"SMS!\" width=\"300\" height=\"333\" style=\"margin-top:45px;\" id=\"smsImage\">").appendTo(".container").hide().fadeIn(1500);
  }
  function show75Email(){
		section="email";
    $('#inviteEmail').hide();
    $('#adminPush').hide();

		if(typeof questions[0].value =='undefined'){
				questions[0].value='Rebecca';
		}
		if(typeof questions[2].value =='undefined'){
				questions[2].value='Relay For Life';
		}
		$('.fNameStored').text(questions[0].value + "!");
		$('.eventName').text(questions[2].value + "!");
		questions[2].value="Relay for Life";
		questions[0].value="Rebecca";
    $("<div id=\"secondEmail\">"+ $("#email75").html()).prependTo(".container").hide().fadeIn(600);
  }
	function showEnd(){
		section="end";
    $('#main').empty();
		$('.container').delay(400).queue(function(nxt3) {
    $("<div id=\"showFinish\"><img src=\"/il/images/finish.png\">").appendTo(".container").hide().slideDown('slow');
		$("<br><h1 id=\"thanks\">Thank You!</h1>").appendTo(".container").hide().fadeIn(100);
		$("<br><img src=\"/il/images/sforg.png\" width=\"350\" height=\"52\">").appendTo(".container").hide().fadeIn(100);
		nxt3();
	})
  }
  function showInviteEmail(){
    $("#emailJourney").hide();
    $("#newMail").hide();
    $('#progressBar').hide();
    $('.fNameStored').text(questions[0].value + "!");
		$('.eventName').text(questions[2].value + "!");
		$('#Gala').hide();
		$('#RelayForLife').hide();
		$('#RaiseYourWay').hide();
    if(questions[2].value=="BBQ Cook Off"){
      bannerSrc="/il/images/bbqBanner.png";
			$('#RaiseYourWay').fadeIn('fast');
    }
    else if (questions[2].value=="Gala 2018"){
      bannerSrc="/il/images/galaBanner.png";
			$('#Gala').fadeIn('fast');

    }
    else{
      bannerSrc="/il/images/relayBanner.png";
			$('#RelayForLife').fadeIn('fast');
    }
    $("#emailBanner").attr("src",bannerSrc);
    $("<div id=\"inviteEmail\">"+ $("#invitationEmail").html()).prependTo(".container").hide().fadeIn(600);
  }
  function startJourney(level){

    $(".eventSelect").hide();
		$("#register").fadeOut('fast');

    $(".sliding-background").fadeOut('fast');
		$("#journeyStart").remove();
		if(level==2){
    	$("<div id=\"journeyStart\"><img src=\"/il/images/blueJourney.png\" width=\"154\" height=\"154\" alt=\"start your journey!\" id=\"journey\"><img src=\"/il/images/email.png\" width=\"152\" height=\"189\" alt=\"you have emails!\" style=\"display:none\" id=\"emailJourney2\"></div>").prependTo(".center").hide().fadeIn(500);
		}
		else{
			$("<div id=\"journeyStart\"><img src=\"/il/images/blueJourney.png\" width=\"154\" height=\"154\" alt=\"start your journey!\" id=\"journey\"><img src=\"/il/images/email.png\" width=\"152\" height=\"189\" alt=\"you have emails!\" style=\"display:none\" id=\"emailJourney\"></div>").prependTo(".center").hide().fadeIn(500);
		}
    $("<div id=\"progressBar\" class=\"skillbar clearfix\" data-percent=\"100%\"><div class=\"skillbar-bar\" style=\"background: #ED7D31;\"></div></div>").prependTo(".center").hide().fadeIn(2000);
    p=$("#progressBar").css("margin-top");
    $("#journeyStart").css("top",p);
    $('#progressBar').each(function(){
  		$(this).find('.skillbar-bar').animate({
  			width:$(this).attr('data-percent')
  		},2000,function(){
      }).promise()
            .done(function(){
         $( "#journey" ).slideUp( 100, function() {
               $("#journey").css("display","none");
                $("#emailJourney").slideDown('slow');
								if(level==2){

									$("#emailJourney").off();
									$("#newMail").off();
									$("#newMail").remove();
									$("#emailJourney2").slideDown('slow');
									$('<div id="newMail2"><br><h6 style=\"font-size:smaller;font-weight:bold;color:#fff\">Please wait while we craft the rest of your journey</h6><img src=\"/il/images/loading.gif\" width=\"100\" height=\"100\" style=\"margin-top:-35px;\"></div>').appendTo(".container").slideDown(5000);
								}
								else{
                	$('<div id="newMail"><button id="getMail">Get Mail</button></div>').appendTo(".container").slideDown(5000);
								}
              $( "#progressBar" ).animate({
                  top: "85",
                  marginLeft:0
                }, 1000, function() {
                }).fadeTo(200,1);
                  });

            });

  	});

  }

	$("#inputContainer").on("click", "#cookOff", function() {

		questions[2].value = "BBQ Cook Off";
		startJourney(1);

	});
	$("#inputContainer").on("click", "#relay", function() {

		questions[2].value = "Relay for Life";
		startJourney(1);

	});
	$("#inputContainer").on("click", "#gala", function() {

		questions[2].value = "Gala 2018";
		startJourney(1);
	});
	if (section == "name") {
		showIntro();
	}
	/*form*/
	var questions = [{
		question: "What is your first name?"
	}, {
		question: ""
	}, {
		question: ""
	}];
	(function() {
		var tTime = 100 // transition transform time from #register in ms
		var wTime = 200 // transition width time from #register in ms
		var eTime = 1000 // transition width time from inputLabel in ms
		// init
		// --------------
		var position = 0
		putQuestion()
		progressButton.addEventListener('click', validate)
		$('#socialDot').click(function() {
			if (section != "social") {
				validate();
			}
		});
		$('#eventDot').click(function() {
			if (section != "event") {
				validate();
			}
		});
		inputField.addEventListener('keyup', function(e) {
			transform(0, 0) // ie hack to redraw
			if (e.keyCode == 13) validate()
		})

		function putQuestion() {
			inputLabel.innerHTML = questions[position].question
			inputField.value = ''
			inputField.type = questions[position].type || 'text'
			inputField.focus()
			showCurrent()
		}
		// when all the questions have been answered
		function done() {
			register.className = 'close'
		}
		// when submitting the current question
		function validate() {
			// set the value of the field into the array
			questions[position].value = inputField.value
			// check if the pattern matches
			if (!inputField.value.match(questions[position].pattern || /.+/)) wrong()
			else ok(function() {
				if (section == "name") {
					section = "social";

					$("#fNameDot").removeClass('active');
					$("#fNameDot").css('cursor', 'none');
					$("#socialDot").addClass('active');
					$("#register").stop(true, false).animate({
						width: "+=35",
						height: "+=120",
						top: "-=150",
						left: "-=20"
					}, 1000);

					// if there is a new question, hide current and load next
					if (questions[position]) hideCurrent(putQuestion)
					else hideCurrent(done)
					position = 1;
					$('#ticket').animate({
						left: '-2000px'
					}, {
						duration: 800
					});
					$('#ticket').css("display", "none");
					$("#acsLogo").animate({
						left: '-2000px'
					}, {
						duration: 800
					});
					$('#acsLogo').css("display", "none");
					$('#inputField').css("display", "none");
					$('#fNameDot').css("color", "#ccc");
          $(".dots").css('width', '100%');
					$(".dots").css('margin-left', '-15px');
          $(".next").css('display','none');
          $(".sliding-background").animate({
             'left': '-600px'
          }, 500);
					$('.container').delay(1000).queue(function(nxt3) {
						$("#inputContainer").append("<span style=\"float:left;width:100%;font-size:16px;font-weight:bold;\" id=\"userLabel\">Welcome " + questions[0].value + "!<br>Preferred social network?</span><br><br><br>");
						$("#inputContainer").append("<img src='/il/images/fb.png' width='100' height='100' id='fb'>");
						$("#inputContainer").append("<img src='/il/images/twitter.png' width='100' height='100' id='twitter'><br>");
            nxt3();
					});
				}
			})
      window.validate=validate;
		}

		function hideCurrent(callback) {
			inputContainer.style.opacity = 0
			setTimeout(callback, wTime)
		}

		function showCurrent(callback) {
			inputContainer.style.opacity = 1
			setTimeout(callback, wTime)
		}

		function transform(x, y) {
			register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
		}

		function ok(callback) {
			register.className = ''
			setTimeout(transform, tTime * 0, 0, 10)
			setTimeout(transform, tTime * 1, 0, 0)
			setTimeout(callback, tTime * 2)
		}

		function wrong(callback) {
			if (section == "name") {
				register.className = 'wrong'
				for (var i = 0; i < 6; i++) // shaking motion
					setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
				setTimeout(transform, tTime * 6, 0, 0)
				setTimeout(callback, tTime * 7)
			}

			if (section == "social") {

				if (!selected) {
					register.className = 'wrong'
					for (var i = 0; i < 6; i++) // shaking motion
  					setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
  					setTimeout(transform, tTime * 6, 0, 0)
  					setTimeout(callback, tTime * 7)
				} else {
          questions[1].value = selected;
          $("#fb").hide();
					$("#twitter").hide();
					$("#socialDot").removeClass('active');
					$("#socialDot").css('cursor', 'none');
					$("#socialDot").css("color", "#ccc");
					$("#socialDot").off();
					$("#eventDot").addClass('active');
					$("#eventDot").off();

					$("#userLabel").html('Thanks ' + questions[0].value + ', last step!<br> Please pick an event below.');
					$("#register").stop(true, false).animate({
						height: "+=100"
					}, 1000);
					$("#progressButton").hide();
          $(".sliding-background").animate({
             'margin-left': '-800px'
          }, 500, 'linear');
					$('#register').delay(250).queue(function(nxt3) {

						$("<div class=\"block fade-in\" id=\"cookOff\" style=\"background-image:url('/il/images/tileBBQ.png')\"></div><div class=\"block fade-in\" id=\"gala\" style=\"background-image:url('/il/images/tileGala.png')\"></div><div class=\"block fade-in\" id=\"relay\" style=\"background-image:url('/il/images/tileRelay.png')\"></div>").appendTo("#inputContainer").fadeIn(100);
						nxt3();
					});

				}
			}
		}
	}())
})
