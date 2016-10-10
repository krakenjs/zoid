
import './component';

if (window.xprops.run) {
    eval(`(function() { ${window.xprops.run} }).call(this);`); // eslint-disable-line
}