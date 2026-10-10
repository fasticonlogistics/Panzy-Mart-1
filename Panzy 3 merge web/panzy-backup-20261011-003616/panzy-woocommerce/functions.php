<?php
/**
 * PANZY Store theme functions.
 *
 * @package Panzy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PANZY_VERSION', '1.2.0' );

function panzy_setup() {
	load_theme_textdomain( 'panzy', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	register_nav_menus(
		array(
			'primary' => __( 'Primary navigation', 'panzy' ),
			'footer'  => __( 'Footer navigation', 'panzy' ),
		)
	);
}
add_action( 'after_setup_theme', 'panzy_setup' );

function panzy_enqueue_assets() {
	wp_enqueue_style( 'panzy-theme', get_stylesheet_uri(), array(), PANZY_VERSION );
	wp_enqueue_style(
		'panzy-layout',
		get_template_directory_uri() . '/assets/css/theme.css',
		array( 'panzy-theme' ),
		PANZY_VERSION
	);
	wp_enqueue_style(
		'panzy-montserrat',
		'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
		array(),
		null
	);
	wp_enqueue_script(
		'panzy-theme',
		get_template_directory_uri() . '/assets/js/theme.js',
		array(),
		PANZY_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'panzy_enqueue_assets' );

function panzy_register_sidebars() {
	register_sidebar(
		array(
			'name'          => __( 'Shop filters', 'panzy' ),
			'id'            => 'shop-filters',
			'description'   => __( 'Add WooCommerce product-filter blocks or widgets here. They appear above the product grid on shop and product-category pages.', 'panzy' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);

	register_sidebar(
		array(
			'name'          => __( 'Footer widgets', 'panzy' ),
			'id'            => 'footer-widgets',
			'description'   => __( 'Optional editable footer content.', 'panzy' ),
			'before_widget' => '<section id="%1$s" class="footer-widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="footer-widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'panzy_register_sidebars' );

function panzy_customize_register( $wp_customize ) {
	$wp_customize->add_section(
		'panzy_homepage',
		array(
			'title'       => __( 'PANZY Homepage', 'panzy' ),
			'description' => __( 'Edit the homepage announcement and hero copy. Do not enter unverified offers or delivery promises.', 'panzy' ),
			'priority'    => 30,
		)
	);

	$settings = array(
		'panzy_announcement' => array(
			'label'   => __( 'Announcement bar', 'panzy' ),
			'default' => __( 'Thoughtful finds for everyday living', 'panzy' ),
			'sanitize_callback' => 'sanitize_text_field',
			'type'    => 'text',
		),
		'panzy_hero_title' => array(
			'label'   => __( 'Hero headline', 'panzy' ),
			'default' => __( 'Make room for better living.', 'panzy' ),
			'sanitize_callback' => 'sanitize_text_field',
			'type'    => 'text',
		),
		'panzy_hero_copy' => array(
			'label'   => __( 'Hero supporting text', 'panzy' ),
			'default' => __( 'Explore considered pieces for the spaces you call home.', 'panzy' ),
			'sanitize_callback' => 'sanitize_textarea_field',
			'type'    => 'textarea',
		),
	);

	$wp_customize->add_setting(
		'panzy_hero_image',
		array(
			'default'           => 0,
			'sanitize_callback' => 'absint',
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'panzy_hero_image',
			array(
				'label'       => __( 'Homepage hero image', 'panzy' ),
				'description' => __( 'Upload a PANZY-approved lifestyle image. Leave empty to use the bundled illustrative image.', 'panzy' ),
				'section'     => 'panzy_homepage',
			)
		)
	);

	$wp_customize->add_setting(
		'panzy_whatsapp_number',
		array(
			'default'           => '',
			'sanitize_callback' => 'panzy_sanitize_whatsapp_number',
			'transport'         => 'refresh',
		)
	);
	$wp_customize->add_control(
		'panzy_whatsapp_number',
		array(
			'label'       => __( 'WhatsApp business number', 'panzy' ),
			'description' => __( 'Optional. Enter the verified full international number, country code included, without spaces, +, brackets, or punctuation. Leave blank to hide the WhatsApp button.', 'panzy' ),
			'section'     => 'panzy_homepage',
			'type'        => 'tel',
		)
	);

	foreach ( $settings as $setting_id => $setting ) {
		$wp_customize->add_setting(
			$setting_id,
			array(
				'default'           => $setting['default'],
				'sanitize_callback' => $setting['sanitize_callback'],
				'transport'         => 'refresh',
			)
		);
		$wp_customize->add_control(
			$setting_id,
			array(
				'label'   => $setting['label'],
				'section' => 'panzy_homepage',
				'type'    => $setting['type'],
			)
		);
	}
}
add_action( 'customize_register', 'panzy_customize_register' );

function panzy_sanitize_whatsapp_number( $number ) {
	$number = preg_replace( '/\D+/', '', sanitize_text_field( $number ) );

	if ( '' === $number ) {
		return '';
	}

	if ( strlen( $number ) < 8 || strlen( $number ) > 15 || '0' === substr( $number, 0, 1 ) ) {
		return new WP_Error( 'panzy_invalid_whatsapp_number', __( 'Enter the business WhatsApp number in international format, without spaces or punctuation.', 'panzy' ) );
	}

	return $number;
}

function panzy_page_url( $slug, $fallback = '' ) {
	$page = get_page_by_path( $slug );
	if ( $page instanceof WP_Post ) {
		return get_permalink( $page );
	}

	return $fallback ? $fallback : home_url( '/' );
}

function panzy_shop_url() {
	if ( function_exists( 'wc_get_page_permalink' ) ) {
		$url = wc_get_page_permalink( 'shop' );
		if ( $url ) {
			return $url;
		}
	}

	return home_url( '/shop/' );
}

function panzy_fallback_menu( $args = array() ) {
	$items = array(
		__( 'Home', 'panzy' )      => home_url( '/' ),
		__( 'Shop', 'panzy' )      => panzy_shop_url(),
		__( 'Categories', 'panzy' ) => panzy_page_url( 'categories', panzy_shop_url() ),
		__( 'New Arrivals', 'panzy' ) => add_query_arg( 'orderby', 'date', panzy_shop_url() ),
		__( 'Best Sellers', 'panzy' ) => add_query_arg( 'orderby', 'popularity', panzy_shop_url() ),
		__( 'Hot Deals', 'panzy' )  => panzy_page_url( 'sale', panzy_shop_url() ),
		__( 'About Us', 'panzy' )  => panzy_page_url( 'about-us' ),
		__( 'Contact', 'panzy' )   => panzy_page_url( 'contact' ),
	);

	$menu = '<ul class="menu">';
	foreach ( $items as $label => $url ) {
		$menu .= '<li class="menu-item"><a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a></li>';
	}

	/**
	 * Show an accurate percentage on active WooCommerce sale badges.
	 *
	 * For variable products, the badge shows the largest valid discount among
	 * currently on-sale variations rather than implying every variation saves
	 * the same amount.
	 *
	 * @param string     $html    Existing sale badge markup.
	 * @param WP_Post    $post    Product post.
	 * @param WC_Product $product Product object.
	 * @return string
	 */
	function panzy_sale_flash( $html, $post, $product ) {
		if ( ! $product instanceof WC_Product || ! $product->is_on_sale() ) {
			return $html;
		}

		$discounts = array();
		$items     = $product->is_type( 'variable' )
			? array_map( 'wc_get_product', $product->get_children() )
			: array( $product );

		foreach ( $items as $item ) {
			if ( ! $item instanceof WC_Product || ! $item->is_on_sale() ) {
				continue;
			}

			$regular_price = (float) $item->get_regular_price();
			$sale_price    = (float) $item->get_sale_price();
			if ( $regular_price > 0 && $sale_price >= 0 && $sale_price < $regular_price ) {
				$percentage = (int) round( ( ( $regular_price - $sale_price ) / $regular_price ) * 100 );
				if ( $percentage > 0 ) {
					$discounts[] = $percentage;
				}
			}
		}

		if ( empty( $discounts ) ) {
			return $html;
		}

		$label = $product->is_type( 'variable' )
			? sprintf( __( 'Up to %s%% off', 'panzy' ), number_format_i18n( max( $discounts ) ) )
			: sprintf( __( '%s%% off', 'panzy' ), number_format_i18n( $discounts[0] ) );

		return '<span class="onsale">' . esc_html( $label ) . '</span>';
	}
	add_filter( 'woocommerce_sale_flash', 'panzy_sale_flash', 10, 3 );
	$menu .= '</ul>';

	return $menu;
}

function panzy_woocommerce_wrapper_start() {
	echo '<main id="main" class="site-main shop-main"><div class="container">';
}

function panzy_woocommerce_wrapper_end() {
	echo '</div></main>';
}

function panzy_woocommerce_wrappers() {
	remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
	remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );
	add_action( 'woocommerce_before_main_content', 'panzy_woocommerce_wrapper_start', 10 );
	add_action( 'woocommerce_after_main_content', 'panzy_woocommerce_wrapper_end', 10 );
	add_action( 'woocommerce_before_shop_loop', 'panzy_shop_filters', 5 );
}
add_action( 'wp', 'panzy_woocommerce_wrappers' );

function panzy_shop_filters() {
	if ( ! function_exists( 'wc_get_price_decimals' ) ) {
		return;
	}

	$minimum = isset( $_GET['min_price'] ) && ! is_array( $_GET['min_price'] ) ? wc_format_decimal( wc_clean( wp_unslash( $_GET['min_price'] ) ) ) : '';
	$maximum = isset( $_GET['max_price'] ) && ! is_array( $_GET['max_price'] ) ? wc_format_decimal( wc_clean( wp_unslash( $_GET['max_price'] ) ) ) : '';
	$action  = panzy_shop_url();
	$decimals = wc_get_price_decimals();
	$price_step = $decimals > 0 ? '0.' . str_repeat( '0', $decimals - 1 ) . '1' : '1';
	if ( is_product_taxonomy() ) {
		$term = get_queried_object();
		if ( $term instanceof WP_Term ) {
			$term_url = get_term_link( $term );
			if ( ! is_wp_error( $term_url ) ) {
				$action = $term_url;
			}
		}
	}
	$categories = get_terms(
		array(
			'taxonomy'   => 'product_cat',
			'hide_empty' => true,
			'parent'     => 0,
			'number'     => 8,
		)
	);
	?>
	<div class="shop-filter-panel">
		<?php if ( ! is_wp_error( $categories ) && ! empty( $categories ) ) : ?>
			<nav class="shop-category-links" aria-label="<?php esc_attr_e( 'Shop categories', 'panzy' ); ?>">
				<a href="<?php echo esc_url( panzy_shop_url() ); ?>"><?php esc_html_e( 'All products', 'panzy' ); ?></a>
				<?php foreach ( $categories as $category ) : ?>
					<a href="<?php echo esc_url( get_term_link( $category ) ); ?>"><?php echo esc_html( $category->name ); ?></a>
				<?php endforeach; ?>
			</nav>
		<?php endif; ?>
		<form class="price-filter-form" method="get" action="<?php echo esc_url( $action ); ?>">
			<label>
				<span><?php esc_html_e( 'Min price', 'panzy' ); ?></span>
				<input type="number" name="min_price" min="0" step="<?php echo esc_attr( $price_step ); ?>" value="<?php echo esc_attr( $minimum ); ?>">
			</label>
			<label>
				<span><?php esc_html_e( 'Max price', 'panzy' ); ?></span>
				<input type="number" name="max_price" min="0" step="<?php echo esc_attr( $price_step ); ?>" value="<?php echo esc_attr( $maximum ); ?>">
			</label>
			<button type="submit"><?php esc_html_e( 'Filter', 'panzy' ); ?></button>
			<?php if ( is_product_taxonomy() ) : ?>
				<input type="hidden" name="product_cat" value="<?php echo esc_attr( get_queried_object()->slug ); ?>">
			<?php endif; ?>
		</form>
		<?php if ( is_active_sidebar( 'shop-filters' ) ) : ?>
			<div class="shop-filter-widgets"><?php dynamic_sidebar( 'shop-filters' ); ?></div>
		<?php endif; ?>
	</div>
	<?php
}

function panzy_product_sections_available( $args = array() ) {
	if ( ! function_exists( 'wc_get_products' ) ) {
		return false;
	}

	$args = wp_parse_args(
		$args,
		array(
			'limit'  => 1,
			'status' => 'publish',
			'return' => 'ids',
		)
	);

	return ! empty( wc_get_products( $args ) );
}
