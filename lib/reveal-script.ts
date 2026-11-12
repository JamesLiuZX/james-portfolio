/**
 * Inlined into the document by the root layout and run before hydration.
 *
 * Scroll reveals used to be `whileInView` props on motion components, which
 * meant every revealed section stayed invisible until the animation bundle had
 * loaded and React had hydrated. Driving them from a few lines of inline
 * script instead lets the reveals work as soon as the markup exists, and lets
 * the `Reveal` wrapper stay a server component with no client bundle at all.
 *
 * `__revealScan` is left on `window` so that client-side navigations can ask
 * for a rescan; see `components/reveal-rescan.tsx`. Watching the DOM for new
 * nodes instead would mean re-querying the document on every mutation React
 * makes while hydrating, which is exactly the main-thread time this change
 * exists to avoid.
 *
 * Kept as a string so it ships verbatim — it must not be transpiled into
 * anything that assumes module scope.
 */
export const REVEAL_BOOTSTRAP = `(function(){
var d=document,r=d.documentElement;
r.classList.remove('no-js');
if(!('IntersectionObserver' in window)){r.classList.add('reveal-all');return}
var io=new IntersectionObserver(function(entries){
for(var i=0;i<entries.length;i++){var e=entries[i];
if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}
},{rootMargin:'0px 0px -80px 0px'});
var queued=0;
function scan(){queued=0;
var els=d.querySelectorAll('.reveal:not(.is-in)');
for(var i=0;i<els.length;i++){io.observe(els[i])}}
function schedule(){if(queued)return;queued=1;requestAnimationFrame(scan)}
window.__revealScan=schedule;
schedule();
d.addEventListener('DOMContentLoaded',schedule);
window.addEventListener('load',schedule);
})();`
