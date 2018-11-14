# quickedit
Super-light weight HTML editor for webpages. 

Notes: Uses contentEditable.

Features

- Changes can be either saved automatically (via ajax) when the editable area loses focus, or inputs updated (to submit changes with a normal form submit)
- Keyboard shortcuts for very basic formatting (bold, italics)

### Examples

#### Use case 1

Simple markup with a url to post changes to specified in the html markup.

```html
<div class="container" data-api="/api">Lorem ipsum</div>
```

Initialise the editor with the defaults. Changes are posted to '/api'

```javascript
$('.container').quickEdit();
```

#### Use case 2

Simpler HTML, with some options specified in javascript

```html
<div class="container">Lorem ipsum</div>
```

Initialise the editor

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
- **onSave**: null, // callback to handle saving
- **onSaved**: function () {} // callback after auto saving

