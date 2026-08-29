import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'
import Context from '../contexts/Context'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: 'docente@desafiolatam.com', password: '123456' }

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setDeveloper } = useContext(Context)

  const handleUser = (event) => {
    setError('')
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleForm = (event) => {
    event.preventDefault()
    setError('')

    if (!user.email.trim() || !user.password.trim()) {
      return setError('Email y password son obligatorios.')
    }

    if (!emailRegex.test(user.email)) {
      return setError('El formato del email no es correcto.')
    }

    setLoading(true)
    axios.post(ENDPOINT.login, user)
      .then(({ data }) => {
        window.sessionStorage.setItem('token', data.token)
        setDeveloper({})
        navigate('/perfil')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        setError(data.message || 'Credenciales incorrectas. Inténtalo de nuevo.')
        setLoading(false)
      })
  }

  return (
    <div className='col-10 col-sm-7 col-md-4 col-lg-3 m-auto mt-5'>
      <div className='login-box p-4'>
        <div className='text-center mb-3'>
          <div className='login-logo'>SJ</div>
          <h4 className='mt-3 mb-0 fw-bold'>Bienvenido de vuelta</h4>
          <small className='text-muted-custom'>Inicia sesión en tu cuenta</small>
        </div>
        <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

        {error && (
          <div className='alert-error mb-3'>
            <i className='fa-solid fa-circle-exclamation me-2' />
            {error}
          </div>
        )}

        <form onSubmit={handleForm}>
          <div className='form-group mb-3'>
            <label className='form-label small text-muted-custom'>Email</label>
            <input
              value={user.email}
              onChange={handleUser}
              type='email'
              name='email'
              className='form-control login-input'
              placeholder='tu@email.com'
            />
          </div>
          <div className='form-group mb-3'>
            <label className='form-label small text-muted-custom'>Contraseña</label>
            <input
              value={user.password}
              onChange={handleUser}
              type='password'
              name='password'
              className='form-control login-input'
              placeholder='••••••••'
            />
          </div>
          <button type='submit' className='btn-login w-100' disabled={loading}>
            {loading
              ? <><span className='spinner-border spinner-border-sm me-2' role='status' />Iniciando sesión...</>
              : <><i className='fa-solid fa-arrow-right-to-bracket me-2' />Iniciar Sesión</>}
          </button>
        </form>

        <p className='text-center mt-3 small text-muted-custom'>
          ¿No tienes cuenta?{' '}
          <Link to='/registrarse' className='fw-bold' style={{ color: '#52a0a3' }}>Regístrate gratis</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
