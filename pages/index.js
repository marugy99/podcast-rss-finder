import { useState } from "react";
import Head from "next/head";
const axios = require("axios");
 
const Home = () => {

  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [timer, setTimer] = useState(null);

  const searchPodcast = async (query) => {

    setSelectedPodcast(false);
    clearTimeout(timer);

    if(query.length > 0) {
      const newTimer = setTimeout(async () => {
        await axios.get('/api/podcast', 
          { params: { q: query } }
        )
        .then((res) => {
          setPodcasts(res.data.results);
          setSelectedPodcast(null);
        })
      }, 1000);
  
      setTimer(newTimer);

    } else {
      setPodcasts([]);
      setSelectedPodcast(null);
    }
  }

  const selectPodcast = (podcast) => {
    setPodcasts([]);
    setSelectedPodcast(podcast);
  }
  
  return (
    <div className="bg-slate-900 text-gray-100">
      <Head>
        <title>Podcast RSS Feed Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <article className="flex min-h-screen flex-col container mx-auto pt-10">
        <h1 className="font-bold text-3xl mx-auto">
          Podcast RSS Feed Finder
        </h1>
        <input type="text" placeholder="Enter podcast name" onChange={(e) => searchPodcast(e.target.value)} className="text-slate-800 w-[400px] mt-4 mx-auto px-4 py-1.5 bg-white rounded-md text-lg" />
        {selectedPodcast === false && <p className="block mx-auto mt-2">Searching...</p>}
        {podcasts.length > 1 && selectedPodcast !== false &&
          <ul className="bg-slate-700 rounded-md p-3 w-[400px] mx-auto">
            {podcasts.map((elem, index) => (
              <li key={index}>
                <button onClick={() => selectPodcast(elem)} className="cursor-pointer block w-full py-2 hover:bg-slate-800">
                  {elem.podcast.title_original}
                </button>
              </li>
            ))
            }
          </ul>
        }
        {selectedPodcast && 
          <section className="flex gap-6 mx-auto mt-10 items-center">
            <img className="rounded-md min-h-[300px] min-w-[300px]" src={selectedPodcast.podcast.thumbnail} alt="Podcast Cover" />
            <div>
              <h2 className="font-bold text-3xl">{selectedPodcast.podcast.title_original}</h2>
              <p className="text-lg font-bold mt-4">RSS feed:</p>
              <a href={selectedPodcast.rss} target="_blank" className="hover:underline">{selectedPodcast.rss}</a>
            </div>
          </section>
        }
      </article>
    </div>
    
  )
}

export default Home;