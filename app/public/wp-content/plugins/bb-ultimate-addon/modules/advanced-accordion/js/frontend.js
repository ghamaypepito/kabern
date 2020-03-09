(function($) {

	UABBAdvAccordion = function( settings )
	{
		this.settings 	= settings;
		this.node  		= settings.id;
		this.nodeClass  = '.fl-node-' + settings.id;
		this.close_icon	= settings.close_icon;
		this.open_icon	= settings.open_icon;
		//console.log( this.close_icon);
		//console.log( this.open_icon );
		this._init();
	};

	UABBAdvAccordion.prototype = {
	
		settings	: {},
		node 		: '',
		nodeClass   : '',
		close_icon	: 'fa fa-plus',
		open_icon	: 'fa fa-minus',
		
		_init: function()
		{	
			var button_level = $( this.nodeClass ).find('.uabb-adv-accordion-button').first().closest('.uabb-adv-accordion');
			button_level.children('.uabb-adv-accordion-item').children('.uabb-adv-accordion-button').click( $.proxy( this._buttonClick, this ) );
			this._enableFirst();
		},
		
		_buttonClick: function( e )
		{
			var button      = $( e.target ).closest('.uabb-adv-accordion-button'),
				accordion   = button.closest('.uabb-adv-accordion'),
				item	    = button.closest('.uabb-adv-accordion-item'),
				allContent  = accordion.find('.uabb-adv-accordion-content'),
				allIcons    = accordion.find('.uabb-adv-accordion-button i.uabb-adv-accordion-button-icon'),
				content     = button.siblings('.uabb-adv-accordion-content'),
				icon        = button.find('i.uabb-adv-accordion-button-icon');
			
			if(accordion.hasClass('uabb-adv-accordion-collapse')) {
				accordion.find( '.uabb-adv-accordion-item-active' ).removeClass( 'uabb-adv-accordion-item-active' );
				allContent.slideUp('normal');   
				if( this.settings.icon_animation == 'none' ) {
					allIcons.removeClass( this.open_icon );
					allIcons.addClass( this.close_icon );
				}
			}
			
			if( content.is(':hidden') ) {
				item.addClass( 'uabb-adv-accordion-item-active' );
				content.slideDown('normal', this._slideDownComplete);
				if( this.settings.icon_animation == 'none' ) {
					//console.log( this.open_icon );
					icon.removeClass( this.close_icon );
					icon.addClass( this.open_icon );
				}
			}
			else {
				item.removeClass( 'uabb-adv-accordion-item-active' );
				content.slideUp('normal', this._slideUpComplete);
				if( this.settings.icon_animation == 'none' ) {
					icon.removeClass( this.open_icon );
					icon.addClass( this.close_icon );
				}
			}

			var trigger_args = '.fl-node-'+ this.node + ' .uabb-adv-accordion-item-active';
			// Trigger the Adv Tab Click trigger.
			UABBTrigger.triggerHook( 'uabb-accordion-click', trigger_args );

		},
		
		_slideUpComplete: function()
		{
			var content 	= $( this ),
				accordion 	= content.closest( '.uabb-adv-accordion' );
			
			accordion.trigger( 'fl-builder.uabb-adv-accordion-toggle-complete' );
		},
		
		_slideDownComplete: function()
		{
			var content 	= $( this ),
				accordion 	= content.closest( '.uabb-adv-accordion' ),
				item 		= content.parent(),
				win  		= $( window );
			
			FLBuilderLayout.refreshGalleries( content );
			
			if ( !accordion.hasClass( 'uabb-accordion-edit' ) ) {
				if ( item.offset().top < win.scrollTop() + 100 ) {
					$( 'html, body' ).animate({ 
						scrollTop: item.offset().top - 100 
					}, 500, 'swing');
				}
			}
			
			accordion.trigger( 'fl-builder.uabb-adv-accordion-toggle-complete' );
			
			//window.dispatchEvent(new Event('resize'));
			var fireRefreshEventOnWindow = function () {
			     var evt = document.createEvent("uabbAccordionCreate");
			     evt.initEvent('resize', true, false);
			     window.dispatchEvent(evt);
			 };
		},

		_enableFirst: function()
		{	
			if(typeof this.settings.enable_first !== 'undefined') {
				var firstitem = this.settings.enable_first;
				if( firstitem == 'yes' ) {
					$( this.nodeClass + ' .uabb-adv-accordion-button' ).eq(0).trigger('click');
				}
			}
		}
	};
	
})(jQuery);;