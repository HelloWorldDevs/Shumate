(function($) {
  var HelloWorldDevs = function() {

  };
  
  HelloWorldDevs.prototype.noOrphans = function (selectors, exceptions) {
    $(selectors).not(exceptions).each(function () {
      $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/, '&nbsp;$1'));
    });
  };

  HelloWorldDevs.prototype.mailForm = function (form, uid) {
    var $form = $(form);
    $form.before('<div class="form-error"></div>');
    $form.submit(function(e) {
      e.preventDefault();
      var formData = $form.serialize();
      var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule';
      $.ajax({
        type: 'POST',
        url: formAction,
        data: formData,
        dataType: 'json',
        encode: true
      }).done(function (response) {
        $('.form-error').remove();
        $form.replaceWith('Congratulations! Dentistry is a big part of a \
	            healthy life, and we\'re excited to be a part of yours. We will \
	            contact you in the next 2 business days to schedule your \
	            appointment and to answer any questions you may still have. \
	            Thank you!');
      }).error(function (response) {
        var $error_list = $('<ul></ul>');
        $.each(response.responseJSON, function(key, value) {
          $error_list.append('<li>'+value+'</li>');
        });
        $('.form-error').html($error_list).fadeIn();
      });
    });
  };

  var HWD = new HelloWorldDevs();
  HWD.noOrphans('h1,h2,h3,h4,h5,h6,li,p', '.price-box-h3-mid');
  HWD.mailForm('#mail-form', '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Uid Goes Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  $('.ui-accordion-header').click(function () {
    $(this).parent().find('.ui-accordion-content').addClass('folded');
    $(this).next().removeClass('folded');
  });

  const $tourCarousel = $(".tour-carousel");
  const $tourModalCarousel = $(".tour-modal-carousel");

  $tourCarousel.owlCarousel({
    loop: true,
    autoPlay: true,
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

  $tourModalCarousel.owlCarousel({
    items: 1,
    loop: true,
    autoPlay: true,
    nav: true,
    dots: false,
    navText: [
      '<i class="icon-chevron-left"></i>',
      '<i class="icon-chevron-right"></i>'
    ],
    autoplayTimeout:1000,
    autoplayHoverPause:true
  });

 
  // specialsTemplate.init(
  //     '7fb35345-752d-4792-9480-cd3db6674a62',
  //     '#special_template',
  //     {
  //       period_ends: '#period_ends',
  //       period_label: '#period_label'
  //     }
  // );


})(jQuery);
