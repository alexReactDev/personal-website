import Image from "next/image";

interface IProps {
	className?: string,
	img: string,
	width: number,
	height: number,
	onClick: (img: string) => void,
	alt?: string
}

function ImgWithCross({ className = "", img, width, height, alt = "", onClick }: IProps) {
	return (
		<div className={`${className} relative group`} onClick={() => onClick(img)}>
			<div className="invisible opacity-0 group-[:hover]:visible group-[:hover]:opacity-100 absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/20 duration-100 z-10">
				<div className="relative w-[50px] h-[50px] rounded-full bg-gray-500/80 before:absolute before:left-1/2 before:top-1/2 before:w-[20px] before:h-[1px] before:-translate-y-1/2 before:-translate-x-1/2 before:bg-gray-600 after:absolute after:left-1/2 after:top-1/2 after:w-[20px] after:h-[1px] after:-translate-y-1/2 after:-translate-x-1/2 after:bg-gray-600 before:rotate-45 after:-rotate-45"></div>
			</div>
			{
				img.match(/.mp4$/)
				?
				<div className={`relative w-full h-full before:absolute before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-gray-700 before:w-[40px] before:h-[40px] before:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/3 after:border-l-white after:border-solid after:border-l-[12px] after:border-y-transparent after:border-y-[8px]`}>
					<video src={img} width={width} height={height} className="w-full h-full object-cover object-center" />
				</div>
				:
				<img src={img} width={width} height={height} alt={alt} className="w-full h-full object-cover object-center" />
			}

		</div>
	)
}

export default ImgWithCross;