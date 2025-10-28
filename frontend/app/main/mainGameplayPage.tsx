export function MainGameplayPage() {

	const linkCSS = [
		"cursor-pointer",
		"hover:underline",
		"",
	].join(" ");

	return (
		<main className="flex flex-col items-center h-screen p-4 bg-stone-800 text-lg text-stone-100">
			<div className="flex gap-2 h-auto">
				<div className={linkCSS}>Inventory</div>
				<div className={linkCSS}>Equipment</div>
			</div>
		</main>
	);
}