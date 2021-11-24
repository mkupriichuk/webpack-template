import style from "./layout.module.scss";

const AppLayout: React.FC = ({ children }) => {
	return (
		<div className={style.app}>
			<header className={style.header}>header</header>
			<div className={style.main}>
				<div className={style.sidebar}>sidebar</div>
				<div className={style.content}>{children}</div>
			</div>
			{/* <footer className={style.footer}>footer</footer> */}
		</div>
	);
};

export default AppLayout;
