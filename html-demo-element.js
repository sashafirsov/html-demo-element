import "https://unpkg.com/prismjs@1.23.0/components/prism-core.min.js";
import "https://unpkg.com/prismjs@1.23.0/components/prism-markup.min.js";
import "https://unpkg.com/prismjs@1.23.0/components/prism-css.min.js";
import "https://unpkg.com/prismjs@1.23.0/components/prism-clike.min.js";
import "https://unpkg.com/prismjs@1.23.0/components/prism-javascript.min.js";
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

const propTypes =
{   source: { type: String }
,   type: { type: String }
,   demo: { type: String }
,   text: { type: HTMLElement }
};

    class
HtmlDemoElement extends HTMLElement
{
    static get observedAttributes(){ return Object.keys(propTypes); }
    static get properties(){ return  propTypes; }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if( this.constructor.observedAttributes.includes(name)
            && name in this.constructor.properties
            && this[name] !== newValue )
        {
            this[name] = newValue;
            this.render();
        }
    }


    connectedCallback()
    {
        const      $ = x => this.querySelector(x)
        ,   template = $( '[slot="source"]' ) || $( 'template' )
        , createSlot = name =>
        {   let slot = $(`[slot="${name}"]`);
            if( slot )
                return slot;
            slot = document.createElement('div');
            slot.setAttribute('slot',name);
            if( template )
            {   const ref = template.nextElementSibling || template.parentElement.lastElementChild;
                template.parentElement.insertBefore( slot, ref );
            }else
                this.insertBefore( slot, this.firstChild );
            return slot;
        };

        if( !this.source )
            this.source = template ? template.innerHTML : this.initialHTML;

        const demoDom = [...this.childNodes];
        template || demoDom.map( el => el.remove() );
        this.demoSlot = createSlot('demo');
        this.textSlot = createSlot('text');
        if( template )
            this.demoSlot.append( template.content.cloneNode(true) );
        else
            demoDom.map( el=> this.demoSlot.append(el));
        this.render();
    }

    render()
    {   const type = this.type || 'html'
        ,     html = Prism.highlight( this.source, Prism.languages[type], type );
        this.textSlot.innerHTML = `<h3>${this.title||''}</h3><pre><code class="language-markup" >${html}</code></pre>`;
    }
}
window.customElements.define( 'html-demo-element', HtmlDemoElement);
