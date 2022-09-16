import './ItSOverNineThousand.css';

const ItSOverNineThousand = (props) => {

    const text = "It’s Over 9000 !";

    if (!props.show) {
        return null;
    } else {
        return (
            <div id="itsOverNineThousand-container">
                <span id="itsOverNineThousand-before"></span>
                <div id="itsOverNineThousand-content" ><p id="itsOverNineThousand-text" >{text}</p></div>
            </div>
        );
    }
}

export default ItSOverNineThousand;
