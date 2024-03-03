
import fruits from '../assets/png/fruits.png'
import vegetables from '../assets/png/vegetables.png'
import trees from '../assets/png/trees.png'
import toxicplants from '../assets/png/toxicplants.png'
import { Link } from 'react-router-dom'

function HomePage() {
  return ( 

    <div className='homepage'>
    <p className="font-bold mt-12 text-2xl text-green-700 mb-3">Popular Plants</p>  
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 avatar  rounded-xl">
      <Link to='/category/fruit'><img src={fruits} className="w-full h-auto object-cover rounded-lg" alt="Fruit" /></Link>
      <Link to='category/vegetable'><img src={vegetables} className="w-full h-auto object-cover rounded-lg" alt="Vegetable" /></Link>
      <Link to='category/tree'><img src={trees} className="w-full h-auto object-cover rounded-lg" alt="Tree" /></Link>
      <Link to='category/toxic'><img src={toxicplants} className="w-full h-auto object-cover rounded-lg" alt="Toxic" /></Link>
      
    
    </div>
  </div>
  );
}

export default HomePage;