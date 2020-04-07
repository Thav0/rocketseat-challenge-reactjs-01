import React, {useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositiories(){
      const response = await api.get('/repositories');

      if(response.data.length === 0) {
        return;
      }

      setRepositories(response.data);
    }

    getRepositiories();
  }, []);

  async function handleAddRepository() {
    try {
      const newRepo = await api.post('/repositories', {
        title: 'Titulo Teste',
        url: "http://www.google.com",
        techs: ["react", "nodejs"],
      })

      setRepositories([...repositories, newRepo.data]);

    } catch (error) {
      console.warn(error.message)
    }
  }

  async function handleRemoveRepository(id) {
    // TODO
    try {

      await api.delete('/repositories/' + id);

      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      alert('Houve um erro ao apagar o repositorio')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => 
        <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
export default App;
