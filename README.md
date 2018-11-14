# quickedit
Super-light weight jQuery plugin to create HTML editors for webpages. 

Features

- Changes can be either saved automatically (via ajax) when the editable area loses focus, or inputs updated (to submit changes with a normal form submit)
- Keyboard shortcuts for very basic formatting (bold, italics)

### Examples

#### Use case 1

Simple markup with a url to post changes to specified in the html markup.

```html
<div class="container" data-api="/api">Lorem ipsum</div>
```

Initialise the editor with the defaults. Changes are posted to '/api' (urt specified in the html marlup)

```javascript
$('.container').quickEdit();
```

#### Use case 2

Simpler HTML, with some options specified in javascript

```html
<div class="container">Lorem ipsum</div>
```

Initialise the editor, with a function to handle saving.

```javascript
$('.container').quickEdit({
	allowReturn: true,
	submitOnBlur: true,
	html: true,
	onSave: function (t) {
		// do something clever with the updated text
		console.log("Saving :" + t);
	}
});
```



### Options

- **allowReturn**: false -- if false, return key is blocked  *(default false)*
- **submitOnBlur**: if true (defaut) then the save action is called when losing focus  *(default true)*
- **html**:  if true, use HTML rather than text *(default false)*
- **onSave**: null, // callback to handle saving (if a function is specified, it will be used in preference to any other scheme). If no function is specified, then data-target (for specifying inputs) or data-api (for ajax) will be used. 
- **onSaved**: function () {} // callback after auto saving