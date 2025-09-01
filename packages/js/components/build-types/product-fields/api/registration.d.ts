import { ProductFieldDefinition } from '../store/types';
/**
 * Registers a new product field provided a unique name and an object defining its
 * behavior. Once registered, the field is made available to use with the product form API.
 *
 * @param {string|Object} fieldName Field name.
 * @param {Object}        settings  Field settings.
 *
 * @example
 * ```js
 * import { registerProductField } from '@fincommerce/components'
 *
 * registerProductFieldType( 'attributes-field', {
 * } );
 * ```
 */
export declare function registerProductField(fieldName: string, settings: ProductFieldDefinition): ProductFieldDefinition | undefined;
//# sourceMappingURL=registration.d.ts.map