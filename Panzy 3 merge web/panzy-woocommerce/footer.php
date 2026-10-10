<?php
/**
 * The footer.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<footer class="site-footer">
	<div class="container footer-grid">
		<div class="footer-brand">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'PANZY home', 'panzy' ); ?>">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/panzy-logo-light.png' ); ?>" alt="<?php esc_attr_e( 'PANZY — Everything your home needs', 'panzy' ); ?>" width="116" height="94" loading="lazy">
			</a>
			<p><?php esc_html_e( 'Everything your home needs.', 'panzy' ); ?></p>
		</div>
		<div class="footer-links">
			<h2><?php esc_html_e( 'Explore', 'panzy' ); ?></h2>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'menu_class'     => 'footer-menu',
					'fallback_cb'    => 'panzy_fallback_menu',
				)
			);
			?>
		</div>
		<div class="footer-links">
			<h2><?php esc_html_e( 'Information', 'panzy' ); ?></h2>
			<ul>
				<?php
				$policy_pages = array(
					'Privacy Policy'      => 'privacy-policy',
					'Shipping Policy'     => 'shipping-policy',
					'Returns & Refunds'   => 'returns-refunds',
					'Terms & Conditions'  => 'terms-and-conditions',
				);
				foreach ( $policy_pages as $label => $slug ) :
					$page = get_page_by_path( $slug );
					if ( $page instanceof WP_Post ) :
						?>
						<li><a href="<?php echo esc_url( get_permalink( $page ) ); ?>"><?php echo esc_html( $label ); ?></a></li>
						<?php
					endif;
				endforeach;
				?>
			</ul>
		</div>
		<?php if ( is_active_sidebar( 'footer-widgets' ) ) : ?>
			<div class="footer-extra"><?php dynamic_sidebar( 'footer-widgets' ); ?></div>
		<?php endif; ?>
	</div>
	<div class="container footer-bottom">
		<p><?php echo esc_html( sprintf( __( '© %1$s PANZY. All rights reserved.', 'panzy' ), gmdate( 'Y' ) ) ); ?></p>
		<p><?php esc_html_e( 'Comfort, trust, and refined living.', 'panzy' ); ?></p>
	</div>
</footer>
<?php
$whatsapp_number = panzy_sanitize_whatsapp_number( get_theme_mod( 'panzy_whatsapp_number', '' ) );
if ( ! is_wp_error( $whatsapp_number ) && '' !== $whatsapp_number ) :
	$whatsapp_url = add_query_arg(
		'text',
		__( 'Hello PANZY, I have a question about your store.', 'panzy' ),
		'https://wa.me/' . $whatsapp_number
	);
	?>
	<a class="whatsapp-float" href="<?php echo esc_url( $whatsapp_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Chat with PANZY on WhatsApp', 'panzy' ); ?>">
		<svg viewBox="0 0 32 32" aria-hidden="true">
			<path d="M16 3.5a12.1 12.1 0 0 0-10.3 18.5L4 28l6.2-1.6A12.1 12.1 0 1 0 16 3.5Zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.7 9.7 0 1 1 8.4 4.6Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.3-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 2.9 1.3 3.1.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.5Z"/>
		</svg>
		<span><?php esc_html_e( 'Chat with us', 'panzy' ); ?></span>
	</a>
<?php endif; ?>
<?php wp_footer(); ?>
</body>
</html>
