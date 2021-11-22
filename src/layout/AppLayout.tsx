import style from "./layout.module.scss";

const AppLayout: React.FC = ({ children }) => {
	return <div className={style.app}>
		<header className={style.header}>header</header>
		<main className={style.main}>
			{children}
		</main>
		<footer className={style.footer}>footer</footer>
	</div>;
};

export default AppLayout;
