import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './ShowModal';

const URL='https://swapi.dev/api/species/';

function CardList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchInput,setSearchInput]=useState('');
  const [filteredCharacters,setFilteredCharacters]=useState([]);

  const handleCharacter=(character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const filterCharacters = (inputValue) => {
    return characters.filter((character) =>
      character.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredCharacters(filterCharacters(searchInput));
  }, [searchInput, characters]);


  return (
   <div className='bg-black py-3 sm:py-5'>
      <div className='mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-8 bg-black '>
        <h1 className='text-center text-4xl text-slate-200'>Star Wars Characters</h1>
       
        <input type="text" name="text" class="mt-1 px-3 py-2 bg-gray-900 border shadow-sm border-slate-600 placeholder-slate-400 focus:outline-none focus:border-white-700 focus:ring-white-700 w-60 rounded-md sm:text-sm focus:ring-1 text-white" placeholder="Search name" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)}/>
        
          {loading ? (
            <p>Loading...</p>
          ) : (
              <ul role='list' className='grid gap-x-6 gap-y-6 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4'> 
              {filteredCharacters.map((character,index) => (
                <div key={character.index} className='block rounded-lg bg-gray-900 p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 transition ease-in-out duration-300' onClick={()=> {
                  setSelectedCharacter(character); 
                  setShowModal(true);
                  handleCharacter(character);
                  }} > 
                  <li key={character.index} className='pointer-events-none' >
                  <div className='items-center content-center group ' >
                    <img className='min-w-full min-h-full rounded-md ' src={`https://picsum.photos/200?random=${Math.random()}`} alt={character.name}/>
                  
                      <div className='text-base font-semibold leading-7 tracking-tight text-gray-500 pt-6 pb-6 '>
                    <h1 className='text-left text-gray-100'> 
                    {' '}
                    {character.name}</h1>
                      </div>
                  </div>
                  </li> 
                  </div> 
                  )) } 
                
                {showModal && (
              <Modal selectedCharacter={selectedCharacter} onClose={()=>setShowModal(false)} />
            )}   
            </ul>  
         )} 
      </div>
  </div>
  );
}

export default CardList;
