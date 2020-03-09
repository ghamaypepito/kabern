jQuery(document).ready(function( $ ) {
	if (  ! $('html').hasClass('fl-builder-edit') ){

		$('.uabb-modal-parent-wrapper').each(function(){
			$(this).appendTo(document.body);
		});
	}
});

(function($) {
	UABBModalPopup = function( settings )
	{	
		this.settings       = settings;
		this.node           = settings.id;
		this.modal_on       = settings.modal_on;
		this.modal_custom   = settings.modal_custom;
		this.modal_content  = settings.modal_content;
		this.video_autoplay  = settings.video_autoplay;
		this.enable_cookies = settings.enable_cookies;
		this.expire_cookie  = settings.expire_cookie;
		this.esc_keypress   = settings.esc_keypress;
		this.overlay_click  = settings.overlay_click;
		this.responsive_display = settings.responsive_display;
		this.medium_device = settings.medium_device;
		this.small_device = settings.small_device;

		
		this._initModalPopup();

		var modal_resize = this;

		$( window ).resize(function() {
		  modal_resize._resizeModalPopup();
		});

	};

	UABBModalPopup.prototype = {
		
			settings		: {},
			node   			: '',
			modal_trigger   : '',
			overlay         : '',
			modal_popup		: '',
			modal_on   		: '',
			modal_custom 	: '',
			modal_content 	: '',
			enable_cookies  : '',
			expire_cookie   : '',
			esc_keypress    : '',
			overlay_click   : '',
			video_autoplay  : 'no',
			responsive_display : '',
			medium_device : '',
			small_device : '',
			
			/**
			 * Initiate animation.
			 *
			 * @since 1.1.0.2
			 * @access private
			 * @method _initAnimations
			 */ 

			_initModalPopup: function() {
					//console.log( this.modal_content );
				$this = this;
				$node_module = $( '.fl-node-'+$this.node );
				$popup_id = $( '.uamodal-'+$this.node );
				
				if ( ( $('html').hasClass('uabb-active-live-preview') || ! $('html').hasClass('fl-builder-edit') ) && this.modal_on == 'custom' && this.modal_custom != '' ) {
					var custom_wrap = $(this.modal_custom);
					
					if ( custom_wrap.length ) {
						custom_wrap.addClass("uabb-modal-action uabb-trigger");
						var data_modal = 'modal-'+this.node;
						custom_wrap.attr( 'data-modal', data_modal );

						$this.modal_trigger = custom_wrap;
						$this.modal_popup   = $( '#modal-' + $this.node );
					 	var	modal_trigger = custom_wrap,
						    modal_close   = $popup_id.find( '.uabb-modal-close' ),
						    modal_popup   = $( '#modal-' + $this.node );
						

						modal_trigger.bind("click", function(){return false;});
						modal_trigger.on( "click", $.proxy( $this._showModalPopup, $this ) );

						modal_close.on( "click", $.proxy( $this._removeModalHandler, $this ) );

						$popup_id.find('.uabb-modal').on( "click", function( e ) {
							if( e.target == this ){
								modal_close.trigger( "click" );
							}
						} );
					} 
				}else if( this.modal_on == 'automatic' ) {
					this.modal_popup = $('#modal-' + this.node );

					var refresh_cookies_name = 'refresh-modal-' + this.node,
						cookies_status = this.enable_cookies;

						if ( cookies_status != 1 && Cookies.get( refresh_cookies_name ) == 'true' ) {
					    	Cookies.remove( refresh_cookies_name );
						}
				}
					
				this.overlay        = $popup_id.find( '.uabb-overlay' );


				$node_module.find( '.uabb-trigger' ).each(function( index ) {
				 	$this.modal_trigger = $(this);
					$this.modal_popup   = $( '#modal-' + $this.node );
				 	var	modal_trigger = $(this),
					    modal_close   = $popup_id.find( '.uabb-modal-close' ),
					    modal_popup   = $( '#modal-' + $this.node );
					

					modal_trigger.bind("click", function(){return false;});
					modal_trigger.on( "click", $.proxy( $this._showModalPopup, $this ) );

					modal_close.on( "click", $.proxy( $this._removeModalHandler, $this ) )

					$popup_id.find('.uabb-modal').on( "click", function( e ) {
						if( e.target == this ){
							modal_close.trigger( "click" );
						}
					} );
						/*function() {
						$this._showModalPopup( this );
					});
					*/

				});
			},
			_showAutomaticModalPopup: function() {

				console.log ( this._isShowModal() );
				if( ! this._isShowModal() ) {
					return;
				}

				//console.log( this );
				this._videoAutoplay();

				var cookies_name = 'modal-' + this.node,
					refresh_cookies_name = 'refresh-modal-' + this.node,
					cookies_status = this.enable_cookies,
					show_modal = true;
				

				// console.log(  cookies_status );
				// console.log( Cookies.get( cookies_name ) );
				// console.log( Cookies.get( refresh_cookies_name ) );

				if ( cookies_status == 1 ) {
					if ( Cookies.get( cookies_name ) == 'true' ) {
						show_modal = false;
					}		
				}else{
					if ( Cookies.get( refresh_cookies_name ) == 'true' ) {
						show_modal = false;
					}	
			    	if ( Cookies.get( cookies_name ) == 'true' ) {
			    		Cookies.remove( cookies_name );
					}
				}		

				//console.log( 'frontend' );
			    //console.log('Cookie Name' + Cookies.get( cookies_name ) );
			    //Cookies.remove( cookies_name );
			    //console.log('Cookie Name after Remove' + Cookies.get( cookies_name ) );
				
				if ( show_modal == true ) {

					var parent_wrap = $('.fl-node-' + this.node ),
						popup_wrap = $('.uamodal-' + this.node ),
						trigger_args = '.uamodal-' + this.node + ' .uabb-modal-content-data',
						close = popup_wrap.find('.uabb-modal-close' ),
						cookies_days = parseInt( $this.expire_cookie ),
						current_this = this;

					if ( popup_wrap.find( '.uabb-content' ).outerHeight() > $(window).height() ) {
						$('html').addClass('uabb-html-modal');
						popup_wrap.find('.uabb-modal').addClass('uabb-modal-scroll');
					}
					this.modal_popup.addClass('uabb-show' );

				    if ( this.esc_keypress == 1 ) {
						$(document).on('keyup.uabb-modal',function(e) {
							if (e.keyCode == 27) { 
								current_this.modal_popup.removeClass( 'uabb-show' );
								current_this._stopVideo();
								//console.log( e.keyCode );
								$(document).unbind('keyup.uabb-modal');
								if ( cookies_status == 1 ) {
									Cookies.set( cookies_name, 'true', { expires: cookies_days });
								}else{
									Cookies.set( refresh_cookies_name, 'true' );
								}
							}
						});

				    }


				    if ( this.overlay_click == 1 ) {
						this.overlay.on( 'click', function( ev ) {
							current_this.modal_popup.removeClass( 'uabb-show' );
							current_this._stopVideo();
							if ( cookies_status == 1 ) {
								Cookies.set( cookies_name, 'true', { expires: cookies_days });
							}else{
								Cookies.set( refresh_cookies_name, 'true' );
							}
						} );
					}
					/*$this.overlay.addEventListener( 'click', function( ev ) {
						classie.remove( $this.modal_popup, 'uabb-show' );
					});*/
					
					close.on( 'click', function( ev ) {
						ev.preventDefault();
						current_this.modal_popup.removeClass( 'uabb-show' );
						current_this._stopVideo();

						if ( popup_wrap.find( '.uabb-content' ).outerHeight() > $(window).height() ) {
							setTimeout(function() {
								$('html').removeClass('uabb-html-modal');
								popup_wrap.find('.uabb-modal').removeClass('uabb-modal-scroll');
							}, 300);
						}
						if ( cookies_status == 1 ) {
							Cookies.set( cookies_name, 'true', { expires: cookies_days });
						}else{
							Cookies.set( refresh_cookies_name, 'true' );
						}

					} );

					inner_content_close = popup_wrap.find( '.uabb-close-modal' );
					if ( inner_content_close.length  ) {
						inner_content_close.on( 'click',function(){
							current_this.modal_popup.removeClass( 'uabb-show' );
							current_this._stopVideo();
							if ( cookies_status == 1 ) {
								Cookies.set( cookies_name, 'true', { expires: cookies_days });
							}else{
								Cookies.set( refresh_cookies_name, 'true' );
							}
						});
					}

					/*close.addEventListener( 'click', function( ev ) {
						//console.log( hasPerspective );
						
						classie.remove( $this.modal_popup, 'uabb-show' );
						// console.log( 'Close frontend' );
						
					
					});*/
					UABBTrigger.triggerHook( 'uabb-modal-click', trigger_args );
				}
			},
			_showModalPopup: function() {

				if ( $('html').hasClass('fl-builder-edit') && !$('html').hasClass('uabb-active-live-preview') ) {
					return;
				}

				if( ! this._isShowModal() ) {
					return;
				}

				this._videoAutoplay();

				var active_modal = $('.fl-node-' + this.node ),
				    active_popup = $('.uamodal-' + this.node ),
				    trigger_args = '.uamodal-' + this.node + ' .uabb-modal-content-data';

				if ( active_popup.find( '.uabb-content' ).outerHeight() > $(window).height() ) {
					$('html').addClass('uabb-html-modal');
					active_popup.find('.uabb-modal').addClass('uabb-modal-scroll');
				}

				//console.log( active_popup.find( '.uabb-content' ).outerHeight() );
				//console.log( $(window).height() );
				
				//console.log( $this );
				$( '#modal-' + this.node ).addClass('uabb-show' );
				if ( this.overlay_click == 1) {
					this.overlay.on( 'click',$.proxy( this._removeModalHandler, this ) );
				}
				//this.overlay.addEventListener( 'click', this._removeModalHandler );
				current_this = this;
				if( this.modal_trigger.hasClass('uabb-setperspective' ) ) {
					setTimeout( function() {
						current_this.modal_trigger.addClass('uabb-perspective' );
					}, 25 );
				}

				if ( this.esc_keypress == 1 ) {
					$(document).on('keyup.uabb-modal',function(e) {
						if (e.keyCode == 27) { 
							current_this._removeModalHandler();
							//console.log( e.keyCode );
						}
					});
				}

				inner_content_close = active_popup.find( '.uabb-close-modal' );
				if ( inner_content_close.length  ) {
					inner_content_close.on( 'click',$.proxy( this._removeModalHandler, this ) );
				}

				UABBTrigger.triggerHook( 'uabb-modal-click', trigger_args );
			},
			_removeModal: function( hasPerspective ) {
				var active_modal = $('.fl-node-' + this.node ),
				    active_popup = $('.uamodal-' + this.node ) ;
				
				//console.log( hasPerspective );
				this.modal_popup.removeClass('uabb-show' );

				this._stopVideo();
				// console.log( this.modal_content );
				/*if ( this.modal_content == 'youtube' || this.modal_content == 'vimeo' || this.modal_content == 'video' ) {

					var modal_iframe 		= active_popup.find( 'iframe' ),
						modal_src 			= modal_iframe.attr( "src" ).replace("&autoplay=1", "");
						
					    modal_iframe.attr( "src", '' );
					    modal_iframe.attr( "src", modal_src );
				}*/
				
				//console.log( modal_iframe );
				if( hasPerspective ) {
					this.modal_trigger.removeClass( 'uabb-perspective' );
				}
				
				setTimeout(function() {
					$('html').removeClass('uabb-html-modal');
					active_popup.find('.uabb-modal').removeClass('uabb-modal-scroll');
				}, 300);

				$(document).unbind('keyup.uabb-modal');

			},
			_removeModalHandler: function( ev ) {
				//console.log( $(this) );
				this._removeModal( this.modal_trigger.hasClass('uabb-setperspective' ) ); 
			},
			_resizeModalPopup: function() {
				var active_modal = $('.fl-node-' + this.node ),
				    active_popup = $('.uamodal-' + this.node );
				if (  active_popup.find('.uabb-modal').hasClass('uabb-show') ) {
					if ( active_popup.find( '.uabb-content' ).outerHeight() > $(window).height() ) {
						$('html').addClass('uabb-html-modal');
						active_popup.find('.uabb-modal').addClass('uabb-modal-scroll');
					}else{
						$('html').removeClass('uabb-html-modal');
						active_popup.find('.uabb-modal').removeClass('uabb-modal-scroll');
					}
				}
			},
			_videoAutoplay: function() {
				var active_modal = $('.fl-node-' + this.node ),
				    active_popup = $('.uamodal-' + this.node );


				if ( this.video_autoplay == 'yes' && ( this.modal_content == 'youtube' || this.modal_content == 'vimeo' ) ) {

					var modal_iframe 		= active_popup.find( 'iframe' ),
						modal_src 			= modal_iframe.attr( "src" ) + '&autoplay=1';
						
						modal_iframe.attr( "src",  modal_src );
				}
			},
			_stopVideo: function() {
				var active_modal = $('.fl-node-' + this.node ),
				    active_popup = $('.uamodal-' + this.node );

				if ( this.modal_content == 'youtube' || this.modal_content == 'vimeo' || this.modal_content == 'video' ) {

					var modal_iframe 		= active_popup.find( 'iframe' ),
						modal_video_tag 	= active_popup.find( 'video' );

						if ( modal_iframe.length ) {
							var modal_src 			= modal_iframe.attr( "src" ).replace("&autoplay=1", "");
							modal_iframe.attr( "src", '' );
						    modal_iframe.attr( "src", modal_src );
						}else if ( modal_video_tag.length ) {
				        	modal_video_tag[0].pause();
							modal_video_tag[0].currentTime = 0;
						}
				}
			},
			_isShowModal: function() {

				if ( this.responsive_display != '' ) {

					var current_window_size = $("#uabb-js-breakpoint").css("content"),
						medium_device = '"' + this.medium_device + '"',
						small_device = '"' + this.small_device + '"';

					if ( this.responsive_display == 'desktop' && current_window_size > medium_device ) {
						
						return true;
					}else if( this.responsive_display == 'desktop-medium' && current_window_size > small_device ){
						
						return true;
					}else if( this.responsive_display == 'medium' && current_window_size < medium_device && current_window_size > small_device ){

						return true;
					}else if( this.responsive_display == 'medium-mobile' && current_window_size < medium_device ){

						return true;
					}else if( this.responsive_display == 'mobile' && current_window_size < small_device ){

						return true;
					}else{

						return false;
					}
				}

				return true;
			}
	}

})(jQuery);
