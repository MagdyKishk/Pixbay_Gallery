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
	webformatHeight: number
};

export default function ImageGallery({ isLoading, images, isEmpty }: Props) {
	return (
		<div className='mx-auto w-fit'>
			{!!isEmpty && (
				<h1 className='text-6xl text-center my-16'>No Results Found</h1>
			)}
			{!!isLoading && <h1 className='text-6xl text-center my-16'>Loading</h1>}
			<div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4'>
				{!isLoading &&
					!isEmpty &&
					images.map((imageData: ImageObj, ind) => {
						return <ImageCard imageData={imageData} key={ind} />;
					})}
			</div>
		</div>
	);
}
