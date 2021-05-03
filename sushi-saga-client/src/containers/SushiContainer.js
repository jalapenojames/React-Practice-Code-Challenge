import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {

  const firstFour = props.sushis.slice(props.panel,props.panel+4)

  return (
    <Fragment>
      <div className="belt">
        {/* Render Sushi components here! */
          firstFour.map(sushi => {
            return <Sushi 
                      key={sushi.id}
                      id={sushi.id}
                      eaten={sushi.eaten}
                      name={sushi.name}
                      price={sushi.price}
                      img={sushi.img_url}
                      onSushiClick={props.sushiClick}/>
          })

        }
        <MoreButton sushis={props.sushis} panel={props.panel} buttonClick={props.buttonClick}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer