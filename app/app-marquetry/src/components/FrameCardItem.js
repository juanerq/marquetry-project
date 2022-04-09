import dateConvert from "../helpers/dateConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import './frameCard.css'

export const FrameCardItem = props => {
  return (
    <div className='container-frame'>
      <Date code={props.code} date={props.date}/>

      <div className='container-info'>
        <h3 className='name'>{props.name}</h3>

        <InfoLastPicture picture={props.lastPicture}/>
        <Price price={props.price} payment={props.payment}/>

        <div>
          <FontAwesomeIcon icon={faPhone} className='icon-phone'/>
          <p className='phone'>{props.phone}</p>
        </div>
      </div>
    </div>
  )
}

const Date = ({code, date}) => {
  return (
    <div>
      <p className='id'>{code}</p>
      <p className='date'>{dateConvert(date)}</p>
    </div>
  )
}

const InfoLastPicture = ({picture}) => {
  return (
    <div className='info'>
      <p><span>Moldura: </span>{picture[0]?.molding || 'Sin moldura'}</p>
      <p><span>Vidrio: </span>{picture[0]?.glass || 'Sin vidrio'}</p>
    </div>
  )
}

const Price = ({ price, payment }) => {
  return (
    <div className='price'>
    <p>${price}</p>
    { price === payment ?   
      <p className='paid'>Pago</p> : 
      <p className='payment'><span>Abono: </span>${payment}</p>
    }
  </div>
  )
}