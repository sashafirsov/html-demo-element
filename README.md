# html-demo-element
web component inserts [prism JS syntax colored](https://prismjs.com/) HTML in demo-element before rendered UI for this HTML
[![NPM version][npm-image]][npm-url] 
[![Published on webcomponents.org][wc-image]][wc-url] 

Dependent prism script is located on unpkg.com CDN.

## Sample
The code
```html
<html-demo-element legend="Error case">
    <slotted-element src="https://badUrl.heck">
        <p slot="loading" hidden>Loading... ⏳ </p>
        <p slot="error" hidden>Something went wrong. 😭 </p>
    </slotted-element>
</html-demo-element>

<script type="module" src="https://unpkg.com/html-demo-element@1.0.11/html-demo-element.js"></script>
<script type="module" src="https://unpkg.com/slotted-element@1.0.3/slotted-element.js"></script>
```

renders following content:
![screenshot](screenshot.png?raw=true "screenshot")

# Use
If do not want to use template, include the script BEFORE inner content is modified. I.e. immediately after HTML and before scripts with components.

The use of `template` would defer the demo code injection after the source is rendered:
```html
<html-demo-element legend="Error case">
    <template><i>Candle 🕯️</i></template>
</html-demo-element>
```

When you want to control where the source is located and where to render the code text, use slots:
```html
<html-demo-element>
    <template>ignored</template>
    <template slot="source"> <i>Croissant 🥐️ </i></template>
    <p><code>slot="source"</code> defines where to get code     </p>

    <p><code>slot="demo"  </code> inject the html from source:  </p>
    <div slot="demo"> replaced with tasty demo </div>

    <p><code>slot="text"  </code> inject colored code text:     </p>
    <div slot="text"> replaced with colored code </div>
    
    <div slot="description"></div>
    <div slot="legend"></div>
</html-demo-element>
```

# Live demo
* https://unpkg.com/html-demo-element@1.0.11/demo/index.html
* https://unpkg.com/html-demo-element@1.0.11/demo/advanced.html
* https://unpkg.com/slotted-element@1.0.3/demo/index.html

# API
## Slots
* `source` - the source code node. If omitted it would be taken either from embedded `template` content or
  from embedded into `html-demo-element` dom.
* `text` - placeholder where the highlighted code would be rendered. If omitted the text would be rendered on 
  top of template or top of `html-demo-element` content. 
* `demo` - placeholder where the code would be moved into for displaying live DOM( for HTML type ). 
  If omitted it would be placed beneath of `text` slot 
* `legend` - placeholder where the value of `legend` attribute would be rendered as H3. 
  When omitted, it would be placed on top.
* `description` - placeholder where the value of `description` attribute would be rendered as dd. 
  When omitted, it would be placed on beneath of description.

## Properties and attributes
* `source` - the source code text. If the attribute is not defined, it would be initialized from `source` slot ^^
* `type` - one of [prism js  supported languages](https://prismjs.com/#supported-languages) or `auto`. 
  `html`, `css`, `js` imported by default. When omitted, assumed `html`.
* `legend` - optional heading for `html-demo-element`  
* `description` - additional text in title, bellow the legend
* `src` - optional url to retrieve the source. When `type` is omitted, it is detected from `content-type` or extension.

[npm-image]:      https://img.shields.io/npm/v/html-demo-element.svg
[npm-url]:        https://npmjs.org/package/html-demo-element
[wc-image]:       https://img.shields.io/badge/webcomponents.org-published-blue.svg
[wc-url]:         https://www.webcomponents.org/element/html-demo-element
