
var UABBGoogleMaps;

(function($) {
    
    /**
     * Class for Blog Posts Module
     *
     * @since 1.6.1
     */
    UABBGoogleMaps = function( settings ) {
        
        // set params
        this.nodeClass              = '.fl-node-' + settings.id;
        this.id                     = settings.id;
        this.wrapperClass           = this.nodeClass + ' .uabb-google-map-wrapper';
        this.map_lattitude          = settings.map_lattitude;
        this.map_longitude          = settings.map_longitude;
        this.dragging               = ( settings.dragging == "true" );
        this.map_zoom               = settings.map_zoom;
        this.map_expand             = settings.map_expand;
        this.street_view            = ( settings.street_view == "true" );
        this.map_type_control       = ( settings.map_type_control == "true" );
        this.zoom                   = ( settings.zoom == "true" );
        this.zoom_control_position  = settings.zoom_control_position;
        this.map_type               = settings.map_type;
        this.map_style              = ( settings.map_style != '' ) ? jQuery.parseJSON(settings.map_style) : '';
        this.marker_point           = settings.marker_point;
        this.marker_img_src         = settings.marker_img_src;
        this.info_window_text       = settings.info_window_text;
        this.open_marker            = settings.open_marker;
        this.markers                = settings.markers;
        this.enable_info            = settings.enable_info;
        //console.log(settings);
        this._uabbGoogleMapInit();
        
    };

    UABBGoogleMaps.prototype = {

        _uabbGoogleMapInit: function() {

            var image = '',
                mapOptions = '',
                styledMap = '',
                enable_info = '',
                bounds = new google.maps.LatLngBounds();

            if( this.map_style == null ) {
                mapOptions = {
                    zoom: parseInt( this.map_zoom ),
                    center: {lat: parseFloat( this.markers[0].lat ), lng: parseFloat( this.markers[0].lng ) },
                    scrollwheel: ( this.map_expand == 'yes' ) ? false : true,
                    streetViewControl: this.street_view,
                    mapTypeControl: this.map_type_control,
                    zoomControl: this.zoom,
                    draggable: ( $( document ).width() > 641 ) ? true : this.dragging,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition[this.zoom_control_position]
                    },
                    mapTypeId: google.maps.MapTypeId[this.map_type]
                };
            } else {
                mapOptions = {
                    zoom: parseInt( this.map_zoom ),
                    center: {lat: parseFloat( this.markers[0].lat ), lng: parseFloat( this.markers[0].lng ) },
                    scrollwheel: ( this.map_expand == 'yes' ) ? false : true,
                    streetViewControl: this.street_view,
                    mapTypeControl: this.map_type_control,
                    zoomControl: this.zoom,
                    draggable: ( $( document ).width() > 641 ) ? true : this.dragging,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition[this.zoom_control_position]
                    },
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId[this.map_type], 'map_style']
                    }
                };
            }

            map = new google.maps.Map( $( this.nodeClass + ' .uabb-google-map-wrapper' )[0], mapOptions );

            if( this.map_style != null ) {
                styledMap = new google.maps.StyledMapType( this.map_style, { name: "Styled Map" } );
                map.mapTypes.set( 'map_style', styledMap );
                map.setMapTypeId( 'map_style' );
            }

            if( ( this.markers ).length > 0 ) {
                for( i = 0; i < ( this.markers ).length ; i++ ) {

                    if( this.marker_point[i] == 'custom' ) {
                        if( this.marker_img_src[i] != '' ) {
                            image = { 
                                url: this.marker_img_src[i] ,
                                /*scaledSize: new google.maps.Size(1), // scaled size
                                origin: new google.maps.Point(0,0), // origin
                                anchor: new google.maps.Point(0, 0) // anchor*/
                            };
                        } else {
                            image = '';
                        }
                    } else {
                        image = '';
                    }

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng( parseFloat( this.markers[i].lat ), parseFloat( this.markers[i].lng ) ),
                        icon: image,
                        map: map
                    });

                    info_text = this.info_window_text;
                    open_marker = this.open_marker;
                    enable_info = this.enable_info;

                    if ( info_text[i] != '' ) {
                        var infowindow = new google.maps.InfoWindow();
                        var content = "<div class=\"uabb_map_info_text\">" + info_text[i] + "</div>";

                        if ( enable_info[i] == 'yes' ) {
                            infowindow.setContent(content);
                            
                            if ( open_marker[i] == 'no' ) { 
                                infowindow.open( map, marker );
                            }
                                
                            google.maps.event.addListener(marker,'click', ( function( marker, content, infowindow ){ 
                                return function() {
                                    infowindow.setContent(content);
                                    infowindow.open( map, marker );
                                };
                                    
                            })( marker, content, infowindow ) );
                        }
                    }
                }
            }
                    
        }
    };
        
})(jQuery);