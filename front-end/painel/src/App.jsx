import { use, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


export default function App() {

  const [apiData, setApiData] = useState([])
  const [actualServer, setActualServer] = useState([])
  const [actualInfo, setActualInfo] = useState([])

  //Troca de servidor!
  const handleServerChange = (ev) => {
    const idValue = ev.target.value
    const selectedServer = apiData.find(server => server.id === idValue)
    setActualServer(selectedServer)
  }






  //Requisição http
  useEffect(() => {
    axios.get("http://localhost:5174/").then(res => {
      setApiData(Object.values(res.data))
    }).catch(err => [
      console.error('Erro na busca na Api: ', err)
    ])
  }, [])


  return (
    <>
      <section className="navBar">
        <a href=""><img src="icon.svg" alt="Abelgir" width={80} height={80} /></a>
      </section>

      <section className="main-container">
        <div className="side-bar">
          <label htmlFor="server">Escolha um servidor!</label>
          <select name="servers" id="servers" onInput={handleServerChange}>
            <option value="" disabled selected>...</option>
            {apiData.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>



          <label htmlFor="infos">Acessar informação detalhada!</label>
          <select name="infos" id="infos" >
            <option value="">Placeholder</option>
          </select>
        </div>

        <div className="main-data-container">
          <h1>Informações do Servidor: {actualServer.name}</h1>
          {actualServer.id && (
            <div>
              <img src={actualServer.guildImage} height={75} width={80} />
              <table>
                <thead>
                  <tr>
                    <td>Id do servidor:</td>
                    <td>{actualServer.id}</td>
                  </tr>
                  <tr>
                    <td>Nome do servidor</td>
                    <td>{actualServer.name}</td>
                  </tr>
                  <tr>
                    <td>Numero de membros do servidor:</td>
                    <td>{actualServer.memberCount}</td>
                  </tr>
                  <tr>
                    <td>Numero de canais do servidor:</td>
                    <td>{actualServer.channels.length}</td>
                  </tr>
                </thead>
              </table>

              <h1>Membros do Servidor</h1>

              <div className="members">
                {actualServer.members.map((member) =>
                  !member.bot && (
                    <div key={member.id} className='member-card' >
                      <img src={member.memberImage} width={35} height={35} />
                      <p>{member.username}</p>
                    </div>
                  )
                )}
              </div>


            </div>


          )}




        </div>
      </section>


    </>
  )

}