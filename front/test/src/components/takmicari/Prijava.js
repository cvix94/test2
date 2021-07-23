import React from 'react';
import TestAxios from '../../apis/TestAxios';
import {Form, Button, Row, Col, InputGroup } from "react-bootstrap";

class Prijava extends React.Component {

    constructor(props){
        super(props);

        let takmicar = {
            imePrezime: "",
            datumRodjenja: "",
            brojMedalja: 0,
            drzava: null
        }

    this.state = {id : 0, takmicar : takmicar, disciplina : ""};
}


    componentDidMount(){
        this.getTakmicarById(this.props.match.params.id);
        
     
    }

    getTakmicarById(takmicarId) {
        TestAxios.get('/takmicari/' + takmicarId)
        .then(res => {
            // handle success
            console.log(res.data);
            let takmicar = {
                id : res.data.id,
                imePrezime: res.data.imePrezime,
                datumRodjenja : res.data.datumRodjenja,
                brojMedalja : res.data.brojMedalja,
                drzava : res.data.drzava
     
            }
            this.setState({takmicar : takmicar});
            
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Takmicar nije dobijen')
         });
    }

    onDisciplinaChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            disciplina: value
        }));
    }

    create(e){
        
        let prijavaDto = {
            destinacija : this.state.destinacija,
            datumPrijave: "2020-06-20 14:00",
            takmicar : this.state.takmicar
        }

        TestAxios.post('/prijave' , prijavaDto)
        .then(res => {
            console.log(res);

            alert('Uspesna prijava');
            this.props.history.push('/takmicari');
        
        })

        .catch(error => {
            console.log(error);

            alert('Error! Neuspesna prijava!');
        });
    }

      render(){
        return (
            <>
            <Row>
                <h1>Prijava za Oi</h1>
            <Col></Col>
            <Col xs="14" sm="12" md="12">
            <Form>
              
                <Form.Label id="Dest">Disciplina</Form.Label>
                <Form.Control type="text" id="Dest" name="disciplina" onChange={(e)=>this.onDisciplinaChange(e)}/> <br/>                              
                <br/>         
                <Button style={{ marginTop: "25px" }}onClick={(e) => this.create(e)}>prijavi</Button>
            </Form>
            </Col>
      
            <Col></Col>
            </Row>
    
        </>
    
        )
    }

}
export default Prijava;    