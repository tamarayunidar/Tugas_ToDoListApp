import React, { useState, useEffect } from 'react';
import edit from './edit.png';
import hapus from './trash.png';

function Listdata() {
  const [input, setInput] = useState({
    listInput: ""
  });

  const [data, setData] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [ceklisItem, setCeklisItem] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemValue, setEditingItemValue] = useState("");

  const olahInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  }

  const listBaru = (input) => {
    const newItem = {
      id: nextId,
      input: input.listInput
    };
    setNextId(nextId + 1);
    setData([...data, newItem]);
  }

  const add = (event) => {
    event.preventDefault();
    listBaru(input);

    console.log(input.listInput);

    setInput({
      ...input,
      listInput: ""
    });
  }

  const ceklisBox = (id) => {
    setCeklisItem({
      ...ceklisItem,
      [id]: !ceklisItem[id]
    });
  }

  const buttonHapus = (id) => {
    const deletedItem = data.find((item) => item.id === id);
    if (deletedItem) {
      console.log("Data", deletedItem.input, "terhapus");
    }
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const startEditing = (id, value) => {
    setEditingItemId(id);
    setEditingItemValue(value);
  };

  const finishEditing = (id) => {
    if (editingItemValue !== "") {
      const editedItem = data.find((item) => item.id === id);
      if (editedItem) {
        console.log("Data", editedItem.input, "diubah menjadi data", editingItemValue);
        editedItem.input = editingItemValue;
      }
      setEditingItemId(null);
      console.log(data);
    }
  };

  const filterData = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "ALL":
        setDisplayData(data);
        break;
      case "ACTIVE":
        setDisplayData(data.filter(item => !ceklisItem[item.id]));
        break;
      case "COMPLETED":
        setDisplayData(data.filter(item => ceklisItem[item.id]));
        break;
      default:
        setDisplayData(data);
    }
  }

  useEffect(() => {
    console.log(data);
    console.log(ceklisItem);
  }, [data, ceklisItem]);

 
  return (
    <>
        <div className="flex justify-center mb-14">
          <input
            className="input-list border border-solid border-gray-500 rounded py-0.5 px-2.5 w-56"
            type="text"
            name="listInput"
            placeholder="What to do"
            value={input.listInput}
            onChange={olahInput}
          />
          <button className="buttom-add border border-solid border-gray-500 rounded py-0.5 px-5 ml-5" onClick={add}>Add</button>
        </div>
        <div className="flex mb-10">
          <button className="buttom-all border border-solid border-gray-500 rounded-xl py-0.5 px-2.5 mx-1" onClick={() => filterData("ALL")}>ALL</button>
          <button className="buttom-active border border-solid border-gray-500 rounded-xl py-0.5 px-2.5 mx-2" onClick={() => filterData("ACTIVE")}>ACTIVE</button>
          <button className="buttom-completed border border-solid border-gray-500 rounded-xl py-0.5 px-2.5 mx-2" onClick={() => filterData("COMPLETED")}>COMPLETED</button>
        </div>
        <div>
          {data.filter(item => !item.deleted).map((item) => (
            <div key={item.id} className={ceklisItem[item.id] ? "line-through" : ""}>
              <div className='mt-4 border border-solid border-gray-500 rounded px-5 py-2 flex items-center justify-between'>
                {editingItemId === item.id ? (
                  <input
                    className='scale-150'
                    type="text"
                    value={editingItemValue}
                    onChange={(event) => {
                      setEditingItemValue(event.target.value);
                    }}
                    onBlur={() => finishEditing(item.id)}
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="flex items-center">
                      <input
                        className='scale-150 mr-5'
                        type="checkbox"
                        onChange={() => ceklisBox(item.id)}
                        checked={ceklisItem[item.id] || false}
                      />
                      {item.input}
                    </div>
                    <div>
                      <button className='buttonEdit' onClick={() => startEditing(item.id, item.input)}>
                        <img src={edit} alt='icon-edit' className='ml-2 mr-4' />
                      </button>
                      <button className='buttonHapus' onClick={() => buttonHapus(item.id)}>
                        <img src={hapus} alt='icon-hapus' />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
    </>
  );
}

export default Listdata;