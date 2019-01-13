var main_error_log_debug = "";

$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd',
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement('div'));

    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);

      if (typeof callback === 'function') callback();
    });

    return this;
  },
});

popup_timer = 0;
function popup(text){
    clearTimeout(popup_timer);
    document.getElementsByClassName("popup")[0].innerHTML = text;
    document.getElementsByClassName("popup")[0].style.display = "block";
    popup_timer = setTimeout("close_popup()",5000);
}

function close_popup(){
        document.getElementsByClassName("popup")[0].style.display = "none";
}


//============ERROR LOG==================
function addtoerror(e){
    main_error_log_debug += e + "<br><br>";
}
$(document).keydown(function(event) {
    if (!( String.fromCharCode(event.which).toLowerCase() == 'd' && event.ctrlKey && event.altKey && event.shiftKey ) && !(event.which == 19)) return true;
    UIkit.modal.confirm('<h2 class="uk-modal-title alert-heading">Error log</h2> <p>'+main_error_log_debug+'</p>').then(function () {
           console.log('Confirmed.')
       }, function () {
           console.log('Rejected.')
       });

    event.preventDefault();
    return false;
});
//=======================================