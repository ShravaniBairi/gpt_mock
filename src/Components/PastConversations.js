import React, { useEffect } from 'react'
import '../App.css'

const PastConversations = ({saveData, pastData, setCurrentChat, editFlag}) => {

  useEffect(()=>{
    saveData()
  },[saveData])

  function handleEdit(index){
    //console.log(pastData)
    setCurrentChat(pastData[index].conversation)
    
    const prevData= pastData.filter((data,idx) => index !== idx)
   // console.log(prevData, 'prevData')
    localStorage.setItem('pastConversations',prevData)
    editFlag(true, index)
    
  }
  if(pastData?.length !== 0 && pastData !== undefined ) return (
    <div className='PastConversations'>
      <div className='HistoryHeading'>
      <p >
          Recent Conversations
          </p> 
        <button onClick={() =>saveData()}>↙️</button>

      </div>
        
        <div>
       <ul className="HistoryList">
        {pastData.map((data, index) => {
            return(

               <li className="title">{data.title}
               <button onClick={()=>handleEdit(index)}>⇱</button>
               </li>  
                  
            )
        })}
       </ul>


    </div>
        

    </div>
  )
  else return (
    <div className='PastConversations'>
        <h1>
          Recent Conversations
        </h1>
        <button onClick={() =>saveData()}>New Chat</button>
       
    </div>
  )
}

export default PastConversations