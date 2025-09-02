<?php

return array(
	'type'                 => 'object',
	'properties'           => array(
		'resource' => array(
			'type'        => 'string',
			'const'       => 'finpress.org/themes',
			'description' => 'Identifies the file resource as a finpress Core theme',
		),
		'slug'     => array(
			'type'        => 'string',
			'description' => 'The slug of the finpress Core theme',
		),
	),
	'required'             => array(
		'resource',
		'slug',
	),
	'additionalProperties' => false,
);
