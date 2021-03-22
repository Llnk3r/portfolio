$(document).ready(function() {
  $(".head__gifts-item").each(function(index) {
    setTimeout(function() {
      $(".head__gifts-item:nth-child(" + (index + 1) + ")").removeClass(
        "head__gifts-item--hidden"
      );
    }, (index + 1) * 300);
  });

  $(".tel-input").inputmask({
    mask: "+7 (999) 999-99-99",
    placeholder: "_",
    showMaskOnHover: false,
    showMaskOnFocus: true
  });

  $(".header__mobile-menu").click(function(e) {
    e.preventDefault();
    $(".header__menu").toggleClass("header__menu--opened");
    if ($(window).scrollTop() == 0) {
      $(".top").toggleClass("top--menu_opened");
    }
  });

  $("#form1,#form2,#form3,#form4").submit(function(e) {
    e.preventDefault();

    var ctx = this;

    var last_name = "";
    if (
      $(this)
        .find('[name="last_name"]')
        .val()
    ) {
      last_name = $(this)
        .find('[name="last_name"]')
        .val();
    }
    var data = {
      first_name: $(this)
        .find('[name="first_name"]')
        .val(),
      phone: $(this)
        .find('[name="phone"]')
        .val(),
      last_name: last_name
    };

    $.ajax({
      type: "POST",
      url: "form.php",
      data: data,
      success: function() {
        $(ctx)
          .find(".form-baner__sended")
          .show();
      },
      dataType: "JSON"
    });
  });
  $(".header__menu>a").click(function(e) {
    e.preventDefault();
    var target = $($(this).attr("href") + "");

    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(target).offset().top - 100
      },
      2000
    );
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("header--scrolling");
    } else {
      $(".header").removeClass("header--scrolling");
    }

    const wh = $(window).height();
    const elOffset = $(".price").offset().top;
    const startAnimPosition = elOffset - (wh - 100);
    if ($(window).scrollTop() > startAnimPosition) {
      $(".price__flex").removeClass("price__flex--hidden");
    } else {
      $(".price__flex").addClass("price__flex--hidden");
    }
  });
});

$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
    items: 4,
    nav: true,
    mouseDrag: false,
    slideBy: 4,
    dots: false,
    responsive: {
      0: {
        items: 2
      },
      1024: {
        items: 4
      }
    }
  });
});






var openModalEntry = document.querySelectorAll(".myBtn");
var showModalEntry = document.querySelectorAll(".myModal");
var closeModalEntry = document.querySelectorAll(".close");

for(var i = 0; i < openModalEntry.length; i++){
  openModalEntry[i].addEventListener("click", function(event) {
    event.preventDefault();
    showModalEntry[0].classList.add("show-entry");
  });
};

for(var i = 0; i < closeModalEntry.length; i++){
  closeModalEntry[i].addEventListener("click", function(event) {
    event.preventDefault();
    showModalEntry[0].classList.remove("show-entry");
  });
};