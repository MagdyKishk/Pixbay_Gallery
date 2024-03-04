import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

type Props = {
	Search: (newTerm: string) => void;
};

export default function SearchBar({ Search }: Props) {
	const SearchInput = useRef(null);

	return (
		<form
			className='border-b-2 border-gray-500 shadow-lg h-16 sticky mb-8 top-0 z-50 bg-white flex justify-center items-center px-4'
			onSubmit={(e) => {
				e.preventDefault();
				Search((SearchInput.current as HTMLInputElement | null)?.value || '');
			}}>
			<div className='border-2 rounded-full overflow-hidden border-gray-500 w-1/2 min-w-52 flex pr-4'>
				<button
					className='min-h-full w-12 flex items-center justify-center'
					type='submit'>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
				</button>
				<input
					ref={SearchInput}
					type='text'
					className='w-full focus:border-none focus:outline-none h-10'
				/>
			</div>
		</form>
	);
}
