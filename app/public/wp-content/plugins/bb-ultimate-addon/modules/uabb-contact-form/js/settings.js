(function($){

	FLBuilder.registerModuleHelper('uabb-contact-form', {
    
		init: function() {
			var form      = $( '.fl-builder-settings' ),
				action    = form.find( 'select[name=success_action]' ),
				form_style = form.find( 'select[name=form_style]' ),
				name_toggle 	= form.find( 'select[name=name_toggle]' ),
				email_toggle 	= form.find( 'select[name=email_toggle]' ),
				subject_toggle 	= form.find( 'select[name=subject_toggle]' ),
				phone_toggle 	= form.find( 'select[name=phone_toggle]' ),
				msg_toggle 		= form.find( 'select[name=msg_toggle]' ),
				hover_attribute = form.find('select[name=hover_attribute]'),
				enable_label = form.find( 'select[name=enable_label]' ),
				btn_style   = form.find('select[name=btn_style]');
				
			this._actionChanged();
			this._labelTypography();
			this._updateMailTags();
			this._btn_styleChanged();
			
			action.on( 'change', this._actionChanged );
			form_style.on( 'change', this._labelTypography );
			enable_label.on( 'change', this._labelTypography );
			
			name_toggle.on( 'change', this._updateMailTags );
			email_toggle.on( 'change', this._updateMailTags );
			subject_toggle.on( 'change', this._updateMailTags );
			phone_toggle.on( 'change', this._updateMailTags );
			msg_toggle.on( 'change', this._updateMailTags );
			hover_attribute.on( 'change', $.proxy( this._btn_styleChanged, this ) );
			btn_style.on( 'change', $.proxy( this._btn_styleChanged, this ) );
		},

		_btn_styleChanged: function()
		{
			var form        = $('.fl-builder-settings'),
				btn_style   = form.find('select[name=btn_style]').val(),
				hover_attribute = form.find('select[name=hover_attribute]').val();
				

            if( btn_style == 'transparent' ) {
            	form.find("#fl-field-hover_attribute").show();
        		if( hover_attribute == 'bg' ) {
        			form.find('#fl-field-btn_background_color th label').text('Background Color');
            		form.find('#fl-field-btn_background_hover_color th label').text('Background Hover Color');
                } else {
                	form.find('#fl-field-btn_background_color th label').text('Border Color');
            		form.find('#fl-field-btn_background_hover_color th label').text('Border Hover Color');
                }
            } else {
            	form.find("#fl-field-hover_attribute").hide();
            	form.find('#fl-field-btn_background_color th label').text('Background Color');
            	form.find('#fl-field-btn_background_hover_color th label').text('Background Hover Color');
            }
		},

		_updateMailTags: function() {
			var form      		= $( '.fl-builder-settings' ),
				name_toggle 	= form.find( 'select[name=name_toggle]' ).val(),
				email_toggle 	= form.find( 'select[name=email_toggle]' ).val(),
				subject_toggle 	= form.find( 'select[name=subject_toggle]' ).val(),
				phone_toggle 	= form.find( 'select[name=phone_toggle]' ).val(),
				msg_toggle 		= form.find( 'select[name=msg_toggle]' ).val(),
				cf_mail_tags 	= form.find( '#fl-field-email_template_info .uabb-msg-field .uabb_cf_mail_tags' );

			var tags = Array();

			( name_toggle 	 == 'show' ) ? tags.push('[NAME]') : '';
			( email_toggle 	 == 'show' ) ? tags.push('[EMAIL]') : '';
			( subject_toggle == 'show' ) ? tags.push('[SUBJECT]') : '';
			( phone_toggle 	 == 'show' ) ? tags.push('[PHONE]') : '';
			( msg_toggle 	 == 'show' ) ? tags.push('[MESSAGE]') : '';

			cf_mail_tags.html( tags.join(', ') );
		},
    
		_actionChanged: function() {
			var form      = $( '.fl-builder-settings' ),
				action    = form.find( 'select[name=success_action]' ).val(),
				url       = form.find( 'input[name=success_url]' );
				
			url.rules('remove');
				
			if ( 'redirect' == action ) {
				url.rules( 'add', { required: true } );
			}
		},
		
		_labelTypography: function() {
			var form      = $( '.fl-builder-settings' ),
				form_style = form.find( 'select[name=form_style]' ).val(),
				enable_label = form.find( 'select[name=enable_label]' ).val(),
				label_Section = form.find( '#fl-builder-settings-section-label_typography' );
				

			label_Section.hide();
			if ( form_style == 'style1' && enable_label == 'yes' ) {
				label_Section.show();
			}
						
		}
	});

})(jQuery);