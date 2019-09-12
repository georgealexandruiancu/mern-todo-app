import React, { Component } from 'react';
import dbPath from '../conn/mongo';

export default class CreateTodos extends Component {

    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_complete: false,
            todo_date: '',
            todo_hour: '',
        }
    }

    onChangeDescription  = (e) => {
        this.setState({todo_description: e.target.value});
    }
    onChangeResponsible = (e) => {
        this.setState({ todo_responsible: e.target.value });
    }
    onChangePriority = (e) => {
        this.setState({ todo_priority: e.target.value });
    }
    onChangeDate = (e) => {
        this.setState({ todo_date: e.target.value });
    }
    onChangeHour = (e) => {
        this.setState({ todo_hour: e.target.value });
    }

    onSubmit = (e) => {

        e.preventDefault();

        console.log(`Form submitted !`);
        console.log(`Todo description: ${this.state.todo_description}`);
        console.log(`Todo responsible: ${this.state.todo_responsible}`);
        console.log(`Todo priority: ${this.state.todo_priority}`);
        console.log(`Todo date: ${this.state.todo_date}`);
        console.log(`Todo hour: ${this.state.todo_hour}`);

        fetch(dbPath+"/add", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(this.state), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                alert("Todo added successful");
                console.log('Success:', JSON.stringify(response))
            })
            .catch(error => console.error('Error:', error));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_complete: false,
            todo_date: '',
            todo_hour: '',
        })
    } 

    render() {
        return (
            <div className="container" style={{marginTop: 40}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">Description</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Responsible</label>
                        <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChangeResponsible} />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                               
                                checked={this.state.todo_priority === 'Low'}
                                onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                               
                                checked={this.state.todo_priority === 'Medium'}
                                onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                               
                                checked={this.state.todo_priority === 'High'}
                                onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Date</label>
                        <input type="date" className="form-control" value={this.state.todo_date} onChange={this.onChangeDate} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Hour</label>
                        <input type="time" className="form-control" value={this.state.todo_hour} onChange={this.onChangeHour} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}