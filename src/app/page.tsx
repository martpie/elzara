import { getDocuments } from "outstatic/server";

export default async function Home() {
	const events = await getData();
	return (
		<div>
			Hellow World
			<pre>{JSON.stringify(events, null, 2)}</pre>
			{events.map((post) => (
				<h1 key={post.slug}>{post.title}</h1>
			))}
		</div>
	);
}

async function getData() {
	const events = getDocuments("events", ["title"]);

	return events;
}
