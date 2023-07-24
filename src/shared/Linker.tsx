import { Link, useLocation } from 'react-router-dom'



type Props = {
  page: string;
};

const Linker = ({ page }: Props) => {
    const lowerCasePage = page.toLowerCase()
    const Location = useLocation()
    const currentLink = Location.search.replace(/[^a-z]/g, '').slice(3)

    const makeActive = currentLink === lowerCasePage ? "text-primary-500" : 'hover:text-white'

    return (
        <Link className={`${makeActive} transition duration-100`} to={`/?cat=${lowerCasePage}`} >
            {page}
        </Link>
    );
};

export default Linker;
