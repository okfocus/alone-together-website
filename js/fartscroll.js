// fartscroll.js v0.1
"use strict";

var fartscroll = (function () {
  var mp3 = {
    prefix: "audio/",
    sound: [
    	'apple1.mp3',
    	'apple2.mp3',
    	'apple3.mp3',
    	'apple4.mp3',
    	'apple5.mp3',
    	'apple6.mp3',
    	'apple8.mp3',
    	'apple9.mp3',
    	'apple10.mp3',
    	'apple11.mp3',
    	'apple12.mp3',
    	'apple13.mp3',
    	'apple14.mp3',
		]
  };

  var ogg = {
    prefix: "data:audio/ogg;base64,",
    sound: [
      ]
  };

  return function (trigger_distance) {
    trigger_distance = trigger_distance || 400;
    var lastOffset;

    var scrollFart = function() {
      var scrollOffset = Math.floor(window.scrollY / trigger_distance);
      if (lastOffset !== scrollOffset) {
        playAudio();
        lastOffset = scrollOffset;
      }
    };

    var timer;
    function resizeFart() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function(){ playAudio(); }, 200);
    };

    window.addEventListener('scroll', scrollFart, false);
    window.addEventListener('resize', resizeFart, false);
  };

  var last_rand = -1;
  function playAudio(position){
    var player = getPlayer()
      , audio = getAudioFor(player);
    var rand;
    do { rand = Math.floor(Math.random() * audio.sound.length); }
    while (rand == last_rand)

    player.src = audio.prefix + audio.sound[position || rand];
    player.play();
  };

  function getAudioFor(player){
    if (player.canPlayType("audio/mp3")) {
      return mp3;
    }
  }

  function getPlayer() {
    var container = getContainer(), player
      , players = container.getElementsByTagName("audio");

    for (player in  players) {
      if (player.currentTime === 0 || player.ended) {
        return player;
      }
    }

    player = document.createElement("audio");
    container.appendChild(player);
    return player;
  };

  function getContainer() {
    var container = document.getElementById("fartscroll");

    if (container === null) {
      container = document.createElement("div");
      container.id = "fartscroll";
      document.getElementsByTagName('body')[0].appendChild(container);
    }

    return container;
  }
})();
