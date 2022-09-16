import './MagnificientEqualButton.css';
import Button from "../../Metier/Button/Button";
import * as React from 'react';

const MagnificientEqualButton = (props) => {

    return (
        <Button
            key="equals"
            className="button equals"
            value="="
            onClick={() => {
                props.click();
            }}
        />
    )
}

export default MagnificientEqualButton;
