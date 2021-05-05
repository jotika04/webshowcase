import React from 'react'
import axios from 'axios'
import { render } from '@testing-library/react'


class PersonList extends React.Component {
    state = {
        list: [],
    }


    componentDidMount() {
        axios.get('https://ghibliapi.herokuapp.com/films')
        .then(res => {
            this.setState({ list: res.data})
        })
    }
    
    render() {
        return(
            <ul>
                {this.state.list.map(list => <li>{list.title}</li>)}
            </ul>
        )
    }
}
export default PersonList;
