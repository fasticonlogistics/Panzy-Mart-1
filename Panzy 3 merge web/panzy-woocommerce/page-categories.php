<?php
/**
 * Template Name: PANZY Categories
 * Description: Browse published WooCommerce product categories.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
$categories = taxonomy_exists( 'product_cat' )
	? get_terms(
		array(
			'taxonomy'   => 'product_cat',
			'hide_empty' => true,
			'parent'     => 0,
			'number'     => 0,
			'orderby'    => 'name',
			'order'      => 'ASC',
		)
	)
	: array();
?>
<main id="main" class="site-main page-main category-landing">
	<div class="container">
		<header class="entry-header">
			<p class="eyebrow"><?php esc_html_e( 'PANZY · HOME & LIVING', 'panzy' ); ?></p>
			<h1 class="entry-title"><?php esc_html_e( 'Shop by category', 'panzy' ); ?></h1>
			<p><?php esc_html_e( 'Explore the collections currently available in our shop.', 'panzy' ); ?></p>
		</header>
		<?php if ( ! is_wp_error( $categories ) && ! empty( $categories ) ) : ?>
			<div class="category-grid">
				<?php foreach ( $categories as $index => $category ) : ?>
					<?php $thumbnail_id = get_term_meta( $category->term_id, 'thumbnail_id', true ); ?>
					<a class="category-card category-tone-<?php echo esc_attr( (string) ( $index % 4 ) ); ?>" href="<?php echo esc_url( get_term_link( $category ) ); ?>">
						<?php if ( $thumbnail_id ) : ?>
							<?php echo wp_get_attachment_image( $thumbnail_id, 'woocommerce_thumbnail', false, array( 'class' => 'category-image', 'loading' => 'lazy' ) ); ?>
						<?php else : ?>
							<span class="category-mark" aria-hidden="true"></span>
						<?php endif; ?>
						<span class="category-card-copy">
							<strong><?php echo esc_html( $category->name ); ?></strong>
							<span><?php echo esc_html( sprintf( _n( '%s item', '%s items', (int) $category->count, 'panzy' ), number_format_i18n( $category->count ) ) ); ?></span>
						</span>
						<span class="category-arrow" aria-hidden="true">↗</span>
					</a>
				<?php endforeach; ?>
			</div>
		<?php elseif ( current_user_can( 'manage_options' ) ) : ?>
			<p><?php esc_html_e( 'Published WooCommerce product categories will appear here once you add them.', 'panzy' ); ?></p>
		<?php else : ?>
			<p><?php esc_html_e( 'There are no product categories to display right now.', 'panzy' ); ?></p>
		<?php endif; ?>
	</div>
</main>
<?php get_footer(); ?>
