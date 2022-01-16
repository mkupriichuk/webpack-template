declare module "*.avif" {
	const src: string;
	export default src;
}

declare module "*.bmp" {
	const src: string;
	export default src;
}

declare module "*.gif" {
	const src: string;
	export default src;
}

declare module "*.jpg" {
	const src: string;
	export default src;
}

declare module "*.jpeg" {
	const src: string;
	export default src;
}

declare module "*.png" {
	const src: string;
	export default src;
}

declare module "*.webp" {
	const src: string;
	export default src;
}


// declare svg types for @svgr
declare module "*.svg" {
	const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
	export default content;
}

// declare svg types for file-loader
declare module "*.svg?url" {
	const path: string;
	export default path;
}

declare module "*.mp3" {
	const src: string;
	export default src;
}

declare module "*.mp4" {
	const src: string;
	export default src;
}
declare module "*.module.scss" {
	const classes: { readonly [key: string]: string };
	export default classes;
}

declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export default classes;
}
