import React, { useContext, useEffect } from "react";
import Dice from "./Dice";

import Styles from "./Dices.module.css";

import { AppContext } from "../App";

const Dices = (props) => {
    let { diceNumSum } = useContext(AppContext);

    const showDices = () => {
        let dices = [];
        let sum = 0;

        for (let i = 0; i < props.diceCounter; i++) {
            let diceNumber = Math.floor(Math.random() * 6) + 1;
            sum += diceNumber;
            dices.push(<Dice key={i} diceNumber={diceNumber} />);
        }

        diceNumSum = sum;
        return dices;
    };

    return (
        <div className={`${Styles.container} ${Styles.gridTemplate}`}>
            {showDices()}
            <span>{diceNumSum}</span>
        </div>
    );
};

export default Dices;
