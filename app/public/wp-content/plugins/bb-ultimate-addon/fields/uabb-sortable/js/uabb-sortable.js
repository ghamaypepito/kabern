(function($){

    UABBSortable = {

        _init: function( settings )
        {
            var name = settings.name;

            $("#fl-field-" + name).find( ".uabb-sortable" ).sortable({
                  update: function( event, ui ) {
                        var sequence = "",
                            input = $("#fl-field-" + name).find("input[name=" + name + "]");
                        $(this).children().each(function() {
                              var className = "," + $(this).attr("class");
                              sequence += className;
                        });
                        sequence = sequence.replace(/^,/, "");
                        input.val(sequence);
                        input.trigger('keyup');
                  }
            });
        }
    };
    
})(jQuery);