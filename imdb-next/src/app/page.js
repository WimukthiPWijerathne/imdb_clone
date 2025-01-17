// page.js
export default async function Home({ searchParams }) {
  const genre = searchParams?.genre || 'fetchTrending';
  
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3${
        genre === 'fetchTopRated' ? `/movie/top_rated` : `/trending/all/week`
      }`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        next: { revalidate: 10000 }
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    
    return <MovieList movies={data.results} />;
  } catch (error) {
    return <div>Error loading movies: {error.message}</div>;
  }
}

// components/MovieList.js



  
