import "https://unpkg.com/prismjs@1.23.0/components/prism-core.min.js";
import "https://unpkg.com/prismjs@1.23.0/components/prism-markup.min.js";
import "https://unpkg.com/prismjs@1.23.0/plugins/autoloader/prism-autoloader.min.js";

var styles = `
    @import "https://unpkg.com/prismjs@1.23.0/themes/prism.css";
    html-demo-element{ display: block; border: blueviolet dashed 1px; border-radius: 1rem; padding: 1rem; margin: 1rem; }
`

const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet);

for( let el of document.querySelectorAll('html-demo-element') )
    el.initialHTML = el.innerHTML;

    class
HtmlDemoElement extends HTMLElement
{
    connectedCallback()
    {   const  html = Prism.highlight( this.initialHTML, Prism.languages.html, 'html' )
        , pre = document.createElement( 'div' )
        pre.innerHTML = `<h3>${this.title||''}</h3><pre><code class="language-markup" >${html}</code></pre>`;
        this.insertBefore( pre, this.firstChild );
    }
}
window.customElements.define( 'html-demo-element', HtmlDemoElement);
