import React from "react";
import { SBBContext } from "../../Context/StateBottomBar";
import Puff from "../Animation/Spinner/Puff";

export default class StateBottomBar extends React.Component {
    static contextType = SBBContext;
    render() {
        let sympol = null;
        if (this.context?.state === "loading") {
            sympol = <Puff color="#000" height={"1em"} width={"1em"} />;
        }
        return (
            <div class="state-bottom-bar">
                <Puff color="#ff0000" height={"1em"} width={"1em"} />
            </div>
        );
    }
}