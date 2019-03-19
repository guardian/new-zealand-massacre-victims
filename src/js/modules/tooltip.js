import template from '../../templates/tooltip.html'
import { Toolbelt } from '../modules/toolbelt'

var tooltipDecorator = function ( node, data ) {

  var tooltip, handlers, eventName;
  var toolbelt = new Toolbelt()
  var tooltext = data
  var json = { "tooltext": tooltext }

  handlers = {

    mouseover: function () {
      tooltip = document.createElement( 'div' );
      tooltip.className = 'tooltip';
      tooltip.innerHTML = toolbelt.mustache(template, json)
      node.parentNode.parentNode.insertBefore( tooltip, node.parentNode );
    },

    mousemove: function ( event ) {
      tooltip.style.left = event.clientX - node.parentNode.parentNode.getBoundingClientRect().left + 'px';
      tooltip.style.top = ( event.clientY - node.parentNode.parentNode.getBoundingClientRect().top) + 'px';
    },

    click: function () {
      if (tooltip) {
        tooltip.parentNode.removeChild( tooltip );
      }
    },

    mouseleave: function () {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild( tooltip );
      }    
    }
  };

  for ( eventName in handlers ) {
    if ( handlers.hasOwnProperty( eventName ) ) {
      node.addEventListener( eventName, handlers[ eventName ], false );
    }
  }
  return {
    teardown: function () {
      for ( eventName in handlers ) {
        if ( handlers.hasOwnProperty( eventName ) ) {
          node.removeEventListener( eventName, handlers[ eventName ], false );
        }
      }
    }
  };
};

export default tooltipDecorator