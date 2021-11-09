import prompts from 'prompts';

import exportDuplicates from './utils/exportDuplicates.js';
import analyzeFrequency from './utils/analyzeFrequency.js';

(async () => {
	const utilResponse = await prompts({
		type: 'select',
		name: 'cubeUtil',
		message: 'Welcome to Cube Utils! Choose your desired utility.',
		choices: [
		  { title: 'Export duplicates', description: 'Export a list of cards that appear in all the submitted cubes', value: 'exportDuplicates', },
		  { title: 'Frequency analysis', description: 'Get a breakdown of how often each card in a cube appears among a series of cubes.', value: 'frequencyAnalysis', },
		],
		initial: 0,
	});

	const { cubeUtil } = utilResponse;

	const cubeListsResponse = await prompts({
		type: 'text',
		name: 'cubeListsDir',
		message: 'Specify directory containing cube list/s.',
	});
	
	const { cubeListsDir } = cubeListsResponse;

	if (cubeUtil === 'exportDuplicates') {
		exportDuplicates(cubeListsDir);
	} else if (cubeUtil === 'frequencyAnalysis') {
		analyzeFrequency(cubeListsDir);
	}
})();