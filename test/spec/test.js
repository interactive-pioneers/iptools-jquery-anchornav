'use strict';
/* jshint undef: false */
(function() {
  describe('IPTAnchorNavigation', function() {

    var config = {
      title: 'IPTAnchorNavigation',
      gapY: 0
    };

    var menu = null;

    describe('init', function() {

      beforeEach(function() {
        menu = $('.anchor__nav').iptAnchorNavigation(config);
      });

      afterEach(function() {
        menu.data('plugin_iptAnchorNavigation').destroy();
      });

      it('expected to construct object', function() {
        return expect(menu).to.be.object;
      });

      it('expected gapY setting to be of numeric type', function() {
        return expect(menu.data('plugin_iptAnchorNavigation').settings.gapY).to.be.a('number');
      });

      it('expected title setting to be of string type', function() {
        return expect(menu.data('plugin_iptAnchorNavigation').settings.title).to.be.a('string');
      });

      it('expected to set title to ' + config.title, function() {
        return expect(menu.data('plugin_iptAnchorNavigation').settings.title).to.equal(config.title);
      });

    });

  });
})();
