import React from 'react';

const displayEvent = (event) => (
	<div>
	  <pre>
	    {JSON.stringify(event)}
          </pre>
	</div>
)

export { displayEvent };
