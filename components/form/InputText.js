export default function InputText({label, id}) {
	return (
		<>
			<label
				htmlFor={id}
				className="block text-sm font-light leading-6">
				{label}
			</label>
			<div className="mt-2">
				<input
					type="text"
					name={id}
					id={id}
					className="block w-full rounded-md border-0 py-1.5 px-3 font-light shadow-sm ring-1 ring-inset ring-primary-light placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary-main sm:text-sm sm:leading-6 outline-primary-main"
				/>
			</div>
		</>
	)
}