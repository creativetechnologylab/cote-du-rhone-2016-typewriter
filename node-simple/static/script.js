var video, current_video;
var socket = io.connect('http://localhost:3000');

window.onload = function() {
  video = document.getElementById('playback');

  video.addEventListener('play', function(){
    socket.emit('playing', current_video );
  });

  video.addEventListener('ended', function(){
    socket.emit('stopped');
  });

  socket.on('play', function(msg) {
    if(msg != current_video){
      current_video = msg;
      play();
    }
  });

  function play(){
    video.src = '/static/videos/' + current_video + '.mov';

    video.play();
    video.className = '';
  }

  function stop(){
    video.pause();
    video.className = 'hide';

    current_video = null;
    socket.emit('stopped');
  }
}
