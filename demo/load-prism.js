/*
    html-demo-element.js assumes to be run either from npm by module loader/build or CDN
    When running locally it can be loaded either from node-modules or unpkg CDN
 */

try
{
    await Promise.all(
        [   import ("../node-modules/prismjs/components/prism-core.min.js")
        ,   import ("../node-modules/prismjs/components/prism-markup.min.js")
        ,   import ("../node-modules/prismjs/components/prism-css.min.js")
        ,   import ("../node-modules/prismjs/components/prism-clike.min.js")
        ,   import ("../node-modules/prismjs/components/prism-javascript.min.js")
        ,   import ("../node-modules/prismjs/plugins/autoloader/prism-autoloader.min.js")
        ]);
}catch( _err )
{
    try
    {

    }catch( _err )
    {
        await Promise.all(
        [   import ("https:///prismjs/components/prism-core.min.js")
        ,   import ("../node-modules/prismjs/components/prism-markup.min.js")
        ,   import ("../node-modules/prismjs/components/prism-css.min.js")
        ,   import ("../node-modules/prismjs/components/prism-clike.min.js")
        ,   import ("../node-modules/prismjs/components/prism-javascript.min.js")
        ,   import ("../node-modules/prismjs/plugins/autoloader/prism-autoloader.min.js")
        ]);

    }
}