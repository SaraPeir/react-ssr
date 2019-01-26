import React, {Component} from 'react';

class App extends Component {
    
    render(){
        const arrayFromFetch = this.props.arrayFromFetch;
        const mapping = this.props.arrayPropr && this.props.arrayPropr.map(book => <li> {book.title} </li>);
        const showInConsole = (arrayFromFetch) => console.log(arrayFromFetch);
        return(
            <div>
                <h1>Hola {this.props.data} !</h1>
                <ul>
                 {mapping}
                 {showInConsole(arrayFromFetch)}
                </ul>
            </div>
        )
    }
}

export default App;