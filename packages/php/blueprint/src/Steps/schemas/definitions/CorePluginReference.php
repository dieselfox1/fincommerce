<?php

return array(
	'type'                 => 'object',
	'properties'           => array(
		'resource' => array(
			'type'        => 'string',
			'const'       => 'finpress.org/plugins',
			'description' => 'Identifies the file resource as a finpress Core plugin',
		),
		'slug'     => array(
			'type'        => 'string',
			'description' => 'The slug of the finpress Core plugin',
		),
	),
	'required'             => array(
		'resource',
		'slug',
	),
	'additionalProperties' => false,
);
