jQuery(document).ready(function() {

	var hashval = window.location.hash,
		hashvalarr = hashval.split( "-" ),
		dataindex = hashvalarr[hashvalarr.length-1],
		tab_id = hashval.replace( '-' + dataindex, '' );

	if( tab_id != '' ) {

	    if( jQuery('.uabb-tabs').find( ' > .uabb-tabs-nav > ul > li[data-index="' + dataindex + '"]' ) ) {
	    	var current_li = jQuery('.uabb-tabs').find( ' > .uabb-tabs-nav > ul > li[data-index="' + dataindex + '"]' ),
				current_li_index = current_li.index(),
				adv_node = current_li.closest('.fl-module').attr('data-node'),
				parent_uabb_tabs = current_li.closest('.uabb-tabs');

			current_li.siblings().removeClass('uabb-tab-current');
			current_li.addClass('uabb-tab-current');

			parent_uabb_tabs.find(' > .uabb-content-wrap > .section').removeClass('uabb-content-current');	
			parent_uabb_tabs.find(' > .uabb-content-wrap > .section:eq('+ current_li_index +')').addClass('uabb-content-current');

			parent_uabb_tabs.find(' > .uabb-content-wrap > .uabb-content-current > .uabb-tab-acc-title.uabb-acc-'+ current_li_index ).trigger('click');
			
			var trigger_args = '.fl-node-'+ adv_node + ' .uabb-content-current';
			// Trigger the Adv Tab Click trigger.
			UABBTrigger.triggerHook( 'uabb-tab-click', trigger_args );

			jQuery('html, body').animate({
		        scrollTop: jQuery( tab_id ).offset().top - 250
		    }, 1000);
		}
	}

	jQuery('.uabb-tabs').find( ' > .uabb-tabs-nav > ul > li' ).on( 'click', function() {
		var current_li = jQuery(this),
			current_li_index = current_li.index(),
			adv_node = current_li.closest('.fl-module').attr('data-node'),
			parent_uabb_tabs = current_li.closest('.uabb-tabs');

		current_li.siblings().removeClass('uabb-tab-current');
		current_li.addClass('uabb-tab-current');

		parent_uabb_tabs.find(' > .uabb-content-wrap > .section').removeClass('uabb-content-current');	
		parent_uabb_tabs.find(' > .uabb-content-wrap > .section:eq('+ current_li_index +')').addClass('uabb-content-current');

		parent_uabb_tabs.find(' > .uabb-content-wrap > .uabb-content-current > .uabb-tab-acc-title.uabb-acc-'+ current_li_index ).trigger('click');
		
		var trigger_args = '.fl-node-'+ adv_node + ' .uabb-content-current';
		// Trigger the Adv Tab Click trigger.
		UABBTrigger.triggerHook( 'uabb-tab-click', trigger_args );
	});


	/* Click for Accordion on Responsive */
	jQuery( '.uabb-tabs' ).find( ' > .uabb-content-wrap > .section > .uabb-tab-acc-title' ).on( 'click', function( e ) {

		var current_tab_acc = jQuery(this),
			adv_node = current_tab_acc.closest('.fl-module').attr('data-node'),
			current_tab_acc_index = current_tab_acc.parent().index(),
			parent_uabb_tabs = current_tab_acc.closest('.uabb-tabs'),
			win  		= jQuery( window );
		

		parent_uabb_tabs.find(' > .uabb-tabs-nav > ul > li').removeClass('uabb-tab-current');
		parent_uabb_tabs.find(' > .uabb-tabs-nav > ul > li:eq(' + current_tab_acc_index + ')').addClass( 'uabb-tab-current' );

		if ( e.originalEvent !== undefined ) {
			current_tab_acc.parent().siblings().find(' > .uabb-tab-acc-content:lt(1)').slideUp(300);
			current_tab_acc.siblings('.uabb-tab-acc-content').slideDown(300, function() {

				if ( current_tab_acc.offset().top < win.scrollTop() + 100 ) {
					jQuery( 'html, body' ).animate({ 
						scrollTop: current_tab_acc.offset().top - 100 
					}, 500, 'swing');
				}
			});

		} else {
			current_tab_acc.parent().siblings().find(' > .uabb-tab-acc-content:lt(1)').css('display','none');
			current_tab_acc.siblings('.uabb-tab-acc-content').css('display','block');
		}

		current_tab_acc.parent().siblings().removeClass('uabb-content-current');
		current_tab_acc.parent().addClass('uabb-content-current');

		var trigger_args = '.fl-node-'+ adv_node + ' .uabb-content-current';
		// Trigger the Adv Tab Click trigger.
		UABBTrigger.triggerHook( 'uabb-tab-click', trigger_args );
        
    });

});