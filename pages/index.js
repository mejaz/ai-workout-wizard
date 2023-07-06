import {useState} from "react";
import Head from "next/Head";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Footer from "@/components/Footer";
import UserForm from "@/components/UserForm";
import TableToPDF from "@/components/TableToPDF";


export default function Home() {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	return (
		<main className="flex flex-col min-h-screen">
			<Head>
				<title>AI Workout Wizard</title>
			</Head>
			<div className={'w-full flex-grow'}>
				<Header/>
				<div className={'mt-24 px-4 my-6'}>
					<div className={'max-w-5xl mx-auto'}>
						<Intro/>
						<div className={'w-full'}>
							<UserForm setData={setData} setLoading={setLoading} loading={loading}/>
						</div>
						{
							loading
								? <div className={'w-full text-center text-secondary-light p-2 text-xl font-normal'}>Working on it...</div>
								: data.length > 0
									? <TableToPDF data={data}/>
									: undefined
						}
					</div>
				</div>
			</div>
			<Footer/>
		</main>
	);
}
