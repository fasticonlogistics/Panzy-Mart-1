<?php
/**
 * The header.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#main"><?php esc_html_e( 'Skip to content', 'panzy' ); ?></a>

<?php $announcement = get_theme_mod( 'panzy_announcement', __( 'Thoughtful finds for everyday living', 'panzy' ) ); ?>
<?php if ( $announcement ) : ?>
	<div class="announcement-bar"><?php echo esc_html( $announcement ); ?></div>
<?php endif; ?>

<header class="site-header">
	<div class="container header-main">
		<a class="site-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'PANZY home', 'panzy' ); ?>">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panzy-logo.png' ); ?>" alt="<?php esc_attr_e( 'PANZY — Everything your home needs', 'panzy' ); ?>" width="116" height="94">
		</a>

		<div class="header-tools">
			<form class="product-search" role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<label class="screen-reader-text" for="panzy-search"><?php esc_html_e( 'Search products', 'panzy' ); ?></label>
				<input id="panzy-search" type="search" name="s" placeholder="<?php esc_attr_e( 'Search products…', 'panzy' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>">
				<input type="hidden" name="post_type" value="product">
				<button type="submit" aria-label="<?php esc_attr_e( 'Search', 'panzy' ); ?>">
					<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7"></circle><path d="m16 16 4.5 4.5"></path></svg>
				</button>
			</form>
			<?php if ( function_exists( 'wc_get_page_permalink' ) ) : ?>
				<a class="tool-link account-link" href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>">
					<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20c.4-4.1 3.3-6.3 7.5-6.3s7.1 2.2 7.5 6.3"></path></svg>
					<span><?php esc_html_e( 'Account', 'panzy' ); ?></span>
				</a>
				<a class="tool-link cart-link" href="<?php echo esc_url( wc_get_cart_url() ); ?>">
					<span class="cart-icon-wrap">
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.4L21 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>
						<span class="cart-count"><?php echo esc_html( WC()->cart ? WC()->cart->get_cart_contents_count() : 0 ); ?></span>
					</span>
					<span><?php esc_html_e( 'Cart', 'panzy' ); ?></span>
				</a>
			<?php endif; ?>
		</div>

		<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
			<span class="screen-reader-text"><?php esc_html_e( 'Toggle navigation', 'panzy' ); ?></span>
			<span></span><span></span><span></span>
		</button>
	</div>
	<nav class="primary-navigation" id="primary-navigation" aria-label="<?php esc_attr_e( 'Main navigation', 'panzy' ); ?>">
		<div class="container">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'menu',
					'fallback_cb'    => 'panzy_fallback_menu',
					'depth'          => 2,
				)
			);
			?>
		</div>
	</nav>
</header>
