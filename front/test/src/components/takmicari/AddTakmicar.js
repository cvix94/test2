import React from 'react';
import {Row, Col, Form, Button} from "react-bootstrap";
import TestAxios from '../../apis/TestAxios';

class AddTakmicar extends React.Component {

    constructor(props){
        super(props);

        let takmicar = {
            imePrezime: "",
            datumRodjenja: "",
            brojMedalja: 0,
            drzava: null
        }

        this.state = {takmicar: takmicar, drzave: []};
    }

    componentDidMount(){
        this.getDrzave();
    }

    async getDrzave(){
        try{
            let result = await TestAxios.get("/drzave");
            let drzave = result.data;
            this.setState({drzave: drzave});
            console.log("test1");
        }catch(error){
            console.log(error);
            alert("Couldn't fetch drzave");
        }
    }

    async create(e){
        e.preventDefault();

        try{

            let takmicar = this.state.takmicar;
            let takmicarDTO = {
                imePrezime: takmicar.imePrezime,
                datumRodjenja: takmicar.datumRodjenja,
                brojMedalja: takmicar.brojMedalja,
                drzava: takmicar.drzava
            }

            let response = await TestAxios.post("/takmicari", takmicarDTO);
            alert('Added');
            this.props.history.push("/takmicari");
        }catch(error){
            alert("Couldn't save the movie");
        }
    }

    valueInputChanged(e) {
        let input = e.target;
    
        let name = input.name;
        let value = input.value;
    
        let takmicar = this.state.takmicar;
        takmicar[name] = value;
    
        this.setState({ takmicar: takmicar });
      }

    movieSelectionChanged(e){
        // console.log(e);

        let drzavaId = e.target.value;
        let drzava = this.state.drzave.find((drzava) => drzava.id == drzavaId);

        let takmicar = this.state.takmicar;
        takmicar.drzava = drzava;

        this.setState({takmicar: takmicar});
    }

    render(){
        return (
            <>
            <Row>
                <Col></Col>
                <Col xs="12" sm="10" md="8">

                <Form>
                    <Form.Group>
                    <Form.Label htmlFor="pIme">Ime i prezime takmicara</Form.Label>
                    <Form.Control id="pIme" name="imePrezime" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
                    </Form.Group>
                    
                    <Form.Group>
                    <Form.Label htmlFor="pDate">Datum rodjenja</Form.Label>
                    <Form.Control id="pDate" name="datumRodjenja" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label id="pBroj">Broj osvojenih medalja</Form.Label>
                    <Form.Control type="number" id="pBroj" name="brojMedalja" onChange={(e)=>this.valueInputChanged(e)}/> <br/>
                    </Form.Group>

        

                    <Form.Group>
                    <Form.Label htmlFor="pDrzava">Drzava takmicara</Form.Label>
                    <Form.Control as="select" id="pDrzava" onChange={event => this.movieSelectionChanged(event)}>
                        <option></option>
                        {
                            this.state.drzave.map((drzava) => {
                                return (
                                    <option key={drzava.id} value={drzava.id}>{drzava.naziv}</option>
                                )
                            })
                        }
                    </Form.Control><br/>
                    </Form.Group>

                    <Button onClick={(event)=>{this.create(event);}}>Dodaj takmicara</Button>
                </Form>
                </Col>
                <Col></Col>
            </Row>
            </>
        )
    }
}

export default AddTakmicar;

