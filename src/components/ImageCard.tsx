// Icons
import {
	faCircleDown,
	faEye,
	faHeart,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageObj } from './ImageGallery';
import { useEffect, useRef, useState } from 'react';

export type ImageCardProps = {
	imageData: ImageObj;
};

export default function ImageCard({ imageData }: ImageCardProps) {
	const [imageLoaded, setImageLoaded] = useState<boolean>(false);
	const ImageCardElement = useRef<HTMLDivElement>(null);
	const ImageElement = useRef<HTMLImageElement>(null);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};
	useEffect(() => {
		if (ImageCardElement.current && ImageElement.current) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							if (ImageElement.current) {
								ImageElement.current.src = imageData.webformatURL;
							}
						} else {
							if (ImageElement.current) {
								ImageElement.current.src = '';
							}
						}
					});
				},
				{
					root: null,
					rootMargin: '0px',
					threshold: 0.2,
				}
			);
			observer.observe(ImageCardElement.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [ImageCardElement, ImageElement, imageData.webformatURL]);
	return (
		<div
			ref={ImageCardElement}
			className='rounded shadow-lg relative max-w-xs overflow-hidden h-fit-content bg-white mb-2'>
			<div className='px-2 py-2 bg-white bg-opacity-70 w-full flex justify-between'>
				<div>
					<FontAwesomeIcon icon={faEye} />
					<span className='ml-2'>{imageData.views}</span>
				</div>
				<div>
					<FontAwesomeIcon icon={faCircleDown} />
					<span className='ml-2'>{imageData.downloads}</span>
				</div>
			</div>
			<a href={imageData.pageURL} className='relative'>
				{!imageLoaded && (
					<div
						className='bg-white flex justify-between items-center max-w-xs min-w-xs'
						style={{
							height: imageData.webformatHeight * (2 / 3),
						}}>
						<p className='text-center w-full'>Loading ...</p>
					</div>
				)}

				<img
					ref={ImageElement}
					src=''
					alt='Image'
					style={{
						height: imageData.webformatHeight * (2 / 3),
						width: imageData.webformatWidth,
					}}
					className={`w-xs mx-auto object-cover ${imageLoaded ? '' : 'hidden'}`}
					onLoad={handleImageLoad}
				/>
			</a>
			<div className='flex px-2 py-2'>
				<div className='flex items-center gap-2'>
					<img
						src={imageData.userImageURL}
						alt={imageData.user + '_profile_image'}
						className='w-12 rounded-full'
					/>
					<h1 className='font-bold'>{imageData.user}</h1>
				</div>
				<span className='ml-auto'>
					<FontAwesomeIcon icon={faHeart} />
					<span className='ml-2'>{imageData.likes}</span>
				</span>
			</div>
			<div className='px-2 py-2 flex flex-wrap gap-2'>
				{imageData.tags.split(', ').map((tag, ind) => (
					<span
						className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'
						key={ind}>
						{tag}
					</span>
				))}
			</div>
		</div>
	);
}
