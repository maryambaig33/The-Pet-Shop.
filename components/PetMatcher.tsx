import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2 } from 'lucide-react';
import { getPetRecommendations } from '../services/aiService';
import { AIRecommendation } from '../types';

export const PetMatcher: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await getPetRecommendations(input);
      setRecommendations(results);
    } catch (e) {
      setError("Our AI matchmaker is taking a nap. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Find Your Soulmate</h2>
        <p className="text-gray-600 text-lg">Tell us about your lifestyle, home environment, and activity level. <br/>Our AI will find the perfect breed for you.</p>
      </div>

      {!recommendations ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-100">
          <div className="p-8">
            <label className="block text-sm font-bold text-gray-700 mb-2">Describe your day-to-day life</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I live in a small apartment, work 9-5, love weekend hikes but want a chill evening companion. I have no kids."
              className="w-full h-40 p-4 rounded-xl border-2 border-orange-100 focus:border-orange-500 focus:ring-0 resize-none bg-gray-50 text-gray-800 transition-colors"
            />
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleMatch}
              disabled={loading || !input.trim()}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Analyzing Lifestyle...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Find My Match
                </>
              )}
            </button>
          </div>
          <div className="bg-orange-50 p-4 text-center text-sm text-orange-600 font-medium">
            Powered by Gemini AI
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Top Matches for You</h3>
            <button 
              onClick={() => { setRecommendations(null); setInput(''); }}
              className="flex items-center text-sm font-bold text-orange-600 hover:text-orange-700 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                <div className={`h-2 w-full ${idx === 0 ? 'bg-teal-500' : idx === 1 ? 'bg-orange-500' : 'bg-amber-400'}`} />
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-gray-800">{rec.breed}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      {rec.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{rec.reason}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Care Level</div>
                    <div className={`flex-1 h-2 rounded-full bg-gray-100 overflow-hidden`}>
                      <div 
                        className={`h-full rounded-full ${
                          rec.careLevel.toLowerCase().includes('high') ? 'bg-red-400 w-3/4' : 
                          rec.careLevel.toLowerCase().includes('medium') ? 'bg-amber-400 w-1/2' : 
                          'bg-green-400 w-1/4'
                        }`} 
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-500">{rec.careLevel}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <button className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center justify-center gap-1">
                    Check Availability <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};