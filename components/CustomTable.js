const CustomTableHeader = ({colName}) => (
	<th
		className="font-medium p-4 text-left">
		{colName}
	</th>
)

const CustomTableData = ({data, type}) => (
	<td
		className="border-b border-slate-100 p-4 text-primary-dark">
		{data}
	</td>
)

const CustomTable = ({exercises}) => {
	return (
		<table className="border-collapse table-fixed w-full text-sm mb-3">
			<thead>
			<tr className={'border-b'}>
				<CustomTableHeader colName={"Exercise"}/>
				<CustomTableHeader colName={"Sets"}/>
				<CustomTableHeader colName={"Reps"}/>
				<CustomTableHeader colName={"Weights"}/>
				<CustomTableHeader colName={"Rest Between Sets"}/>
			</tr>
			</thead>
			<tbody className="bg-white">
			{
				exercises.map(({exercise, sets, reps, weight, rest}, index) => (
					<tr key={index}>
						<CustomTableData data={exercise} type={'exercise'}/>
						<CustomTableData data={sets} type={'sets'}/>
						<CustomTableData data={reps} type={'reps'}/>
						<CustomTableData data={weight} type={'weight'}/>
						<CustomTableData data={rest} type={'rest'}/>
					</tr>
				))
			}
			</tbody>
		</table>
	)
}

export default CustomTable