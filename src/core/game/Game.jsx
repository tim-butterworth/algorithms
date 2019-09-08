import React from 'react';
import * as R from 'ramda';

import './game.css';

const emptyBoard = R.map(() => R.map(() => "", R.range(0, 3)), R.range(0, 3));

const isPositive = (n) => {
    return (n > 0)
}
const isNegative = (n) => {
    return (n < 0)
}

const selectBorderCss = (row, column) => {
    const result  = []

    if (isPositive(row) && isPositive(column)) {
	result.push(
	    "margin-top"
	    , "margin-left"
	)
    }

    if (isPositive(row) && isNegative(column)) {
	result.push(
	    "margin-top"
	    , "margin-right"
	)
    }

    if (isNegative(row) && isPositive(column)) {
	result.push(
	    "margin-bottom"
	    , "margin-left"
	)
    }

    if (isNegative(row) && isNegative(column)) {
	result.push(
	    "margin-bottom"
	    , "margin-right"
	)
    }

    if (row === 0) {
	if (isPositive(column)) {
	    result.push("margin-left")
	}
	if (isNegative(column)) {
	    result.push("margin-right")
	}
    }

    if (column === 0) {
	if (isPositive(row)) {
	    result.push("margin-top")
	}
	if (isNegative(row)) {
	    result.push("margin-bottom")
	}
    }
    
    return result
}

class Game extends React.Component {

    constructor({ source }) {
	super();

	this.source = source;
	this.state = { board: emptyBoard }
    }

    render() {
	const mapIndexed = R.addIndex(R.map);
	
	return (
	    <div className="board">
	    {
		mapIndexed(
		    (row, rowIndex) => (
			<div
			className="row"
			key={rowIndex}
			>
			{
			    mapIndexed((v, columnIndex) => (
			        <div
				className={R.join(" ", ["cell", ...(selectBorderCss(rowIndex - 1, columnIndex - 1))])}
				key={columnIndex}
				onClick={
				    () => this.setState({ board: emptyBoard })
				}
				>
				{v}
				</div>
			    ), row)
			}
			</div>
		    ),
		    this.state.board
		)
	    }
	    </div>
	);
    }

}

export { Game };
