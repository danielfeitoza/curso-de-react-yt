import React from "react";
class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: "Olá, mundo! Esta é a mensagem inicial."
        }
    }
    render(){
        return(
            <h1>{this.state.message}</h1>
        )
    }
}

export default Test;