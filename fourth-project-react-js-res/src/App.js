import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import api from './services/api';

import { Form } from './styles';
import backgroundImage from './assets/background.png';

/**
 * // Conceitos importantes:
 * // Componente
 * // Propriedade
 * // Imutabilidade
 */


export default function App(){
  const [ users, setUsers ] = useState([]);
  const [ newName, setNewName] = useState('');
  const [ newEmail, setNewEmail] = useState('');
  const [ newCPF, setNewCPF] = useState('');
  const [ newTelefone, setNewTelefone] = useState('');
  const [ newLogradouro, setNewLogradouro] = useState('');
  const [ newNumero, setNewNumero] = useState('');
  const [ newComplemento, setNewComplemento] = useState('');
  const [ newBairro, setNewBairro] = useState('');
  const [ newCidade, setNewCidade] = useState('');
  const [ newEstado, setNewEstado] = useState('');
  const [ newCEP, setNewCEP] = useState('');

  // useState retorna um array com 2 posicoes
  // 
  // 1. variavel com seu valor inicial 
  // 2. função para atualizacao deste valor 

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data);
    });
  }, []);

  function handleInputChangeNewName(e){ 
    setNewName(e.target.value);
  } 

  function handleInputChangeNewEmail(e){ 
    setNewEmail(e.target.value);
  }
  
  function handleInputChangeNewCPF(e){ 
    setNewCPF(e.target.value);
  }

  function handleInputChangeNewTelefone(e){ 
    setNewTelefone(e.target.value);
  }

  function handleInputChangeNewLogradouro(e){ 
    setNewLogradouro(e.target.value);
  }

  function handleInputChangeNewNumero(e){ 
    setNewNumero(e.target.value);
  }

  function handleInputChangeNewComplemento(e){ 
    setNewComplemento(e.target.value);
  }

  function handleInputChangeNewBairro(e){ 
    setNewBairro(e.target.value);
  }

  function handleInputChangeNewCidade(e){ 
    setNewCidade(e.target.value);
  }

  function handleInputChangeNewEstado(e){ 
    setNewEstado(e.target.value);
  }

  function handleInputChangeNewCEP(e){ 
    setNewCEP(e.target.value);
  }

  async function addNewUser(e) {
    e.preventDefault();
    setNewName(newName);
    setNewEmail(newEmail);
    setNewCPF(newCEP);
    setNewTelefone(newTelefone);
    setNewLogradouro(newLogradouro);
    setNewNumero(newNumero);
    setNewComplemento(newComplemento);
    setNewBairro(newBairro);
    setNewCidade(newCidade);
    setNewEstado(newEstado);
    setNewCEP(newCEP);

    const response = await api.post('users', {
      name: `${newName}`,
      email: `${newEmail}`,
      cpf: `${newCPF}`,
      telefone: `${newTelefone}`,
      logradouro: `${newLogradouro}`,
      numero: `${newNumero}`,
      complemento: `${newComplemento}`,
      bairro: `${newBairro}`,
      cidade: `${newCidade}`,
      estado: `${newEstado}`,
      cep: `${newCEP}`
    });

    const user = response.data;

    console.log(user);

    setUsers([...users, user]); // spread operator
    setNewName('');
    setNewEmail('');
    setNewCPF('');
    setNewTelefone('');
    setNewLogradouro('');
    setNewNumero('');
    setNewComplemento('');
    setNewBairro('');
    setNewCidade('');
    setNewEstado('');
    setNewCEP('');
	
	// Logo abaixo, dentro do return temos o exemplo do fragment <>

  }

  return (
    <Form>
      <img width={200} src={backgroundImage} />
      <br />
      <input 
        type="text"
        placeholder='Informe seu nome'
        value={newName}
        onChange={handleInputChangeNewName} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Informe seu email'
        value={newEmail}
        onChange={handleInputChangeNewEmail} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Informe seu CPF'
        value={newCPF}
        onChange={handleInputChangeNewCPF} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Informe seu telefone'
        value={newTelefone}
        onChange={handleInputChangeNewTelefone} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Logradouro'
        value={newLogradouro}
        onChange={handleInputChangeNewLogradouro} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Número'
        value={newNumero}
        onChange={handleInputChangeNewNumero} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Complemento'
        value={newComplemento}
        onChange={handleInputChangeNewComplemento} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Bairro'
        value={newBairro}
        onChange={handleInputChangeNewBairro} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Cidade'
        value={newCidade}
        onChange={handleInputChangeNewCidade} 
      />
      <br/>
      <input 
        type="text"
        placeholder='Estado'
        value={newEstado}
        onChange={handleInputChangeNewEstado} 
      />
      <br/>
      <input 
        type="text"
        placeholder='CEP'
        value={newCEP}
        onChange={handleInputChangeNewCEP} 
      />
      <br/>
      <Header title="Users">
        <ul>
          {users.map(user =>
          <li key={user.id}>
              <span>{`Nome: `+user.name}</span>
              <span>{` - Email: `+user.email}</span>
              <span>{` - CPF: `+user.cpf}</span>
              <span>{` - Telefone: `+user.telefone}</span>
              <span>{` - Endereço: ${user.logradouro}, ${user.numero} - ${user.complemento} - ${user.bairro}, ${user.cidade} - ${user.estado}, ${user.cep}`}</span>
             </li>)}
        </ul>
      </Header>
      <button type="button" onClick={addNewUser}>Adicionar Usuário</button>
    </Form>
  );
}