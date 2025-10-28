export function MainGameplayPage() {

	const linkCSS = [
		"cursor-pointer",
		"underline",
		"decoration-solid",
		"hover:decoration-dotted",
		"",
	].join(" ");

	return (
		<main className="flex flex-col items-center h-screen p-4 bg-stone-700 text-lg text-wheat">
			<div className="flex gap-2 h-auto">
				<div className={linkCSS}>Inventory</div>
				<div className={linkCSS}>Equipment</div>
			</div>
			<div>~</div>
			<div id="locationHeader">LOCATION HEADER</div>
			<div id="contentArea">CONTENT AREA</div>
			<div id="notificationsBar">NOTIFICATIONS BAR</div>
			<div id="controlsBar">CONTROLS BAR</div>
		</main>
	);
}