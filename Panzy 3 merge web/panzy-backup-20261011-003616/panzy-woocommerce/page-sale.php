<?php
/**
 * A sale page that only displays products with an active WooCommerce sale price.
 *
 * Create a WordPress page with the slug "sale"; WordPress will use this template.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<main id="main" class="site-main page-main">
	<div class="container">
		<header class="entry-header">
			<p class="eyebrow"><?php esc_html_e( 'GENUINE WOOCOMMERCE SALE PRICES', 'panzy' ); ?></p>
			<h1 class="entry-title"><?php the_title(); ?></h1>
		</header>
		<?php if ( class_exists( 'WooCommerce' ) ) : ?>
			<?php echo do_shortcode( '[products limit="12" columns="4" on_sale="true" paginate="true"]' ); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'Sale products will appear here after WooCommerce is installed and products are published with active sale prices.', 'panzy' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php get_footer(); ?>
