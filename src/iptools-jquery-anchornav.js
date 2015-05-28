/* global jQuery */
(function($, window, document) {

  'use strict';

  var pluginName = 'iptoolsAnchorNavigation';
  var defaults = {
    title: 'Anchor navigation'
  };

  function IPTAnchorNavigation(element, options) {

    var self = this;

    this.element = $(element);
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new IPTAnchorNavigation(this, options));
      }
    });
  };

})(jQuery, window, document);
