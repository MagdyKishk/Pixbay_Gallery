import { useEffect, useState } from 'react';
import ImageCard from './components/ImageCard';

enum ImageCount {
  "_20" = 20,
  "_40" = 40,
  "_60" = 60,
  "_80" = 80,
  "_100" = 100,
  "_150" = 150,
  "_200" = 200,
}

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
  const [term, setTerm] = useState('human');
  const [imageCount, setImageCount] = useState<ImageCount>(ImageCount._100);

	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch(
			`https://pixabay.com/api/?key=${
				import.meta.env.VITE_PIXABAY_API_KEY
			}&q=${term}&image_type=photo&pretty=true&per_page=${imageCount}`
		)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));

	}, [term]);

	return (
		<div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 mx-auto w-fit'>
			{!isLoading &&
				images.map((imageData, ind) => {
					return <ImageCard imageData={imageData} key={ind} />;
				})}
		</div>
	);
}

export default App;
