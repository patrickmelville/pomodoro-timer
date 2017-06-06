//*******//*******//*******TODO LIST//*******//*******//*******
//
//*******//*******//*******TODO LIST//*******//*******//******* 

var timer = function(){
  var sLength = 25*60; 
  var bLength = 5*60;
  var sCurrent = sLength, bCurrent = bLength;
  var intervID;
  this.sCounting = false;
  this.bCounting = false;
  
  //sound stuff
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'https://www.dropbox.com/s/rf0h18zsugddrol/powerUp1.ogg?dl=1');
  
  //Time Convert and Display
  function display(x){
    // convert seconds to min:sec
    var sec = x % 60;
    var min = parseInt(x / 60);
    var colon = sec < 10 ? ":0" : ":";
    
    if (x == sLength || x == sCurrent){
      $("#session-digits").html(min + colon + sec);
      $("#session-bar").css("width", sCurrent*95/sLength + "%");
    } 
    if (x == bLength || x == bCurrent){
      $("#break-digits").html(min + colon + sec);
      $("#break-bar").css("width", bCurrent*95/bLength + "%");
    }
    return min + colon + sec;
  };
  
  // Timer update methods
  this.sUpdate = function(x){
    if(sLength>60){sLength += x;}
    sCurrent = sLength;
    return sLength / 60;
  };
  this.bUpdate = function(y){
    if(bLength>60){bLength += y;}
    bCurrent = bLength;
    return bLength / 60;
  };
  this.count = function(){
    //if counter is at zero switch to the other timer
    //if not, continue counting down to zero/display time
    if (pTimer.sCounting == true){
      if (sCurrent == 0){
        console.log("got to zero");
        sCurrent = sLength;
        display(sCurrent);
        pTimer.sCounting = false;
        pTimer.bCounting = true;
        audioElement.play();
      } else {
        console.log("count down");
        sCurrent -= 1;
        display(sCurrent);
      }
    } else if (pTimer.bCounting == true){
      if (bCurrent == 0){
        console.log("B got to zero");
        bCurrent = bLength;
        console.log(bCurrent);
        display(bCurrent);
        pTimer.sCounting = true;
        pTimer.bCounting = false;
        audioElement.play();
      } else {
        console.log("b subtract");
        bCurrent -= 1;
        display(bCurrent);
      }
    }
    
  };
  
  this.test = function(){
    return sCurrent + " " + bCurrent;
  };

  
  //timer info display methods
  this.getSession = function(){
    return display(sLength);
  };
  
  this.getBreak = function(){
    return display(bLength);
  };
  
  this.getSCurrent = function(){
    return display(sCurrent);
  };
  this.getBCurrent = function(){
    return display(bCurrent);
  };
  
//   // Start / Pause / Reset methods
  this.start = function(){
    this.sCounting = true;
    intervID = setInterval(this.count,1000);
                       
  };
  this.pause = function(){
    clearInterval(intervID);
    this.sCounting = false;
    this.bCounting = false;
  };
  
//   this.reset = function(){
//     return "?";
//   };
};

// CREATE THE TIMER OBJECT
var pTimer = new timer();

// Do jQuery stuff with buttons below
$(document).ready(function() {
  
  
  //put in default info
  $("#session-digits").html(pTimer.getSession());
  $("#break-digits").html(pTimer.getBreak());
  $("#session-length").html(pTimer.sUpdate(0));
  $("#break-length").html(pTimer.bUpdate(0));
  
  
  // Session length update buttons here....
  
  $("#session-minus").click(function() {
    if (pTimer.sCounting == false){
      $("#session-length").html(pTimer.sUpdate(-60));
      $("#session-digits").html(pTimer.getSession());
    }
  });
  $("#session-plus").click(function() {
    if (pTimer.sCounting == false){
      $("#session-length").html(pTimer.sUpdate(60));
      $("#session-digits").html(pTimer.getSession());
    }
  });

  
  // Break length update buttons here....
  
  $("#break-minus").click(function() {
    if (pTimer.sCounting == false){
      $("#break-length").html(pTimer.bUpdate(-60));
      $("#break-digits").html(pTimer.getBreak());
    }
  });
  $("#break-plus").click(function() {
    if (pTimer.sCounting == false){
      $("#break-length").html(pTimer.bUpdate(60));
      $("#break-digits").html(pTimer.getBreak());
    }
  });
  
  // Start timer
  $("#start").click(function(){
    if (pTimer.sCounting == false){
      pTimer.start();
      $("#session-digits").html(pTimer.getSCurrent());
      $("#break-digits").html(pTimer.getBCurrent());
    }
  });
  $("#pause").click(function(){
    pTimer.pause();
  });
  // Reset timer
});