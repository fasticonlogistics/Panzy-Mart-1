<?php
/**
 * The homepage.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
$hero_title = get_theme_mod( 'panzy_hero_title', __( 'Make room for better living.', 'panzy' ) );
$hero_copy  = get_theme_mod( 'panzy_hero_copy', __( 'Explore considered pieces for the spaces you call home.', 'panzy' ) );
$hero_image_id = absint( get_theme_mod( 'panzy_hero_image', 0 ) );
$hero_image_alt = $hero_image_id ? get_post_meta( $hero_image_id, '_wp_attachment_image_alt', true ) : '';
?>
<main id="main" class="site-main">
	<section class="hero">
		<div class="container hero-inner">
			<div class="hero-copy">
				<p class="eyebrow"><?php esc_html_e( 'PANZY · HOME & LIVING', 'panzy' ); ?></p>
				<h1><?php echo esc_html( $hero_title ); ?></h1>
				<p class="hero-description"><?php echo esc_html( $hero_copy ); ?></p>
				<a class="button button-light" href="<?php echo esc_url( panzy_shop_url() ); ?>"><?php esc_html_e( 'Shop now', 'panzy' ); ?><span aria-hidden="true">→</span></a>
			</div>
			<div class="hero-art">
				<?php if ( $hero_image_id && wp_get_attachment_image_url( $hero_image_id, 'large' ) ) : ?>
					<?php
					echo wp_get_attachment_image(
						$hero_image_id,
						'large',
						false,
						array(
							'class'         => 'hero-room-photo',
							'alt'           => $hero_image_alt ? $hero_image_alt : __( 'PANZY home and living collection', 'panzy' ),
							'fetchpriority' => 'high',
							'loading'       => 'eager',
							'decoding'      => 'async',
						)
					);
					?>
				<?php else : ?>
					<img class="hero-room-photo" src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/hero-living.jpg' ); ?>" alt="<?php esc_attr_e( 'A sunlit living room, shared as home styling inspiration.', 'panzy' ); ?>" width="1000" height="667" fetchpriority="high">
				<?php endif; ?>
				<div class="hero-art-caption"><?php esc_html_e( 'A little more room to feel at home', 'panzy' ); ?></div>
			</div>
		</div>
	</section>

	<?php if ( is_page() ) : ?>
		<?php
		while ( have_posts() ) :
			the_post();
			if ( '' !== trim( get_the_content() ) ) :
				?>
				<section class="section homepage-page-content">
					<div class="container content-container entry-content">
						<?php the_content(); ?>
					</div>
				</section>
				<?php
			endif;
		endwhile;
		?>
	<?php endif; ?>

	<?php
	$categories = array();
	if ( taxonomy_exists( 'product_cat' ) ) {
		$categories = get_terms(
			array(
				'taxonomy'   => 'product_cat',
				'hide_empty' => true,
				'parent'     => 0,
				'number'     => 4,
				'orderby'    => 'count',
				'order'      => 'DESC',
			)
		);
	}
	if ( ! is_wp_error( $categories ) && ! empty( $categories ) ) :
		?>
		<section class="section category-section" id="shop-by-category">
			<div class="container">
				<div class="section-heading">
					<div><p class="eyebrow"><?php esc_html_e( 'FIND YOUR FAVOURITE', 'panzy' ); ?></p><h2><?php esc_html_e( 'Shop by category', 'panzy' ); ?></h2></div>
					<a class="text-link" href="<?php echo esc_url( panzy_shop_url() ); ?>"><?php esc_html_e( 'Explore the shop', 'panzy' ); ?> <span aria-hidden="true">→</span></a>
				</div>
				<div class="category-grid">
					<?php foreach ( $categories as $index => $category ) : ?>
						<?php $thumbnail_id = get_term_meta( $category->term_id, 'thumbnail_id', true ); ?>
						<a class="category-card category-tone-<?php echo esc_attr( (string) ( $index % 4 ) ); ?>" href="<?php echo esc_url( get_term_link( $category ) ); ?>">
							<?php if ( $thumbnail_id ) : ?>
								<?php echo wp_get_attachment_image( $thumbnail_id, 'woocommerce_thumbnail', false, array( 'class' => 'category-image', 'loading' => 'lazy' ) ); ?>
							<?php else : ?>
								<span class="category-mark" aria-hidden="true"></span>
							<?php endif; ?>
							<span class="category-card-copy"><strong><?php echo esc_html( $category->name ); ?></strong><span><?php echo esc_html( sprintf( _n( '%s item', '%s items', (int) $category->count, 'panzy' ), number_format_i18n( $category->count ) ) ); ?></span></span>
							<span class="category-arrow" aria-hidden="true">↗</span>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<?php if ( class_exists( 'WooCommerce' ) && panzy_product_sections_available() ) : ?>
		<section class="section product-section">
			<div class="container">
				<div class="section-heading">
					<div><p class="eyebrow"><?php esc_html_e( 'CUSTOMER FAVOURITES', 'panzy' ); ?></p><h2><?php esc_html_e( 'Best sellers', 'panzy' ); ?></h2></div>
					<a class="text-link" href="<?php echo esc_url( add_query_arg( 'orderby', 'popularity', panzy_shop_url() ) ); ?>"><?php esc_html_e( 'View all', 'panzy' ); ?> <span aria-hidden="true">→</span></a>
				</div>
				<?php echo do_shortcode( '[products limit="4" columns="4" best_selling="true"]' ); ?>
			</div>
		</section>

		<?php if ( panzy_product_sections_available( array( 'orderby' => 'date', 'order' => 'DESC' ) ) ) : ?>
			<section class="section product-section new-arrivals">
				<div class="container">
					<div class="section-heading">
						<div><p class="eyebrow"><?php esc_html_e( 'JUST ADDED', 'panzy' ); ?></p><h2><?php esc_html_e( 'New arrivals', 'panzy' ); ?></h2></div>
						<a class="text-link" href="<?php echo esc_url( add_query_arg( 'orderby', 'date', panzy_shop_url() ) ); ?>"><?php esc_html_e( 'Discover more', 'panzy' ); ?> <span aria-hidden="true">→</span></a>
					</div>
					<?php echo do_shortcode( '[products limit="4" columns="4" orderby="date" order="DESC"]' ); ?>
				</div>
			</section>
		<?php endif; ?>

		<?php if ( panzy_product_sections_available( array( 'on_sale' => true ) ) ) : ?>
			<section class="section sale-section">
				<div class="container">
					<div class="section-heading">
						<div><p class="eyebrow"><?php esc_html_e( 'REAL WOOCOMMERCE SALE PRICES', 'panzy' ); ?></p><h2><?php esc_html_e( 'Special finds', 'panzy' ); ?></h2></div>
						<a class="text-link" href="<?php echo esc_url( panzy_page_url( 'sale', panzy_shop_url() ) ); ?>"><?php esc_html_e( 'See sale items', 'panzy' ); ?> <span aria-hidden="true">→</span></a>
					</div>
					<?php echo do_shortcode( '[products limit="4" columns="4" on_sale="true"]' ); ?>
				</div>
			</section>
		<?php endif; ?>
	<?php elseif ( current_user_can( 'manage_options' ) ) : ?>
		<section class="section setup-note"><div class="container"><p><?php esc_html_e( 'Your WooCommerce products and categories will appear here after WooCommerce is installed and products are published.', 'panzy' ); ?></p></div></section>
	<?php endif; ?>

	<section class="brand-values">
		<div class="container values-inner">
			<div><p class="eyebrow"><?php esc_html_e( 'THE PANZY POINT OF VIEW', 'panzy' ); ?></p><h2><?php esc_html_e( 'Comfort, trust, and refined living.', 'panzy' ); ?></h2></div>
			<p><?php esc_html_e( 'Thoughtful home and office essentials, brought together for the way you live.', 'panzy' ); ?></p>
			<a class="button button-outline" href="<?php echo esc_url( panzy_page_url( 'about-us' ) ); ?>"><?php esc_html_e( 'About PANZY', 'panzy' ); ?></a>
		</div>
	</section>
</main>
<?php get_footer(); ?>
