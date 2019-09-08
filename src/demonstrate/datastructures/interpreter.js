const state = {
    executionStack: [],
    definitions: {
	objects: {
	    stack: {
		initializer: [
		    {
			type: "CREATE_POINTER",
			data: { name: "rootNode" }
		    }
		]
	    },
	    node: {
		pointers: [
		    "next",
		    "value"
		]
	    }
	}
    }
}


const interperter = 0;
