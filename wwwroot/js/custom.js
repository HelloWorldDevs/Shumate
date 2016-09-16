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
  const $tourCarousel = $(".tour-carousel");
  const $tourModalCarousel = $('.tour-modal-carousel');


  HWD.noOrphans('h1,h2,h3,h4,h5,h6,li,p', '.price-box-h3-mid');
  HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');

  // assign event handles to accordions
  $('.ui-accordion-header').click(function () {
    $(this).parent().find('.ui-accordion-content').addClass('folded');
    $(this).next().removeClass('folded');
  });

  // initiate tour carousel
  $tourCarousel.owlCarousel({
    loop: true,
    autoPlay: true,
    autoPlaySpeed: 6000,
    nav: true,
    dots: false,
    navText: [
      '<i class="icon-chevron-left"></i>',
      '<i class="icon-chevron-right"></i>'
    ],
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    responsive : {
      0 : {
        items: 1,
        margin: 0
      },
      550 : {
        items: 2,
        margin: 20
      },
      768 : {
        items: 3,
        margin: 30
      }
    }
  });

  // initial carousel in modal
  $tourModalCarousel.owlCarousel({
    items: 1,
    loop: true,
    autoPlay: true,
    autoPlaySpeed: 6000,
    nav: true,
    dots: false,
    navText: [
      '<i class="icon-chevron-left"></i>',
      '<i class="icon-chevron-right"></i>'
    ],
    autoplayTimeout:1000,
    autoplayHoverPause:true
  });
  
  $('.img-container').click(function() {
    const tourIndex = $(this).attr('carousel-target');
    $tourModalCarousel.trigger('to.owl.carousel', [ tourIndex , 0] );
  });

  $('#primary-menu-trigger').click(function() {
    console.log("clicked");
  });

  // initiate swiper
  const mySwiper = new Swiper('.swiper-container', {
    speed: 400,
    autoplay: 6000
  });

  // fix rendering ghost in tour modal
  $('#tourModal').on('shown.bs.modal', function() {
    $('.tour-modal-item').removeClass('tour-modal-item');
  })
 
  // specialsTemplate.init(
  //     '7fb35345-752d-4792-9480-cd3db6674a62',
  //     '#special_template',
  //     {
  //       period_ends: '#period_ends',
  //       period_label: '#period_label'
  //     }
  // );


  $('#google-map5').gMap({
    address: '41.6290814,-88.445303',
    maptype: 'ROADMAP',
    zoom: 14,
    markers: [
      {
        address: "41.6286678,-88.4529315",
        html: "Dr. Scott Vlk, DDS"
      }
    ],
    doubleclickzoom: false,
    controls: {
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false
    }
  });



})(jQuery);
