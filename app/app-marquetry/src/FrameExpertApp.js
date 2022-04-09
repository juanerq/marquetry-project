import { useEffect, useState } from 'react';
import { FrameCardItem } from './components/FrameCardItem';
import SearchBox from './components/SearchBox';
import getAllFrames from './helpers/getFrames'

const FrameExpertApp = () => {

  const [frames, setFrame] = useState([])

  useEffect(() => {
    getAllFrames()
      .then(resp => {
        setFrame(resp);
      })
  }, [])
  
  return (
    <>
      <h1>Vidrio Centro</h1>
      <div className='searchbox'>
        <SearchBox />
      </div>
      <div className='container-cards'>
        { frames.length > 0 
            ? 
            frames.map((frame, index) => {
              if(index < 10)
                return <FrameCardItem  
                          key={frame.id}
                          lastPicture={frame.pictures}  
                          {...frame} 
                        />
              return []
            })
            : 'No hay clientes registrados'
        }
      </div>
    </>
  )
}

export default FrameExpertApp