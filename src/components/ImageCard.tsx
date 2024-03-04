// Icons
import {
	faCircleDown,
	faEye,
	faHeart,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ImageCardProps = {
	imageData: {
		webformatURL: string;
		downloads: number;
		likes: number;
		views: number;
		user: string;
		pageURL: string;
		tags: string;
        userImageURL: string;
	};
};

export default function ImageCard({ imageData }: ImageCardProps) {
	return (
		<div className='rounded overflow-hidden shadow-lg relative max-w-xs h-fit-content'>
			<div className=' px-2 py-2 bg-white bg-opacity-70 w-full flex justify-between'>
				<div>
					<FontAwesomeIcon icon={faEye} />
					<span className='ml-2'>{imageData.views}</span>
				</div>
				<div>
					<FontAwesomeIcon icon={faCircleDown} />
					<span className='ml-2'>{imageData.downloads}</span>
				</div>
			</div>
			<a href={imageData.pageURL}>
				<img src={imageData.webformatURL} alt='Image' className='max-w-full' />
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
