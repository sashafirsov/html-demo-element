# demo-element
inserts syntax colored HTML in demo-element before actual dom

## Sample
The code
<style type="text/css">
.s0 { color: #e8bf6a;}
.s1 { color: #bababa;}
.s2 { color: #a5c261;}
.s3 { color: #a9b7c6;}
.s4 { color: #a9b7c6;}
</style>
<pre><span class="s0">&lt;demo-section </span><span class="s1">title</span><span class="s2">=&quot;Error case&quot;</span><span class="s0">&gt;</span>
    <span class="s0">&lt;slotted-element </span><span class="s1">src</span><span class="s2">=&quot;https://badUrl.heck&quot;</span><span class="s0">&gt;</span>
        <span class="s0">&lt;p </span><span class="s1">slot</span><span class="s2">=&quot;loading&quot; </span><span class="s1">hidden</span><span class="s0">&gt;</span><span class="s4">Loading... ⏳ </span><span class="s0">&lt;/p&gt;</span>
        <span class="s0">&lt;p </span><span class="s1">slot</span><span class="s2">=&quot;error&quot; </span><span class="s1">hidden</span><span class="s0">&gt;</span><span class="s4">Something went wrong. 😭 </span><span class="s0">&lt;/p&gt;</span>
    <span class="s0">&lt;/slotted-element&gt;</span>
<span class="s0">&lt;/demo-section&gt;</span></pre>

renders following content:
<img src="screenshot.png" />