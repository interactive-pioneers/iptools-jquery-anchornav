'use strict';
/* jshint undef: false */
(function() {
  describe('MlhMenu', function() {

    var config = {
      title: 'IPTAnchorNavigation'
    };

    var menu = null;

    describe('init', function() {

      beforeEach(function() {
        menu = $('.header__nav').IPTAnchorNavigation(config);
      });

      it('expected to construct object', function() {
        return expect(menu).to.be.an.object;
      });

    });

  });
})();