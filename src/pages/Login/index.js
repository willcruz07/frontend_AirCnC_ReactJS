import React, { useState } from 'react';
import api from '../../services/api';

/** O Parâmetro history vem como default de acesso as rotas para fazer navegação, redirecionamento */
export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
      /* Removendo comportamento padrão do form de renderizar a pagina após ação do botão */
      event.preventDefault();
  
      /* Consumindo api e enviando o email */      
      const response = await api.post('/sessions', { email });
  
      /* Utilizando a desestruturação para pegar o id de dentro do retorno, resp.data */      
      const { _id } = response.data;
  
      /* Armazenando o id do usuário criado no localStorage do navegador */
      localStorage.setItem('user', _id);
      
      history.push('/dashboard');
    };
    
    return (
        <>
            <p> Ofereça <strong> spots </strong> para programadores e encontre <strong> talentos </strong> para sua empresa. </p>

            <form onSubmit={ handleSubmit }> 
                <label htmlFor="email"> Email </label>
                <input 
                    type="email"
                    id="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />  
                <button className="btn" type="submit"> Entrar </button>      
            </form>
        </>
    )
}