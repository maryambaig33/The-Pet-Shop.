import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { PetList } from './components/PetList';
import { PetMatcher } from './components/PetMatcher';
import { VetChat } from './components/VetChat';
import { ViewState } from './types';
import { Dog, ArrowRight } from 'lucide-react';

const HomeHero = ({ setView }: { setView: (v: ViewState) => void }) => (
  <div className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
        <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Happiness is a</span>{' '}
            <span className="block text-orange-500 xl:inline">warm puppy</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Or a kitten, or a bunny. We connect loving families with pets in need. Use our AI tools to find your perfect match or get care advice.
          </p>
          <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setView(ViewState.ADOPT)}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-full text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg shadow-lg shadow-orange-200 transition-all hover:scale-105"
              >
                Adopt Now
              </button>
              <button
                onClick={() => setView(ViewState.MATCHER)}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-orange-100 text-base font-bold rounded-full text-orange-700 bg-orange-50 hover:bg-orange-100 md:py-4 md:text-lg transition-all"
              >
                Match Me AI <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative mt-12 sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
          <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
            <div className="relative block w-full bg-white rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                    className="w-full"
                    src="https://picsum.photos/id/237/600/600"
                    alt="Happy dog"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white font-bold text-lg">Over 2,000 Happy Tails</p>
                </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-teal-500 text-white p-4 rounded-full shadow-lg animate-bounce hidden md:block">
                <Dog className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Decorative blobs */}
    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -z-0" />
    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 -z-0" />
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-900 flex flex-col">
      <Navbar currentView={view} setView={setView} />
      
      <main className="flex-1">
        {view === ViewState.HOME && <HomeHero setView={setView} />}
        {view === ViewState.ADOPT && <PetList />}
        {view === ViewState.MATCHER && <PetMatcher />}
        {view === ViewState.CARE && <VetChat />}
      </main>

      <footer className="bg-white border-t border-orange-100 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400 hover:text-gray-500">Instagram</span>
            <span className="text-gray-400 hover:text-gray-500">Twitter</span>
            <span className="text-gray-400 hover:text-gray-500">Facebook</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Purrfect Companions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;