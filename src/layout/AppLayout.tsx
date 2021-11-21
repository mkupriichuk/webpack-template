import style from "./layout.module.scss";

const AppLayout: React.FC = ({ children }) => {
	return <div className={style.app}>
		<header className={style.header}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quam quas, assumenda ab veritatis saepe deleniti necessitatibus itaque fuga earum iusto! Nisi et quibusdam molestias! A quibusdam consequuntur architecto temporibus repellat maxime itaque laborum porro est magni praesentium maiores tempore fugit et repudiandae eveniet, quia culpa doloribus quisquam accusantium quis?</header>
		<main className={style.main}>
			{children}
		</main>
		<footer className={style.footer}>footer</footer>
	</div>;
};

export default AppLayout;
