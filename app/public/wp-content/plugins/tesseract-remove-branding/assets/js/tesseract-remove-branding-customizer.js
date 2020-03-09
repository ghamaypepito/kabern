( function( $ ) {
		wp.customize( 'tesseract_footer_right_content_html', function( value ) {
			value.bind( function( to ) {
				$( '#footer-button-container' ).html(to);
			} );
		} );
} )( jQuery )