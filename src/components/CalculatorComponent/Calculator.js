import TheTitle from '../TheTitleComponent/TheTitle';
import BeautifulScreen from '../BeautifulScreenComponent/BeautifulScreen';
import AmazingNumberButton from '../AmazingNumberButtonComponent/AmazingNumberButton';
import GreatOperationButton from '../GreatOperationButtonComponent/GreatOperationButton';
import MagnificientEqual from '../MagnificientEqualButtonComponent/MagnificientEqualButton';
import ItSOverNineThousand from '../ItSOverNineThousandComponent/ItSOverNineThousand';
import AdditionalOperator from '../AdditionalOperatorComponent/AdditionalOperator';
import Save from '../SaveComponent/Save';
import React, { useState, useEffect } from 'react';
import "./Calculator.css";

const Calculator = (props) => {

    const [state, setState] = useState({
        calcul: [],
        result: 0,
        calculated: false,
        showOver: false,
        showSave: false
    });

    useEffect(() => {
        //console.warn("loaded : ");
    }, []);

    // FUNCTIONS /////////////////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS

    /**
     * Ajoute une entrée utilisateur au tableau du calcul en cours
     * @param {any} element
     */
    const addElement = (element) => {
        const operators = ["+", "*", "/", "-"];
        let temporaryState = { ...state }; //States temporaires

        if (state.calculated) {
            temporaryState = {
                calcul: [],
                result: 0,
                showOver: false,
                calculated: false,
                showSave: false
            };
        }

        if (temporaryState.calcul.length > 0) {
            
            let lastElement = temporaryState.calcul[temporaryState.calcul.length - 1];
            const lastLastElement = temporaryState.calcul[temporaryState.calcul.length - 2];

            if (operators.includes(lastElement)) { //LE DERNER ELEMENT EST UN OPERATEUR : [*, /, +, -];
                if (!operators.includes(element)) { //LA NOUVELLE ENTREE EST UN NOMBRE
                    if (lastElement === "-" && (lastLastElement === undefined || operators.includes(lastLastElement))) { //LE DERNER ELEMENT EST UN "-". On enleve le dernier "-" et on rend négatif la nouvelle entrée
                        let temp = [...temporaryState.calcul];
                        temp.pop();

                        let newLast = (0 - element);

                        temporaryState = {
                            ...temporaryState,
                            calcul: [...temp, newLast]
                        };
                    } else { //LE DERNER ELEMENT EST UN OPERATEUR MAIS PAS "-". On l'ajoute à la pile de calcul
                        temporaryState = {
                            ...temporaryState,
                            calcul: [...temporaryState.calcul, element]
                        };
                    }                    
                } else { //LA NOUVELLE ENTREE EST UN OPERATEUR : [*, /, +, -]; Remplace le précédent opérateur par le nouveau
                    let temp = [...temporaryState.calcul];
                    temp.pop();

                    temporaryState = {
                        ...temporaryState,
                        calcul: [...temp, element]
                    };
                }
            } else { //LE DERNER ELEMENT EST UN NOMBRE
                if (!operators.includes(element)) { //LA NOUVELLE ENTREE EST UN NOMBRE. On l'incrémente au dernier nombre en tant qu'unité
                    if (lastElement !== 0) {
                        let temp = [...temporaryState.calcul];
                        temp.pop();

                        let newNumber = (lastElement * 10) + element;
                        temporaryState = {
                            ...temporaryState,
                            calcul: [...temp, newNumber]
                        };
                    } else {
                        let temp = [...temporaryState.calcul];
                        temp.pop();
                        temporaryState = {
                            ...temporaryState,
                            calcul: [...temp, element]
                        };
                    }
                } else { //LA NOUVELLE ENTREE EST UN OPERATEUR. On l'ajoute à la pile de calcul
                    temporaryState = {
                        ...temporaryState,
                        calcul: [...temporaryState.calcul, element]
                    };
                }
            }
            
        } else {
            let tempOperators = [...operators];
            tempOperators.pop();
            if (!tempOperators.includes(element)) {
                temporaryState = {
                    ...temporaryState,
                    calcul: [element]
                };
            }
        }

        setState({
            ...temporaryState
        });
    }

    /**
     * Process le calcul de l'opération entrée
     */
    const setNewResult = () => {
        let temporaryState = {
            ...state
        }

        let tempCalcul = [...state.calcul];
        tempCalcul = getResultPriority(tempCalcul);
        tempCalcul = getResultFinal(tempCalcul);

        temporaryState = {
            ...temporaryState,
            result: tempCalcul,
            calculated: true
        };

        if (tempCalcul > 9000) {
            temporaryState = {
                ...temporaryState,
                showOver: true
            };
        } else {
            temporaryState = {
                ...temporaryState,
                showOver: false
            };
        }

        setState({
            ...temporaryState,
            showSave: true
        });
    }

    /**
     * Execute dabord les multiplication et division du calcul
     */
    const getResultPriority = (tempCalculArray) => {

        for (let i = 0; i < tempCalculArray.length; i++) {
            if (tempCalculArray[i] === "*") {
                tempCalculArray[i - 1] = multiply(tempCalculArray[i - 1], tempCalculArray[i + 1]);

                tempCalculArray.splice(i, 2);
                i--;
            } else if (tempCalculArray[i] === "/") {
                tempCalculArray[i - 1] = divide(tempCalculArray[i - 1], tempCalculArray[i + 1]);

                tempCalculArray.splice(i, 2);
                i--;
            }
        }

        return tempCalculArray;
    }

    /**
     * Execute les additions et soustractions du calcul
     */
    const getResultFinal = (tempCalculArray) => {

        for (let i = 0; i < tempCalculArray.length; i++) {
            if (tempCalculArray[i] === "+") {
                tempCalculArray[i - 1] = add(tempCalculArray[i - 1], tempCalculArray[i + 1]);

                tempCalculArray.splice(i, 2);
                i--;
            } else if (tempCalculArray[i] === "-") {
                tempCalculArray[i - 1] = substract(tempCalculArray[i - 1], tempCalculArray[i + 1]);

                tempCalculArray.splice(i, 2);
                i--;
            }
        }

        return tempCalculArray;
    }

    const add = (first, second) => {
        return first + second;
    }

    const substract = (first, second) => {
        return first - second;
    }

    const multiply = (first, second) => {
        return first * second;
    }

    const divide = (first, second) => {
        return first / second;
    }

    const cleanCalcul = () => {
        setState({
            calcul: [],
            result: 0,
            calculated: false,
            showOver: false,
            showSave: false
        });
    }

    const popLastElement = () => {
        let newCalcul = [...state.calcul];
        newCalcul.pop();

        setState({
            ...state,
            calcul: newCalcul
        });
    }

    // RENDERING ///////////////////////////////////////////////////////////////////////////////////////////////////////////// RENDERING

    return(
        <div className="main-container" >

            <TheTitle />

            <div id="calculator">
                <BeautifulScreen store={state} /*currentCalcul={state.calcul} result={state.result}*/ />

                <AdditionalOperator clean={cleanCalcul} back={popLastElement} />

                <div id="buttons">
                    <AmazingNumberButton click={addElement} />

                    <div className="operators">
                        <GreatOperationButton click={addElement} />

                        <MagnificientEqual click={setNewResult} />
                    </div>
                </div>

                <ItSOverNineThousand show={state.showOver} />

                <Save calcul={state.calcul.join("")} show={state.showSave} />
            </div>

        </div>
    );

    
}

export default Calculator;

