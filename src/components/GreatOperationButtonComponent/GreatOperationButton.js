import './GreatOperationButton.css';
import Button from "../../Metier/Button/Button";
import * as React from 'react';

const GreatOperationButton = (props) => {

    const btnValues = ["+", "-", "*", "/"];

    return (
        <div className="operators-container">
            {
                btnValues.map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            className="operator-button"
                            value={btn}
                            onClick={() => {
                                props.click(btn.toString());
                            }}
                        />
                    );
                })
            }
        </div>
    )
}

export default GreatOperationButton;
