export default function CustomSelect({label, id, values}) {
	return (
		<>
			<label
				htmlFor={id}
				className="block text-sm font-light leading-6">
				{label}
			</label>
			<div className="mt-2">
				<select
					id={id}
					name={id}
					className="block w-full rounded-md border-0 py-2 px-2 font-light shadow-sm ring-1 ring-inset ring-primary-light focus:ring-1 focus:ring-inset focus:ring-primary-main sm:max-w-xs sm:text-sm sm:leading-6 outline-primary-main"
				>
					{
						values.map(({value, title}) => <option key={value} value={value}>{title}</option>)
					}
				</select>
			</div>
		</>
	)
}