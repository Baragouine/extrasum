class SummaryServicesClass {
    async summarize(text, delimiter) {
        if (text.length === 0)
            return [-1, "Empty text"];

        // TODO: send params to api and get text split and output value (content, salience, novelty, pos. abs, pos. rel)
        const textSplit = text.split(delimiter === "default" ? "." : "\n");

        return [0,
            textSplit.map((sentence) => (
                {sentence:sentence + ".", salience:Math.random(), content:Math.random(), novelty:Math.random(), posAbs:Math.random(), posRel:Math.random()}
            ))
        ];
    }
}

const SummaryServices = new SummaryServicesClass();

export default SummaryServices;
