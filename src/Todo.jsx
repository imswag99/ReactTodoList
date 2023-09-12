import React, { useEffect, useState } from 'react';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import logo from './assets/images/to-do-list.png';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import "./Todo.css"


const updateLocalStorage = () => {
  let localData = localStorage.getItem('list');
  if(localData === []){
    return [];
  }else{
    return JSON.parse(localData);
  }
} 

const Todo = () => {

  const [inputData, setInputData] = useState("");
  const [item, setItem] = useState(updateLocalStorage());
  const [toggle, setToggle] = useState(true);
  const [isEdited, setIsEdited] = useState(null);

  // add item
  const addItem = () => {
    if (!inputData) {

    } else if (inputData && !toggle) {
      setItem(
        item.map((elem) => {
          if(elem.id === isEdited){
            return {...elem, name : inputData}
          }
          return elem;
        })
      )

      setInputData("");
      setToggle(true);

    } else {
      // unique id
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItem([...item, allInputData]);
      setInputData("");
    }
  }

  //delete item
  const delItem = (index) => {
    const updatedData = item.filter((elem) => {
      return index !== elem.id
    })

    setItem(updatedData);
  }

  //edit item
  const editItem = (id) => {
    const newEditItem = item.find((elem) => {
      return id === elem.id;
    })
    setToggle(false);
    setInputData(newEditItem.name);
    setIsEdited(id);
  }

  //local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(item))
  }, [item]);




  return (
    <div className='mainDiv'>
      <div className="centerDiv">
        <figure>
          <img src={logo} alt='logo' className='img' />
          <figcaption>Add Items To List</figcaption>
        </figure>

        <div className="addItems">
          <input type="text" onChange={(e) => { setInputData(e.target.value) }} value={inputData} placeholder='Add an item...' />
          {
            toggle ? <AddIcon className='addBtn' onClick={addItem} /> : <EditIcon className='addBtn' onClick={addItem} />
          }
        </div>

        <div className="showItems">
          {
            item.map((elem) => {
              return <div className="eachItem" key={elem.id}>
                <p>{elem.name}</p>
                <div className='btns'>
                  <EditIcon className='editBtn' onClick={() => editItem(elem.id)} />
                  <DeleteOutlineIcon className='remBtn' onClick={() => delItem(elem.id)} />
                </div>
              </div>
            })
          }
        </div>

        <button className="deleteAll" onClick={() => setItem([])}>Remove All</button>
      </div>
    </div>
  )
}

export default Todo;