(function( $ ) {
	'use strict';

	// Insert shortcode into TinyMCE
	$( document ).on( 'click', '.gridable-insert-row-button', function(event) {
		event.preventDefault();
		/**
		 * Create one row shortcode with one column inside
		 */
		var column_content = wp.html.string( {
			tag: 'p',
			content: gridable_editor_params.new_column_content
		});

		var column = wp.html.string({
			tag: 'section',
			attrs: {
				class: "col gridable-mceItem grid__item",
				"data-sh-column-attr-size": "6",
				"data-mce-placeholder": "1",
				"contenteditable": "true"
			},
			content: column_content
		});

		column += wp.html.string({
			tag: 'section',
			attrs: {
				class: "col gridable-mceItem grid__item",
				"data-sh-column-attr-size": "6",
				"data-mce-placeholder": "1",
				"contenteditable": "true"
			},
			content: column_content
		});

		var row = wp.html.string({
			tag: 'section',
			attrs: {
				class: "row gridable-mceItem gridable gridable--grid grid",
				"data-sh-row-attr-cols_nr": "2",
				"data-gridable-row": "1",
				"data-mce-placeholder": "1",
				"contenteditable": "false"
			},
			content: column
		});

		if ( typeof tinyMCE.activeEditor !== "undefined" ) {
		    // We need to disable keeping the scroll position when switching between Visual and Text mode
            // due to the fact that this functionality relies on some inline spans that get autop'd
            // and result in certain cases in &nbsp; characters. Making a solid Regex for this is very tricky.
            tinyMCE.activeEditor.settings.wp_keep_scroll_position = false;
			/**
			 * Insert the new shortcode in the editor
			 */
			tinyMCE.activeEditor.insertContent( row );
			tinyMCE.activeEditor.execCommand('gridableAddResizeHandlers');
		}

		function wpAutoP( content ) {
			if ( switchEditors && switchEditors.wpautop ) {
				content = switchEditors.wpautop(content);
			}
			return content;
		}

	});
})( jQuery );