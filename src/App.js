import React, { useState, useEffect, memo } from "react";
import { injectIntl } from 'react-intl';

let normalComponentCounter = 0;
let memoComponentCounter = 0;
let injectIntlComponentCounter = 0;
let injectIntlInsideMemoComponentCounter = 0;
let normalComponentPlusPropIntlCounter = 0;

const NormalComponent = () => {
    normalComponentCounter = normalComponentCounter + 1;

    return <div>Normal component (without injectIntl and without memo() ): <strong>{normalComponentCounter}</strong> step</div>
};

const MemoComponent = memo(() => {
    memoComponentCounter = memoComponentCounter + 1;

    return <div>Component wrapped in memo(): <strong>{memoComponentCounter}</strong> step</div>
});

const ComponentWithInjectIntlAndMemoInside = injectIntl(memo(((intl) => {
    injectIntlComponentCounter = injectIntlComponentCounter + 1;

    console.log(intl)

    return <div>Component with injectIntl and memo() inside: <strong>{injectIntlComponentCounter}</strong> step</div>
})));

const ComponentWithMemoAndInjectIntlInside = memo(injectIntl((intl) => {
    injectIntlInsideMemoComponentCounter = injectIntlInsideMemoComponentCounter + 1;

    console.log(intl)

    return <div>Component with memo() and injectIntl() inside: <strong>{injectIntlInsideMemoComponentCounter}</strong> step</div>
}));

const NormalComponentPlusPropIntl = memo((intl) => {
    normalComponentPlusPropIntlCounter = normalComponentPlusPropIntlCounter + 1;

    console.log(intl)

    return <div>Normal component with prop intl object: <strong>{normalComponentPlusPropIntlCounter}</strong> step</div>
});

function App(intl) {
    const [counter, setCounter] = useState(1);

    useEffect(
        () => {
            const interval = setInterval(() => setCounter(prevState => prevState + 1), 1000);

            return () => {
                clearInterval(interval)
            }
        }, [setCounter]
    )

    return (
        <div className="App">
            <h2>React-intl injectIntl with memo() and useMemo() re-renders behaviour test</h2>
            <h2>Counter steps: {counter}</h2>
            <NormalComponent />
            <br />
            <MemoComponent />
            <br />
            <ComponentWithInjectIntlAndMemoInside />
            <br />
            <ComponentWithMemoAndInjectIntlInside />
            <br />
            <NormalComponentPlusPropIntl intl={intl} />
        </div>
    );
}

export default injectIntl(App);