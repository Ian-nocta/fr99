export function generateToc(headings: ReadonlyArray<MarkdownHeading>) {
	console.log("All Headings:", headings);

	const bodyHeadings = [...headings.filter(({ depth }) => depth > 1)];
	const toc: Array<TocItem> = [];

	bodyHeadings.forEach((h) => {
		const heading: TocItem = { ...h, subheadings: [] };

		if (heading.depth === 2) {
			toc.push(heading);
		} else {
			const lastItemInToc = toc[toc.length - 1]!;
			if (heading.depth < lastItemInToc.depth) {
				throw new Error(`Orphan heading found: ${heading.text}.`);
			}

			const gap = heading.depth - lastItemInToc.depth;
			const target = diveChildren(lastItemInToc, gap);
			target.push(heading);
		}
	});

	console.log("Generated TOC:", toc);

	return toc;
}
