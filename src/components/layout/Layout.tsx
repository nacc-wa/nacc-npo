import type {ReactNode} from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({top: 0, left: 0, behavior: 'instant'});
	}, [location.pathname]);

	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar />
			<main className='flex-grow'>
				<div key={location.pathname} className='page-transition'>
					{children}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
