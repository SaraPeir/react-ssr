import React, {Component} from 'react';

class App extends Component {
    render(){
        const mapping = this.props.arrayPropr && this.props.arrayPropr.map(book => <li> {book.title} </li>);
        return(
            <div>
                <h1>Hola {this.props.data} !</h1>
                <ul>
                 {mapping}
                </ul>
            </div>
        )
    }
}

export default App;