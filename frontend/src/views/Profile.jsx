import axios from 'axios'
import Context from '../contexts/Context'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const mockOffers = [
  { id: 1, empresa: 'TechCorp', titulo: 'Junior Frontend Developer', sueldo: '$800.000 - $1.200.000', tipo: 'Remoto', logo: 'TC', match: 95 },
  { id: 2, empresa: 'Startup XYZ', titulo: 'Junior Backend Developer', sueldo: '$900.000 - $1.300.000', tipo: 'Híbrido', logo: 'SX', match: 87 },
  { id: 3, empresa: 'Digital Agency', titulo: 'Desarrollador Fullstack Jr.', sueldo: '$1.000.000 - $1.500.000', tipo: 'Presencial', logo: 'DA', match: 80 }
]

const getInitials = (email) => {
  if (!email) return 'U'
  return email.substring(0, 2).toUpperCase()
}

const Profile = () => {
  const navigate = useNavigate()
  const { getDeveloper, setDeveloper } = useContext(Context)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(({ response: { data } }) => {
        console.error(data)
        window.sessionStorage.removeItem('token')
        setDeveloper(null)
        navigate('/')
      })
  }

  useEffect(getDeveloperData, [])

  return (
    <div className='container py-4'>

      <div className='row justify-content-center mb-4'>
        <div className='col-12 col-md-10'>
          <div className='profile-card p-4 d-flex align-items-center gap-4 flex-wrap'>
            <div className='avatar-circle'>
              {getInitials(getDeveloper?.email)}
            </div>
            <div className='text-start flex-grow-1'>
              <h4 className='mb-1 fw-bold'>{getDeveloper?.email}</h4>
              <div className='d-flex gap-2 flex-wrap mt-1'>
                <span className='badge-rol'>
                  <i className='fa-solid fa-briefcase me-1' />{getDeveloper?.rol}
                </span>
                <span className='badge-lang'>
                  <i className='fa-solid fa-code me-1' />{getDeveloper?.lenguage}
                </span>
              </div>
              <small className='text-muted-custom mt-2 d-block'>
                <i className='fa-solid fa-circle-check me-1' style={{ color: '#4caf50' }} />
                Perfil verificado · Miembro desde 2024
              </small>
            </div>
            <div className='text-end'>
              <small className='text-muted-custom d-block mb-1'>Estado</small>
              <span className='status-badge'>
                <span className='status-dot' />
                Buscando trabajo
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='row justify-content-center mb-4'>
        <div className='col-12 col-md-10'>
          <div className='row g-3'>
            <div className='col-4'>
              <div className='stat-card p-3'>
                <div className='stat-icon'><i className='fa-solid fa-file-lines' /></div>
                <div className='stat-number'>25</div>
                <div className='stat-label'>Ofertas disponibles</div>
              </div>
            </div>
            <div className='col-4'>
              <div className='stat-card p-3'>
                <div className='stat-icon'><i className='fa-solid fa-eye' /></div>
                <div className='stat-number'>142</div>
                <div className='stat-label'>Visitas al perfil</div>
              </div>
            </div>
            <div className='col-4'>
              <div className='stat-card p-3'>
                <div className='stat-icon'><i className='fa-solid fa-paper-plane' /></div>
                <div className='stat-number'>3</div>
                <div className='stat-label'>Postulaciones</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row justify-content-center mb-4'>
        <div className='col-12 col-md-10'>
          <div className='section-card p-4'>
            <h6 className='text-start mb-3 fw-bold'>
              <i className='fa-solid fa-chart-simple me-2' />
              Completitud del perfil
            </h6>
            <div className='progress' style={{ height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)' }}>
              <div className='progress-bar' style={{ width: '75%', background: 'linear-gradient(90deg, #3c6e71, #52a0a3)', borderRadius: '4px' }} />
            </div>
            <div className='d-flex justify-content-between mt-2'>
              <small className='text-muted-custom'>Agrega foto y descripción para completar tu perfil</small>
              <small className='fw-bold'>75%</small>
            </div>
            <div className='row g-2 mt-3'>
              <div className='col-6 col-md-3'>
                <div className='check-item done'><i className='fa-solid fa-check me-1' />Email</div>
              </div>
              <div className='col-6 col-md-3'>
                <div className='check-item done'><i className='fa-solid fa-check me-1' />Rol</div>
              </div>
              <div className='col-6 col-md-3'>
                <div className='check-item done'><i className='fa-solid fa-check me-1' />Lenguaje</div>
              </div>
              <div className='col-6 col-md-3'>
                <div className='check-item pending'><i className='fa-solid fa-plus me-1' />Foto de perfil</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-12 col-md-10'>
          <div className='section-card p-4'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h6 className='fw-bold mb-0'>
                <i className='fa-solid fa-star me-2' />
                Ofertas recomendadas para ti
              </h6>
              <small className='text-muted-custom'>Basado en tu perfil</small>
            </div>
            <div className='d-flex flex-column gap-3'>
              {mockOffers.map(offer => (
                <div key={offer.id} className='offer-card p-3 d-flex align-items-center justify-content-between flex-wrap gap-3'>
                  <div className='d-flex align-items-center gap-3'>
                    <div className='company-logo'>{offer.logo}</div>
                    <div className='text-start'>
                      <div className='fw-bold'>{offer.titulo}</div>
                      <div className='text-muted-custom small'>{offer.empresa} · {offer.tipo}</div>
                      <div className='small fw-semibold mt-1' style={{ color: '#52d9a4' }}>{offer.sueldo}</div>
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-3'>
                    <div className='match-badge'>{offer.match}% match</div>
                    <button className='btn-apply'>Postular</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile
