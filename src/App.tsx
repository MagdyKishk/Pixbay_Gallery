import { useEffect, useState } from 'react';
import ImageGallery from './components/ImageGallery';

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
  const [term] = useState('human');
  const [imageCount] = useState<ImageCount>(ImageCount._100);

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

	}, [term, imageCount]);

  return <ImageGallery isLoading={isLoading} images={images} />;
}

export default App;
