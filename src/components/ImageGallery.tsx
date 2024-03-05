import { useEffect, useRef, useState, useCallback } from 'react';
import ImageCard from './ImageCard';

type Props = {
	isLoading: boolean;
	isEmpty: boolean;
	images: Array<ImageObj>;
};

export type ImageObj = {
	id: number;
	pageURL: string;
	tags: string;
	views: number;
	downloads: number;
	likes: number;
	user: string;
	userImageURL: string;
	webformatURL: string;
	webformatWidth: number;
	webformatHeight: number;
};

export default function ImageGallery({ isLoading, images, isEmpty }: Props) {
	const [columns, setColumns] = useState<number>(0);
	const [imageCardWidth] = useState<number>(300);
	const imageGallery = useRef<HTMLDivElement>(null);

	const handleResize = useCallback(() => {
		if (imageGallery.current) {
			const newColumnsVal = Math.max(Math.floor(imageGallery.current.clientWidth / imageCardWidth), 1);
			setColumns(newColumnsVal);
		}
	}, [imageCardWidth]);

	useEffect(() => {
		handleResize(); // Initial resize

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	return (
		<div className='mx-auto w-11/12' ref={imageGallery}>
			{!!isEmpty && (
				<h1 className='text-6xl text-center my-16'>No Results Found</h1>
			)}
			{!!isLoading && <h1 className='text-6xl text-center my-16'>Loading</h1>}
			<div className='gap-4' style={{ columns: columns }}>
				{!isLoading &&
					!isEmpty &&
					images.map((imageData: ImageObj, ind) => {
						return (
							<ImageCard
								imageData={imageData}
								key={ind}
								imageCardWidth={imageCardWidth}
							/>
						);
					})}
			</div>
		</div>
	);
}
