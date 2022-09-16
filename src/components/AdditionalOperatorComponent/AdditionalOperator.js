import Button from "../../Metier/Button/Button";
import './AdditionaltOperator.css';
import * as React from 'react';

const AdditionaltOperator = (props) => {

    return (
        <div className="additionaloperator-container">
            <Button
                key="C"
                className="button addoperator-button"
                value="C"
                onClick={() => {
                    props.clean();
                }}
            />
            <Button
                key="<"
                className="button addoperator-button"
                value="<"
                onClick={() => {
                    props.back();
                }}
            />
        </div>
    )
}

export default AdditionaltOperator;
