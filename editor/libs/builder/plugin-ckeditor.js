

var ckeditorOptions = {
	extraPlugins:"sharedspace",
	sharedSpaces:{
		top: "#wysiwyg-editor",
	}
};

Rigel.WysiwygEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	editor:false,
	toolbar:false,
	
	init: function(doc) {
		this.doc = doc;
		//use default editor toolbar for ckeditor
		this.toolbar = $('#wysiwyg-editor');
		this.toolbar.removeClass("default-editor").addClass("ckeditor");
		this.toolbar.html('');
	},
	
	edit: function(element) {
		this.element = element;
		this.isActive = true;
		this.oldValue = element.html();
		Rigel.Builder.selectPadding = 10;
		//Rigel.Builder.highlightEnabled = false;
		element.attr({'contenteditable':true, 'spellcheckker':false});
		
		CKEDITOR.disableAutoInline = true;
		ckeditorOptions.sharedSpaces.top = this.toolbar.get(0);
		this.editor = CKEDITOR.inline( element.get(0), ckeditorOptions );

		this.toolbar.show();
	},

	destroy: function(element) {
		//this.editor.destroy();
		element.removeAttr('contenteditable spellcheckker');
		//Rigel.Builder.highlightEnabled = true;
		this.toolbar.hide();
		
		node = this.element.get(0);
		Rigel.Undo.addMutation({type:'characterData', 
								target: node, 
								oldValue: this.oldValue, 
								newValue: node.innerHTML});
	}
}
