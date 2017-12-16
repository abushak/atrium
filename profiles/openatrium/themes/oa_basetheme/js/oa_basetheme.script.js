(function ($) {
  $(document).ready(function() {
    // Handle toolbar collapse.
    $('.oa-navigation .btn-navbar-menu').click(function(e) {
      e.preventDefault();
      var navMenuCollapse = $('.oa-navigation .nav-menu-collapse');
      var height = (navMenuCollapse.height() == 0) ? 'auto' : 0;
      navMenuCollapse.height(height);
    });

    // adjust the position of the IPE buttons
    var $ipe = $('#panels-ipe-control-container');
    if ($ipe.length) {
      var $main = $('#main');
      var $element = $ipe.detach();
      $main.prepend($element);
    }

    var toggleLeft = $('.oa-responsive-regions-toggle-left:visible');
    if (toggleLeft.length > 0) {
      $('body').addClass('oa-responsive-left');
    }

    $(window).resize(function() {
      // Fix for positioning of save button on modules page.
      if ($('#module-filter-submit.fixed-bottom') && $('.oa-layout-footer')) {
        $('html.js #module-filter-submit.fixed-bottom').css('bottom', $('.oa-layout-footer').outerHeight());
      }
    }).resize();

  });

  Drupal.behaviors.oa_wysiwyg = {
    attach: function(context, settings) {
      // Tweak the WYSIWYG selector on text fields
      $('form .format-toggle', context).once("description-processed", function () {
        var parent = $(this).parents('.text-format-wrapper');
        var hasLabel = parent.find('.form-type-textarea:visible label');
        var visible = hasLabel.is(':visible') && !hasLabel.hasClass('element-invisible');
        var hasDescription = parent.find('.description');
        if (hasDescription.length > 0) {
          hasDescription.insertAfter(hasLabel);
        }
        if (visible) {
          if (hasDescription.length > 0) {
            $(this).insertAfter(hasDescription);
            $(this).addClass('has-description');
            hasDescription.addClass('has-wysiwyg');
            $(this).css('top', (hasDescription.height() - $(this).height() + 20) + 'px');
          }
        }
      });
    }
  };

  Drupal.behaviors.fieldset_collapse = {
    attach: function(context, settings) {
      // allow chosen dropdowns within fieldsets to be visible
      if ('chosen' in settings) {
        var selector = settings.chosen.selector;
        $(selector, context)
          .not('#field-ui-field-overview-form select, #field-ui-display-overview-form select, .wysiwyg, .draggable select[name$="[weight]"], .draggable select[name$="[position]"]') //disable chosen on field ui
          .each(function () {
            $(this).parents('.panel-body.fieldset-wrapper, .form-item.form-type-select').first().addClass('chosen-fieldset-wrapper');
        });
      }
    }
  };

  if (Drupal.CTools && typeof Drupal.CTools.CollapsibleCallbacksAfterToggle != 'undefined') {
    Drupal.CTools.CollapsibleCallbacksAfterToggle[Drupal.CTools.CollapsibleCallbacksAfterToggle.length] = function($container, handle, content, toggle) {
      // Older versions of jquery leave behind a overflow:hidden;
      // @see https://www.drupal.org/node/2408807
      if (content.css("overflow") == "hidden") {
        content.css("overflow", "");
      }
    }
  }

  Drupal.behaviors.fixModulesButton = {
    attach: function(context) {
      $(window).resize(function() {
        // Fix for positioning of save button on modules page.
        if ($('#module-filter-submit.fixed-bottom') && $('.oa-layout-footer')) {
          $('html.js #module-filter-submit.fixed-bottom').css('bottom', $('.oa-layout-footer').outerHeight());
        }
      });
    }
  };

  Drupal.behaviors.scrollingMenus = {
    attach: function (context, settings) {
      $('.oa_toolbar .dropdown-menu', context).not('oa-no-scroll').once('oa-scroll', function() {
        // Compute max height for menus to scroll
        var viewport = $(window).height();
        // Cannot compute top of hidden objects, so briefly show the menu
        // This shouldn't cause flicker in most browsers these days.
        // Also need to show any parent menus
        if ($(this).parent().hasClass('dropdown-submenu')) {
          $(this).parents('.dropdown-menu').css('display', 'block');
        }
        $(this).css('display', 'block');
        var max_height = viewport - $(this).offset().top - 20;
        $(this).css('display', '');
        if ($(this).parent().hasClass('dropdown-submenu')) {
          $(this).parents('.dropdown-menu').css('display', '');
        }
        $(this).css('max-height', max_height + 'px');
      });
    }
  }

})(jQuery);
