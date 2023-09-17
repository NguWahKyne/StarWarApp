// ShowModal.js
import React from 'react';

function convertCmToMeter(cm){
    return(cm/100).toFixed(2);
}
function convertGramsToKg(grams) {
    return (grams / 1000).toFixed(2); 
  }
function formatBirthYear(birthYear){
    const year=birthYear.match(/\d+/)[0];
    const currentYear =new Date().getFullYear();
    const birthYearBBY=currentYear -parseInt(year) ;
    return birthYearBBY;
}  
function extractFilmNumbers(filmUrls) {
    const filmNumbers = filmUrls.map((url) => {
      const parts = url.split('/'); 
      return parts[parts.length - 2];  number
    });
  
    return filmNumbers.join(', '); 
  }

  
function ShowModal({ selectedCharacter, onClose }) {
//const [selectedDate,setSelectDated] =useState(new Date());
const heightInCm= selectedCharacter.height;
const heightInMeter= convertCmToMeter(heightInCm);
const massInGrams = selectedCharacter.mass;
const massInKg = convertGramsToKg(massInGrams);
const birthYear=selectedCharacter.birth_year;
const formattedBirthYear =formatBirthYear(birthYear);
const filmUrls = selectedCharacter.films;
const formattedFilms = extractFilmNumbers(filmUrls);

  if (!selectedCharacter) return null;

  return (
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative my-6 mx-auto max-w-md w-80">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none backdrop-opacity-20 backdrop-invert bg-gray/20"> 
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-700 rounded-t">
                  <h3 className='text-gray-200 pt-3'> {selectedCharacter.name}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-200 opacity-2 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-gray-300 opacity-2 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                    <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-400 text-lg leading-relaxed">
                    Height : {heightInMeter} meters
                    </p>
                    <p className="my-4 text-slate-400 text-lg leading-relaxed">
                    Mass : {massInKg} kg
                    </p>
                    <p className="my-4 text-slate-400 text-lg leading-relaxed">
                    Hair : {selectedCharacter.hair_color}
                    </p>
                    <p className="my-4 text-slate-400 text-lg leading-relaxed">
                   Birth Year : {formattedBirthYear}
                    </p>
                    <p className="my-4 text-slate-400 text-lg leading-relaxed">
                   Birth Year : {formattedBirthYear}
                    </p>
                    <p className="my-4 text-slate-400 text-lg leading-relaxed">
                   Films : {formattedFilms}
                    </p>
                  </div>
              </div>
            </div>
          </div>
         
        </>
  );
}

export default ShowModal;
