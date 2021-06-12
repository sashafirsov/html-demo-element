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
    html-demo-element{ display: block; border: blueviolet dashed 1px; border-radius: 1rem; overflow: hidden; }
    html-demo-element>*{ margin: 1rem; }
    [slot="legend"]{ margin: 0; background-color: silver; }
    [slot="legend"]>h3{ margin: 0; padding: 1rem; }
    
`);

for( let el of document.querySelectorAll('html-demo-element') )
    el.initialHTML = el.innerHTML;

const propTypes =
{   source: { type: String }
,   type: { type: String }
,   demo: { type: String }
,   text: { type: String }
,   legend: { type: String }
};

    class
HtmlDemoElement extends HTMLElement
{
    static get observedAttributes(){ return Object.keys(propTypes); }
    static get properties(){ return  propTypes; }

    get source(){ return this._source }
    set source( s )
    {
        const h = s.innerHTML;
        if( h )
            s = h;
        this._source = s;
        this.textSlot && this.render();
        return s;
    }

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
            if( 'legend' === name )
                return this.insertBefore( slot, this.firstChild );
            return template ?    template.parentElement.insertBefore( slot, template )
                            :    this.append( slot );
        };

        if( !this._source )
            this.source = template || this.initialHTML;

        const demoDom = [...this.childNodes];
        template || demoDom.map( el => el.remove() );
        this.textSlot   = createSlot('text'  );
        this.demoSlot   = createSlot('demo'  );
        this.legendSlot = createSlot('legend');
        if( template )
        {   this.demoSlot.innerHTML = '';
            this.demoSlot.append( template.content.cloneNode( true ) );
        }else
            demoDom.map( el=> this.demoSlot.append(el));
        this.render();
    }

    render()
    {   if( this.legendSlot && this.legend )
            this.legendSlot.innerHTML = `<h3>${this.legend}</h3>`;

        const type = this.type || 'html'
        ,     html = Prism.highlight( this._source, Prism.languages[type], type );

        this.textSlot.innerHTML = `<pre><code class="language-markup" >${html}</code></pre>`;
    }
}
window.customElements.define( 'html-demo-element', HtmlDemoElement);
