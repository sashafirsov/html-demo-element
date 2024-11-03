import "https://unpkg.com/prismjs@1.29.0/components/prism-core.min.js";
import "https://unpkg.com/prismjs@1.29.0/components/prism-markup.min.js";
import "https://unpkg.com/prismjs@1.29.0/components/prism-css.min.js";
import "https://unpkg.com/prismjs@1.29.0/components/prism-clike.min.js";
import "https://unpkg.com/prismjs@1.29.0/components/prism-javascript.min.js";
import "https://unpkg.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js";

const createCss = ( text, el = document.createElement( "style" ) ) =>
{   el.type = "text/css";
    el.innerText = text;
    document.head.appendChild( el );
};
createCss(`
    @import "https://unpkg.com/prismjs@1.29.0/themes/prism.css";
    html-demo-element{ display: block; border: blueviolet dashed 1px; border-radius: 1rem; overflow: hidden; }
    html-demo-element>*{ margin: 1rem; }
    [slot="legend"],[slot="description"]{ margin: 0; background-color: silver; }
    [slot="legend"]>h3{ margin: 0; padding: 1rem; }
    [slot="legend"]{ border-radius: 1rem 1rem 0 0; }
    [slot="description"]+
    [slot="legend"]{ border-radius: 0 0 1rem 1rem; }
    [slot="description"]{ padding: 0 1rem 1rem 1rem; dd{ padding: 0 !important;margin: 0; }}
    [slot="description"]:has(+[slot="legend"]) { padding-bottom: 0; padding-top: 1rem; }

    pre{overflow:auto;}
`);

for( let el of document.querySelectorAll('html-demo-element') )
    el.initialHTML = el.innerHTML;

const   STR = { type: String }
,       propTypes =
{   source      : STR
,   type        : STR
,   src         : STR
,   demo        : STR
,   text        : STR
,   legend      : STR
,   description : STR
};

    class
HtmlDemoElement extends HTMLElement
{
    static get observedAttributes(){ return Object.keys(propTypes); }
    static get properties(){ return  propTypes; }

    static version = '1.0.10';

    get source(){ return this._source }
    set source( s )
    {
        const h = s?.innerHTML ?? s?.data;
        if( h )
            s = h;
        this._source = s;
        this.textSlot && this.render();
        return s;
    }
    get src(){ this.getAttribute('src'); }
    set src( url ){ this.setAttribute('src',url); }

    attributeChangedCallback(name, oldValue, newValue)
    {
        if( this.constructor.observedAttributes.includes(name)
            && name in this.constructor.properties
            && this[name] !== newValue )
        {
            if( name !== 'src')
                this[name] = newValue;
            this.isInitialized && this.render();
            if( 'src' === name )
            {
                fetch(newValue).then( response =>
                {   if( !this.type || this.getAttribute('type') ==='auto' )
                    {
                        this.contentType = response.headers.get('content-type');
                        const t2t = { json:'js', js:'js', javascript:'js',typescript:'js', html:'html',xml:'html',svg:'html',css:'css',scss:'css',less:'css'};
                        let type;
                        for( let k in t2t )
                            if( this.contentType.includes(k) )
                                type = t2t[k];
                        if( !type ) // guess from extension
                            for( let k in t2t )
                                if( newValue.endsWith(k) )
                                    type = t2t[k];
                        this.type = type;
                    }
                    return response.text();
                }).then( text =>
                {
                    this.source = text;
                    this.isInitialized && this.render();
                });
            }
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
            if( 'legend description'.includes(name) )
                return this.insertBefore( slot, this.firstChild );
            return template ?    template.parentElement.insertBefore( slot, template )
                            :    this.appendChild( slot );
        };

        if( !this._source )
            this.source = template || this.initialHTML || this.innerHTML;

        const demoDom = [...this.childNodes];
        template || demoDom.map( el => el.remove() );
        this.textSlot       = createSlot('text'  );
        this.demoSlot       = createSlot('demo'  );
        this.descriptionSlot= createSlot('description');
        this.legendSlot     = createSlot('legend');
        if( template )
        {   this.demoSlot.innerHTML = '';
            this.demoSlot.append( template.content.cloneNode( true ) );
        }else
            demoDom.map( el=> this.demoSlot.append(el));
        this.isInitialized = 1;
        this.render();
    }

    render()
    {   if( this.legendSlot && this.legend )
            this.legendSlot.innerHTML = `<h3>${this.legend}</h3>`;
        if( this.descriptionSlot && this.description )
            this.descriptionSlot.innerHTML = `<dd>${this.description}</dd>`;

        if( this._source )
        {   const type = this.type || 'html'
            ,     html = Prism.highlight( this._source, Prism.languages[type], type );
            this.textSlot.innerHTML = `<pre><code>${ html }</code></pre>`;
        }
    }
}
if( !window.customElements.get('html-demo-element') )
    window.customElements.define( 'html-demo-element', HtmlDemoElement);
