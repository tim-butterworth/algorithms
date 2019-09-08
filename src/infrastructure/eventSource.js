const events = [];

const eventSourceProvider = () => ({
    events,
    writeEvent: (event) => events.push(event)
})

export { eventSourceProvider };
