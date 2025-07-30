import { useState } from 'react'
import S from './Steps.module.css'
import { v4 as uuidv4 } from "uuid"
import {  FaTimes  } from 'react-icons/fa';

export const Steps =() => {
    // состояние формы:
    const [form, setForm] = useState({
        dateForm: '',
        stepsForm:''

    })

    // список результатов  :
    const [results, setResult] = useState([
        { id:'' ,
          date:'',
          steps:''}
    ])



    // обработчик события 'change' у формы:
    const onFormChange =(e)=>{
        console.log('e -', e);
        console.log('e.target -', e.target);
        console.log ('e.target.name: ',e.target.name);
        console.log ('e.target.value: ',e.target.value);

        const { name, value} = e.target;

        setForm((prev) => ({...prev, [name]:value }))

    }

    // обработчик события "submit" формы
    const onFormSubmit = (e)=>{
        e.preventDefault();
        console.log('e -', e);
        console.log('e.target -', e.target);

        const {target}= e ;

        // const elementForm = new FormData (target);
        // const dataForm = Object.fromEntries(elementForm);
        // console.log ('Данные формы : ', dataForm);
        

        setResult ((prev)=> (
            [...prev, 
            {
                id:uuidv4(),
                date: form.dateForm ,
                // steps: form.stepsForm 
                steps: prev.date === form.dateForm ? prev.steps + form.stepsForm : 
                    form.stepsForm                
            } 
        ]));

        setForm ({dateForm:'', stepsForm:''})
        // console.log('resulrs-', results)

    }

    // удаление записи о результате:
    const deleteResult = (id) => {
        setResult ((prev) => prev.filter( (el)=> el.id !== id))
    }

    return (
        <div className={S.container}>
            {/* Форма: */}
            <form className={S.form} onSubmit={onFormSubmit}>  

                <div className={S.date}>
                    <label htmlFor="dateForm"> Дата</label>
                    <input 
                        type="date" 
                        className={S.dateForm}
                        id='dateForm' 
                        name='dateForm' 
                        value ={form.dateForm}
                        placeholder='Введите дату'
                        onChange={onFormChange}
                    />
                </div>

                <div className={S.steps}>
                    <label htmlFor="steps"> Пройдено км :</label>
                    <input 
                        type="text" 
                        className={S.stepsForm}
                        id='steps' 
                        name='stepsForm' 
                        value ={form.stepsForm}
                        onChange={onFormChange}  
                        placeholder='Введите данные'                   
                    />
                </div>
                <button type="submit">Сохранить</button>
            </form>

        {/*  список с датами и колличеством шагов */}
            <div className={S.results}>

                <div className={S.title}>
                    <span>Дата( ДД.MM.ГГГГ )</span>
                    <span>Пройдено км </span>
                    <span>Действия</span>
                </div>

                <ul className={S.results}>
                    { results
                        .sort(function(a,b){  
                                return new Date(b.date) - new Date(a.date);
                        })  
                        .map ( (elem) =>
                            <li  key={elem.id} className = {S.result}>
                                <span>{elem.date.split('-').reverse().join('.')}</span>
                                <span> {elem.steps}</span>
                                <span className={S.icone} onClick={()=>deleteResult(elem.id)}>
                                  {elem.date && <FaTimes/>}
                                </span>                           
                            </li>
                        )                   
                    }                    
                </ul>

            </div>
        </div>
    )
}

// let str2 = str.split('-').reverse().join('.')