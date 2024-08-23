import { useState } from "react";
import Header from "../../components/Header";
import background from "../../assets/github-gcx-half.png"
import "./styles.css"
import ItemList from "../../components/ItemList"

const App = () => {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const {avatar_url, login, name, bio} = newUser;
      setCurrentUser({avatar_url, login, name, bio});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">        
          <img src={ background } alt="background" className="background-img" />
          <div className="info">
            <div>              
              <input
                value={user} 
                onChange={e => setUser(e.target.value)} 
                name="usuario" 
                placeholder="@username">
              </input>

              <button onClick={handleGetData}>Go</button>

              {currentUser?.name ? (<>
                <div className="perfil">
                  <img src={currentUser.avatar_url} alt="foto do perfil" className="profile"/>

                  <div className="user-info">
                    <h3>{currentUser.name}</h3>
                    <span>{currentUser.login}</span>
                    <p>{currentUser.bio}</p>
                  </div>
                </div>
                <hr />
              </>) : null}
            </div>

            {repos?.length ? (
              <div>
                <div className="repositorio">Repositórios</div>

                { repos.map((item) => (<ItemList title={item.name} link={item.html_url} description={item.description}/> ))}
              </div>
            ) : null }

          </div>
      </div>
    </div>
  );
}

export default App;
