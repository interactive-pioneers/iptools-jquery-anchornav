'use strict';
/* jshint undef: false */
(function() {
  describe('IPTAnchorNavigation', function() {

    var config = {
      title: 'IPTAnchorNavigation',
      gapY: 0
    };
    var menu = null;
    var pluginName = 'plugin_iptAnchorNavigation';

    describe('init', function() {

      beforeEach(function() {
        menu = $('.anchor__nav').iptAnchorNavigation(config);
      });

      it('expected to construct object', function() {
        return expect(menu).to.be.object;
      });

      it('expected gapY setting to be of numeric type', function() {
        return expect(menu.data(pluginName).settings.gapY).to.be.a('number');
      });

      it('expected title setting to be of string type', function() {
        return expect(menu.data(pluginName).settings.title).to.be.a('string');
      });

      it('expected to set title to ' + config.title, function() {
        var title = menu.data(pluginName).settings.title;
        return expect(title).to.equal(config.title);
      });

    });

    describe('destroy', function() {

      afterEach(function() {
        menu = $('.anchor__nav').iptAnchorNavigation(config);
      });

      it('expected to remove data', function() {
        menu.data(pluginName).destroy();
        return expect(menu.data(pluginName)).to.not.be.ok;
      });

    });

  });

})();
