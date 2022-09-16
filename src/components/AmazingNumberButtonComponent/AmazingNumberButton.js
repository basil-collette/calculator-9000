import "./AmazingNumberButton.css";
import Button from "../../Metier/Button/Button";
import * as React from 'react';

const AmazingNumberButton = (props) => {

    const btnValues = [
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        [0]
    ]

    return(
        <div className = "digits" >
        {
            btnValues.map((line) => {
                return (
                    <div key={line} className="digitLine">
                        {
                            line.map((btn, i) => {
                                return (
                                    <Button
                                        key={i}
                                        className="button"
                                        value={btn}
                                        onClick={() => {
                                            props.click(btn);
                                        }}
                                    />
                                );
                            })
                        }
                    </div>
                );
            })
        }
        </div>
    );
}

export default AmazingNumberButton;