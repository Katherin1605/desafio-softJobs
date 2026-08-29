import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Home = () => {
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
        })
    }
  }

  useEffect(getDeveloperData, [])

  return (
    <div>
      <div className='hero-section py-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
              {getDeveloper
                ? (
                  <>
                    <div className='hero-badge mb-3'>
                      <i className='fa-solid fa-hand-sparkles me-2' />
                      ¡Hola de vuelta!
                    </div>
                    <h1 className='hero-title mb-3'>
                      Bienvenido, <span className='hero-highlight'>{getDeveloper.email?.split('@')[0]}</span>
                    </h1>
                    <p className='hero-subtitle mb-4'>
                      Hay nuevas ofertas esperándote. Tu próxima oportunidad puede estar a un clic de distancia.
                    </p>
                    <Link to='/perfil' className='btn-hero-primary'>
                      <i className='fa-solid fa-user me-2' />Ver mi perfil
                    </Link>
                  </>
                  )
                : (
                  <>
                    <div className='hero-badge mb-3'>
                      <i className='fa-solid fa-rocket me-2' />
                      La plataforma de empleos para Junior Developers
                    </div>
                    <h1 className='hero-title mb-3'>
                      Bienvenido a <span className='hero-highlight'>Soft Jobs</span>
                    </h1>
                    <p className='hero-subtitle mb-4'>
                      El lugar donde todos los Junior Developers podrán obtener su primera experiencia laboral. Conectamos talento emergente con empresas que valoran el potencial.
                    </p>
                    <div className='d-flex gap-3 justify-content-center flex-wrap'>
                      <Link to='/registrarse' className='btn-hero-primary'>
                        <i className='fa-solid fa-user-plus me-2' />Crear cuenta gratis
                      </Link>
                      <Link to='/login' className='btn-hero-secondary'>
                        <i className='fa-solid fa-arrow-right-to-bracket me-2' />Iniciar sesión
                      </Link>
                    </div>
                  </>
                  )}
            </div>
          </div>
        </div>
      </div>

      <div className='container mb-5'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10'>
            <div className='row g-3'>
              <div className='col-4'>
                <div className='home-stat-card'>
                  <div className='home-stat-number'>+500</div>
                  <div className='home-stat-label'>Desarrolladores</div>
                </div>
              </div>
              <div className='col-4'>
                <div className='home-stat-card'>
                  <div className='home-stat-number'>+120</div>
                  <div className='home-stat-label'>Empresas</div>
                </div>
              </div>
              <div className='col-4'>
                <div className='home-stat-card'>
                  <div className='home-stat-number'>+25</div>
                  <div className='home-stat-label'>Ofertas activas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mb-5'>
        <div className='row justify-content-center mb-4'>
          <div className='col-12 col-md-8'>
            <h2 className='section-title'>¿Por qué elegir Soft Jobs?</h2>
            <p className='section-subtitle'>Todo lo que necesitas para comenzar tu carrera en tecnología</p>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10'>
            <div className='row g-4'>
              <div className='col-12 col-md-4'>
                <div className='feature-card'>
                  <div className='feature-icon'>
                    <i className='fa-solid fa-briefcase' />
                  </div>
                  <h5 className='feature-title'>Ofertas para Juniors</h5>
                  <p className='feature-desc'>Posiciones diseñadas específicamente para desarrolladores con poca experiencia. Sin barreras de entrada.</p>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <div className='feature-card'>
                  <div className='feature-icon'>
                    <i className='fa-solid fa-code' />
                  </div>
                  <h5 className='feature-title'>Match por tecnología</h5>
                  <p className='feature-desc'>Te mostramos las ofertas que mejor se adaptan a tu stack tecnológico y nivel de experiencia.</p>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <div className='feature-card'>
                  <div className='feature-icon'>
                    <i className='fa-solid fa-chart-line' />
                  </div>
                  <h5 className='feature-title'>Impulsa tu carrera</h5>
                  <p className='feature-desc'>Accede a oportunidades reales que te ayudarán a construir tu portafolio y crecer profesionalmente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mb-5'>
        <div className='row justify-content-center mb-4'>
          <div className='col-12 col-md-8'>
            <h2 className='section-title'>¿Cómo funciona?</h2>
            <p className='section-subtitle'>Tres pasos para encontrar tu primer trabajo tech</p>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-10'>
            <div className='row g-3'>
              <div className='col-12 col-md-4'>
                <div className='step-card'>
                  <div className='step-number'>1</div>
                  <h6 className='step-title'>Crea tu perfil</h6>
                  <p className='step-desc'>Regístrate e indica tu rol, lenguaje y experiencia</p>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <div className='step-card'>
                  <div className='step-number'>2</div>
                  <h6 className='step-title'>Explora ofertas</h6>
                  <p className='step-desc'>Recibe recomendaciones personalizadas según tu perfil</p>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <div className='step-card'>
                  <div className='step-number'>3</div>
                  <h6 className='step-title'>Postula y crece</h6>
                  <p className='step-desc'>Aplica a las ofertas y comienza tu carrera en tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!getDeveloper && (
        <div className='container mb-5'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8'>
              <div className='cta-card'>
                <h3 className='cta-title'>¿Listo para comenzar?</h3>
                <p className='cta-subtitle'>Únete a cientos de juniors que ya encontraron su primer trabajo</p>
                <Link to='/registrarse' className='btn-hero-primary'>
                  <i className='fa-solid fa-user-plus me-2' />Crear mi cuenta gratis
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
