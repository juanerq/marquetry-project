const Autocomplete = ({ code, name, price, payment, photo }) => {
  photo = photo.length < 15 
    ? 'https://www.lacasadeantiguedades.es/3736-thickbox_default/elegante-cuadro-de-coleccion-pintado-a-mano-sobre-oleo.jpg'
    : photo
  return (
    <li className='result-container'>
      <div className="result-card">
        <a href={`http://localhost:8080/api/marquetry/search?code=${code}`} target='_blank' rel='noreferrer'>
          
          <img src={photo} alt={name} className='result-img' />
          <div className='result-info'>
            <h3>{name}</h3>
            { price === payment ?   
              <p className='search-info'>Pago</p> : 
              <p className='search-info search-info-payment'>${payment}</p>
            }
          </div>
        </a>
      </div>
    </li>
  )
}

export default Autocomplete