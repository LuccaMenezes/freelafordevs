import './Register.css'

import logo from '../../assets/svg/team.svg';

import Input from '../../components/Forms/Input/Input'

import { Link } from 'react-router-dom'

const Register = () => {
  
  function handleChange(e) {

  }

  return (
    <section className="container">
      <div className='box'>
      <h2>Registrar</h2>
      <p>Já tem uma conta? <Link to="/login">Login</Link></p>
      <form>
        <Input 
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
        />
        <Input 
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite seu telefone"
          handleOnChange={handleChange}
        />
        <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleChange}
        />
        <Input 
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <Input 
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      </div>
    </section>
  )
}

export default Register
