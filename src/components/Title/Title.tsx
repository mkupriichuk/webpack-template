import React from "react";
import cn from "clsx";
import styles from "./title.module.scss";

type htag = "h1" | "h2" | "h3" | "h4" | "h5";
interface ITitle extends React.ComponentPropsWithoutRef<htag> {
	tag: htag;
}

const Title = ({ tag: HTag, children, className, ...props }: ITitle) => {
	return (
		<HTag {...props} className={cn(className, styles[HTag])}>
			{children}
		</HTag>
	);
};

export default Title;
