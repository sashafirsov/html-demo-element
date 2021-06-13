# html-demo-element
inserts [prism JS syntax colored](https://prismjs.com/) HTML in demo-element before actual dom

[![npm package](https://nodei.co/npm/html-demo-element.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/html-demo-element/)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/html-demo-element)

Dependent prism script located on unpkg.com CDN.

## Sample
The code
```html
<html-demo-element legend="Error case">
    <slotted-element src="https://badUrl.heck">
        <p slot="loading" hidden>Loading... ⏳ </p>
        <p slot="error" hidden>Something went wrong. 😭 </p>
    </slotted-element>
</html-demo-element>

<script type="module" src="https://unpkg.com/html-demo-element@1.0.2/html-demo-element.js"></script>
<script type="module" src="https://unpkg.com/slotted-element@1.0.2/slotted-element.js"></script>
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

</html-demo-element>
```

# Live demo
* https://unpkg.com/html-demo-element@1.0.5/demo/index.html
* https://unpkg.com/html-demo-element@1.0.5/demo/advanced.html
* https://unpkg.com/slotted-element@1.0.2/demo/index.html

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

## Properties and attributes
* `source` - the source code text. If the attribute is not defined, it would be initialized from `source` slot ^^
* `type` - one of [prism js  supported languages](https://prismjs.com/#supported-languages). 
  `html`, `css`, `js` imported by default. When omitted, assumed `html`.
* `legend` - optional heading for `html-demo-element`  
