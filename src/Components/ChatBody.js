import React, {useState,useCallback, useEffect} from 'react'
import '../App.css'
import {MockData} from '../utils/MockData'
const ChatBody = ({ currentChat, setCurrentChat, saveData, isEdit, editFlag, editIndex}) => {
    const [searchQuestion, setSearchQuestion] = useState('')
    const [pastConversations, setPastConversations] = useState([])

    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem('pastConversations')) || []
      console.log("Loaded pastConversations from localStorage:", storedData);
      setPastConversations(storedData)
    },[])

    const addPastConversations = useCallback((currentChat) => {
      const data = {
        title: currentChat[0]?.question,
        conversation : currentChat
      }
      if (currentChat.length !== 0 ){
      setPastConversations(prevConversations => {
    if (currentChat.length !== 0) {
        if (currentChat.length === 1 && !isEdit) {
            return [...prevConversations, data];
        } else if (prevConversations.length >= 1 && !isEdit) {
            const filterConversation = [...prevConversations];
            filterConversation.pop();
            return [...filterConversation, data];
        } else if (isEdit) {
            const editData = prevConversations.map((conversation, idx) =>
                idx === editIndex ? data : conversation
            );
            if (currentChat.length !== 1) {
                editFlag(false, null);
                console.log('callEditFlag');
            }
            return editData;
        } else {
            
            return prevConversations; // return previous state unchanged
        }
    } else {
        return prevConversations; // return previous state unchanged
    }
});
    }
    
      
    }, [isEdit, editIndex, editFlag])

    /*const addPastConversations = useCallback((chat) => {
      if (chat.length === 0) return;

      const data = {
          title: chat[0]?.question,
          conversation: chat
      };

      setPastConversations(prevConversations => {
          if (isEdit) {
              const editData = prevConversations.map((conversation, idx) =>
                  idx === editIndex ? data : conversation
              );
              return editData;
          } else {
              return [...prevConversations, data];
          }
      });
  }, [isEdit, editIndex]);*/


    
    useEffect(()=>{
      if(currentChat.length > 0) {
        addPastConversations(currentChat)
      }
      },[currentChat, addPastConversations])

    useEffect(()=>{
      if(pastConversations.length>0){
      console.log("Updating localStorage with pastConversations:", pastConversations);
      localStorage.setItem('pastConversations', JSON.stringify(pastConversations))
      }
    }, [pastConversations])
    
    
    


    const handleClick = () =>{
      if(searchQuestion !== '' ){
      const chat = MockData.filter((data) => {
        return data.question === searchQuestion 
      })
      const QuestionAnswer = { question : chat[0]?.question, answer: chat[0]?.response}
      setCurrentChat([...currentChat, QuestionAnswer])
      localStorage.setItem('currentConversation', JSON.stringify(QuestionAnswer))
      setSearchQuestion('')
      
    }
  }
    
 return (
    <div className="ChatBody">
        
        <div className="currentChatbody" >
          {currentChat?.map((currentChat, index) => {
            return <div key={index} className="CurrentChat"> 
            <p>You: {currentChat?.question}</p>
            <p>Gpt: {currentChat?.answer}</p>
            </div>

          })}
          
        </div>
        <div className="SearchBox">
            <input className='inputBox' type='text' 
            value={searchQuestion}
             placeholder='Ask me a question'
            onChange={(e)=>{setSearchQuestion(e.target.value) }} required
            />
            <button onClick={()=>handleClick()}>Ok</button>
            <button onClick= {()=>saveData()}>Save</button>



        </div>
        
    </div>
  )
}

export default ChatBody