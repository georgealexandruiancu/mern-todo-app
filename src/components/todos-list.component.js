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
        // if(item === "High"){
        //     return { color: 'red' }
        // }else if(item === "Low"){
        //     return { color: 'green'}
        // }else if(item === "Medium"){
        //     return { color: 'yellow'}
        // }
    }
    EditTodo = (id) =>{
        window.location = "/edit/"+id;
    }
    renderList(){
        if(this.state.todos !== ""){
            let table = []
            this.state.todos.map((item, index) => {
                table.push(
                    <li key={index} className="list-group-item mt-20 todo_holder" style={this.setStyles(item.todo_priority)}>
                        <div className="todo_item">{item.todo_description}</div>
                        <div className="todo_item">
                            Priority: {item.todo_priority} <br/>
                            Responsible: {item.todo_responsible} <br />
                            Date: {item.todo_date} <br />
                            Hour: {item.todo_hour} <br />
                        </div>
                        <img className="todo_item" src={item.todo_image_path} alt=""/>
                        <div className="todo_item">
                            <button className="btn btn-danger todo_button" onClick={() => this.DeleteItem(item._id)} >Delete</button>
                            <button className="btn btn-warning todo_button" onClick={() => this.EditTodo(item._id)} >Edit</button>
                        </div>
                      
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
                {this.state.todos.length !== 0 ? 
                    <div className="card" style={{width: 100+"%"}}>
                        <ul className="list-group list-group-flush">
                            {this.renderList()} 
                        </ul>
                    </div>
                : <></>}
            </div>
        )
    }
}