$(document).ready(function() {
  var x = "?client_id=";
  var y = "3r943mtt26h5tdtla4tnn09axas1x3";
  var client_id = x + y;
  var url = "https://api.twitch.tv/kraken/";
  var stream = url + "streams/";
  var channel = url + "channels/";
  var user = url + "users/";
  var streamer = "zybisko";
  var follows_channels = "/follows/channels";
  var get_followers = user + streamer + follows_channels + client_id;
  var following = [];

  //adding names to following array
  $.getJSON(get_followers, function(followers) {
    for (var i = 0; i < followers.follows.length; i++) {
      var displayName = followers.follows[i].channel.display_name;
      following.push(displayName);
    }

  $("#search-btn").click(function() {
    var searchTerm = $('#searchTerm').val();
    var url = user +searchTerm+client_id;

    $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function(data) {
        var name = data.name;
        console.log(name);
        var xstream=stream+data.name+client_id;
        $.getJSON(xstream, function(data2){
          var online_status = data2.stream;
          var streamer_logo = data.logo;
          var streamer_name = data.display_name;
          var streamer_url = data.url;
          
          if (online_status != null) {
            console.log('connected and online!');
            $("#results").prepend('<div class="online_streamer" id="' + name + '"><span class="streamerlogo"><img id="streamerlogo" src="' + streamer_logo + '"></span><p class="statusIcon online-t">&#x25C9;</p><h5 id="streamname"><a target="_blank" href="' + streamer_url + '">' + streamer_name + '</a><br><span id="status-game">CURRENTLY PLAYING:<br>' + data2.stream.channel.game + '</span></h5><hr/><span id="status">' + data2.stream.channel.status + '</span></div>');
          } else {
            console.log('connected but offline');
            var currently_playing = "STREAMER IS CURRENTLY OFFLINE";
            $("#results").prepend('<div class="offline_streamer"><span class="streamerlogo"><img id="streamerlogo" src="' + streamer_logo + '"></span><p class="statusIcon offline-t">&#x25C9;</p><h5 id="streamname"><a target="_blank" href="' + streamer_url + '">' + streamer_name + '</a></h5><hr/><p id="status">' + currently_playing + '</p></div>');
          }
          
            $('.online_streamer').click(function(event) {
            var id = $(this).attr('id');
            if (id === name) {
              $(".test").append('<div class="container-fluid twitch_player"><div class="row background"><div class="col-xs-12 box"><div class="col-xs-11 iframe_streamer_info"><h4 id="info" >' + streamer_name + '</h4><p id="info-p">viewers:' + data2.stream.viewers + '</p></div><div class="col-xs-1 exit">x</div><div class="col-xs-12 .center-block iframe"><iframe src="https://player.twitch.tv/?channel=' + name + '" allowfullscreen="true" width="100%" height="100%"></iframe></div></div></div></div>')

              $(".online_streamer").click(function() {
                $(".background").show();
              });

              $(".background").click(function() {
                $(".twitch_player").remove();
                $(".background").hide();
              });

              $('.exit').click(function() {
                $(".twitch_player").remove();
                $(".background").hide();
              });
            }

          });
          
        });

      },
      error: function(errorMessage) {
        console.log(errorMessage);
        alert(searchTerm + " not found! Check spelling and try again.");
      }
    });
    $('#searchTerm').val('');
  });
      following.push('esl_overwatch');
      following.push(streamer);

      /// for each -- adds streamers to body looping through follows array
      following.forEach(function(streamer) {
        var streaming_info = stream + streamer + client_id;
        var channel_info = channel + streamer + client_id;

        $.when(
          $.getJSON(streaming_info),
          $.getJSON(channel_info)
        ).done(function(r1, r2) {
          var online_status = r1[0].stream;
          var streamer_logo = r2[0].logo;
          var streamer_name = r2[0].display_name;
          var streamer_url = r2[0].url;

          if (online_status != null) {
            $("#results").prepend('<div class="online_streamer" id="' + streamer + '"><span class="streamerlogo"><img id="streamerlogo" src="' + streamer_logo + '"></span><p class="statusIcon online-t">&#x25C9;</p><h5 id="streamname"><a target="_blank" href="' + streamer_url + '">' + streamer_name + '</a><br><span id="status-game">CURRENTLY PLAYING:<br>' + r1[0].stream.channel.game + '</span></h5><hr/><span id="status">' + r1[0].stream.channel.status + '</span></div>');

          } else {
            var currently_playing = "STREAMER IS CURRENTLY OFFLINE";
            $("#results").prepend('<div class="offline_streamer"><span class="streamerlogo"><img id="streamerlogo" src="' + streamer_logo + '"></span><p class="statusIcon offline-t">&#x25C9;</p><h5 id="streamname"><a target="_blank" href="' + streamer_url + '">' + streamer_name + '</a></h5><hr/><p id="status">' + currently_playing + '</p></div>');
          }

          ///adds twitch stream 
          $('.online_streamer').click(function(event) {
            var id = $(this).attr('id');
            if (id === streamer) {
              $(".test").append('<div class="container-fluid twitch_player"><div class="row background"><div class="col-xs-12 box"><div class="col-xs-11 iframe_streamer_info"><h4 id="info" >' + streamer_name + '</h4><p id="info-p">viewers:' + r1[0].stream.viewers + '</p></div><div class="col-xs-1 exit">x</div><div class="col-xs-12 .center-block iframe"><iframe src="https://player.twitch.tv/?channel=' + streamer + '" allowfullscreen="true" width="100%" height="100%"></iframe></div></div></div></div>')

              $(".online_streamer").click(function() {
                $(".background").show();
              });

              $(".background").click(function() {
                $(".twitch_player").remove();
                $(".background").hide();
              });

              $('.exit').click(function() {
                $(".twitch_player").remove();
                $(".background").hide();
              });
            }

          });

        }); ///end of .done

      }); ///end of for.each

    }) ///end of followers getJSON-followers

});
/// for buttons
$(document).ready(function() {
  $(".all-status-btn").click(function() {
    $(".offline_streamer").show();
    $(".online_streamer").show();
  });

  $(".online-status-btn").click(function() {
    $(".offline_streamer").hide();
    $(".online_streamer").show();
  });

  $(".offline-status-btn").click(function() {
    $(".online_streamer").hide();
    $(".offline_streamer").show();
  });

});

  $(document).ready(function() {
    $("#searchTerm").keydown(function(enter) {
      if (enter.which == 13) {
        $("#search-btn").click();
      }
    });
  });