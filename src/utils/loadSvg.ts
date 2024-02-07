async function loadSvgForLayer(url: string) {
	const response = await fetch(url);
	const blobSvg = await response.blob();
	const data = await new Promise<{ paths: SVGPathElement[], width: number, height: number }>(resolve => {
		const object = document.createElement('object');
		object.type = 'image/svg+xml';
		object.title = 'fake';
		object.addEventListener(
				'load',
				() => {
					const doc = object.contentDocument as Document;
					const paths = Array.from(doc?.querySelectorAll('path') || []);
					const svgTag = doc?.querySelector('svg');
					const svgParams = svgTag?.getBBox();
					const width = Number(svgTag?.getAttribute('width')) || svgParams?.width || 0;
					const height = Number(svgTag?.getAttribute('height')) || svgParams?.height || 0;

					document.body.removeChild(object);

					resolve({ width, height, paths });
				},
				false,
		);

		object.data = URL.createObjectURL(blobSvg);
		object.classList.add('visually-hidden');
		document.body.append(object);
	});
	return data;
}

export default loadSvgForLayer;
