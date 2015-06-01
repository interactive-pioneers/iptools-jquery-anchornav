/**
 * jQuery AnchorNavigation
 */
;
(function ($, window, document) {

  'use strict';

  var pluginName = 'AnchorNavigation';
  var defaults = {
    animEasing: 'swing',
    animDuration: 600,
    gapY: 60
  };

  var nav = '.anchor__nav';
  var navItem = '.anchor__nav__list__item__link';
  var navTop = '.anchor__nav__top';

  function AnchorNavigation(element, options) {

    var self = this;

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.element.find(navItem).on('click', function(event) {
      self.go(event);
    });

    this.element.find(navTop).on('click', function(event) {
      self.go(event);
    });

    $(window).on('scroll', function() {
      self.onScroll();
    });

  }

  AnchorNavigation.prototype = {

    go: function (event) {

      var easing = this.settings.animEasing;
      var duration = this.settings.animDuration;
      var gapY = this.settings.gapY;

      function scrollTo(x, y, options) {
        options = $.extend({}, {
          gap: {
            x: 0,
            y: gapY
          },
          animation: {
            easing: easing,
            duration: duration,
            complete: $.noop,
            step: $.noop
          }
        }, options);

        $('html, body').stop().animate({
          scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
          scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top - options.gap.y
        }, options.animation);
      }

      event.preventDefault();
      scrollTo(event.target.hash, event.target.hash);
    },

    onScroll: function () {
      var windowPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      var gapY = this.settings.gapY;

      function highlight (i) {
        var divPos = $(this.hash).offset().top - gapY;
        var divHeight = $(this.hash).height();

        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }

        if(windowPos + windowHeight == docHeight) {
          if (!$(this[i]).hasClass("active")) {
            $(navItem).removeClass('active');
            $($(navItem)[i]).addClass('active')
          }
        }
      }

      function navToggle() {
        if(windowPos >= $($(navItem)[0].hash).offset().top - gapY) {
          $(nav).addClass('active');
        } else {
          $(nav).removeClass('active');
        }
      }

      navToggle();
      $(navItem).each(highlight);
    }
  };

  $.fn[ pluginName ] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new AnchorNavigation(this, options));
      }
    });
  };

})(jQuery, window, document);
