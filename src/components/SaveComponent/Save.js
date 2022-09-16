import './Save.css';

const Save = (props) => {

    let bodyContent = {
        calcul: props.calcul,
        author: "Basil"
    };

    const headersContent = new Headers();
    headersContent.append('Access-Control-Allow-Origin', '*');
    headersContent.append("Content-Type", "application/json");

    const saveCalcul = async (calcul) => {
        
        let response = await fetch('http://localhost:8080/apiCalculator/', {
            method: 'POST',
            headers: headersContent, 
            body: JSON.stringify(bodyContent)
        });
        //let finalResponseJSON = await response.json();
        console.log(response);
    }

    if (!props.show) {
        return null;
    } else {
        return (
            <div className="saveBtn" onClick={() => saveCalcul(props.calcul)}>
                <div className="svgContainer">
                    <svg className="svg" fill="white" x="0px" y="0px" viewBox="0 0 330 330">
                        <path d="M325.606,84.668L245.334,4.394c-2.813-2.813-6.628-4.393-10.607-4.393H195.02C195.013,0.001,195.007,0,195,0H75  c-0.007,0-0.013,0.001-0.02,0.001H15c-8.284,0-15,6.716-15,15V315c0,8.284,6.716,15,15,15h60h180h60c8.284,0,15-6.716,15-15V95.274  C330,91.296,328.42,87.48,325.606,84.668z M90,30.001h30V70c0,8.284,6.716,15,15,15s15-6.716,15-15V30.001h30V110H90V30.001z   M240,240H90v-30h150V240z M90,300v-30h150v30H90z M300,300h-30V195c0-8.284-6.716-15-15-15H75c-8.284,0-15,6.716-15,15v105H30  V30.001h30V125c0,8.284,6.716,15,15,15h120c8.284,0,15-6.716,15-15V30.001h18.515L300,101.487V300z" />
                    </svg>
                </div>
                <p>Save Calcul</p>
            </div>

            /*
            <Button
                key="save"
                className="saveBtn"
                value="Save"
                onClick={() => {
                    saveCalcul(props.calcul)
                }}
            />
            */
        );
    }
}

export default Save;