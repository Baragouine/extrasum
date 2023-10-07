import React, { useEffect, useState } from "react";



const HelpBody = () => {

    return (
        <div
            className="md:mx-8 min-h-screen bg-white text-black"
        >
            <div className="w-full h-full p-4">
                <h1
                    className="text-2xl font-bold"
                >RADSum help</h1>

                <hr className="border my-1"/>

                <h2
                    className="text-lg font-bold mt-4"
                >Summary model selection</h2>
                <p>
                    You can select the summary model from drop-down list in the menu bar (at the root of the application).
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Summarization and entring text</h2>
                <p>
                    Paste your text to be summarized or type it into the text box where "Enter your text here" is displayed.
                    <br/>
                    Press "summarize" to summarize the text or "clear" to clear it all.
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Choice of phrase delimiter</h2>
                <p>
                    In the left-hand block menu, where the header contains "Text", you can choose the sentence delimiter. The default ("default") is the language supported by your model, otherwise ("new line") it will be line breaks.
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Summary model language</h2>
                <p>
                    "en/NYT" and "en/CNN-DailyMail" are text extractive summary models trained on the New York Times and CNN/DailyMail, which are English corpora.
                    <br/>
                    "fr/Wiki-Geography" is a model trained on the French version of Wikipedia articles related to geography.
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Choice of summary length</h2>
                <p>
                    You can choose the length of the summary in the "summary length" group. You can choose the unit of the summary length (number of characters or number of sentences) and the value (number of characters or number of sentences).
                    <br/>
                    The summary will consist of the minimum number of sentences containing the desired number of characters or sentences.
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Customize your summary</h2>
                <p>
                    In the summary menu that appears after you press "summarize", "sort" allows you to reorder the summary sentences, either in document order or in reverse probability order, "filter" allows you to select the features that will be used to calculate the final probability, "show" allows you to select the features that will be visible to the user and "reset" allows you to cancel all customizations made to the summary.
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Ignore a sentence from the summary</h2>
                <p>
                    Once the summary has been generated, you can ignore a sentence in the summary. The application will automatically cross it out and choose the next sentence with the highest probability. You can also re-add this sentence. Press the trash can or the plus button.
                </p>

                <h2
                    className="text-lg font-bold mt-4"
                >Return to edit mode</h2>
                <p>
                    Once the summary has been generated, you can return to edit mode by pressing "edit".
                </p>
            </div>
        </div>
    );
};

export default HelpBody;