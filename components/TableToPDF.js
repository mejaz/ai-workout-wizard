import React, {useRef} from 'react';
import WeeklyPlan from "@/components/WeeklyPlan";
import {BiSolidDownload} from "react-icons/bi"

const TableToPDF = ({data}) => {
	const pdfContainerRef = useRef(null);
	const handleDownload = async () => {
		const html2pdf = await import('html2pdf.js');
		const pdfOptions = {
			margin: [10, 10, 10, 10], // Set margins [top, right, bottom, left]
		};

		html2pdf.default()
			.set(pdfOptions)
			.from(pdfContainerRef.current)
			.save('table.pdf');
	};

	return (
		<div className={'p-4 border border-gray-100 rounded-xl shadow-md'}>
			{
				data.length > 0
					? <>
						<div className={'text-right'}>
							<button
								onClick={handleDownload}
								type="button"
								className="rounded-md bg-secondary-main px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary-dark disabled:bg-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<div className={'flex justify-center items-center gap-2'}>
									Download <BiSolidDownload/>
								</div>
							</button>
						</div>
						<div className="mt-6 flex items-center justify-end gap-x-6">
							<div ref={pdfContainerRef}>
								<h1 className={'text-3xl text-center mb-5 '}>
									Your Weekly Exercise
								</h1>
								<WeeklyPlan data={data}/>
							</div>
						</div>
					</>
					: undefined
			}
		</div>
	);
};

export default TableToPDF;
