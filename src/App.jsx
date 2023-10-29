import React, { useEffect, useState } from 'react'
import Axios from "axios";
import Reg from './registrationFile.jsx';
import "./App.css";


const App = () => {
  const [data, setData] = useState("");

  const getData = async()=>{
    const response = await Axios.get("http://localhost:8001");
    setData(response.data);
  }
  

  useEffect(()=>{
    getData()
  },[]);
  

  return (
      <div></div>

  )
}

export default App


////////////////////
/*
import React, { useEffect, useState } from 'react'
import Axios from "axios";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const App = () => {
  const [data, setData] = useState("");

  const getData = async()=>{
    const response = await Axios.get("http://localhost:8000/api");
    setData(response.data);
  }


  useEffect(()=>{
    getData()
  },[]);

  return (
      <div>

      </div>

  )
}

export default App;*/
