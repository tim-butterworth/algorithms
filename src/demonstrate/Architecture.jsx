import React from 'react';
import * as R from 'ramda';
import { displayEvent } from './displayEvent';
import { DemonstrateStack } from "./datastructures/stack";
import { DemonstrateInsertionSort } from "./datastructures/sorting/insertionsort/DemonstrateInsertionSort";

class Collapsable extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    display: true,
	    title: props.title
	}
    }
    
    render() {
	const toggleDisplay = () => this.setState((previousState, props) => ({ display: (!previousState.display)}))
	const getDisplayComponents = (child, shouldDisplay) => {
	    if (shouldDisplay) {
		return {
		    child,
		    showHide: (<div>hide {this.state.title}</div>)
		};
	    } else {
		return {
		    child: (<div></div>),
		    showHide: <div>show {this.state.title}</div>
		}
	    }
	}
	const displayComponent = getDisplayComponents(this.props.children, this.state.display);

	return (
	    <div>
	    <div onClick={toggleDisplay}>{displayComponent.showHide}</div>
	    {displayComponent.child}
	    </div>
	)
    }
}

class Architecture extends React.Component {

    constructor({ source }) {
	super();

	this.source = source;
    }

    render() {
	return (
	    <div>
	      <div>
	        Achitecture
	      </div>
	      <div>
	        {R.map(displayEvent, this.source.events)}
	      </div>
	      <Collapsable title="stack">
	        <DemonstrateStack/>
	      </Collapsable>
	      <Collapsable title="sorting">
	        <DemonstrateInsertionSort/>
	      </Collapsable>
	    </div>
	);
    }
    
}

export { Architecture };