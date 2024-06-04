
import { useState, useCallback, useEffect } from 'react';
import './App.css';
import ChatBody from './Components/ChatBody';
import PastConversations from './Components/PastConversations';

function App() {
  const [currentChat, setCurrentChat] = useState([])
  const [toSave, setToSave] = useState(false)
  const [pastData, setPastData] = useState();
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditindex] = useState()
  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pastConversations")) || []
    console.log("Loaded pastDataaaa from localStorage:", data)
    setPastData(data);
    }, []);
  
  const saveData = useCallback(() => {
    setToSave(toSave => !toSave)
    setCurrentChat([])
    const data = JSON.parse(localStorage.getItem("pastConversations")) 
    console.log("Saved pastConversations to state:", data);
    if(data?.length>0){
      setPastData(data)
    }
  }, [setToSave, setCurrentChat, setPastData])

  function editFlag(isEdit, editIndex){
    setIsEdit(isEdit)
    console.log(isEdit, "editFlag")
    setEditindex(editIndex)
  }

  return (
    <div className="App">
      <PastConversations  
      saveData = {saveData}  
      setCurrentChat = {setCurrentChat} 
      editFlag = {editFlag}
      pastData= {pastData} setPastData= {setPastData} 
      />
      <ChatBody 
      saveData = {saveData} 
      editIndex= {editIndex} 
      currentChat={currentChat} 
      setCurrentChat={setCurrentChat} 
      isEdit= {isEdit} 
      editFlag = {editFlag}/>
    </div>
  );
}

export default App;
