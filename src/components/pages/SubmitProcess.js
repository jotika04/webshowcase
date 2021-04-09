import React, {Component} from 'react';
import Submission from './Submission'

export class SubmitProcess extends Component {
    state = {
        step: 1,
        projectName: '',
        major: '',
        classCode: '',
        description: ''
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step : step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step : step - 1
        });
    }

    //Handle changes of fields
    handleChange = input => e => {
        this.setState({[input] : e.target.value});
    }


    render(){
        const { step } = this.state;
        const { projectName, major, classCode, description} = this.state;
        const values = {projectName, major, classCode, description}
        switch(step){
            case 1:
                return(
                    <Submission 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return(
                    <h1>Confirmation :)</h1>
                )
            case 3:
                return(
                    <h1>Success</h1>
                )
        }
    }
}

export default SubmitProcess;