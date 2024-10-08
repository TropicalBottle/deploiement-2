import {useState} from "react";
import {render} from "@testing-library/react";

export default function Counter() {
    const [count, setCount] = useState(0);

    const ClickOnMe = () => {
        setCount(count+1);
    }

    return(
        <>
            <button onClick={ClickOnMe}>click me</button>
            <br/>
            <span data-testid="count">{count}</span>
        </>
    )
}