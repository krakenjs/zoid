
import './component';

if (window.xchild.props.run) {
    eval(`(function() { ${window.xchild.props.run} }).call(this);`); // eslint-disable-line
}