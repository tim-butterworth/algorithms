const randomize = (list) => {
    const result = [];
    const copy = [...list];

    while(copy.length > 0) {
	const randomIndex = Math.floor(Math.random() * copy.length);

	result.push(copy[randomIndex]);

	copy.splice(randomIndex, 1);
    }


    return result;
}

export { randomize };
