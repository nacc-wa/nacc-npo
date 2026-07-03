import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';

const navItems = [
	{label: 'About', to: '/about'},
	{label: 'Tournaments', to: '/tournaments'},
	{label: 'Payments', to: '/payments'},
	{label: 'Contact', to: '/contact'}
];

const navClass = ({isActive}: {isActive: boolean}) =>
	`rounded-md px-3 py-2 text-sm font-semibold transition ${
		isActive
			? 'bg-white/15 text-white'
			: 'text-white/85 hover:bg-white/10 hover:text-white'
	}`;

const NaccMark = () => (
	<img
		src='/nacc-logo.svg'
		alt='NACC logo'
		className='h-12 w-12 rounded-md bg-white object-contain shadow-sm'
	/>
);

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='sticky top-0 z-50 bg-primary text-white shadow-lg shadow-primary/10'>
			<nav className='container'>
				<div className='flex min-h-20 items-center justify-between gap-6'>
					<Link
						to='/'
						className='flex min-w-0 items-center gap-3'
						onClick={() => setIsOpen(false)}>
						<NaccMark />
						<div className='min-w-0'>
							<p className='truncate text-lg font-black leading-tight sm:text-xl'>
								NACC
							</p>
							<p className='truncate text-xs font-semibold text-white/75 sm:text-sm'>
								North America Cricket Conference
							</p>
						</div>
					</Link>

					<div className='hidden items-center gap-1 lg:flex'>
						<NavLink to='/' className={navClass}>
							Home
						</NavLink>
						{navItems.map((item) => (
							<NavLink key={item.to} to={item.to} className={navClass}>
								{item.label}
							</NavLink>
						))}
						<Link to='/register' className='btn btn-accent ml-2'>
							Register
						</Link>
					</div>

					<button
						type='button'
						className='inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden'
						onClick={() => setIsOpen((value) => !value)}
						aria-label='Toggle navigation'>
						{isOpen ? (
							<XMarkIcon className='h-6 w-6' />
						) : (
							<Bars3Icon className='h-6 w-6' />
						)}
					</button>
				</div>
			</nav>

			{isOpen && (
				<div className='border-t border-white/10 bg-primary lg:hidden'>
					<div className='container grid gap-1 py-4'>
						<NavLink
							to='/'
							className={navClass}
							onClick={() => setIsOpen(false)}>
							Home
						</NavLink>
						{navItems.map((item) => (
							<NavLink
								key={item.to}
								to={item.to}
								className={navClass}
								onClick={() => setIsOpen(false)}>
								{item.label}
							</NavLink>
						))}
						<Link
							to='/register'
							className='btn btn-accent mt-2'
							onClick={() => setIsOpen(false)}>
							Register
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
