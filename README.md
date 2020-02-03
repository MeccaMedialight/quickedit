# quickedit
SLW (Super-light weight) jQuery plugin to create HTML editors for webpages. 

Features

- Changes can be either saved automatically (via ajax) when the editable area loses focus, or inputs updated (to submit changes with a normal form submit)
- Keyboard shortcuts for very basic formatting (bold, italics)

### Install

```npm i @luke-mml/quickedit```

### Examples

<a href="https://meccamedialight.com.au/demo/quickedit/demo.html">Demo </a>

#### Use case 1

Simple markup with a data-api attribute to specifiy the  url to post changes to.

```html
<div class="container" data-api="/api">Lorem ipsum</div>
```

Initialise the editor with the defaults. Changes are posted to '/api' (url specified in the html markup). 

```javascript
$('.container').quickEdit();
```

#### Use case 2

Simple markup with a data-target attribute to specify the from input to store changes. 

```html
<form>
<input type="hidden" name="myhiddenfield" value="Lorem ipsum" ?>
<div class="container" data-target="myhiddenfield">Lorem ipsum</div>
...
</form>
```

Changes are submitted to the server with the rest of the form. 

```javascript
$('.container').quickEdit();
```

#### Use case 3

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
- **onSave**: callback to handle saving (if a function is specified, it will be used in preference to any other scheme). If no function is specified, then data-target (for specifying inputs) or data-api (for ajax) will be used. *(default NULL)*
- **onSaved**: callback after auto saving
- **onEditing**: callback after the editor gets focussed or otherwise has changed content
