<?php
/**
 * Pages.
 *
 * @package Panzy
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header();
?>
<main id="main" class="site-main page-main">
	<div class="container content-container">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class( 'page-entry' ); ?>>
				<header class="entry-header"><p class="eyebrow"><?php esc_html_e( 'PANZY · HOME & LIVING', 'panzy' ); ?></p><h1 class="entry-title"><?php the_title(); ?></h1></header>
				<div class="entry-content"><?php the_content(); ?></div>
			</article>
			<?php
		endwhile;
		?>
	</div>
</main>
<?php get_footer(); ?>
