(function($){

    UABBHotspotDraggable = {

        _init: function( settings )
        {
            var form = $( '#fl-builder-settings-section-coordinates' ),
                name = settings.name;

            form.find('.uabb-hotspot-draggable-point').draggable({
                containment: "parent",
                drag: function(event, ui) {
                    var top = $(this).position().top,
                        left = $(this).position().left,
                        wd = form.find('.uabb-hotspot-draggable').width(),
                        ht = form.find('.uabb-hotspot-draggable').height(),
                        coord_value = ( ( left/wd ) * 100 ) + ',' +  ( ( top/ht ) * 100 );
                        
                    form.find('input[name='+name+']').val( coord_value );
                }
            });
        }
    };
    
})(jQuery);
