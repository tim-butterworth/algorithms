const aggrigateCache = {}
const lastProcessedEvents = {}

const resolveEvent = (state, command) => {
    return {
	entityId: 1,
	data: {}
    }
}

const constructState = (eventSource, entityId, cache) => {
    
}

const getGameCommandHandler = (eventSource) => (command) => {
    const state = constructState(eventSource, command.entityId, aggrigateCache);

    const event = resolveEvent(state, command);

    eventSource.addEvent(event);
}

export { getGameCommandHandler };
