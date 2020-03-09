(function($){
	
	/**
	 * Helper class for frontend theme logic.
	 * 
	 * @since 1.0
	 * @class FLTheme
	 */
	FLTheme = {
		
		/**
		 * Initializes all frontend theme logic.
		 *
		 * @since 1.0
		 * @method init
		 */
		init: function()
		{
			this._bind();
			this._initRetinaImages();
		},
		
		/**
		 * Initializes and binds all frontend events.
		 *
		 * @since 1.0
		 * @access private
		 * @method _bind
		 */
		_bind: function()
		{
			// Fixed header
			if($('.fl-page-header-fixed').length != 0) {
				$(window).on('resize.fl-page-header-fixed', $.throttle(500, this._enableFixedHeader));
				this._enableFixedHeader();
			} 
			
			// Top Nav Drop Downs
			if($('.fl-page-bar-nav ul.sub-menu').length != 0) {
				this._setupDropDowns();
				this._enableTopNavDropDowns();
			} 
			
			// Page Nav Drop downs
			if($('.fl-page-nav ul.sub-menu').length != 0) {
				$(window).on('resize.fl-page-nav-sub-menu', $.throttle(500, this._enablePageNavDropDowns));
				this._setupDropDowns();
				this._enablePageNavDropDowns();
			} 
			
			// Nav Search
			if($('.fl-page-nav-search').length != 0) {
				$('.fl-page-nav-search a.fa-search').on('click', this._toggleNavSearch);
			} 
			
			// Lightbox
			if(typeof $('body').magnificPopup != 'undefined') {
				this._enableLightbox();
			}

			// Nav vertical right & boxed layout
			if($('.fl-fixed-width.fl-nav-vertical-right').length != 0) {
				$(window).on('resize', $.throttle(500, this._updateVerticalRightPos));
				this._updateVerticalRightPos();
			}
			
			// Footer parallax effect
			if($('.fl-full-width.fl-footer-effect').length != 0) {
				$(window).on('resize', $.throttle(500, this._footerEffect));
				this._footerEffect();
			}

			// Centered inline logo
			if($('.fl-page-nav-centered-inline-logo').length != 0) {
				$(window).on('resize', $.throttle(500, this._centeredInlineLogo));
				this._centeredInlineLogo();
			}

			// Nav Left
			if($('body.fl-nav-left').length != 0) {
				$(window).on('resize', $.throttle(500, this._navLeft));
				this._navLeft();
			}

			// Shrink Header
			if($('body.fl-shrink').length != 0) {
				$(window).on('resize', $.throttle(500, this._shrinkHeader));
				this._shrinkHeader();
			}

			// Fixed Header (Fixed Header = Fixed)
			if($('body.fl-fixed-header').length != 0) {
				$(window).on('resize', $.throttle(500, this._fixedHeader));
				this._fixedHeader();
			}

			// Hide Header Until Scroll
			if($('body.fl-scroll-header').length != 0) {
				$(window).on('resize', $.throttle(500, this._scrollHeader));
				this._scrollHeader();
			}

			// Mega Menu
			if($('.fl-page-header-primary').find( 'li.mega-menu' ).length != 0) {
				this._megaMenu();
			}

			// Go to Top
			if($('body.fl-scroll-to-top').length != 0) {
				this._toTop();
			}

		},
		
		/**
		 * Checks to see if the current device is mobile.
		 *
		 * @since 1.5.1
		 * @access private
		 * @method _isMobile
		 * @return {Boolean}
		 */ 
		_isMobile: function()
		{
			return /Mobile|Android|Silk\/|Kindle|BlackBerry|Opera Mini|Opera Mobi|webOS/i.test( navigator.userAgent );
		},
		
		/**
		 * Enables the fixed header if the window is wide enough.
		 *
		 * @since 1.0
		 * @access private
		 * @method _enableFixedHeader
		 */
		_enableFixedHeader: function()
		{
			var win = $(window);
			
			if(win.width() < 992) {
				win.off('scroll.fl-page-header-fixed');
				$('.fl-page-header-fixed').hide();
			}
			else {
				win.on('scroll.fl-page-header-fixed', FLTheme._toggleFixedHeader);
			}
		},
		
		/**
		 * Shows or hides the fixed header based on the 
		 * window's scroll position.
		 *
		 * @since 1.0
		 * @access private
		 * @method _toggleFixedHeader
		 */
		_toggleFixedHeader: function()
		{
			var win             = $(window),
				fixed           = $('.fl-page-header-fixed'),
				fixedVisible    = fixed.is(':visible'),
				header          = $('.fl-page-header-primary'),
				headerHidden    = false;
				
			if ( 0 === header.length ) {
				headerHidden = win.scrollTop() > 200;
			}
			else {
				headerHidden = win.scrollTop() > header.height() + header.offset().top;
			}
			
			if(headerHidden && !fixedVisible) {
				fixed.stop().fadeIn(200);
			}
			else if(!headerHidden && fixedVisible) {
				fixed.stop().hide();
			}
		},
		
		/**
		 * Initializes drop down nav logic.
		 *
		 * @since 1.0
		 * @access private
		 * @method _setupDropDowns
		 */
		_setupDropDowns: function()
		{
			$('ul.sub-menu').each(function(){
				$(this).closest('li').attr('aria-haspopup', 'true');
			});
		},
		
		/**
		 * Initializes drop down menu logic for top bar navs.
		 *
		 * @since 1.0
		 * @access private
		 * @method _enableTopNavDropDowns
		 */
		_enableTopNavDropDowns: function()
		{
			var nav        = $('.fl-page-bar-nav'),
				navItems   = nav.find(' > li'),
				subToggles = nav.find('> li').has('> ul.sub-menu').find('> a');
			
			if ( FLTheme._isMobile() ) {
				navItems.hover(function(){}, FLTheme._navItemMouseout);
				subToggles.on('click', FLTheme._navSubMenuToggleClick);
			}
			else {
				navItems.hover(FLTheme._navItemMouseover, FLTheme._navItemMouseout);
			}
		},
		
		/**
		 * Initializes drop down menu logic for the main nav.
		 *
		 * @since 1.0
		 * @access private
		 * @method _enablePageNavDropDowns
		 */
		_enablePageNavDropDowns: function()
		{
			var nav        = $('.fl-page-nav .fl-page-nav-collapse'),
				navItems   = nav.find('ul li'),
				subToggles = nav.find('li').has('> ul.sub-menu').find('> a'),
				subMenus   = navItems.find('ul.sub-menu');
				
			if( $( '.fl-page-nav .navbar-toggle' ).is( ':visible' ) ) {
				navItems.off('mouseenter mouseleave');
				nav.find('> ul > li').has('ul.sub-menu').find('> a').on('click', FLTheme._navItemClickMobile);
				subToggles.off('click', FLTheme._navSubMenuToggleClick);
			}
			else {
				nav.find('a').off('click', FLTheme._navItemClickMobile);
				nav.removeClass('in').addClass('collapse');
				navItems.removeClass('fl-mobile-sub-menu-open');
				navItems.find('a').width(0).width('auto');
				
				if ( FLTheme._isMobile() ) {
					navItems.hover(function(){}, FLTheme._navItemMouseout);
					subToggles.on('click', FLTheme._navSubMenuToggleClick);
				}
				else {
					navItems.hover(FLTheme._navItemMouseover, FLTheme._navItemMouseout);
				}
			}
		},
		
		/**
		 * Callback for when an item in a nav is clicked on mobile.
		 *
		 * @since 1.0
		 * @access private
		 * @method _navItemClickMobile
		 * @param {Object} e The event object.
		 */
		_navItemClickMobile: function(e)
		{
			var parent = $(this).parent();

			if(!parent.hasClass('fl-mobile-sub-menu-open')) {
				e.preventDefault(); 
				parent.addClass('fl-mobile-sub-menu-open');
			}
		},
		
		/**
		 * Callback for when the mouse leaves an item
		 * in a nav at desktop sizes.
		 *
		 * @since 1.0
		 * @access private
		 * @method _navItemMouseover
		 */
		_navItemMouseover: function()
		{
			if($(this).find('ul.sub-menu').length === 0) {
				return;
			} 
			
			var li              = $(this),
				parent          = li.parent(),
				subMenu         = li.find('ul.sub-menu'),
				subMenuWidth    = subMenu.width(),
				subMenuPos      = 0,
				winWidth        = $(window).width();
			
			if(li.closest('.fl-sub-menu-right').length !== 0) {
				li.addClass('fl-sub-menu-right');
			}
			else if($('body').hasClass('rtl')) {
				
				subMenuPos = parent.is('ul.sub-menu') ?
							 parent.offset().left - subMenuWidth: 
							 li.offset().left - subMenuWidth;
				
				if(subMenuPos <= 0) {
					li.addClass('fl-sub-menu-right');
				}
			}
			else {
				
				subMenuPos = parent.is('ul.sub-menu') ?
							 parent.offset().left + (subMenuWidth * 2) : 
							 li.offset().left + subMenuWidth;
				
				if(subMenuPos > winWidth) {
					li.addClass('fl-sub-menu-right');
				}
			}
			
			li.addClass('fl-sub-menu-open');
			subMenu.hide();
			subMenu.stop().fadeIn(200);
			FLTheme._hideNavSearch();
		},
		
		/**
		 * Callback for when the mouse leaves an item 
		 * in a nav at desktop sizes.
		 *
		 * @since 1.0
		 * @access private
		 * @method _navItemMouseout
		 */
		_navItemMouseout: function()
		{
			var li      = $(this),
				subMenu = li.find('ul.sub-menu');
			
			subMenu.stop().fadeOut({
				duration: 200, 
				done: FLTheme._navItemMouseoutComplete
			});
		},
		
		/**
		 * Callback for when the mouse finishes leaving an item 
		 * in a nav at desktop sizes.
		 *
		 * @since 1.0
		 * @access private
		 * @method _navItemMouseoutComplete
		 */
		_navItemMouseoutComplete: function()
		{
			var li = $(this).parent();
			
			li.removeClass('fl-sub-menu-open');
			li.removeClass('fl-sub-menu-right');
			
			$(this).show();
		},
		
		/**
		 * Callback for when a submenu toggle is clicked on mobile.
		 *
		 * @since 1.5.1
		 * @access private
		 * @method _navSubToggleClick
		 * @param {Object} e The event object.
		 */
		_navSubMenuToggleClick: function( e )
		{
			var li = $( this ).closest( 'li' ).eq( 0 );
			
			if ( ! li.hasClass( 'fl-sub-menu-open' ) ) {
				
				FLTheme._navItemMouseover.apply( li[0] );
				
				e.preventDefault();
			}
		},
		
		/**
		 * Shows or hides the nav search form.
		 *
		 * @since 1.0
		 * @access private
		 * @method _toggleNavSearch
		 */
		_toggleNavSearch: function()
		{
			var form = $('.fl-page-nav-search form');
			
			if(form.is(':visible')) {
				form.stop().fadeOut(200);
			}
			else {
				form.stop().fadeIn(200);
				$('body').on('click.fl-page-nav-search', FLTheme._hideNavSearch);
				$('.fl-page-nav-search .fl-search-input').focus();
			}
		},
		
		/**
		 * Hides the nav search form.
		 *
		 * @since 1.0
		 * @access private
		 * @method _hideNavSearch
		 * @param {Object} e (Optional) An event object.
		 */
		_hideNavSearch: function(e)
		{
			var form = $('.fl-page-nav-search form');
			
			if(e !== undefined) {
				if($(e.target).closest('.fl-page-nav-search').length > 0) {
					return;
				}
			}
			
			form.stop().fadeOut(200);
			
			$('body').off('click.fl-page-nav-search');
		},
		
		/**
		 * Initializes the lightbox.
		 *
		 * @since 1.0
		 * @access private
		 * @method _enableLightbox
		 */
		_enableLightbox: function()
		{
			var body = $('body');
			
			if(!body.hasClass('fl-builder') && !body.hasClass('woocommerce')) {
				
				$('.fl-content a').filter(function() {
					return /\.(png|jpg|jpeg|gif)(\?.*)?$/i.test(this.href);
				}).magnificPopup({
					closeBtnInside: false,
					type: 'image',
					gallery: {
						enabled: true
					}
				});
			}
		},

		/**
		 * Right position fix for right navigation on boxed layout
		 *
		 * @since 1.5
		 * @access private
		 * @method _updateVerticalRightPos
		 */
		 _updateVerticalRightPos: function()
		{
			var win = $(window).width();
			var flpage = $('.fl-page').width();
			var vericalRightPos = ( (win-flpage) / 2 );
			$('.fl-page-header-vertical').css('right', vericalRightPos);
		},
		
		/**
		 * Apply footer height as margin-bottom value for fl-page class
		 *
		 * @since 1.5
		 * @access private
		 * @method _footerEffect
		 */
		_footerEffect: function()
		{	
			var win = $(window);

			if(win.width() >= 768) {
				var footerHeight = $('.fl-page-footer-wrap').height();
				$('.fl-page').css("margin-bottom", footerHeight);
			}
			if(win.width() < 768) {
				$('.fl-page').css("margin-bottom", "0");
			}
		},

		/**
		 * Nav Left
		 *
		 * @since 1.5
		 * @access private
		 * @method _navLeft
		 */
		 _navLeft: function()
		 {
		 	var win = $(window);

		 	if(win.width() < 992) {
		 		$('.fl-page-header-primary .fl-page-logo-wrap').insertBefore('.fl-page-header-primary .fl-page-nav-col');
		 	}
		 	if(win.width() >= 992) {
		 		$('.fl-page-header-primary .fl-page-nav-col').insertBefore('.fl-page-header-primary .fl-page-logo-wrap');
		 	}

		 	if($('.fl-page-header-fixed').length != 0) {
		 	$('.fl-page-header-fixed .fl-page-fixed-nav-wrap').insertBefore('.fl-page-header-fixed .fl-page-logo-wrap');
		 	}
		 },

		 /**
		 * Shrink Header
		 *
		 * @since 1.5
		 * @access private
		 * @method _shrinkHeader
		 */
		 _shrinkHeader: function()
		 {
		 	var win = $(window);

		 	if(win.width() >= 992) {

		 		var headerHeight = $('.fl-page-header').outerHeight();
		 		
		 
		 		if( $('.fl-page-bar').length != 0 ) {

		 			var topbarHeight      = $('.fl-page-bar').outerHeight(),
		 			    totalHeaderHeight = topbarHeight + headerHeight;
		 			
		 			if($('body.admin-bar').length != 0) {
		 				var topbarHeight = topbarHeight+32;
		 			}
		 			
		 			$('.fl-page-header').css("top", topbarHeight);

		 		} else {
		 			var totalHeaderHeight = headerHeight;
		 		}

		 		$('.fl-page').css("padding-top", totalHeaderHeight);

		 		/* logo css transition hack */
		 		win.load(function() {
				  var logoHeight = $('.fl-logo-img').height();
				  $('.fl-logo-img').css('max-height', logoHeight);
				});


		 		$(win).scroll(function () {
	 		        var distanceY = $(this).scrollTop(),
	 		            shrinkOn = 250,
	 		            header = $(".fl-page-header");
	 		        if ( distanceY > shrinkOn ) {
	 		        	header.addClass("fl-shrink-header");
	 		        } else {
	 		            if (header.hasClass("fl-shrink-header")) {
	 		            	header.removeClass("fl-shrink-header");
	 		            }
	 		        }
		 		});

		 		
		 	} else {
		 		$('.fl-page').css("padding-top", "0");
		 	}


		 },

		 /**
		 * Fixed Header (Fixed Header = Fixed)
		 *
		 * @since 1.5
		 * @access private
		 * @method _fixedHeader
		 */
		 _fixedHeader: function()
		 {
		 	var win = $(window);

		 	if(win.width() >= 992) {

		 		var headerHeight = $('.fl-page-header').outerHeight();
		 		
		 
		 		if( $('.fl-page-bar').length != 0 ) {

		 			var topbarHeight      = $('.fl-page-bar').outerHeight(),
		 			    totalHeaderHeight = topbarHeight + headerHeight;
		 			
		 			if($('body.admin-bar').length != 0) {
		 				var topbarHeight = topbarHeight+32;
		 			}
		 			
		 			$('.fl-page-header').css("top", topbarHeight);

		 		} else {
		 			var totalHeaderHeight = headerHeight;
		 		}

		 		if($('body.fl-scroll-header').length === 0) {
		 			$('.fl-page').css("padding-top", totalHeaderHeight);
		 		}
		 	} else {
		 		$('.fl-page').css("padding-top", "0");
		 	}


		 },
		
		/**
		 * Initializes retina images.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initRetinaImages
		 */
		_initRetinaImages: function()
		{
			var pixelRatio = !!window.devicePixelRatio ? window.devicePixelRatio : 1;
		
			if ( pixelRatio > 1 ) {
				$( 'img[data-retina]' ).each( FLTheme._convertImageToRetina );
			}
		},

		/**
		 * Adds logo as nav item for "centered inline logo" header layout.
		 *
		 * @since 1.5
		 * @access private
		 * @method _centeredInlineLogo
		 */
		 _centeredInlineLogo: function()
		 {
			 	var win               = $(window),
					$logo             = $( '.fl-page-nav-centered-inline-logo .fl-page-header-logo' ),
					$inline_logo      = $( '.fl-logo-centered-inline > .fl-page-header-logo' ),
					$nav              = $( '.fl-page-nav-centered-inline-logo .fl-page-nav .navbar-nav' ),
					nav_li_length     = $nav.children('li').length,
					logo_li_location  = Math.round( nav_li_length / 2 ) - 1;
				
				if(win.width() >= 992 && $inline_logo.length < 1 ) {

					if( $logo.hasClass( 'fl-inline-logo-left' ) && nav_li_length % 2 != 0 ) {
						$nav.children( 'li:nth( '+logo_li_location+' )' ).before( '<li class="fl-logo-centered-inline"></li>' );
					} else {
						$nav.children( 'li:nth( '+logo_li_location+' )' ).after( '<li class="fl-logo-centered-inline"></li>' );
					}

			 	    $nav.children( '.fl-logo-centered-inline' ).append( $logo );
			 	}

			 	if(win.width() < 992) {
			 		$( '.fl-page-nav-centered-inline-logo .fl-page-header-row' ).prepend( $inline_logo );
			 		$( '.fl-logo-centered-inline' ).remove();
			 	}
		 },

		 /**
		 * Hide Header Until Scroll
		 *
		 * @since 1.5
		 * @access private
		 * @method _scrollHeader
		 */
		 _scrollHeader: function()
		 {	
		 	var  win      = $(window),
		 	     distance = $('.fl-page-header-primary').data("fl-distance");

		 	if($('.fl-page-bar').length != 0 ) {
		 		header   = $('.fl-page-header-primary, .fl-page-bar');
		 	} else {
		 		header   = $('.fl-page-header-primary');
		 	}

		 	if(win.width() >= 992) {
		 		$(win).scroll(function () {
		 			if ($(this).scrollTop() > distance) {
		 				//header.fadeIn(200);
		 				header.addClass('fl-show');
		 			} else {
		 				//header.fadeOut(200);
		 				header.removeClass('fl-show');
		 			}
		 		});
		 	}
		 },

		 /**
		 * Mega Menu
		 *
		 * @since 1.5
		 * @access private
		 * @method _megaMenu
		 */
		 _megaMenu: function()
		 {
		 	$('.fl-page-header-primary').find( 'li.mega-menu' ).each(function(){
				var $mega_menu_item      = $(this).children( 'ul' ).children( 'li' ),
					mega_menu_item_count = $mega_menu_item.length;

				$(this).addClass( 'mega-menu-items-' + mega_menu_item_count );

				if($('.fl-page-header-fixed').length != 0 ) {
					$('.fl-page-header-fixed').find( 'li.mega-menu' ).each(function(){
						var $fixed_mega_menu_item      = $(this).children( 'ul' ).children( 'li' ),
							fixed_mega_menu_item_count = $fixed_mega_menu_item.length;

						$(this).addClass( 'mega-menu-items-' + fixed_mega_menu_item_count );
					});
				}

			});
		 },

		 /**
		 * Go to Top
		 *
		 * @since 1.5
		 * @access private
		 * @method _toTop
		 */
		 _toTop: function()
		 {
		 	var win = $(window);
			
		 	$('#fl-to-top').each(function(){
		 	    $(this).click(function(){ 
		 	        $('html,body').animate({ scrollTop: 0 }, 1000);
		 	        return false; 
		 	    });
		 	});

		 	$(win).scroll(function() {

		 	  var scroll = $(this).scrollTop();

		 	  if (scroll > 800) {
		 	    $('#fl-to-top').fadeIn();
		 	  } else {
		 	    $('#fl-to-top').fadeOut();
		 	  }

		 	});
		 	
		 },
		 
		/**
		 * Converts an image to retina.
		 *
		 * @since 1.0
		 * @access private
		 * @method _convertImageToRetina
		 */
		_convertImageToRetina: function()
		{
			var image       = $( this ),
				tmpImage    = new Image(),
				src         = image.attr( 'src' ),
				retinaSrc   = image.data( 'retina' );
				
			if ( '' != retinaSrc ) {
			
				tmpImage.onload = function() {
					image.css( 'max-height', tmpImage.height );
					image.width( tmpImage.width );
					image.attr( 'src', retinaSrc );
				};
				
				tmpImage.src = src; 
			}
		}
	};
	
	$(function(){
		FLTheme.init();
	});

})(jQuery);