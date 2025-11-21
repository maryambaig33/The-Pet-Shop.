import React, { useState } from 'react';
import { Pet } from '../types';
import { Filter, Heart } from 'lucide-react';

const MOCK_PETS: Pet[] = [
  { id: 1, name: "Bella", breed: "Golden Retriever", age: "2 years", type: "dog", description: "Friendly and energetic, loves swimming.", tags: ["Active", "Family"], image: "https://picsum.photos/id/237/400/400" },
  { id: 2, name: "Luna", breed: "Siamese", age: "1 year", type: "cat", description: "Vocal and affectionate, loves high places.", tags: ["Indoor", "Cuddly"], image: "https://picsum.photos/id/40/400/400" },
  { id: 3, name: "Charlie", breed: "Beagle", age: "4 years", type: "dog", description: "Great nose, loves food, good with kids.", tags: ["Friendly", "Foodie"], image: "https://picsum.photos/id/169/400/400" },
  { id: 4, name: "Oreo", breed: "Rabbit", age: "6 months", type: "other", description: "Soft and bouncy, loves carrots.", tags: ["Quiet", "Small"], image: "https://picsum.photos/id/1003/400/400" },
  { id: 5, name: "Max", breed: "German Shepherd", age: "3 years", type: "dog", description: "Loyal protector, highly intelligent.", tags: ["Smart", "Guard"], image: "https://picsum.photos/id/1025/400/400" },
  { id: 6, name: "Milo", breed: "Tabby", age: "8 weeks", type: "cat", description: "Playful kitten needing a loving home.", tags: ["Baby", "Playful"], image: "https://picsum.photos/id/219/400/400" },
];

export const PetList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'dog' | 'cat' | 'other'>('all');

  const filteredPets = filter === 'all' ? MOCK_PETS : MOCK_PETS.filter(p => p.type === filter);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Adopt a Friend</h2>
          <p className="text-gray-500 mt-1">These cuties are looking for a forever home.</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {(['all', 'dog', 'cat', 'other'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-colors ${
                filter === type 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-teal-50'
              }`}
            >
              {type === 'all' ? 'All Pets' : type + 's'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                <Heart className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                 <h3 className="text-2xl font-bold text-white">{pet.name}</h3>
                 <p className="text-white/90 text-sm">{pet.breed}</p>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md uppercase tracking-wide">
                  {pet.age}
                </span>
                {pet.tags.map(tag => (
                   <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">
                     {tag}
                   </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-1">
                {pet.description}
              </p>
              <button className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-teal-600 transition-colors">
                Meet {pet.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};