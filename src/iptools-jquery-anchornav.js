/**
 * jQuery IPTAnchorNavigation
 */
(function ($, window, document) {

  'use strict';

  var pluginName = 'iptAnchorNavigation';
  var defaults = {
    animEasing: 'swing',
    animDuration: 600,
    gapY: 60
  };

  var nav = '.anchor__nav';
  var navList = '.anchor__nav__list';
  var navItem = '.anchor__nav__list__item__link';
  var navTop = '.anchor__nav__top';

  function IPTAnchorNavigation(element, options) {

    var self = this;

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    this.initialise();
  }

  IPTAnchorNavigation.prototype = {
    initialise: function() {
      this.addEvents();

      $(window).scrollTop($(window).scrollTop() + 1);
      $(window).scrollTop($(window).scrollTop() - 1);

      this.set();
    },
    set: function() {
      var navWidth = this.element.width();
      var listWidth = 0;

      this.element.find(navItem).each(function() {
        listWidth += $(this).outerWidth();
      });

      if(listWidth >= navWidth) {
        this.navWidth = navWidth;
        this.listWidth = listWidth;
        this.slider();
      }
    },
    slider: function() {
      var self = this;
      var animate;
      var pos = 0;

      $(nav).addClass('scrollable');

      var lArr = $('<a/>').addClass('scrollable__control scrollable__control--left').text('<');
      var rArr = $('<a/>').addClass('scrollable__control scrollable__control--right').text('>');

      $(nav).append(lArr, rArr);

      function scrollLeft() {
        if(self.navWidth >= pos + self.listWidth) {
          clearInterval(animate);
          return;
        }
        pos -= 5;
        self.element.find(navList).css({transform: 'translateX(' + pos + 'px)'});
      }

      function scrollRight() {
        if( pos >= 0) {
          clearInterval(animate);
          return;
        }
        pos += 5;
        self.element.find(navList).css({transform: 'translateX(' + pos + 'px)'});
      }

      rArr.on('mousedown', function() {
        animate = setInterval(scrollLeft, 30);
      });

      lArr.on('mousedown', function() {
        animate = setInterval(scrollRight, 30);
      });

      rArr.on('mouseup', function() {
        clearInterval(animate);
      });

      lArr.on('mouseup', function() {
        clearInterval(animate);
      });
    },
    addEvents: function() {
      var self = this;

      this.element.find(navItem).on('click', this, self.go);
      this.element.find(navTop).on('click', this, self.go);
      $(window).on('scroll', this, self.onScroll);
    },
    go: function (event) {
      var self = event.data;

      var animation = {
        easing: self.settings.animEasing,
        duration: self.settings.animDuration
      };
      var gapY = self.settings.gapY;

      function scrollTo(y) {
        $('html, body').stop().animate({
          scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top - gapY
        }, animation);
      }

      event.preventDefault();
      scrollTo(event.target.hash);
    },
    onScroll: function (event) {
      var self = event.data;
      var windowPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      var gapY = self.settings.gapY;

      function highlight(i) {
        var divPos = $(this.hash).offset().top - gapY;
        var divHeight = $(this.hash).height();
        var active = windowPos >= divPos && windowPos < (divPos + divHeight);

        $(this).toggleClass('active', active);

        if (windowPos + windowHeight === docHeight) {
          if (!$(this[i]).hasClass('active')) {
            $(navItem).removeClass('active');
            $($(navItem)[i]).addClass('active');
          }
        }
      }

      function navToggle() {
        var active = windowPos >= $($(navItem)[0].hash).offset().top - gapY;
        $(nav).toggleClass('active', active);
      }

      navToggle();
      $(navItem).each(highlight);
    }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
                new IPTAnchorNavigation(this, options));
      }
    });
  };

})(jQuery, window, document);
