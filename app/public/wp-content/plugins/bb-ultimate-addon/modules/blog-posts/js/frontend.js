
var UABBBlogPosts;

(function($) {
    
    /**
     * Class for Blog Posts Module
     *
     * @since 1.6.1
     */
    UABBBlogPosts = function( settings ){
        
        // set params
        this.nodeClass           = '.fl-node-' + settings.id;
        this.id                 = settings.id;
        this.wrapperClass        = this.nodeClass + ' .uabb-blog-posts';
        this.is_carousel         = settings.is_carousel;
        this.infinite         = settings.infinite;
        this.arrows         = settings.arrows;
        this.desktop         = settings.desktop;
        this.medium         = settings.medium;
        this.small         = settings.small;
        this.slidesToScroll         = settings.slidesToScroll;
        this.autoplay         = settings.autoplay;
        this.autoplaySpeed         = settings.autoplaySpeed;
        this.small_breakpoint         = settings.small_breakpoint;
        this.medium_breakpoint         = settings.medium_breakpoint;
        this.equal_height_box         = settings.equal_height_box;

        if( this.is_carousel == 'carousel' ) {
            this._uabbBlogPostCarousel();
            if( this.equal_height_box == 'yes' ) {
                jQuery( this.nodeClass ).find( '.uabb-blog-posts-carousel' ).on('afterChange', this._uabbBlogPostCarouselHeight );
                jQuery( this.nodeClass ).find( '.uabb-blog-posts-carousel' ).on('init', $.proxy( this._uabbBlogPostCarouselEqualHeight, this ) );
            }
        } else if ( this.is_carousel == 'masonary' ) {
            this._uabbBlogPostMasonary();
        }

        if( settings.blog_image_position == 'background' ) {
            //console.log('initiated');
            this._uabbBlogPostImageResize();
        } 
    };

    UABBBlogPosts.prototype = {
        nodeClass               : '',
        wrapperClass            : '',
        is_carousel             : 'grid',
        infinite                : '',
        arrows                  : '',
        desktop                 : '',
        medium                  : '',
        small                   : '',
        slidesToScroll          : '',
        autoplay                : '',
        autoplaySpeed           : '',
        small_breakpoint        : '',
        medium_breakpoint       : '',
        equal_height_box        : 'yes',

        _uabbBlogPostCarousel: function() {
            if( this.equal_height_box == 'yes' ) {
                this._uabbBlogPostCarouselEqualHeight();
                //this._uabbBlogPostGridHeight();
            }

            var grid = jQuery( this.nodeClass ).find( '.uabb-blog-posts-carousel' );

            jQuery( this.nodeClass ).find( '.uabb-blog-posts-carousel' ).uabbslick({
                dots: false,
                infinite: this.infinite,
                arrows: this.arrows,
                lazyLoad: 'ondemand',
                slidesToShow: this.desktop,
                slidesToScroll: this.slidesToScroll,
                autoplay: this.autoplay,
                autoplaySpeed: this.autoplaySpeed,
                adaptiveHeight: false,
                responsive: [
                    {
                        breakpoint: this.medium_breakpoint,
                        settings: {
                            slidesToShow: this.medium
                        }
                    },
                    {
                        breakpoint: this.small_breakpoint,
                        settings: {
                            slidesToShow: this.small
                        }
                    }
                ]
            });
        },

        _uabbBlogPostMasonary: function() {
            var id = this.id,
                nodeClass = this.nodeClass;

            $grid = jQuery( nodeClass ).find('.uabb-blog-posts-masonary').isotope({
                itemSelector: '.uabb-blog-posts-masonary-item-' + this.id,
                masonry: {
                    columnWidth: '.uabb-blog-posts-masonary-item-' + this.id
                }
            });

            
            jQuery( nodeClass ).find('.uabb-masonary-filters .uabb-masonary-filter-' + id).on('click', function(){
                jQuery( this ).siblings().removeClass( 'uabb-masonary-current' );
                jQuery( this ).addClass( 'uabb-masonary-current' );
                var value = jQuery( this ).data( 'filter' );
                $grid.isotope( { filter: value } )
            });

            jQuery( nodeClass + ' .uabb-blog-posts-masonary' ).masonry({
                columnWidth: '.uabb-blog-posts-masonary-item-' + id,
                itemSelector: '.uabb-blog-posts-masonary-item-' + id
            });
        },

        _uabbBlogPostCarouselEqualHeight: function() {
            
            var id = this.id,
                nodeClass = this.nodeClass,
                small_breakpoint = this.small_breakpoint,
                medium_breakpoint = this.medium_breakpoint,
                desktop = this.desktop,
                medium = this.medium,
                small = this.small,
                node = jQuery( nodeClass ),
                grid = node.find( '.uabb-blog-posts' ),
                post_wrapper = grid.find('.uabb-post-wrapper'),
                post_active = grid.find('.uabb-post-wrapper.slick-active'),
                max_height = -1,
                wrapper_height = -1,
                i = 1,
                counter = parseInt( desktop ),
                childEleCount = post_wrapper.length,
                remainingNodes = ( childEleCount % counter );

                if( window.innerWidth <= small_breakpoint ) {
                    counter = parseInt( small );
                } else if( window.innerWidth > medium_breakpoint ) {
                    counter = parseInt( desktop );
                } else {
                    counter = parseInt( medium );
                }

                post_active.each(function() {
                    var $this = jQuery( this ),
                        this_height = $this.outerHeight(),
                        selector = $this.find( '.uabb-blog-posts-shadow' ),
                        blog_post = $this.find( '.uabb-blog-post-inner-wrap' ),
                        selector_height = selector.outerHeight(),
                        blog_post_height = blog_post.outerHeight();

                    if( max_height < blog_post_height ) {
                        max_height = blog_post_height;
                    }

                    if ( wrapper_height < this_height ) {
                        wrapper_height = this_height
                    }
                });

                post_active.each(function() {
                    var $this = jQuery( this );

                    $this.find( '.uabb-blog-posts-shadow' ).css( 'height', max_height );
                });     

                grid.find('.slick-list.draggable').animate({ height: max_height }, { duration: 200, easing: 'linear' });
                //grid.find('.slick-list.draggable').css( 'height', wrapper_height );
                
                max_height = -1;
                wrapper_height = -1;

                post_wrapper.each(function() {
                    $this = jQuery( this ),
                    selector = $this.find( '.uabb-blog-posts-shadow' ),
                    selector_height = selector.outerHeight();

                    if ( $this.hasClass('slick-active') ) {
                        return true;
                    }

                    selector.css( 'height', selector_height );
                });
        },

        _uabbBlogPostCarouselHeight: function( slick, currentSlide ) {
                
            var id = $( this ).parents( '.fl-module-blog-posts' ).data( 'node' ),
                nodeClass = '.fl-node-' + id,
                grid = $( nodeClass ).find( '.uabb-blog-posts-carousel' ),
                post_wrapper = grid.find('.uabb-post-wrapper'),
                post_active = grid.find('.uabb-post-wrapper.slick-active'),
                max_height = -1,
                wrapper_height = -1;
            
            post_active.each(function( i ) {
                var this_height = $( this ).outerHeight(),
                    blog_post = $( this ).find( '.uabb-blog-post-inner-wrap' ),
                    blog_post_height = blog_post.outerHeight();

                if( max_height < blog_post_height ) {
                    max_height = blog_post_height;
                }

                if ( wrapper_height < this_height ) {
                    wrapper_height = this_height
                }
            });

            post_active.each( function( i ) {
                var selector = jQuery( this ).find( '.uabb-blog-posts-shadow' );
                selector.css( "height", max_height );
            });

            grid.find('.slick-list.draggable').animate({ height: max_height }, { duration: 200, easing: 'linear' });
           
            max_height = -1;
            wrapper_height = -1;
            
            post_wrapper.each(function() {
                var $this = jQuery( this ),
                    selector = $this.find( '.uabb-blog-posts-shadow' ),
                    blog_post = $this.find( '.uabb-blog-post-inner-wrap' ),
                    blog_post_height = blog_post.outerHeight();

                if ( $this.hasClass('slick-active') ) {
                    return true;
                }

                selector.css( 'height', blog_post_height );
            });
        },

        _uabbBlogPostImageResize: function() {
            var id = this.id,
                nodeClass = this.nodeClass,
                small_breakpoint = this.small_breakpoint,
                medium_breakpoint = this.medium_breakpoint,
                node = jQuery( nodeClass ),
                grid = node.find( '.uabb-blog-posts' );
            
            grid.find( '.uabb-post-wrapper' ).each(function() {
                var img_selector = jQuery(this).find('.uabb-post-thumbnail'),
                    img_wrap_height = parseInt( img_selector.height() ),
                    img_height = parseInt( img_selector.find('img').height() );
                    
                if( !isNaN( img_wrap_height ) && !isNaN( img_height ) ) {
                    if( img_wrap_height >= img_height ) {
                        img_selector.find('img').css( 'min-height', '100%' );

                    } else {
                        img_selector.find('img').css( 'min-height', '' );
                    }
                }
            });
        }
    };

})(jQuery);