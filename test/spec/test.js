'use strict';
/* jshint undef: false */
(function() {
  describe('IPTAnchorNavigation', function() {

    var config = {
      title: 'IPTAnchorNavigation'
    };

    var menu = null;

    describe('init', function() {

      beforeEach(function() {
        menu = $('.anchor__nav').iptAnchorNavigation(config);
      });

      it('expected to construct object', function() {
        return expect(menu).to.be.an.object;
      });

    });

  });
})();
