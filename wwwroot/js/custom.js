(function($) {
  var HelloWorldDevs = function() {

  };
  HelloWorldDevs.prototype.noOrphans = function (selectors, exceptions) {
    $(selectors).not(exceptions).each(function () {
      $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/, '&nbsp;$1'));
    });
  };

  HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
    var $form = $(form);
    $form.submit(function(e) {
      e.preventDefault();
      var formData = $form.serialize();
      var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule'
      $('.form-error').remove();
      $.ajax({
        type: 'POST',
        url: formAction,
        data: formData,
        dataType: 'json',
        encode: true
      }).done(function (response) {
        $form.replaceWith($(success_msg).html());
      }).error(function (response) {
        var $error_list = $('<ul>');
        if(response.responseJSON == undefined) {
          $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
        } else {
          $.each(response.responseJSON, function(key, value) {
            $error_list.append($('<li>').text(value));
          });
        }
        $form.before('<div class="form-error"></div>');
        $('.form-error').html($error_list).fadeIn();
      });
    });
  };

  var HWD = new HelloWorldDevs();


  HWD.noOrphans('h1,h2,h3,h4,h5,h6,li,p', '.price-box-h3-mid');
  HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');

  // assign event handles to accordions
  $('.ui-accordion-header').click(function () {
    $(this).parent().find('.ui-accordion-content').addClass('folded');
    $(this).next().removeClass('folded');
  });

  var $teamCarousel = $(".team-carousel");
  var $tourCarousel = $(".tour-carousel");

  // initiate team carousel
  $teamCarousel.owlCarousel({
    items: 1,
    loop: true,
    autoPlay: true,
    autoPlaySpeed: 6000,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>'
    ],
    autoplayTimeout:1000,
    autoplayHoverPause:true
  });

  // initiate team carousel
  $tourCarousel.owlCarousel({
    items: 1,
    loop: true,
    autoPlay: true,
    autoPlaySpeed: 6000,
    nav: true,
    dots: false,
    navText: [
      '<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>',
      '<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>'
    ],
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    autoHeight: true
  });

  // initiate swiper
  const mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    autoplay: 6000
  });

  
  // kills menu offsets for tablet and mobile on load
  if ($(window).width() < 993) {
    $('#logo').find('a').attr('data-offset', '0');
  }

  // Fix scrollTo offsets on tablet and mobile versions (sets data offsets to zero)
  $(window).resize(function() {
    if ($(window).width() < 993) {
      // sets all menu offset to zero for mobile
      $('#logo').find('a').attr('data-offset', '0');
    } else {
      $('#logo').find('a').attr('data-offset', '40');
    }
  });

})(jQuery);
