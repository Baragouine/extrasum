class SummaryServicesClass {
    async summarize(model, text, delimiter) {
        if (text.length === 0)
            return [-1, "Empty text."];

        /*
        // TODO: send params to api and get text split and output value (content, salience, novelty, pos. abs, pos. rel)
        const textSplit = text.split(delimiter === "default" ? "." : "\n");

        return [0,
            textSplit.map((sentence) => (
                {sentence:sentence + ".", salience:Math.random(), content:Math.random(), novelty:Math.random(), posAbs:Math.random(), posRel:Math.random()}
            ))
        ];
        */
       let res = await fetch(process.env.REACT_APP_API_URL, {
            method: "POST",
            body: JSON.stringify({model, text, delimiter}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.status !== 200)
            return [-1, "Unknown error."]

        console.log(res);

        res = await res.json();

        console.log(res);

        return [0, res.result, res.ignored];
    }
}

const SummaryServices = new SummaryServicesClass();

export default SummaryServices;
