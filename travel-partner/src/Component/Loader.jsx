import './Loader.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

export const Loader = () => {
  return (
    <div className='loader-container'>
      <div className='loader'>
        <FontAwesomeIcon className='loader-plane' icon={faPlane} />
      </div>
    </div>
  )
}
