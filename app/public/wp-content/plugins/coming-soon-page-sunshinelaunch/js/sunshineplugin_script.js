function ssp_send_email( ){
	e_mail = jQuery( "#ssp_email_input" ).attr('value');
	
	var data = {
		action : 'ssp_ajax_add_email',
		security : MyAjax.security,
		email : e_mail
	};
	jQuery.post(MyAjax.ajaxurl, data, function(response) {
		if ( response == 1 ) {
			show_ty_page();
		} else {
			jQuery( "#ssp_error" ).show();
		}
	});
}

function show_ty_page(){
	jQuery( ".ssp_hide_on_ty" ).hide();
	jQuery( ".ssp_show_on_ty" ).show();
	ssp_custom_ty_js();
}

jQuery("#ssp_countdown").countdown( jQuery( "#ssp_countdown_end" ).html() , function(event) {
	jQuery(this).text(
		event.strftime( jQuery( "#ssp_countdown_format" ).html() )
	);
});

jQuery( "#ssp_show_wp_admin" ).click(function() {
	jQuery( this ).hide();
	jQuery( '#wpadminbar' ).show();
});