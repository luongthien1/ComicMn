import React from "react";
import { color, motion } from "motion/react"

export default class Puff extends React.Component {
    render() {
        const style = {
            width: this.props.width || "1em",
            height: this.props.height || "1em",
            backgroundColor: this.props.color || "#fff",
        }
        return (
        <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
            duration: 10,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }} 
        class="puff-animation" style={style}>
            <div class="outside"></div>
            <div class="inside"></div>
        </motion.div>
        );
    }
}