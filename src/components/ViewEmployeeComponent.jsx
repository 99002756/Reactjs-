import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Product Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Product Name: </label>
                            <div> { this.state.employee.productName }</div>
                        </div>
                        
                        <div className = "row">
                            <label> Category: </label>
                            <div> { this.state.employee.category }</div>
                        </div>
                        <div className = "row">
                            <label> Price: </label>
                            <div> { this.state.employee.price }</div>
                        </div>
                        <div className = "row">
                            <label> Available Stock: </label>
                            <div> { this.state.employee.availableStock }</div>
                        </div>
                    </div>  

                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent