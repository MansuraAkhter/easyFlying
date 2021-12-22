
import {useState} from 'react';
import axios from 'axios';



function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  
  async function login() {
    const results = await axios.post("http://localhost:8080/api/user/login", {
      email: email,
      password: password
    }, {
      withCredentials: true
    })
    console.log(results);
  }
  return (
    <div>
    
     <input type="text" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
     <input type="text" value={password} onChange={(event) => {setPassword(event.target.value)}}/>

      <button onClick={login}> Login</button>
    </div>
  );
}

export default App;
