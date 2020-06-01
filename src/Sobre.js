import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BehaviorSubject } from 'rxjs';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class Sobre extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error:null,
      isLoaded: false,
      currentUser: currentUserSubject.asObservable(),
      creditos: [],
      get currentUserValue () { return currentUserSubject.value }
    };
  }
  componentDidMount() {
    const username = "12345678";
    fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username
      })
    }).then(res => {
      if(res.ok) {
        console.log(res);
        return res.json();
      } else {
        throw Error(res.statusText);
      }
    }).then(json => {
      this.setState({
        isLoaded: true,
        token: json
      });
      console.log(json.result.usuario)
      localStorage.setItem('currentUser', JSON.stringify(json.result.usuario));
      sessionStorage.setItem('currentUser', JSON.stringify(json.result.usuario));
      currentUserSubject.next(json.result.usuario);
      return json.result.usuario;
    })
    .catch(error => console.error(error));
    fetch("http://localhost:8000/api/f/creditos", {
      method:"GET",
      headers: {"Authorization": "Bearer " + currentUserSubject.value.token}
    }) 
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            creditos: result.creditos
          });          
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, creditos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
            {creditos.map(item => (
              <li key={item.descricao}>
                {item.descricao} {item.numero}
              </li>
            ))}
        </div>
        
      );
    }
  }
}



// function Sobre() {
  
// }

export default Sobre;