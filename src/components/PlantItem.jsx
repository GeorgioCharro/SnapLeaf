
import { Link } from "react-router-dom"
import {ReactComponent as RightIcon} from '../assets/svg/rightIcon.svg'
function PlantItem({plant,name}) {
  return (
    <li className="flex justify-between items-center mb-4 relative">
      <Link to={`/category/${plant.type}/${name}`}className="w-full">
      <div className="card card-side bg-base-100 shadow-xl pl-4 w-full">
        <figure><img className="w-full h-24 object-cover rounded-lg" src={plant.imgUrls} alt="Plant"/></figure>
          <div className="card-body flex flex-col justify-center">
           <h3 className="card-title mb-0">{plant.name}</h3>
          <p>What should i write here ??</p>
          <RightIcon className="h-6 w-6 absolute top-1/2 right-4 -mt-3 text-gray-500 cursor-pointer"/>
        </div>
      </div>
      </Link>
    </li>
  )
}

export default PlantItem
