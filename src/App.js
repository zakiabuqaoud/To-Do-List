
import './App.css';
import React from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete,AiFillCloseCircle } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
class App extends React.Component{

  constructor(props) {
    super(props);
    this.state =
        {
            tasks:[],
            taskInputValue:"",
            isEmpty:false,
            isRecurring: false,
            isInputEdit:false
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
                      id: tasksArray.length,
                      title: this.state.taskInputValue,
                      isChecked: false,
                      isEditing:false
                  });
                  this.setState({tasks:[...tasksArray],taskInputValue: '' });
              }else{
                  this.setState({isRecurring:true});// go to render to print message
              }
         }else{
          this.setState({isEmpty:true});// go to render to print message
      }

    }

    //handle change
    handleChange= (event)=>{
        console.log("change");
        this.setState({taskInputValue:event.target.value,isEmpty:false,isRecurring:false});
    }
    //handle delete
    handleDelete(event,id){
        console.log("delete");
        console.log(id);
        const tasksArray = [...this.state.tasks];
        const taskFilterArray = tasksArray.filter((element)=>element.id != id);
        this.setState({tasks:taskFilterArray});
        console.log(this.state.tasks);
    }

//handleCheck
handleCheck = (event,idIsChecked)=>{
    console.log("check");
    const tasksArray = [...this.state.tasks];
    tasksArray[idIsChecked].isChecked = !tasksArray[idIsChecked].isChecked;
    this.setState({tasks:tasksArray});
    console.log(this.state.tasks);
}

    //handle update
    handleUpdate = (event,index)=> {
      console.log("update");
        const tasksArray = [...this.state.tasks];
        const allTasksTitle = this.state.tasks.map((element) => element.title);
        if(this.state.taskInputValue != ""){
            if (!allTasksTitle.includes(this.state.taskInputValue)) {
                tasksArray[index].title = this.state.taskInputValue;
                tasksArray[index].isEditing=false;
                this.setState({tasks:tasksArray,taskInputValue:"",isInputEdit:false});
            }else{
                this.setState({isRecurring:true});
            }
        }else{
            this.setState({isEmpty:true});
        }
        }
    //handle edit
    edit = (event,index)=>{
        console.log("edit");
        const tasksArray = [...this.state.tasks];
        this.setState({taskInputValue:tasksArray[index].title,isInputEdit:true});
        tasksArray[index].isEditing = true;
        this.setState({tasks:tasksArray});
    }
    //handle close
    close = (event,index)=>{
        console.log("close");
        const tasksArray = [...this.state.tasks];
        tasksArray[index].isEditing = false;
        this.setState({tasks:tasksArray,isInputEdit:false});
    }
render() {
    return(
        <div className="container">
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="addTask">
                    <input onChange={this.handleChange} name="task" value={this.state.taskInputValue} type="text"/>
                    {this.state.isInputEdit ? <p></p> :
                        <button type="submit" className="plus">+</button>
                    }
                </div>
                {this.state.isEmpty? <p>EMPTY field</p> : <span></span>}
                {this.state.isRecurring? <p>Recurring field</p> : <span></span>}
            </form>
            {this.state.tasks.map((element,index) =>
             <div className="taskContent">
                 <div>
                 <input onChange={(event) => this.handleCheck(event,index)} type="checkbox"/>
                <span className="Task">{element.title}</span>
                 </div>
                 {element.isEditing ?
                     <div className="updateAndClose">
                        <div  className="update"  onClick={(event) => this.handleUpdate(event, index)}><GrDocumentUpdate/></div>
                         <div  className="close" onClick={(event)=> this.close(event, index)}><AiFillCloseCircle/></div>
                     </div>
                     :

                     <div className="editAndDelete">
                         <div className="edit" onClick={(event)=>this.edit(event,index)}><FaEdit/>
                         </div>
                         <div className="delete" onClick={(event) => this.handleDelete(event, element.id)} >
                             <AiFillDelete/></div>
                     </div>
                 }
            </div>
            )}
        </div>
    )
}
}
export default App;
