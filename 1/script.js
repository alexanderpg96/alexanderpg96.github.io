$(document).ready(function($) {
    var stateChoice_1;
    var stateChoice_2;
    var location;
    var state;
    var location2;
    var state2;
    var weather1;
    var weather2;
    var clicked = false;
    
    $("#button").click(function() {
        if(!clicked) {
            clicked = true;
            
            $("#button").text("Compare again!");
            
            stateChoice_1 = document.getElementById("states1");
            stateChoice_2 = document.getElementById("states2");
            state = stateChoice_1.options[stateChoice_1.selectedIndex].value;
            state2 = stateChoice_2.options[stateChoice_2.selectedIndex].value;

            location = document.getElementById("city1").value;
            location = location.split(' ').join('_');
            location2 = document.getElementById("city2").value;
            location2 = location2.split(' ').join('_');

            $("#city1").hide(200);
            $("#city2").hide(200);
            $("#states1").hide(200);
            $("#states2").hide(200);

            $("#diff_container").show(400);

            getWeather();
        }
        else {
            window.location.reload(false);
            $("#button").text("Compare!");
        }
    });
  
    function getWeather() {
        $.ajax({
          url : "https://api.wunderground.com/api/61089ef9177c76cd/geolookup/conditions/q/" + state + "/" + location + ".json",
          dataType : "jsonp",
            async: false,
          success : function(parsed_json) {
          var locationj = parsed_json['location']['city'];
          var temp_f = parsed_json['current_observation']['temp_f'];
              temp_f = Math.round( temp_f );
              weather1(temp_f);
          document.getElementById("city12").innerHTML = "between " + locationj + ", " + state + " and ";
          }
          });

            $.ajax({
          url : "https://api.wunderground.com/api/61089ef9177c76cd/geolookup/conditions/q/" + state2 + "/" + location2 + ".json",
          dataType : "jsonp",
               async: false, 
          success : function(parsed_json) {
          var locationk = parsed_json['location']['city'];
          var temp_f = parsed_json['current_observation']['temp_f'];
              temp_f = Math.round( temp_f );
              weather2(temp_f);
          document.getElementById("city12").append("" + locationk + ", " + state2 + "");
          }
          });
    }
    
    function weather1(temp) {
        weather1 = temp;
    }
    
    $( document ).ajaxStop(function() {
        setTimeout(function() {
            $("#diff").text(weather1 - weather2);
        
            var diff = weather1 - weather2;
        
            if(diff > 0) {
                document.body.style.backgroundColor = "#3CC47C";
            }
            else if(diff < 0) {
                document.body.style.backgroundColor = "#E24E42";
            }

            $("#diff").append(" &#8457;");
        }, 400);
        
    });
    
    function weather2(temp) {
        weather2 = temp;
    }
});
