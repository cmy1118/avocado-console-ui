const overview = [
	{
		title: '',
		contents: {
			description: ['', '', ''],
			contents: [
				{type: '', titile: ''},
				{type: '', titile: ''},
			],
		},
	},
	{},
];

export const optionTypes = {
	selectBox: 'selectBox',
	checkBox: 'checkBox',
	comboBox: 'comboBox',
	input: 'input',
	table: 'table',
	newLine: 'newLine',
	text: 'text',
	timezone: 'timezone',
};

const selectBox = {
	type: optionTypes.selectBox,
	title: '',
	options: [
		{
			value: '',
			label: '',
		},
		{value: '', label: '', disabledSubContents: true},
	],
	subContents: [
		{type: optionTypes.selectBox, options: [], changeLine: true},
		{
			type: optionTypes.checkBox,
			options: [
				{value: '', label: ''},
				{value: '', label: ''},
			],
		},
	],
};

const checkBox = {
	type: optionTypes.checkBox,
	title: '',
	options: [
		{value: '', label: ''},
		{value: '', label: ''},
	],
};

const comboBox = {
	type: optionTypes.comboBox,
	header: '',
	defaultValue: '',
	options: [
		{value: '', label: ''},
		{value: '', label: ''},
	],
};

const input = {
	type: optionTypes.input,
	inputType: '',
	title: '',
	preText: '',
	proText: '',
};

const table = {type: optionTypes.table, key: ''};

const newLine = {type: optionTypes.newLine};

const text = {type: optionTypes.text, text: ''};

const timezone = {type: optionTypes.timezone};
