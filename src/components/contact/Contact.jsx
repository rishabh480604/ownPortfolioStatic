import React, { useEffect, useState } from 'react'
import './Contact.css'

import {Button, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { contactUs } from '../../actions/user';
function Contact() {
  const [name,setName]=useState('');
  const [subject,setSubject]=useState('');
  const [message,setMessage]=useState('');
  const dispatch=useDispatch();
  const {loading,message:alertMessage,error}=useSelector((state)=>state.update);

  const contactFormHandler=(e)=>{
    e.preventDefault();
    
  
      // const body = encodeURIComponent(`I am ${name}. ${message}`);
      // const to = 'your-email@example.com';
  
      // window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      const sender = encodeURIComponent(name);
      const sub=encodeURIComponent(subject);
      const to = 'rishabh480604@gmail.com';
      // const subject = encodeURIComponent();
      const body = encodeURIComponent(`Dear Rishabh,\n${message} \n \nWarm Regards \n${sender}`);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${sub}&body=${body}`;

      window.open(gmailUrl, '_blank');
    

  }
  useEffect(()=>{
    if(error){
      console.log(error);
      dispatch({type:"CLEAR_ERROR"});
    }
    if(alertMessage){
      console.log(alertMessage);
      dispatch({type:"CLEAR_MESSAGE"});
    }
  })

  return (
    <div className='contact'>
      <div className='contactRightBar'>
        
      </div>
      <div className='contactContainer'>
        <form className='contactContainerForm' onSubmit={contactFormHandler}> 
          <Typography variant='h4'>Contact Us</Typography>
            <input type="text" required placeholder='Name' onChange={(e)=>setName(e.target.value)} className='bg-indigo-100 border text-indigo-600'/>
            <input type="text" required placeholder='subject' onChange={(e)=>setSubject(e.target.value)} className='bg-indigo-100 text-indigo-600'/>

            <textarea rows="10" cols="30" required placeholder='Message' onChange={(e)=>setMessage(e.target.value)} className='bg-indigo-100 text-indigo-600'></textarea>
            <Button variant='contained' type='submit' disabled={loading}>send</Button>
          
        </form>
        
      </div>

      
    </div>
  )
}

export default Contact
