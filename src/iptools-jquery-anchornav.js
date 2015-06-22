/**
 * jQuery IPTAnchorNavigation
 */
(function ($, window, document) {

  'use strict';

  var pluginName = 'iptAnchorNavigation';
  var defaults = {
    animEasing: 'swing',
    animDuration: 600,
    gapY: 60,
    scrollSpeed: 600
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
      this.getDimensions();

      if(this.listWidth >= this.navWidth) {
        this.addScroller();
      }

      $(window).scrollTop($(window).scrollTop() + 1);
      $(window).scrollTop($(window).scrollTop() - 1);
    },
    getDimensions: function() {
      var self = this;
      this.listWidth = 0;
      this.element.find(navItem).each(function() {
        self.listWidth += $(this).outerWidth();
      });
      this.windowHeight = $(window).height();
      this.docHeight = $(document).height();
      this.navWidth = this.element.width();
    },
    onResize: function(event) {
      var self = event.data;
      self.getDimensions();

      if(self.listWidth >= self.navWidth) {
        if(!self.element.hasClass('scrollable')) {
           self.addScroller();
        }
        if(self.navWidth >= self.posX + self.listWidth) {
          self.posX = self.navWidth - self.listWidth;
          self.element.find(navList).css({transform: 'translateX(' + self.posX + 'px)'});
        }
      } else {
        if(self.element.hasClass('scrollable')) {
          self.removeScroller();
        }
      }
    },
    addScroller: function() {
      var self = this;
      self.posX = 0;
      var animate;

      this.element.addClass('scrollable');

      var lArr = $('<a/>').addClass('scrollable__control scrollable__control--left').text('<');
      var rArr = $('<a/>').addClass('scrollable__control scrollable__control--right').text('>');

      this.element.append(lArr, rArr);

      function scrollLeft() {
        $(window).scrollTop(self.windowPos + self.docHeight * self.settings.scrollSpeed * 0.00001 );
      }

      function scrollRight() {
        $(window).scrollTop(self.windowPos - self.docHeight * self.settings.scrollSpeed * 0.00001 );
      }

      rArr.on('mousedown', function() {
        animate = setInterval(scrollLeft, 20);
      });

      lArr.on('mousedown', function() {
        animate = setInterval(scrollRight, 20);
      });

      rArr.on('mouseup', function() {
        clearInterval(animate);
      });

      lArr.on('mouseup', function() {
        clearInterval(animate);
      });
    },
    removeScroller: function() {
      this.element.removeClass('scrollable');
      this.element.find('.scrollable__control').remove();
      this.element.find(navList).css({transform: 'translateX(0)'});
    },
    addEvents: function() {
      var self = this;

      this.element.find(navItem).on('click', this, self.go);
      this.element.find(navTop).on('click', this, self.go);
      $(window).on('scroll', this, self.onScroll);
      $(window).on('resize', this, self.onResize);
    },
    go: function (event) {
      var self = event.data;

      var animation = {
        easing: self.settings.animEasing,
        duration: self.settings.animDuration
      };

      function scrollTo(y) {
        $('html, body').stop().animate({
          scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top - self.settings.gapY
        }, animation);
      }

      event.preventDefault();
      scrollTo(event.target.hash);
    },
    onScroll: function (event) {
      var self = event.data;
      self.windowPos = $(window).scrollTop();

      function highlight(i) {
        var divPos = $(this.hash).offset().top - self.settings.gapY;
        var divHeight = $(this.hash).height();
        var active = self.windowPos >= divPos && self.windowPos < (divPos + divHeight);

        $(this).toggleClass('active', active);

        if (self.windowPos + self.windowHeight === self.docHeight) {
          if (!$(this[i]).hasClass('active')) {
            self.element.find(navItem).removeClass('active');
            $(self.element.find(navItem)[i]).addClass('active');
          }
        }
      }

      function navToggle() {
        var active = self.windowPos >= $(self.element.find(navItem)[0].hash).offset().top - self.settings.gapY;
        self.element.toggleClass('active', active);
      }

      function navAlign() {
        if(!self.element.hasClass('scrollable')) {
          return;
        }
        var ratio = self.windowPos / (self.docHeight - self.windowHeight);
        self.posX = (self.navWidth - self.listWidth) * ratio;
        self.element.find(navList).css({transform: 'translateX(' + self.posX + 'px)'});
      }

      navToggle();
      navAlign();
      self.element.find(navItem).each(highlight);
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
