import React, {Component} from 'react';
import dbPath from '../conn/mongo';
import '../App.css';
export default class TodosList extends Component{
    constructor(props){
        super(props);

        this.state = {
            todos: ''
        }
    }
    async getData(){
        let res = await fetch(dbPath)
        let responseJSON = await res.json();
        this.setState({ todos: responseJSON });
        
    }
    componentDidMount(){
        this.getData();
    }
    async DeleteItem(id){
       let res =  await fetch(dbPath+"/delete/"+id, {
            method: 'DELETE'
        })
        if(res.status === 200){
            this.getData();
        }
        // console.log(res.status);
    }
    setStyles(item){
        if(item === "High"){
            return { background: '#ff8587' }
        }else if(item === "Low"){
            return { background: '#ace08d'}
        }else if(item === "Medium"){
            return { background: '#e3c18f'}
        }
    }
    renderList(){
        if(this.state.todos !== ""){
            let table = []
            this.state.todos.map((item, index) => {
                table.push(
                    <li key={index} className="list-group-item mt-20" style={this.setStyles(item.todo_priority)}>
                        {item.todo_description} <hr/>
                        <div style={{float: 'left'}}>
                            Priority: {item.todo_priority} <br/>
                            Responsible: {item.todo_responsible} <br />
                            Date: {item.todo_date} <br />
                            Hour: {item.todo_hour} <br />
                        </div>
                        <button className="btn btn-danger" onClick={() => this.DeleteItem(item._id)} style={{float: 'right'}}>Delete</button>
                    </li>
                )
                return 0;
            })
            return table;
        }
    }
    render(){
        return(
            <div className="container" style={{marginTop: 20}}>
                <div className="card" style={{width: 100+"%"}}>
                    <ul className="list-group list-group-flush">
                        {this.renderList()}
                    </ul>
                </div>
            </div>
        )
    }
}