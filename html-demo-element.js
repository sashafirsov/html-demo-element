import "https://unpkg.com/prismjs@1.23.0/components/prism-core.min.js";
import "https://unpkg.com/prismjs@1.23.0/components/prism-markup.min.js";
import "https://unpkg.com/prismjs@1.23.0/plugins/autoloader/prism-autoloader.min.js";

const createCss = ( text, el = document.createElement( "style" ) ) =>
{   el.type = "text/css";
    el.innerText = text;
    document.head.appendChild( el );
};
createCss(`
    @import "https://unpkg.com/prismjs@1.23.0/themes/prism.css";
    html-demo-element{ display: block; border: blueviolet dashed 1px; border-radius: 1rem; padding: 1rem; margin: 1rem; }
`);

for( let el of document.querySelectorAll('html-demo-element') )
    el.initialHTML = el.innerHTML;

    class
HtmlDemoElement extends HTMLElement
{
    connectedCallback()
    {   const      $ = x => this.querySelector(x)
        , replaceDom = ( parent, child ) => { parent.innerHTML = ''; parent.append(child); }
        ,   template = $('[slot="source"]') || $('template')
        ,    srcText = template ? template.innerHTML :  this.initialHTML;

        const  html = Prism.highlight( srcText, Prism.languages.html, 'html' )
        ,       pre = document.createElement( 'div' )
        pre.innerHTML = `<h3>${this.title||''}</h3><pre><code class="language-markup" >${html}</code></pre>`;
        if( template )
        {
            const textSlot = $('[slot="text"]')
            ,          ref = template.nextElementSibling || template.parentElement.lastElementChild;
            if( textSlot )
                replaceDom( textSlot, pre );
            else
                template.parentElement.insertBefore( pre, ref );

            const demoDom = template.content.cloneNode( true )
            ,        demo = $('[slot="demo"]')
            if( demo )
                replaceDom( demo, demoDom );
            else
                template.parentElement.insertBefore( demoDom, ref );
        }else
            this.insertBefore( pre, this.firstChild );
    }
}
window.customElements.define( 'html-demo-element', HtmlDemoElement);
