import ImageCard from './ImageCard';

type Props = {
	isLoading: boolean;
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
};

export default function ImageGallery({ isLoading, images }: Props) {

    console.log(images);
	return (
		<div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4 mx-auto w-fit'>
			{!isLoading &&
				images.map((imageData: ImageObj, ind) => {
					return <ImageCard imageData={imageData} key={ind} />;
				})}
		</div>
	);
}
