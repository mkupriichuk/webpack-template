import React from "react";
import cn from "clsx";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";
import styles from "./LinkWithDisabled.module.scss";

interface ILinkWithDisabled extends LinkProps {
	disabled?: boolean;
}

const LinkWithDisabled = ({
	disabled,
	children,
	...props
}: ILinkWithDisabled) => {
	return (
		<span
			className={cn(disabled && styles.linkDisabled)}
		>
			<Link {...props}>{children}</Link>
		</span>
	);
};

export default LinkWithDisabled;
