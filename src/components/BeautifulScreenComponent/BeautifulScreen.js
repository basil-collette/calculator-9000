import './BeautifulScreen.css';

const BeautifulScreen = (props) => {

    const finalCalcul = (props.store.calcul.length === 0 ) ? "-" : props.store.calcul;

    return (
        <div className="beautifulscreen-container">
            <div id="calculDomElement" className="beautifulscreen-calcul"><p>{finalCalcul}</p></div>

            <div id="resultDomElement" className="beautifulscreen-result"><p>{props.store.result}</p></div>
        </div>
    );
}

export default BeautifulScreen;
