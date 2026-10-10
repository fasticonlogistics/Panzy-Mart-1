<?php
/**
 * WooCommerce page wrapper; WooCommerce supplies the product, cart, and checkout templates.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
woocommerce_content();
get_footer();
