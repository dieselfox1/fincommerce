<?php
/**
 * Shopify Client Test
 *
 * @package Automattic\FinCommerce\Tests\Internal\CLI\Migrator\Platforms\Shopify
 */

declare(strict_types=1);

namespace Automattic\FinCommerce\Tests\Internal\CLI\Migrator\Platforms\Shopify;

use Automattic\FinCommerce\Internal\CLI\Migrator\Platforms\Shopify\ShopifyClient;
use Automattic\FinCommerce\Internal\CLI\Migrator\Core\CredentialManager;
use WC_Unit_Test_Case;
use WP_Error;

/**
 * Tests for ShopifyClient.
 */
class ShopifyClientTest extends WC_Unit_Test_Case {

	/**
	 * The ShopifyClient instance.
	 *
	 * @var ShopifyClient
	 */
	private $client;

	/**
	 * Mock credential manager.
	 *
	 * @var CredentialManager|\PHPUnit\Framework\MockObject\MockObject
	 */
	private $mock_credential_manager;

	/**
	 * Set up test fixtures.
	 */
	public function setUp(): void {
		parent::setUp();

		$this->client                  = new ShopifyClient();
		$this->mock_credential_manager = $this->createMock( CredentialManager::class );
		$this->client->init( $this->mock_credential_manager );
	}

	/**
	 * Test successful REST API request.
	 */
	public function test_rest_request_success(): void {
		// Mock credentials.
		$this->mock_credential_manager->method( 'get_credentials' )
			->with( 'shopify' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		// Mock successful HTTP response.
		$mock_response = array(
			'response' => array( 'code' => 200 ),
			'body'     => wp_json_encode( array( 'count' => 42 ) ),
		);

		add_filter(
			'pre_http_request',
			function ( $preempt, $parsed_args, $url ) use ( $mock_response ) {
				// Verify the request URL is correct.
				$this->assertStringContainsString( 'test-store.myshopify.com/admin/api/2025-04/products/count.json', $url );
				// Verify the authorization header.
				$this->assertEquals( 'test-token-123', $parsed_args['headers']['X-Shopify-Access-Token'] );
				return $mock_response;
			},
			10,
			3
		);

		$result = $this->client->rest_request( '/products/count.json' );

		$this->assertNotInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 42, $result->count );

		// Clean up filter.
		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test REST request with query parameters.
	 */
	public function test_rest_request_with_query_params(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		add_filter(
			'pre_http_request',
			function ( $preempt, $parsed_args, $url ) {
				// Verify query parameters are added to URL.
				$this->assertStringContainsString( 'status=active', $url );
				$this->assertStringContainsString( 'vendor=Nike', $url );
				return array(
					'response' => array( 'code' => 200 ),
					'body'     => wp_json_encode( array( 'count' => 15 ) ),
				);
			},
			10,
			3
		);

		$result = $this->client->rest_request(
			'/products/count.json',
			array(
				'status' => 'active',
				'vendor' => 'Nike',
			)
		);

		$this->assertNotInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 15, $result->count );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test REST request with missing credentials.
	 */
	public function test_rest_request_missing_credentials(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->with( 'shopify' )
			->willReturn( array() );

		$result = $this->client->rest_request( '/products/count.json' );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
		$this->assertStringContainsString( 'not configured', $result->get_error_message() );
	}

	/**
	 * Test REST request with partial credentials.
	 */
	public function test_rest_request_partial_credentials(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->with( 'shopify' )
			->willReturn(
				array(
					'shop_url' => 'test-store.myshopify.com',
				// Missing access_token.
				)
			);

		$result = $this->client->rest_request( '/products/count.json' );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
	}

	/**
	 * Test REST request with HTTP error.
	 */
	public function test_rest_request_http_error(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		add_filter(
			'pre_http_request',
			function () {
				return new WP_Error( 'http_request_failed', 'Connection timeout' );
			}
		);

		$result = $this->client->rest_request( '/products/count.json' );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
		$this->assertStringContainsString( 'Connection timeout', $result->get_error_message() );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test REST request with API error response.
	 */
	public function test_rest_request_api_error(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'invalid-token',
				)
			);

		add_filter(
			'pre_http_request',
			function () {
				return array(
					'response' => array( 'code' => 401 ),
					'body'     => wp_json_encode(
						array(
							'errors' => array( 'Unauthorized' ),
						)
					),
				);
			}
		);

		$result = $this->client->rest_request( '/products/count.json' );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
		$this->assertStringContainsString( '401', $result->get_error_message() );
		$this->assertStringContainsString( 'Unauthorized', $result->get_error_message() );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test REST request with invalid JSON response.
	 */
	public function test_rest_request_invalid_json(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		add_filter(
			'pre_http_request',
			function () {
				return array(
					'response' => array( 'code' => 200 ),
					'body'     => 'invalid json {',
				);
			}
		);

		$result = $this->client->rest_request( '/products/count.json' );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
		$this->assertStringContainsString( 'Failed to decode', $result->get_error_message() );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test URL building with protocol handling.
	 */
	public function test_url_building_protocol_handling(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com', // No protocol.
					'access_token' => 'test-token-123',
				)
			);

		add_filter(
			'pre_http_request',
			function ( $preempt, $parsed_args, $url ) {
				// Should add https:// protocol.
				$this->assertStringStartsWith( 'https://test-store.myshopify.com', $url );
				return array(
					'response' => array( 'code' => 200 ),
					'body'     => wp_json_encode( array( 'count' => 0 ) ),
				);
			},
			10,
			3
		);

		$this->client->rest_request( '/products/count.json' );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test POST request with body.
	 */
	public function test_post_request_with_body(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		$request_body = array( 'product' => array( 'title' => 'Test Product' ) );

		add_filter(
			'pre_http_request',
			function ( $preempt, $parsed_args ) use ( $request_body ) {
				$this->assertEquals( 'POST', $parsed_args['method'] );
				$this->assertEquals( wp_json_encode( $request_body ), $parsed_args['body'] );
				$this->assertEquals( 'application/json', $parsed_args['headers']['Content-Type'] );
				return array(
					'response' => array( 'code' => 201 ),
					'body'     => wp_json_encode( array( 'product' => array( 'id' => 123 ) ) ),
				);
			},
			10,
			3
		);

		$result = $this->client->rest_request( '/products.json', array(), 'POST', $request_body );

		$this->assertNotInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 123, $result->product->id );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test successful GraphQL request.
	 */
	public function test_graphql_request_success(): void {
		// Mock credentials.
		$this->mock_credential_manager->method( 'get_credentials' )
			->with( 'shopify' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		$mock_response_data = array(
			'data' => array(
				'products' => array(
					'edges'    => array(
						array(
							'cursor' => 'cursor1',
							'node'   => array(
								'id'    => 'gid://shopify/Product/123',
								'title' => 'Test Product',
							),
						),
					),
					'pageInfo' => array(
						'hasNextPage' => false,
						'endCursor'   => 'cursor1',
					),
				),
			),
		);

		// Mock successful HTTP response.
		$mock_response = array(
			'response' => array( 'code' => 200 ),
			'body'     => wp_json_encode( $mock_response_data ),
		);

		add_filter(
			'pre_http_request',
			function ( $preempt, $parsed_args, $url ) use ( $mock_response ) {
				// Verify the request URL is correct GraphQL endpoint.
				$this->assertStringContainsString( 'test-store.myshopify.com/admin/api/2025-04/graphql.json', $url );
				// Verify the authorization header.
				$this->assertEquals( 'test-token-123', $parsed_args['headers']['X-Shopify-Access-Token'] );
				// Verify it's a POST request.
				$this->assertEquals( 'POST', $parsed_args['method'] );
				// Verify content type.
				$this->assertEquals( 'application/json', $parsed_args['headers']['Content-Type'] );
				return $mock_response;
			},
			10,
			3
		);

		$query  = 'query { products(first: 1) { edges { cursor node { id title } } pageInfo { hasNextPage endCursor } } }';
		$result = $this->client->graphql_request( $query );

		$this->assertNotInstanceOf( WP_Error::class, $result );
		$this->assertIsObject( $result );
		$this->assertEquals( 1, count( $result->products->edges ) );
		$this->assertEquals( 'Test Product', $result->products->edges[0]->node->title );

		// Clean up filter.
		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test GraphQL request with variables.
	 */
	public function test_graphql_request_with_variables(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		$variables = array(
			'first' => 5,
			'query' => 'status:active',
		);

		add_filter(
			'pre_http_request',
			function ( $preempt, $parsed_args ) use ( $variables ) {
				// Verify variables are included in the request body.
				$body = json_decode( $parsed_args['body'], true );
				$this->assertArrayHasKey( 'variables', $body );
				$this->assertEquals( $variables, $body['variables'] );

				// Return mock response.
				return array(
					'response' => array( 'code' => 200 ),
					'body'     => wp_json_encode( array( 'data' => array( 'products' => array( 'edges' => array() ) ) ) ),
				);
			},
			10,
			3
		);

		$query  = 'query($first: Int, $query: String) { products(first: $first, query: $query) { edges { node { id } } } }';
		$result = $this->client->graphql_request( $query, $variables );

		$this->assertNotInstanceOf( WP_Error::class, $result );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test GraphQL request with HTTP error.
	 */
	public function test_graphql_request_http_error(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		// Mock HTTP error response.
		$mock_response = array(
			'response' => array( 'code' => 500 ),
			'body'     => 'Internal Server Error',
		);

		add_filter(
			'pre_http_request',
			function () use ( $mock_response ) {
				return $mock_response;
			}
		);

		$query  = 'query { products { edges { node { id } } } }';
		$result = $this->client->graphql_request( $query );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
		$this->assertStringContainsString( '500', $result->get_error_message() );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test GraphQL request with GraphQL errors.
	 */
	public function test_graphql_request_graphql_errors(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		$mock_response_data = array(
			'errors' => array(
				array(
					'message' => 'Field "invalidField" doesn\'t exist on type "Product"',
					'path'    => array( 'products', 'edges', 0, 'node', 'invalidField' ),
				),
			),
		);

		// Mock response with GraphQL errors.
		$mock_response = array(
			'response' => array( 'code' => 200 ),
			'body'     => wp_json_encode( $mock_response_data ),
		);

		add_filter(
			'pre_http_request',
			function () use ( $mock_response ) {
				return $mock_response;
			}
		);

		$query  = 'query { products { edges { node { id invalidField } } } }';
		$result = $this->client->graphql_request( $query );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'graphql_error', $result->get_error_code() );
		$this->assertStringContainsString( 'Field \\"invalidField\\"', $result->get_error_message() );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test GraphQL request with invalid JSON response.
	 */
	public function test_graphql_request_invalid_json(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->willReturn(
				array(
					'shop_url'     => 'test-store.myshopify.com',
					'access_token' => 'test-token-123',
				)
			);

		// Mock response with invalid JSON.
		$mock_response = array(
			'response' => array( 'code' => 200 ),
			'body'     => 'invalid json response',
		);

		add_filter(
			'pre_http_request',
			function () use ( $mock_response ) {
				return $mock_response;
			}
		);

		$query  = 'query { products { edges { node { id } } } }';
		$result = $this->client->graphql_request( $query );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );

		remove_all_filters( 'pre_http_request' );
	}

	/**
	 * Test GraphQL request without credentials.
	 */
	public function test_graphql_request_no_credentials(): void {
		$this->mock_credential_manager->method( 'get_credentials' )
			->with( 'shopify' )
			->willReturn( array() ); // Empty credentials array.

		$query  = 'query { products { edges { node { id } } } }';
		$result = $this->client->graphql_request( $query );

		$this->assertInstanceOf( WP_Error::class, $result );
		$this->assertEquals( 'api_error', $result->get_error_code() );
	}
}
