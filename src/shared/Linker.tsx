import { Link, useLocation } from 'react-router-dom'


type Props = {
  page: string;
};

const Linker = ({ page }: Props) => {

    const lowerCasePage = page.toLowerCase()
    const Location = useLocation()
    const currentLink = Location.search.replace(/[^a-z]/g, '').slice(3)

    const makeActive = currentLink === lowerCasePage ? "text-primary-500" : 'hover:text-gray-100'

    return (
        <Link className={`${makeActive} my-[3px] transition duration-100`} to={`/?cat=${lowerCasePage}`} onClick={() => localStorage.setItem('page', `1`)}>
            {page}
        </Link>
    );
};

export default Linker;
