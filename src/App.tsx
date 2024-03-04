import { useEffect, useState } from 'react';
import ImageGallery from './components/ImageGallery';
import SearchBar from './components/SearchBar';

enum ImageCount {
	'_20' = 20,
	'_40' = 40,
	'_60' = 60,
	'_80' = 80,
	'_100' = 100,
	'_150' = 150,
	'_200' = 200,
}

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [term, setTerm] = useState('');
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const [imageCount] = useState<ImageCount>(ImageCount._200);


	const [images, setImages] = useState([]);

  useEffect(() => {
    getData();
    console.log(images)
	}, [term, imageCount]);

	function getData() {
		fetch(
			`https://pixabay.com/api/?key=${
				import.meta.env.VITE_PIXABAY_API_KEY
			}&q=${term}&image_type=photo&pretty=true&per_page=${imageCount}`
		)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.hits);
				setIsEmpty(!(data.hits.length > 0));
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}

	function Search(newTerm: string) {
    setImages([]);
    setTerm(newTerm);
    getData();
	}

	return (
		<>
			<SearchBar Search={Search} />
			<ImageGallery isLoading={isLoading} isEmpty={isEmpty} images={images} />
		</>
	);
}

export default App;
