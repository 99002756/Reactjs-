import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            productName: '',
            category: '',
            price: '',
            availableStock: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeContestNameHandler = this.changeContestNameHandler.bind(this);
        this.changePhoneNoHandler = this.changePhoneNoHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({productName: employee.ProductName,
                    category : employee.category,
                    price: employee.price,
                    availableStock: employee.availableStock
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {productName: this.state.productName,  category: this.state.category,price: this.state.price,availableStock: this.state.ava};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({productName: event.target.value});
    }
    changeEmailHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeContestNameHandler= (event) => {
        this.setState({price: event.target.value});
    }
    changePhoneNoHandler= (event) => {
        this.setState({availableStock: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Update Product</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Product Name: </label>
                                            <input placeholder="Product Name" name="name" className="form-control" 
                                                value={this.state.productName} onChange={this.changeNameHandler}/>
                                        </div>
                                       
                                        <div className = "form-group">
                                            <label> Category: </label>
                                            <input placeholder="Category" name="category" className="form-control" 
                                                value={this.state.category} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changeContestNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> AvailableStock: </label>
                                            <input placeholder="Available Stock" name="availableStock" className="form-control" 
                                                value={this.state.availableStock} onChange={this.changePhoneNoHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
