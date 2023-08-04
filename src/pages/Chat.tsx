import { useEffect, useState } from 'react'

import { collection, addDoc, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { database } from '../firebase';
import { format } from 'date-fns';

interface MessageData {
  id: string;
  createdAt: string;
  text: string;
  user: string
}

export function Chat() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [text, setText] = useState('')

  useEffect(() => {
    async function getMessages() {
        const values = query(
          collection(database, 'chats'),
          where('user', 'in', ['tsunode2', 'tsunode']), 
          orderBy('createdAt', 'desc')
        );

        // console.log(values)

        onSnapshot(values, (snapshot) => {
          console.log(snapshot)
          setMessages(
             snapshot.docs.map(doc => ({
                 id: doc.data().id,
                 createdAt: doc.data().createdAt,
                 text: doc.data().text,
                 user: doc.data().user,
             }))
             )
        }
        );
    }
    getMessages();
}, []);


  const submit = (event) => {
    event.preventDefault();
  
    const data = {
      id: crypto.randomUUID(),
      createdAt: format(new Date(), 'MM/dd/yyyy'),
      text,
      user: history.state.usr.name
    }

    console.log(data)
  
    addDoc(collection(database, "chats"), data)
  }

  return (
    <>
      <h1>chat</h1>

     <ul>
      {messages.map(message => (
        <li key={message.id}>
          {message.id} - {message.createdAt} - {message.text} - {message.user}
        </li>
      ))}
     </ul>

      <form onSubmit={submit}>
        <input type="text" onChange={event => setText(event?.target.value)} />
        <button type='submit'>enviar</button>
      </form>

    </>
  )
}
