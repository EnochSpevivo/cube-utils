import prompts from 'prompts';

import exportDuplicates from './utils/exportDuplicates.js';

(async () => {
	const response = await prompts({
		type: 'select',
		name: 'cubeUtil',
		message: 'Welcome to Cube Utils! Choose your desired utility.',
		choices: [
		  { title: 'Export duplicates', description: 'Export a list of cards that appear in all the submitted cubes', value: 'exportDuplicates', },
		  { title: 'Card occurrence', description: 'Determine how many cubes a particular card appears in', value: 'cardOccurrencePercentage', },
		],
		initial: 0,
	  });

	  const { cubeUtil } = response;

	  if (cubeUtil === 'exportDuplicates') {
		const response = await prompts({
			type: 'text',
			name: 'cubeListsDir',
			message: 'Specify directory containing cube list/s.'
		  });
		
		  const { cubeListsDir } = response;

		  exportDuplicates(cubeListsDir)
	  }
})();