import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css'

function App() {

  const [userName, setUserName] = useState(''); //input state
  const [userMessage , setUserMessage] = useState('');
  const [messageList , setMessageList] = useState([]); //response state
  const [getMessage , setGetMessage] = useState(true); //re recieve messages from server

  //GET request using fetch inside useEffect React hook
  // fetch('https://learning-module-7-oct-20-99e4f-default-rtdb.asia-southeast1.firebasedatabase.app/')
  // .then(responce => responce.json())
  // .then(data => console.log(data))

  //POST request
  const handleSubmitFeedback = () => {

    if(userName === '' || userMessage === ''){
        alert('Please enter all details !!!');
        return;
    }

    fetch('https://learning-module-7-oct-20-99e4f-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json',
      {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          userName : userName,
          userMessage : userMessage
        })
      }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUserName('');
      setUserMessage('');
      alert('Feedback submitted successfully');
      setGetMessage(true);
    })
    
  }

  //GET Request default
  useEffect(() => {

    if(getMessage){

      fetch('https://learning-module-7-oct-20-99e4f-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const loadedFeedback = [];
        for(const key in data){
          loadedFeedback.push(
            {
              id : key,
              userName : data[key].userName,
              userMessage : data[key].userMessage
            }
          )
        }
        setMessageList(loadedFeedback);
      })
      setGetMessage(false)
    }

  }, [getMessage])


  return (
    <div className="app-container">
      <div className='form-container'>
        <h1>Feedback Form</h1>
        <TextField
            required
            id="outlined-required"
            label="Full Name"
            // defaultValue=""
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            sx={{width: '300px'}}
        />
        <TextField
          id="outlined-multiline-static"
          label="Feedback"
          placeholder='Enter your Feedback'
          multiline
          rows={4}
          // defaultValue="Default Value"
          onChange={(e)=> setUserMessage(e.target.value)}
          value={userMessage}
          sx={{width: '300px'}}
        />
        <Button 
          variant="contained"
          onClick={handleSubmitFeedback}
        >
        Submit </Button>
      </div>

      <div className='feedback-container'>
        <h1>Feedback</h1>
        {
          messageList && messageList.map((message , index) => {
            return(
              <div className='feedback-item' key={index}>
                  <h3>{message.userName}</h3> :
                  <p>{message.userMessage}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  ) 
}

export default App
