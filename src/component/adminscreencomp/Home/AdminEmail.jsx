import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';



export const AdminEmailComp = ({ updateHandler, }) => {
    let [isData, setIsData] = useState({email:'',message:''})
    let { color, admin } = useSelector(state => state.userAuth)
    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value

        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }





    let submitHandler = (e) => {
        e.preventDefault()
        updateHandler(isData)
        return

    }

   
    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {admin && isData && <form className={styles.editForm} onSubmit={submitHandler}>
                    <div className={styles.inputCards}>
                        <label>
                           Client Email
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'email')} value={isData.email} type='text' required />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Message
                        </label>
                        <textarea style={{border:'1px solid grey',padding:'5px',borderRadius:'5px'}} onChange={(e) => handleChangeHandler(e, 'message')} value={isData.message} type='text' required>
                        </textarea>
                    </div>


                

    
                    <div className={styles.buttonContainer} >
                        <button >send email</button>

                    </div>




                </form>}
            </div>






        </div></>)




}