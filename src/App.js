import React, { useEffect } from "react";
import api from './services/api';
import "./styles.css";
import { useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepositories(resp.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Teste',
      url: 'https://github.com/mrenanjr/teste',
      techs: ['Node.js', 'React.js']
    })

    setRepositories([ ...repositories, response.data ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
