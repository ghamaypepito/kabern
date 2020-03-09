( function ( $ ) {
	$( function() {
		var toggleContentControls = function () {
			var selectedValue = $( '#customize-control-tesseract_footer_right_content_control :checked' ).val();
			$( '*[id^="customize-control-tesseract_footer_right_content_control_type_"]' ).hide();
			$( '#customize-control-tesseract_footer_right_content_control_type_' + selectedValue ).show();
		};

		wp.customize( 'tesseract_footer_right_content', function( value ) {
			toggleContentControls();
			value.bind( function( to ) {
				toggleContentControls();
			} );
		} );
	} );
} ) ( jQuery );