import styles from './index.module.css';
import sqlLogo from '/src/assets/sql-logo.png';

import {useState} from 'react';
export function App() {

  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit =  async (e) => {
    e.preventDefault();

    const generatedQuery = await generateQuery()
    setSqlQuery(generatedQuery)
    console.log('return from server', generatedQuery);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-type": "application json type"
      },
      body: JSON.stringify({queryDescription: queryDescription}),
    });

    const data = await response.json()
    return data.response.trim();
  }

  return (
    <main className={styles.main}>
        <img src={sqlLogo} alt='' className={styles.icon}/>
        <h3>Generate SQL with AI</h3>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='query-description'
            placeholder='Describe your query'
            onChange={(e) => setQueryDescription(e.target.value)}
          />
          <input type='submit' value="Generate query"/>
        </form>
        <pre>{sqlQuery}</pre>
    </main>
  )
}