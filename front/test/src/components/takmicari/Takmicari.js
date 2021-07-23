import React from "react";
import { Table, Button, Form, ButtonGroup } from "react-bootstrap";
import TestAxios from "../../apis/TestAxios";

class Takmicari extends React.Component {
    constructor(props) {
        super(props);

        let search = {
            drzavaId: -1,
            brojMedaljaOd: -1,
            brojMedaljaDo: -1
        }
        this.state = {
            takmicari: [],
            drzave: [],
            search: search
        }
    }

componentDidMount() {
    this.getTakmicari(0);
    this.getDrzave();
}

    async getTakmicari(pageNo) {
        let config = { params: {
          pageNo: pageNo
        } };
        if(this.state.search.drzavaId != -1) {
            config.params['drzavaId'] = this.state.search.drzavaId;
        }
        if(this.state.search.brojMedaljaOd != -1){
            config.params['brojMedaljaOd'] = this.state.search.brojMedaljaOd;
        }
        if(this.state.search.brojMedaljaDo != -1){
            config.params['brojMedaljaDo'] = this.state.search.brojMedaljaDo;
        }
        
        console.log(config);
        try {
          let result = await TestAxios.get("/takmicari", config);
          console.log(result);
       
            this.setState({
              pageNo: pageNo,
              takmicari: result.data,
              totalPages: result.headers["total-pages"]
            
            });
          }
          catch (error) {
          alert("Nije uspelo dobavljanje.");
        }
      }

      async getDrzave() {
        try {
          let result = await TestAxios.get("/drzave");
          
            this.setState({
              drzave: result.data,
            });
          
        } catch (error) {
          alert("Nije uspelo dobavljanje.");
        }
      }
      async delete(takmicarId) {
        try {
            let result = TestAxios.delete("/takmicari/" + takmicarId);
            console.log(result);
            this.deleteFromState(takmicarId);
            alert("Obrisana linija");
        } catch(error) {
            alert("Nije uspesno obrisana");
        }
    }
    deleteFromState(takmicarId) {
        var takmicari = this.state.takmicari;
        takmicari.forEach((element, index) => {
            if(element.id === takmicarId) {
                takmicari.splice(index, 1);
                this.setState({takmicari: takmicari});
            }
        })
    }

    onInputChange(event){
        const name = event.target.name;
        const value = event.target.value
    
        let search = JSON.parse(JSON.stringify(this.state.search));
        search[name] = value;
    
        this.setState({search})
    }

    goToAddTakmicar() {
        this.props.history.push('/takmicari/add');
    }

    goToPrijava(takmicarId) {
        this.props.history.push('/takmicari/' + takmicarId + '/prijava');
    }

    render() {

        return(
                <div>

                <Form>
                <Form.Group>
                    <Form.Label>Drzava takmicara</Form.Label>
                    <Form.Control name="drzavaId" as="select" placeholder="drzava1" onChange={(e)=>this.onInputChange(e)}>
                    <option></option>
                    {
                        this.state.drzave.map(drzava => {
                            return (
                                <option key={drzava.id} value={drzava.id}>{drzava.naziv}</option>
                            )
                        })
                    }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Broj medalja od</Form.Label>
                    <Form.Control as="input" type="number" placeholder="1" name="brojMedaljaOd" onChange={(e)=>this.onInputChange(e)}>
                     
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Broj medalja do</Form.Label>
                    <Form.Control as="input" type="number" placeholder="10"  name="brojMedaljaDo"  onChange={(e)=>this.onInputChange(e)}>
                     
                    </Form.Control>
                </Form.Group>
                <Button onClick={()=>this.getTakmicari()}>Pretrazi</Button>
            </Form>
                <Button  variant="success" onClick={() => this.goToAddTakmicar()}
                style={{ marginLeft: 5 }}>
                    Dodaj takmicara
                </Button>

                <Button variant="warning"  onClick={() => this.goToPrijava()}
                style={{ marginLeft: 5 }}>
                    Statistika
                </Button>

                <ButtonGroup style={{ marginTop: 25, float:"right"}}>
                <Button 
                  style={{ margin: 3, width: 90}}
                  disabled={this.state.pageNo==0} onClick={()=>this.getTakmicari(this.state.pageNo-1)}>
                  Previous
                </Button>
                <Button
                  style={{ margin: 3, width: 90}}
                  disabled={this.state.pageNo==this.state.totalPages-1} onClick={()=>this.getTakmicari(this.state.pageNo+1)}>
                  Next
                </Button>
              </ButtonGroup>
      
              <Table bordered striped style={{ marginTop: 5 }}>
                <thead className="thead-dark">
                  <tr>
                    <th>Ime i prezime takmicara</th>
                    <th>Drzava</th>
                    <th>Datum rodjenja</th>
                    <th>Broj osvojenih medalja</th>
                    <th colSpan={2}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.takmicari.map((takmicar) => {
                    return (
                      <tr key={takmicar.id}>
                        <td>{takmicar.imePrezime}</td>
                        <td>{takmicar.drzava.naziv}</td>
                        <td>{takmicar.datumRodjenja}</td>
                        <td>{takmicar.brojMedalja}</td>
                        <td>
                          
                          <Button
                            variant="danger"
                            onClick={() => this.delete(takmicar.id)}
                            style={{ marginLeft: 5 }}
                          >
                            Obrisi
                          </Button>
                          <Button
                          onClick={() => this.goToPrijava(takmicar.id)}
                          style={{ marginLeft: 5 }}
                        >
                          Prijava
                        </Button>
        
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
                
                
                </div>


        );
    }
}

export default Takmicari;