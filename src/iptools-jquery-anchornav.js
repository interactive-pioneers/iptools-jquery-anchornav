(function($, window, document) {

  'use strict';

  var pluginName = 'iptAnchorNavigation';

  var defaults = {
    animEasing: 'swing',
    animDuration: 600,
    gapY: 60,
    threshold: 10,
    showHideNavAt: false,
    selectors: {
      list: '.anchor__nav__list',
      item: '.anchor__nav__list__item__link',
      top: '.anchor__nav__top',
      header: '.header'
    }
  };

  function IPTAnchorNavigation(element, options) {
    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    if (this.initialisable()) {
      this.initialise();
    }
  }

  IPTAnchorNavigation.prototype = {

    /**
     *  Check if requirements are met.
     *
     *  TODO: implement (optional) strict mode that throws error
     *  if plugin can not be initialised.
     *  Possibly based on setting that is passed in.
     */
    initialisable: function() {
      for (var i in this.settings.selectors) {
        if ($(this.settings.selectors[i]).length === 0) {
          return false;
        }
      }
      return true;
    },

    initialise: function() {
      this.addEvents();
      this.getDimensions();
      if (this.listWidth >= this.navWidth) {
        this.addScroller();
      }
      this.triggerScroll();
    },
    getDimensions: function() {
      var self = this;
      this.listWidth = 0;
      this.element.find(this.settings.selectors.item).each(function() {
        self.listWidth += $(this).outerWidth();
        $(this).data('offset', $(this).offset().left);
        $(this).data('width', $(this).outerWidth());
      });
      this.windowHeight = $(window).height();
      this.docHeight = $(document).height();
      this.navWidth = this.element.width();
      this.navOuterWidth = this.element.outerWidth();
      if (!this.settings.showHideNavAt) {
        this.settings.showHideNavAt =
                $(this.settings.selectors.header).height();
      }
    },
    onResize: function(event) {
      var self = event.data;
      self.element.find(self.settings.selectors.list).css({transform: ''});
      self.getDimensions();

      if (self.listWidth >= self.navWidth) {
        if (!self.element.hasClass('scrollable')) {
          self.addScroller();
        }
        if (self.navWidth >= self.posX + self.listWidth) {
          self.posX = self.navWidth - self.listWidth;
          self.element.find(self.settings.selectors.list)
            .css({transform: 'translateX(' + self.posX + 'px)'});
        }
      } else {
        if (self.element.hasClass('scrollable')) {
          self.removeScroller();
        }
      }
      self.triggerScroll();
    },
    addScroller: function() {
      var self = this;

      this.element.addClass('scrollable');

      self.lArr = $('<a/>')
        .addClass('scrollable__control scrollable__control--left').text('<');
      self.rArr = $('<a/>')
        .addClass('scrollable__control scrollable__control--right').text('>');

      this.element.append(self.lArr, self.rArr);

      self.rArr.on('click', function() {
        $(self.element.find(self.settings.selectors.item)[self.index + 1])
                .trigger('click');
      });

      self.lArr.on('click', function() {
        $(self.element.find(self.settings.selectors.item)[self.index - 1])
                .trigger('click');
      });
    },
    removeScroller: function() {
      this.element.removeClass('scrollable');
      this.element.find('.scrollable__control').remove();
      this.element.find(this.settings.selectors.list)
              .css({transform: 'translateX(0)'});
    },
    triggerScroll: function() {
      $(window).scrollTop($(window).scrollTop() + 1);
      $(window).scrollTop($(window).scrollTop() - 1);
    },
    addEvents: function() {
      var self = this;
      this.element.find(this.settings.selectors.item)
              .on('click', this, self.go);
      this.element.find(this.settings.selectors.top)
              .on('click', this, self.go);
      $(window).on('scroll', this, self.onScroll);
      $(window).on('resize', this, self.onResize);
    },
    destroy: function() {
      this.removeScroller();
      this.element.off('.' + pluginName);
      this.element.removeData('plugin_' + pluginName);
    },
    go: function(event) {
      var self = event.data;
      var animation = {
        easing: self.settings.animEasing,
        duration: self.settings.animDuration
      };

      function scrollTo(y) {
        $('html, body').stop().animate({
          scrollTop: !isNaN(Number(y)) ? y :
            $(y).offset().top - self.settings.gapY + self.settings.threshold
        }, animation);
      }

      event.preventDefault();
      scrollTo(event.target.hash);
    },
    onScroll: function(event) {
      var self = event.data;
      self.windowPos = $(window).scrollTop();

      function highlight(i) {
        if (!this.hash) {
          return;
        }
        var divPos = $(this.hash).offset().top - self.settings.gapY;
        var divHeight = $(this.hash).height();
        var active = self.windowPos >=
            (divPos - self.settings.gapY - self.windowHeight / 2.5) &&
            self.windowPos <
            (divPos + divHeight + self.settings.gapY - self.windowHeight / 2.5);

        $(this).toggleClass('active', active);

        if (self.windowPos + self.windowHeight === self.docHeight) {
          if (!$(this[i]).hasClass('active')) {
            self.element.find(self.settings.selectors.item)
                    .removeClass('active');
            $(self.element.find(self.settings.selectors.item)[i])
                    .addClass('active');
          }
        }
        if (active) {
          self.index = i;
        }
      }

      function isActive() {
        var items = self.element.find(self.settings.selectors.item);
        var firstItem = items[0];
        if (!firstItem) {
          return false;
        }
        var topOffset = $(firstItem.hash).offset().top;
        if (self.settings.showHideNavAt) {
          return self.windowPos >= self.settings.showHideNavAt;
        }
        return self.windowPos >= topOffset - self.settings.gapY;
      }

      function itemCount() {
        return self.element.find(self.settings.selectors.item).length;
      }

      function navToggle() {
        self.element.toggleClass('active', isActive());

        if (self.element.hasClass('scrollable')) {
          var activeItem = $(self.element
                  .find(self.settings.selectors.item)[self.index]);
          var diff = self.navOuterWidth / 2 -
                  activeItem.data('offset') - activeItem.data('width') / 2;

          if (diff < 0) {
            self.posX = diff;

            if (-(diff - self.navWidth) > self.listWidth) {
              self.posX = self.navWidth - self.listWidth;
            }
          } else {
            self.posX = 0;
          }

          self.element.find(self.settings.selectors.list)
            .css({transform: 'translateX(' + self.posX + 'px)'});

          var lActive = self.index > 0;
          var rActive = self.index < itemCount() - 1;

          self.lArr.toggleClass('active', lActive);
          self.rArr.toggleClass('active', rActive);
          self.element.toggleClass('before-shadow', lActive);
          self.element.toggleClass('after-shadow', rActive);
        }
      }

      self.element.find(self.settings.selectors.item).each(highlight);
      navToggle();
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new IPTAnchorNavigation(this, options));
      }
    });
  };

})(jQuery, window, document);
