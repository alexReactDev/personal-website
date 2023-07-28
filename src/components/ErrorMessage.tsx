function ErrorMessage({ className = "", errorMessage = "Error"}) {
	return (
		<div className={`${className} error mb-5 p-2 text-center font-bold`}>
			{errorMessage}
		</div>
	)
}

export default ErrorMessage;