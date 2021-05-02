import React , { useState , useEffect } from 'react'
import Alert from './Alert';
import './App.css'
import List from './List';

const getLocalStorge = () => {
    let list = localStorage.getItem('list');
    if(list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}
const App = () => {
    const[name , setName ] = useState('');
    const[list , setList ] = useState(getLocalStorge());
    const[isEditing , setIsEditing ] = useState(false);
    const[editID , setEditID ] = useState(null);
    const[alert , setAlert ] = useState({
            show: false,
            msg: '', 
            type: ''
        });

    const handelSubmit = e => {
        e.preventDefault();
        if(!name) {
            // isplay Alert
            showAlert(true , 'من فضلك ادخل العنصر' , 'danger');
        } else if (name && isEditing) {
            // Deal With Edit
            setList(list.map(item => {
                if(item.id === editID) {
                    return {...item , title: name};
                }
                    return item;
            }));
            setName('');
            setEditID(null);
            setIsEditing(false);
            showAlert( true , 'تم تغيير العنصر' , 'success');
        } else {
            // Show Alert
            showAlert(true , 'تم اضافة عنصر للقائمة' , 'success');
            const newItem = { id: new Date().getTime().toString() , title: name};
            setList([...list , newItem]);
            setName('');
        }
    }
    const showAlert = (show=false , msg='' , type='' ) => {
        setAlert({show , msg , type });
    }
    const clearList = () => {
        showAlert(true , 'القائمة فارغة' , 'danger');
        setList([]);
    }
    const removeItem = (id) => {
        showAlert(true , 'تم حذف العنصر' , 'danger');
        setList(list.filter( item => item.id !== id));
    }
    const editItem = (id) => {
        const specificItem = list.find( item => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(specificItem.title);
    }
    useEffect( () => {
        localStorage.setItem('list' , JSON.stringify(list));
    } , [list]);
    return (
        <section className='section-center'>
            <form className='grocery-form' onSubmit={handelSubmit}>
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
                <h3>مشتريات البقالة</h3>
                <div className='form-control'>
                    <input 
                        type='text'
                        placeholder='مثلا فول'
                        value={name}
                        className='grocery'
                        onChange={ (e) => setName(e.target.value)}
                    />
                    <button className='submit-btn' type='submit'>
                        {isEditing ? 'تعديل' : 'اضافة'}
                    </button>

                </div>

            </form>
            {list.length > 0 && 
                <div className='grocery-container'>
                    <List items={list} removeItem={removeItem} editItem={editItem} />
                    <button className='clear-btn' onClick={clearList}>حذف جميع العناصر</button>
                </div>
            }
            
        </section>
    )
}

export default App
