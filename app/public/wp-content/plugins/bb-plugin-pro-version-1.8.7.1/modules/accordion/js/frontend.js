(function($) {

	FLBuilderAccordion = function( settings )
	{
		this.settings 	= settings;
		this.nodeClass  = '.fl-node-' + settings.id;
		this._init();
	};

	FLBuilderAccordion.prototype = {
	
		settings	: {},
		nodeClass   : '',
		
		_init: function()
		{
			$( this.nodeClass + ' .fl-accordion-button' ).on('click', $.proxy( this._buttonClick, this ) );
			
			FLBuilderLayout.preloadAudio( this.nodeClass + ' .fl-accordion-content' );

			this._openDefaultItem();
		},

		_buttonClick: function( e )
		{
			var button      = $( e.target ).closest('.fl-accordion-button'),
				accordion   = button.closest('.fl-accordion'),
				item	    = button.closest('.fl-accordion-item'),
				allContent  = accordion.find('.fl-accordion-content'),
				allIcons    = accordion.find('.fl-accordion-button i.fl-accordion-button-icon'),
				content     = button.siblings('.fl-accordion-content'),
				icon        = button.find('i.fl-accordion-button-icon');
				
			if(accordion.hasClass('fl-accordion-collapse')) {
				accordion.find( '.fl-accordion-item-active' ).removeClass( 'fl-accordion-item-active' );
				allContent.slideUp('normal');   
				allIcons.removeClass('fa-minus');
				allIcons.addClass('fa-plus');
			}
			
			if(content.is(':hidden')) {
				item.addClass( 'fl-accordion-item-active' );
				content.slideDown('normal', this._slideDownComplete);
				icon.addClass('fa-minus');
				icon.removeClass('fa-plus');
			}
			else {
				item.removeClass( 'fl-accordion-item-active' );
				content.slideUp('normal', this._slideUpComplete);
				icon.addClass('fa-plus');
				icon.removeClass('fa-minus');
			}
		},

		_slideUpComplete: function()
		{
			var content 	= $( this ),
				accordion 	= content.closest( '.fl-accordion' );
			
			accordion.trigger( 'fl-builder.fl-accordion-toggle-complete' );
		},
		
		_slideDownComplete: function()
		{
			var content 	= $( this ),
				accordion 	= content.closest( '.fl-accordion' ),
				item 		= content.parent(),
				win  		= $( window );
			
			FLBuilderLayout.refreshGalleries( content );

			// Grid layout support (uses Masonry)
			FLBuilderLayout.refreshGridLayout( content );

			// Post Carousel support (uses BxSlider)
			FLBuilderLayout.reloadSlider( content );

			// WP audio shortcode support
			FLBuilderLayout.resizeAudio( content );
			
			if ( item.offset().top < win.scrollTop() + 100 ) {
				$( 'html, body' ).animate({ 
					scrollTop: item.offset().top - 100 
				}, 500, 'swing');
			}
			
			accordion.trigger( 'fl-builder.fl-accordion-toggle-complete' );
		},

		_openDefaultItem: function()
		{	
			if(typeof this.settings.defaultItem !== 'undefined') {
				var item = $.isNumeric(this.settings.defaultItem) ? (this.settings.defaultItem - 1) : null;
				
				if(item !== null) {
					$( this.nodeClass + ' .fl-accordion-button' ).eq(item).trigger('click');
				}
			}
		}
	};
	
})(jQuery);