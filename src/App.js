
import './App.css';
import React from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
class App extends React.Component{

  constructor(props) {
    super(props);
    this.state =
        {
            tasks:[],
            taskInputValue:"",
            isEmpty:false,
            isRecurring: false,
        };
  }

     //handle Submit
     handleSubmit = (event)=>{
      event.preventDefault();
         const tasksArray = [...this.state.tasks];
         const allTasksTitle = this.state.tasks.map((element) => element.title);

         if(this.state.taskInputValue != ""){
              if (!allTasksTitle.includes(this.state.taskInputValue)) {
                  tasksArray.push({
                      id: tasksArray.length + 1,
                      title: this.state.taskInputValue,
                      isChecked: false
                  });
                  console.log("added");
              }else{
                  this.setState({isRecurring:true});// go to render to print message
              }
         }else{
          this.setState({isEmpty:true});// go to render to print message
      }
         this.setState({ tasks: tasksArray, taskInputValue: '' });
    }

    //handle change
    handleChange= (event)=>{
        console.log("change");
        this.setState({taskInputValue:event.target.value,isEmpty:false,isRecurring:false});
    }
    //handle delete
    handleDelete(event,id){
        console.log("delete");
        event.preventDefault();
        const tasksArray = [...this.state.tasks];
        const taskFilterArray = tasksArray.filter((element)=>element.id != id);
        this.setState({tasks:taskFilterArray});
    }

//handleCheck
handleCheck = (event,idIsChecked)=>{
    console.log("check");
    event.preventDefault();
    const tasksArray = [...this.state.tasks];

    tasksArray.map((element,id)=>{

        if(idIsChecked == id+1){
            element.isChecked = !element.isChecked;
        }
    });

    this.setState({tasks:tasksArray});
    console.log(this.state.tasks);
}
render() {
    return(
        <div className="container">
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="addTask">
                    <input onChange={this.handleChange} name="task" value={this.state.taskInputValue} type="text"/>
                    <button type="submit" className="plus">+</button>
                </div>
                {this.state.isEmpty? <p>EMPTY field</p> : <span></span>}
                {this.state.isRecurring? <p>Recurring field</p> : <span></span>}
            </form>
            {this.state.tasks.map((element,id) =>
             <div className="taskContent">
                 <div>
                 <input onChange={(event) => this.handleCheck(event,id+1)} type="checkbox"/>
                <span className="Task">{element.title}</span>
                 </div>
                 <div className="editAndDelete">
                     <div className="edit"><FaEdit/></div>
                     <div onClick={(event) => this.handleDelete(event,id+1)} className="delete"><AiFillDelete/></div>
                 </div>
            </div>
            )}
        </div>
    )
}
}
export default App;
