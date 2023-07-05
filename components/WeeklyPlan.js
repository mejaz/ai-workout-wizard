import CustomTable from "@/components/CustomTable";

const ExerciseDay = ({day}) => (
	<div
		className="w-full text-xl text-center py-2 font-medium border-b text-secondary-main">
		{day}
	</div>
)

export default function WeeklyPlan({data}) {
	return (
		data.length > 0
			? <div>
				{
					data.map(({day, exercises}) => (
						<div
							key={day}
							className={"bg-slate-50 mb-10 shadow-md border border-slate-300 rounded-xl"}
						>
							<ExerciseDay day={day}/>
							<CustomTable exercises={exercises}/>
						</div>
					))
				}
			</div>
			: undefined
	)
}